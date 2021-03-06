'use strict';

/* ボス基底クラス */

// 基底クラス
var BaseObject = require('../base');
var Util = require('../../util');
var Config = require('../../config');
var Constant = require('../../constant');

var Shot = require('../../object/shot');

var boss_appearance = require("../../createjs/boss_appearance");
var explosion = require("../../createjs/explosion");
var CreateJS = require("../../logic/createjs");


// Nフレーム毎にボスをアニメーション
var FRONT_ANIMATION_SPAN = 6;
var LR_ANIMATION_SPAN = 4;

// ボスの移動速度
var DEFAULT_SPEED = 2;

// constructor
var BossBase = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	// ボスのスプライトの位置
	this.indexX = 0; this.indexY = 0;

	// 発動中スペル
	this.spell_index = 0;

	// スペルカード一覧
	this.spells = [
		null, // 何も発動していない
	];

	// 移動関連
	this.is_moving = false;// 移動中か否か
	this.to_x      = null; // 移動先 x座標
	this.to_y      = null; // 移動先 y座標
	this.to_radian = null; // 移動方向
	this.to_speed  = null; // 移動速度

	// ボスを描画するかどうか
	this.is_show = true;

	// 生存中
	this.is_live = true;

	// 撃破エフェクト発動中
	this.is_occured_destroyed_effect = false;

};

// 基底クラスを継承
Util.inherit(BossBase, BaseObject);

// 初期化
BossBase.prototype.init = function() {
	BaseObject.prototype.init.apply(this, arguments);

	// 移動を初期化
	this.clearMoveTo();

	// ボスを初期位置に置く
	this.setInitPosition();

	// 初期HP
	this.vital = this.MAX_VITAL();

	// 発動スペル TODO:
	this.spell_index = Config.DEBUG && Config.DEBUG_SPELL ? Config.DEBUG_SPELL : 0;

	// スペルカード発動！
	this.executeSpell();

	// ボス出現エフェクト
	this.boss_appearance = new CreateJS(new boss_appearance.boss_appearance(), 960, 960);

	// ボス撃破エフェクト
	this.explosion = new CreateJS(new explosion.explosion(), 960, 960);

	// ボスを描画するかどうか
	this.is_show = true;

	// 生存中
	this.is_live = true;

	// 撃破エフェクト発動中
	this.is_occured_destroyed_effect = false;
};

// スペルカード設定
BossBase.prototype.setSpells = function(spells) {
	this.spells = [null].concat(spells); // spells 先頭は null でなくてはならない
};

// ボスを初期位置に置く
BossBase.prototype.setInitPosition = function() {
	// ボスの初期位置
	this.x = (this.stage.width / 2);
	this.y = (this.stage.height - 400);
};

// 現在のスペルカード
BossBase.prototype.currentSpell = function(){
	return this.spells[this.spell_index];
};

// スペルを切り替え
BossBase.prototype.executeSpell = function(){
	// 切り替え
	this.spell_index++;
	// 切り替え後の状態を初期化
	this.currentSpell().init();
};
// 次に発動するスペルがあるかどうか
BossBase.prototype.hasNextSpell = function(){
	return this.spells[this.spell_index + 1] ? true : false;
};


// HPを初期化
BossBase.prototype.resetVital = function(){
	this.vital = this.MAX_VITAL();
};

// ボスが死んだかどうか
BossBase.prototype.isHpEmpty = function(){
	return this.vital <= 0;
};
// ボスのスペカが全て終了して撃破エフェクトも終わったか
BossBase.prototype.isDeadCompletely = function(){
	return !this.is_live && !this.is_occured_destroyed_effect;
};

// フレーム処理
BossBase.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	if (this.is_live) { // ボス生存中
		// スペルカード処理
		this.currentSpell().run();

		// 移動が設定されてるなら移動
		this._moveTo();

		// スペルカード実行中ならば
		if(this.currentSpell().isSpellExecute()) {
			// 時間経過でスペルカード発動時間は減っていく
			this.vital--;
			this.stage.score+=10;
		}

		// ボスHPが0になったら
		if(this.isHpEmpty()) {
			// スペル終了時のフックを実行
			this.currentSpell().onend();

			// スペル終了に変更
			this.currentSpell().changeState(Constant.SPELLCARD_END_STATE);

			// 敵の弾を vanish する
			this.stage.bullet_manager.notifyUseBomb();

			// アイテムを自機に吸引させる
			this.stage.item_manager.notifyUseBomb();

			// 次のスペルがある場合、次のスペルに移行
			if(this.hasNextSpell()) {
				// HPを初期化
				this.resetVital();

				// 次のスペルカード発動！
				this.executeSpell();
			}
			else { // スペルカードが全て終了したら撃破エフェクト開始
				this.is_live = false;

				// 撃破エフェクト開始
				this.setAutoDisableFlag("is_occured_destroyed_effect", 280);
			}
		}
	}
	else { // ボス死亡エフェクト処理
		this.explosion.update();
	}


	var span = this.indexY === 0 ? FRONT_ANIMATION_SPAN : LR_ANIMATION_SPAN;

	// Nフレーム毎にボスをアニメーション
	if(this.frame_count % span === 0) {
		// 次のスプライトに
		this.indexX++;

		// スプライトを全て表示しきったら最初のスプライトに戻る
		if(this.indexX > 2) { this.indexX = 0; }
	}

	// ボス出現エフェクト
	this.boss_appearance.update();
};

