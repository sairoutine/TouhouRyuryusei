'use strict';

/* 射命丸文 */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../util');
var Constant = require('../constant');

var TenguKaze = require('../spell/stage1/tengukaze');
var Konohamai = require('../spell/stage1/konohamai');


var Shot = require('../object/shot');

// Nフレーム毎にボスをアニメーション
var FRONT_ANIMATION_SPAN = 6;
var LR_ANIMATION_SPAN = 4;

// HP
var VITAL = 60 * 60 * 1;

// ボスの移動速度
var SPEED = 2;

// constructor
var Aya = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	// 自機のスプライトの位置
	this.indexX = 0; this.indexY = 0;

	// 発動中スペル
	this.spell_index = 0;

	// スペルカード一覧
	this.spells = [
		null, // 何も発動していない
		new TenguKaze(this),
		new Konohamai(this),
	];
};

// 基底クラスを継承
Util.inherit(Aya, BaseObject);



// ボスを初期位置に置く
Aya.prototype.setInitPosition = function() {
	// ボスの初期位置
	this.x = (this.stage.width / 2);
	this.y = (this.stage.height - 400);
};

// 初期化
Aya.prototype.init = function() {
	BaseObject.prototype.init.apply(this, arguments);

	// ボスを初期位置に置く
	this.setInitPosition();

	// 初期HP
	this.max_vital = VITAL;
	this.vital = VITAL;

	// 発動スペル
	this.spell_index = 0;

	// スペルカード発動！
	this.executeSpell();
};

// 現在のスペルカード
Aya.prototype.currentSpell = function(){
	return this.spells[this.spell_index];
};

// スペルを切り替え
Aya.prototype.executeSpell = function(){
	// 切り替え
	this.spell_index++;
	// 切り替え後の状態を初期化
	this.currentSpell().init();
};
// 次に発動するスペルがあるかどうか
Aya.prototype.hasNextSpell = function(){
	return this.spells[this.spell_index + 1] ? true : false;
};


// HPを初期化
Aya.prototype.resetVital = function(){
	this.vital = this.max_vital;
};

// HPを初期化
Aya.prototype.isDead = function(){
	return this.vital <= 0;
};



// フレーム処理
Aya.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	// スペルカード処理
	this.currentSpell().run();

	// 時間経過でスペルカード発動時間は減っていく
	if(this.currentSpell().isSpellExecute()) {
		this.vital--;
		this.stage.score+=10;
	}

	if(this.isDead() && this.hasNextSpell()) {
		this.resetVital();
		// 次のスペルカード発動！
		this.executeSpell();
	}

	var span = this.indexY === 0 ? FRONT_ANIMATION_SPAN : LR_ANIMATION_SPAN;

	// Nフレーム毎にボスをアニメーション
	if(this.frame_count % span === 0) {
		// 次のスプライトに
		this.indexX++;

		// スプライトを全て表示しきったら最初のスプライトに戻る
		if(this.indexX > 2) { this.indexX = 0; }
	}
};

// TODO: aimed で動かしたい
// 移動
Aya.prototype.moveLeft = function(){
	this.x -= SPEED;
};
Aya.prototype.moveRight = function(){
	this.x += SPEED;
};
Aya.prototype.moveUp = function(){
	this.y -= SPEED;
};
Aya.prototype.moveDown = function(){
	this.y += SPEED;
};

// 移動アニメーション
Aya.prototype.animateLeft = function(){
		this.indexY = 1;
};
Aya.prototype.animateRight = function(){
		this.indexY = 2;
};
Aya.prototype.animateNeutral = function(){
		this.indexY = 0;
};


// ボスを描画
Aya.prototype.updateDisplay = function(){
	BaseObject.prototype.updateDisplay.apply(this, arguments);

	// スペルカード描画
	this.currentSpell().updateDisplay();
};

// 衝突した時
Aya.prototype.notifyCollision = function(obj) {
	// 自機弾が当たればボスのHPを減らす
	if(obj instanceof Shot) {
		this.vital--;
		this.stage.score+=10;
	}
};



// 当たり判定サイズ
Aya.prototype.collisionWidth  = function() { return 64; };
Aya.prototype.collisionHeight = function() { return 100; };

// スプライトの開始位置
Aya.prototype.spriteX = function() { return this.indexX; };
Aya.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Aya.prototype.spriteImage = function() { return 'boss_aya'; };

// スプライトのサイズ
Aya.prototype.spriteWidth  = function() { return 128; };
Aya.prototype.spriteHeight = function() { return 128; };




module.exports = Aya;
