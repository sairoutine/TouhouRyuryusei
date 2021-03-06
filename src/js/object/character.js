'use strict';

/* 自機 */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../util');
var Constant = require('../constant');

var BossBase = require('./boss/base');
var Enemy = require('./enemy');
var Bullet = require('./bullet');
var Option = require('./option');
var Spell = require('../spell/renko/spell1');
var Manager = require('../logic/manager');


// 自機の移動速度(通常時)
var FAST_SPEED = 6;
// 自機の移動速度(Z押下時)
var SLOW_SPEED = 2;
// Nフレーム毎に自機をアニメーション
var FRONT_ANIMATION_SPAN = 6; // 正面
var LR_ANIMATION_SPAN = 4; // 左右移動
// Nフレーム毎に自機をショット
var SHOT_SPAN = 5;
// 死亡時の無敵時間(フレーム)
var UNHITTABLE_COUNT = 200;
// 死亡時に初期位置からしばらく動けない時間(フレーム)
var UNABLE_MOVE_COUNT = 50;
// ボム発動時間(フレーム)
var BOMB_COUNT = 600;
// 初期ライフ
var INIT_LIFE = 5;
// 初期ボム数
var INIT_BOMB = 5;

// 自機弾のベクトル(初期)
var SHOT_VECTOR_0 = { 'r': 8, 'theta': 270 };
// 自機弾のベクトル(1強化後)
var SHOT_VECTOR_1_1 = { 'r': 8, 'theta': 265 };
var SHOT_VECTOR_1_2 = { 'r': 8, 'theta': 270 };
var SHOT_VECTOR_1_3 = { 'r': 8, 'theta': 275 };





// constructor
var Character = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	// 自機のスプライトの位置
	this.indexX = 0; this.indexY = 0;

	this.spell = new Spell(this);

	this.option_manager = new Manager(Option, stage);
};

// 基底クラスを継承
Util.inherit(Character, BaseObject);



// 自機を初期位置に置く
Character.prototype.setInitPosition = function() {
	// 自機の初期位置
	this.x = (this.stage.width / 2);
	this.y = (this.stage.height - 100);

	this.animateNeutral();
};

// 初期化
Character.prototype.init = function() {
	BaseObject.prototype.init.apply(this, arguments);

	// 自機を初期位置に置く
	this.setInitPosition();

	// 初期ライフ3
	this.life = INIT_LIFE;

	// 初期ボム数
	this.bombs = INIT_BOMB;

	// ボム使用中かどうか
	this.is_using_bomb = false;

	// 移動不可能かどうか(死亡後の拘束時間に使用)
	this.is_unable_move = false;

	// ステージ開始直後は無敵状態にする
	this.setAutoDisableFlag("is_unhittable", UNHITTABLE_COUNT);

	// 低速移動かどうか
	this.is_slow = false;

	this.power = 0; // パワーアップアイテムで獲得したパワー
	this.level = 0; // 自機のレベル

	this.option_manager.init();
};

// 撃つ
Character.prototype.shot = function(){
	// Nフレーム置きにショットを生成
	if(this.frame_count % SHOT_SPAN === 0) {

		// レベルアップ後
		if (this.level >= 1) {
			this.stage.shot_manager.create(Constant.SHOT_NORMAL_TYPE, this.x, this.y, SHOT_VECTOR_1_1);
			this.stage.shot_manager.create(Constant.SHOT_NORMAL_TYPE, this.x, this.y, SHOT_VECTOR_1_2);
			this.stage.shot_manager.create(Constant.SHOT_NORMAL_TYPE, this.x, this.y, SHOT_VECTOR_1_3);
		}
		// レベルアップ前
		else {
			this.stage.shot_manager.create(Constant.SHOT_NORMAL_TYPE, this.x, this.y, SHOT_VECTOR_0);
		}
	}
};

// 画面外に出させない
Character.prototype.forbidOutOfStage = function(){
	if(this.x < 0) {
		this.x = 0;
	}
	if(this.x > this.stage.width) {
		this.x = this.stage.width;
	}
	if(this.y < 0) {
		this.y = 0;
	}
	if(this.y > this.stage.height) {
		this.y = this.stage.height;
	}
};