// 移動
BossBase.prototype.moveLeft = function(){
	this.x -= DEFAULT_SPEED;
};
BossBase.prototype.moveRight = function(){
	this.x += DEFAULT_SPEED;
};
BossBase.prototype.moveUp = function(){
	this.y -= DEFAULT_SPEED;
};
BossBase.prototype.moveDown = function(){
	this.y += DEFAULT_SPEED;
};

// 移動アニメーション
BossBase.prototype.animateLeft = function(){
		this.indexY = 1;
};
BossBase.prototype.animateRight = function(){
		this.indexY = 2;
};
BossBase.prototype.animateNeutral = function(){
		this.indexY = 0;
};


// 移動中かどうか
BossBase.prototype.isMoving = function(){
	return this.is_moving;
};
// 指定のx,y座標に移動を設定
BossBase.prototype.setMoveTo = function(x, y, frame_count){
	this.is_moving = true;
	this.to_x = x;
	this.to_y = y;

	var ax = x - this.x;
	var ay = y - this.y;

	this.to_radian = Math.atan2(ay, ax);
	if(frame_count) {
		this.to_speed = Math.sqrt(Math.pow(ay, 2) + Math.pow(ax, 2)) / frame_count;
	}
	else {
		this.to_speed = DEFAULT_SPEED;
	}

	// 既に指定のx,y座標に居たら、移動設定を解除
	if(this.isArrivedAtPoint()) {
		this.clearMoveTo();
	}
};
// 指定の座標に移動しているのを解除
BossBase.prototype.clearMoveTo = function(){
	this.is_moving = false;
	this.to_x = null;
	this.to_y = null;
	this.to_radian = null;
	this.to_speed = null;
};


// 指定のx,y座標に移動
BossBase.prototype._moveTo = function(){
	if(!this.is_moving) return;

	var cos = Math.cos(this.to_radian);
	var sin = Math.sin(this.to_radian);

	this.x += this.to_speed * cos;
	this.y += this.to_speed * sin;

	if(cos > 0) {
		this.animateRight();
	}
	else {
		this.animateLeft();
	}

	// 目的地に到達したかどうか
	if(this.isArrivedAtPoint()) {
		this.clearMoveTo();
		this.animateNeutral();
	}
};

// 目的地に到達したかどうか
BossBase.prototype.isArrivedAtPoint = function(){
	if( this.to_x + 1 > this.x && this.x > this.to_x - 1 &&
		this.to_y + 1 > this.y && this.y > this.to_y - 1) {
		return true;
	}

	return false;
};

// ボスを描画
BossBase.prototype.updateDisplay = function(){
	var ctx = this.game.surface;

	if (this.is_live) { // ボス生存中
		if(this.is_show) {
			// ボス出現エフェクト
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.drawImage(this.boss_appearance.canvas, (-this.boss_appearance.canvas.width/2), (-this.boss_appearance.canvas.height/2));
			ctx.restore();

			// ボス描画
			BaseObject.prototype.updateDisplay.apply(this, arguments);
		}

		// スペルカード描画
		this.currentSpell().updateDisplay();
	}
	else { // ボス死亡エフェクト
		// ボス出現エフェクト
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.drawImage(this.explosion.canvas, (-this.explosion.canvas.width/2), (-this.explosion.canvas.height/2));
		ctx.restore();
	}
};

// 衝突した時
BossBase.prototype.notifyCollision = function(obj) {
	// 自機弾が当たればボスのHPを減らす
	if(obj instanceof Shot && this.currentSpell().isSpellExecute() && obj.isEnableDamage(this)) {
		this.vital-=3;
		this.stage.score+=10;
	}
};

// BGM
BossBase.prototype.bgm = function() {
	console.error('bgm method must be overridden.');
};

// 残HP パーセント
BossBase.prototype.vitalPercentage = function() {
	return this.vital / this.MAX_VITAL();
};

// 現在のスペカ名
BossBase.prototype.currentSpellName = function() {
	return this.currentSpell().name();
};


BossBase.prototype.scale = function() { return 0.75; };

// 当たり判定サイズ
BossBase.prototype.collisionWidth  = function() { return 48; };
BossBase.prototype.collisionHeight = function() { return 48; };

// 最大HP
BossBase.prototype.MAX_VITAL = function() {
	return 1;
};





module.exports = BossBase;
