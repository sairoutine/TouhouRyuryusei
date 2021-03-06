'use strict';

/* 敵弾オブジェクト */

// 基底クラス
var VectorBaseObject = require('./vector_base');
var Util = require('../util');
var Constant = require('../constant');

// 弾の種類
var bullet_types = require("../enemy/bullet_types");



var Bullet = function(scene) {
	VectorBaseObject.apply(this, arguments);
};

Util.inherit(Bullet, VectorBaseObject);

Bullet.prototype.init = function(type_id, x, y, vector) {
	// VectorBaseObject.init より先に設定しないと aim が効かない
	this.x = x;
	this.y = y;

	var type = bullet_types[type_id];

	// vector はスカラー or 配列を受け取ることができる
	if(vector instanceof Array) {
		for(var i=0, len=vector.length; i<len; i++) {
			vector[i].is_rotate = type.is_rotate;
		}
	}
	else {
		// 配列でなければ配列化してあげる
		vector = [
			{
				count: 0,
				vector: vector,
				is_rotate: type.is_rotate,
			}
		];
	}

	VectorBaseObject.prototype.init.apply(this, [vector]);

	// 画像の種類
	this.image            = type.image;
	// スプライト開始位置
	this.indexX           = type.indexX;
	this.indexY           = type.indexY;
	// スプライトサイズ
	this.width            = type.width;
	this.height           = type.height;
	// 当たり判定サイズ
	this.collision_width  = type.collisionWidth;
	this.collision_height = type.collisionHeight;

	// 自機とグレイズ済かどうか
	this.is_graze = false;
}
;
// 衝突した時
Bullet.prototype.notifyCollision = function(obj) {
	// 自分を消す
	this.stage.bullet_manager.remove(this.id);
};

// グレイズした時
Bullet.prototype.notifyGraze = function(obj) {
	// この弾は既にグレイズ済
	this.is_graze = true;
};

// ボムの使用を通知
Bullet.prototype.notifyUseBomb = function() {
	// 自分を消す
	this.stage.bullet_manager.remove(this.id);

	// スコアの加算
	this.stage.score += 100;

	// ポイントアイテムの生成
	this.stage.item_manager.create(Constant.ITEM_SCORE_TYPE, this.x, this.y);
};

// 当たり判定サイズ
Bullet.prototype.collisionWidth  = function() { return this.collision_width; };
Bullet.prototype.collisionHeight = function() { return this.collision_height; };

// グレイズ判定サイズ
Bullet.prototype.grazeHeight  = function() { return this.width; };
Bullet.prototype.grazeWidth = function() { return this.height; };

// スプライトの開始位置
Bullet.prototype.spriteX = function() { return this.indexX; };
Bullet.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Bullet.prototype.spriteImage = function() { return this.image; };

// スプライトのサイズ
Bullet.prototype.spriteWidth  = function() { return this.width; };
Bullet.prototype.spriteHeight = function() { return this.height; };

module.exports = Bullet;
