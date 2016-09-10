'use strict';

/* プロローグ画面2 */

// キャラのサイズ(1/2)
var CHARA_SIZE_RATIO = 0.5;

// 喋ってる方が寄る際のpx
var TALKER_MOVE_PX = 5;


// 基底クラス
var BaseScene = require('./base');

var Util = require('../util');
var Constant = require('../constant');
var Config = require('../config');

var serif = require('../serif/prologue2');

var Serif = require('../logic/serif');

var Scene = function(game) {
	BaseScene.apply(this, arguments);

	this.serif = new Serif(serif);
};

// 基底クラスを継承
Util.inherit(Scene, BaseScene);

// 初期化
Scene.prototype.init = function() {
	BaseScene.prototype.init.apply(this, arguments);
	this.serif.init();

	//TODO: this.game.playBGM('prologue2');
};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	if(this.game.isKeyPush(Constant.BUTTON_Z)) {
		if(this.serif.is_end()) {
			this.game.notifyPrologue2Done();
		}
		else {
			// セリフを送る
			this.serif.next();
		}
	}
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.game.surface.clearRect( 0, 0, this.game.width, this.game.height ) ;

	this.game.surface.save();

	var prologue2_bg = this.game.getImage('prologue2_bg');

	// 背景画像表示
	this.game.surface.drawImage(prologue2_bg,
					0,
					0,
					prologue2_bg.width,
					prologue2_bg.height,
					0,
					0,
					this.game.width,
					this.game.height);
	this.game.surface.restore();

	var x, y;
	if(this.serif.right_image()) {
		this.game.surface.save();

		x = Config.PROLOGUE2_RIGHT_X;
		y = Config.PROLOGUE2_RIGHT_Y;

		if(!this.serif.is_right_talking()) {
			// 喋ってない方のキャラは薄くなる
			this.game.surface.globalAlpha = 0.5;
		}
		else {
			// 喋ってる方のキャラは真ん中に寄る
			x -= TALKER_MOVE_PX;
			y -= TALKER_MOVE_PX;
		}


		var right_image = this.game.getImage(this.serif.right_image());

		this.game.surface.drawImage(right_image,
						x,
						y,
						right_image.width * CHARA_SIZE_RATIO,
						right_image.height * CHARA_SIZE_RATIO);

		this.game.surface.restore();

		// メッセージウィンドウ 名前欄表示
		this.game.surface.save();

		this.game.surface.globalAlpha = 0.5;
		this.game.surface.fillStyle = 'rgb( 0, 0, 0 )';
		this.game.surface.fillRect(440, 420, 100, 40);

		this.game.surface.restore();

		// 名前表示
		this.game.surface.save();

		this.game.surface.font = "24px 'Migu'";
		this.game.surface.textAlign = 'middle';
		this.game.surface.textBaseAlign = 'middle';
		this.game.surface.fillStyle = 'rgb( 255, 255, 255 )';

		if (this.serif.right_name()) {
			this.game.surface.fillText(this.serif.right_name(), 450, 450);
		}

		this.game.surface.restore();


	}

	if(this.serif.left_image()) {
		this.game.surface.save();

		x = Config.PROLOGUE2_LEFT_X;
		y = Config.PROLOGUE2_LEFT_Y;

		// 喋ってない方のキャラは薄くなる
		if(!this.serif.is_left_talking()) {
			this.game.surface.globalAlpha = 0.5;
		}
		else {
			// 喋ってる方のキャラは真ん中に寄る
			x -= TALKER_MOVE_PX;
			y -= TALKER_MOVE_PX;
		}

		var left_image = this.game.getImage(this.serif.left_image());
		this.game.surface.transform(-1, 0, 0, 1, left_image.width * CHARA_SIZE_RATIO, 0); // 左右反転
		this.game.surface.drawImage(left_image,
						x,
						y,
						left_image.width * CHARA_SIZE_RATIO,
						left_image.height * CHARA_SIZE_RATIO);

		this.game.surface.restore();

		// メッセージウィンドウ 名前欄表示
		this.game.surface.save();

		this.game.surface.globalAlpha = 0.5;
		this.game.surface.fillStyle = 'rgb( 0, 0, 0 )';
		this.game.surface.fillRect(100, 420, 100, 40);

		this.game.surface.restore();

		// 名前表示
		this.game.surface.save();

		this.game.surface.font = "24px 'Migu'";
		this.game.surface.textAlign = 'middle';
		this.game.surface.textBaseAlign = 'middle';
		this.game.surface.fillStyle = 'rgb( 255, 255, 255 )';

		if (this.serif.left_name()) {
			this.game.surface.fillText(this.serif.left_name(), 120, 450);
		}

		this.game.surface.restore();
	}










	/*
	// メッセージウィンドウ表示
	this.game.surface.save();

	this.game.surface.globalAlpha = 0.5;
	this.game.surface.fillStyle = 'rgb( 0, 0, 0 )';
	this.game.surface.fillRect(5, 345, 630, 125);

	this.game.surface.restore();
	*/
	// テキスト表示
	this.game.surface.save();

	this.game.surface.font = "24px 'Migu'";
	this.game.surface.textAlign = 'left';
	this.game.surface.textBaseAlign = 'middle';
	this.game.surface.fillStyle = 'rgb( 255, 255, 255 )';

	// セリフ表示
	var lines = this.serif.lines();
	if (lines.length) {
		// セリフテキストの y 座標初期位置
		y = 380;

		for(var i = 0, len = lines.length; i < len; i++) {
			this.game.surface.fillText(lines[i], 15, y); // 1行表示

			y+= 30;
		}
	}

	this.game.surface.restore();

};

module.exports = Scene;