// 低速移動かどうかを設定
Character.prototype.setSlow = function(bool){
	this.is_slow = bool;
};
// 自機移動
Character.prototype.moveLeft = function(){
	if(this.is_unable_move) return;
	this.x -= this.is_slow ? SLOW_SPEED : FAST_SPEED;
};
Character.prototype.moveRight = function(){
	if(this.is_unable_move) return;
	this.x += this.is_slow ? SLOW_SPEED : FAST_SPEED;
};
Character.prototype.moveUp = function(){
	if(this.is_unable_move) return;
	this.y -= this.is_slow ? SLOW_SPEED : FAST_SPEED;
};
Character.prototype.moveDown = function(){
	if(this.is_unable_move) return;
	this.y += this.is_slow ? SLOW_SPEED : FAST_SPEED;
};

// 移動アニメーション
Character.prototype.animateLeft = function(){
	if(this.is_unable_move) return;
	this.indexY = 1;
};
Character.prototype.animateRight = function(){
	if(this.is_unable_move) return;
	this.indexY = 2;
};
Character.prototype.animateNeutral = function(){
	if(this.is_unable_move) return;
	this.indexY = 0;
};


// フレーム処理
Character.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	var span = this.indexY === 0 ? FRONT_ANIMATION_SPAN : LR_ANIMATION_SPAN;
	// Nフレーム毎に自機をアニメーション
	if(this.frame_count % span === 0) {
		// 次のスプライトに
		this.indexX++;

		// スプライトを全て表示しきったら最初のスプライトに戻る
		if(this.indexX > 2) { this.indexX = 0; }
	}

	// ボム使用中ならボムの発動
	if(this.is_using_bomb) {
		this.spell.run();
	}

	// レベルアップ判定
	this._checkLevelUp();

	// オプション
	this.option_manager.run();
};

// レベルアップ判定
Character.prototype._checkLevelUp = function () {
	var before_level = this.level;
	var after_level = this._calcLevelUp();

	if(after_level > before_level) {
		this.level = after_level;
		this._actionLevelUp();
	}
};

// 現在のレベルをpower から計算
Character.prototype._calcLevelUp = function () {
	var power = this.power;
	if(8 > power) {
		return 0;
	}
	else if(32 > power) {
		return 1;
	}
	else if(64 > power) {
		return 2;
	}
	else if(96 > power) {
		return 3;
	}
	else {
		return 4;
	}
};

// レベルアップした時の処理
Character.prototype._actionLevelUp = function () {
	this.game.playSound('powerup');

	switch (this.level) {

		case 1:
			// 3way 弾になる
			break;
		case 2:
			// オプションが2つに
			this.option_manager.create(this, 20, 0);
			this.option_manager.create(this, -20, 0);
			break;
		case 3:
			// オプションが4つに
			this.option_manager.removeAll();
			this.option_manager.create(this, 20, -10);
			this.option_manager.create(this, -20, -10);
			this.option_manager.create(this, 30, 0);
			this.option_manager.create(this, -30, 0);
			break;
		case 4:
			// オプションの弾を撃つ感覚が速くなる
			break;
	}
};

// パワーを加算
Character.prototype.addPower = function(power){
	this.power += power;
};
// 自機を描画
Character.prototype.updateDisplay = function(){
	var ctx = this.game.surface;
	ctx.save();
	// 無敵 or ボム使用中状態ならばキャラを半透明に
	if (this.is_unhittable || this.is_using_bomb) {
		this.game.surface.globalAlpha = 0.4;
	}

	// 描画
	BaseObject.prototype.updateDisplay.apply(this, arguments);

	// 低速移動中はアタリ判定表示
	if (this.is_slow) {
		this._showHitArea();
	}
	ctx.restore();

	// ボム使用中ならスペカカットインを表示
	if(this.is_using_bomb) {
		this.spell.updateDisplay();
	}

	// オプションの描画
	this.option_manager.updateDisplay();

};

