'use strict';

/* ステージ4ボス 八雲紫 */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../../util');

var Spell1 = require('../../spell/stage4/spell1');
var Spell2 = require('../../spell/stage4/spell2');
var Spell3 = require('../../spell/stage4/spell3');

// constructor
var Yukari = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	this.setSpells([
		new Spell1(this),
		new Spell2(this),
		new Spell3(this),
	]);
};

// 基底クラスを継承
Util.inherit(Yukari, BaseObject);


// スプライトの開始位置
Yukari.prototype.spriteX = function() { return this.indexX; };
Yukari.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Yukari.prototype.spriteImage = function() { return 'boss_yukari'; };

// スプライトのサイズ
Yukari.prototype.spriteWidth  = function() { return 128; };
Yukari.prototype.spriteHeight = function() { return 128; };

// BGM
Yukari.prototype.bgm = function() { return 'stage4'; };

Yukari.prototype.MAX_VITAL = function() { return 60 * 75; };
module.exports = Yukari;
