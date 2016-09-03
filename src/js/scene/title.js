'use strict';

/* タイトル画面 */

// 基底クラス
var BaseScene = require('./base');

var Util = require('../util');
var Constant = require('../constant');


// 画面切り替え効果時間
var SHOW_TRANSITION_COUNT = 100;


var OpeningScene = function(game) {
	BaseScene.apply(this, arguments);
};

// 基底クラスを継承
Util.inherit(OpeningScene, BaseScene);

// 初期化
OpeningScene.prototype.init = function() {
	BaseScene.prototype.init.apply(this, arguments);

	this.game.playBGM('title');
};

// フレーム処理
OpeningScene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	if(this.game.isKeyPush(Constant.BUTTON_Z)) {
			this.game.playSound('select');
			this.game.notifyOpeningDone();
	}
};

// 画面更新
OpeningScene.prototype.updateDisplay = function(){
	this.game.surface.clearRect( 0, 0, this.game.width, this.game.height ) ;

	this.game.surface.save();

	// 切り替え効果
	if( this.frame_count < SHOW_TRANSITION_COUNT ) {
		this.game.surface.globalAlpha = this.frame_count / SHOW_TRANSITION_COUNT;
	}
	else {
		this.game.surface.globalAlpha = 1.0;
	}

	var title_bg = this.game.getImage('title_bg');

	// 魔理沙背景画像表示
	this.game.surface.drawImage(title_bg,
					0,
					0,
					title_bg.width,
					title_bg.height,
					0,
					0,
					this.game.width,
					this.game.height);

	this.game.surface.font = "24px 'Comic Sans MS'" ;
	this.game.surface.textAlign = 'center' ;
	this.game.surface.textBaseAlign = 'middle' ;
	this.game.surface.fillStyle = 'rgb( 0, 0, 0 )' ;
	//this.game.surface.fillText( 'Touhou Project', 120, 200 ) ;
	//this.game.surface.fillText( 'on Javascript',  120, 250 ) ;
	//
	if (Math.floor(this.frame_count / 50) % 2 === 0) {
		this.game.surface.fillText('Press Z to Start',450, 350 ) ;
	}

	this.game.surface.restore();

};

module.exports = OpeningScene;
