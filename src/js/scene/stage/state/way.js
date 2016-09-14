'use strict';

var BaseScene = require('./base');
var Util = require('../../../util');
var Config = require('../../../config');

var EnemyAppear = require('../../../logic/enemy_appear');
var stage1_appear = require('../../../enemy/stage1');

var State = function(stage) {
	BaseScene.apply(this, arguments);

	// 雑魚敵の出現
	this.enemy_appear = new EnemyAppear(stage1_appear);
};
Util.inherit(State, BaseScene);

// 初期化
State.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);
	this.game.playBGM('douchu');
};

// フレーム処理
State.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	// 今フレームで出現する雑魚一覧を取得
	var params = this.enemy_appear.get(this.frame_count);
};

// 画面更新
State.prototype.updateDisplay = function(){
};

module.exports = State;