// アタリ判定表示
Character.prototype._showHitArea = function(){
	var SCALE = 0.5;
	var sprite_width  = 20;
	var sprite_height = 20;
	var width  = sprite_width  * SCALE;
	var height = sprite_height * SCALE;
	var sprite_x = 0;
	var sprite_y = 0;

	var ctx = this.game.surface;

	var image = this.game.getImage('shot');

	// オブジェクトの位置を指定
	ctx.translate(this.x, this.y);

	ctx.drawImage(image,
		// スプライトの取得位置
		sprite_width  * sprite_x, sprite_height * sprite_y,
		// スプライトのサイズ
		sprite_width, sprite_height,
		// x, yがオブジェクトの真ん中を指定しているので、左上をx, yの始点に変更
		-width/2 + 1, -height/2, // 何故か 1px ズレるので、右に1px補正
		// オブジェクトのゲーム上のサイズ
		width, height
	);
};


// 衝突判定
Character.prototype.checkCollision = function(obj) {
	// 無敵中 or ボム使用中なら敵or 敵弾 or ボスに衝突しても無視
	if(obj instanceof Bullet || obj instanceof Enemy || obj instanceof BossBase) {
		if(this.is_unhittable || this.is_using_bomb) return false;
	}

	return BaseObject.prototype.checkCollision.apply(this, arguments);
};

// 自機を死亡
Character.prototype.die = function() {
	// 自機の初期位置に戻す
	this.setInitPosition();

	// 自機を減らす
	this.life--;

	// 初期ボム数を初期値に
	if(this.bombs < INIT_BOMB) {
		this.bombs = INIT_BOMB;
	}

	// 無敵状態にする
	this.setAutoDisableFlag("is_unhittable", UNHITTABLE_COUNT);

	// 死亡後、しばらくは初期位置から移動できない
	this.setAutoDisableFlag("is_unable_move", UNABLE_MOVE_COUNT);

	// 画面上の弾を全部消す
	this.stage.bullet_manager.removeAll();
};

// 衝突した時
Character.prototype.notifyCollision = function(obj) {
	// 敵もしくは敵弾もしくはボスにぶつかったら
	if(obj instanceof Bullet || obj instanceof Enemy || obj instanceof BossBase) {
		// 死亡音再生
		this.game.playSound('dead');

		// 自機死亡エフェクト生成
		var size = 108;
		this.stage.effect_manager.create(this.x, this.y, size);

		// 自機を死亡
		this.die();

		// 残機がなくなればゲームオーバー画面表示
		if(this.life === 0) {
			this.stage.notifyCharacterDead();
		}
	}
};

// ボムの使用
Character.prototype.useBomb = function() {
	if(this.bombs <= 0) {
		return;
	}

	if(this.is_using_bomb) {
		return;
	}

	// ボム所持数を減らす
	this.bombs--;

	// ボム使用中フラグを立てる
	this.setAutoDisableFlag("is_using_bomb", BOMB_COUNT);

	// ザコ敵を vanish する
	this.stage.enemy_manager.notifyUseBomb();

	// 敵の弾を vanish する
	this.stage.bullet_manager.notifyUseBomb();

	// アイテムを自機に吸引させる
	this.stage.item_manager.notifyUseBomb();


	// ボムを生成
	this.spell.init();
};

// グレイズしたことを通知
Character.prototype.notifyGraze = function(obj) {
	if(!(obj instanceof Bullet)) return; // 弾のみグレイズするとスコア加算する

	if(obj.is_graze) return; // 既にグレイズ済の弾は判定しない

	this.game.playSound('graze');

	this.stage.score += 100;
};





// 当たり判定サイズ
Character.prototype.collisionWidth  = function() { return 1; };
Character.prototype.collisionHeight = function() { return 3; };

// グレイズ判定サイズ
Character.prototype.grazeHeight  = function() { return 48; };
Character.prototype.grazeWidth = function() { return 48; };

// スプライトの開始位置
Character.prototype.spriteX = function() { return this.indexX; };
Character.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Character.prototype.spriteImage = function() { return 'character_renko'; };

// スプライトのサイズ
Character.prototype.spriteWidth  = function() { return 48; };
Character.prototype.spriteHeight = function() { return 48; };




module.exports = Character;
