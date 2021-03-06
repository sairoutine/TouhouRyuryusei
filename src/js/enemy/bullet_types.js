'use strict';

var Constant = require('../constant');

var BulletTypes = [];
// 2: stage1 道中雑魚：青い円形弾
BulletTypes[Constant.BULLET_BALL_BLUE] = {
	'image':       'shot',
	'indexX':           2,
	'indexY':           0,
	'width':           20,
	'height':          20,
	'collisionWidth':  12,
	'collisionHeight': 12,
	'is_rotate':       false
};
// 11: 道中雑魚：緑円形弾
BulletTypes[Constant.BULLET_BALL_LIMEGREEN] = {
	'image':       'shot',
	'indexX':           1,
	'indexY':           0,
	'width':           20,
	'height':          20,
	'collisionWidth':  12,
	'collisionHeight': 12,
	'is_rotate':       false
};
// 0;文：黄色い弾
BulletTypes[Constant.BULLET_TINY_YELLOW] = {
	'image':       'shot',
	'indexX':           3,
	'indexY':           1,
	'width':           14,
	'height':          20,
	'collisionWidth':  8,
	'collisionHeight': 8,
	'is_rotate':       true
};
// 1:文：赤い弾
BulletTypes[Constant.BULLET_TINY_RED] = {
	'image':       'shot',
	'indexX':           0,
	'indexY':           1,
	'width':           14,
	'height':          20,
	'collisionWidth':  8,
	'collisionHeight': 8,
	'is_rotate':       true
};
// 3: 文：オレンジっぽい弾
BulletTypes[Constant.BULLET_TINY_ORANGE] = {
	'image':       'shot',
	'indexX':           7,
	'indexY':           1,
	'width':           14,
	'height':          20,
	'collisionWidth':  8,
	'collisionHeight': 8,
	'is_rotate':       true
};
// 8; 米びつ黄緑弾
BulletTypes[Constant.BULLET_TINY_LIMEGREEN] = {
	'image':       'shot',
	'indexX':           1,
	'indexY':           1,
	'width':           14,
	'height':          20,
	'collisionWidth':  8,
	'collisionHeight': 8,
	'is_rotate':       true
};
// 9: 米びつ青弾
BulletTypes[Constant.BULLET_TINY_BLUE] = {
	'image':       'shot',
	'indexX':           2,
	'indexY':           1,
	'width':           14,
	'height':          20,
	'collisionWidth':  8,
	'collisionHeight': 8,
	'is_rotate':       true
};

BulletTypes[Constant.BULLET_TINY_AQUA] = {
	'image':       'shot',
	'indexX':           5,
	'indexY':           1,
	'width':           14,
	'height':          20,
	'collisionWidth':  8,
	'collisionHeight': 8,
	'is_rotate':       true
};
BulletTypes[Constant.BULLET_TINY_PURPLE] = {
	'image':       'shot',
	'indexX':           4,
	'indexY':           1,
	'width':           14,
	'height':          20,
	'collisionWidth':  8,
	'collisionHeight': 8,
	'is_rotate':       true
};
BulletTypes[Constant.BULLET_TINY_GRAY] = {
	'image':       'shot',
	'indexX':           6,
	'indexY':           1,
	'width':           14,
	'height':          20,
	'collisionWidth':  8,
	'collisionHeight': 8,
	'is_rotate':       true
};

// 4: 文：赤いにじゅうまる弾
BulletTypes[Constant.BULLET_DOUBLEBALL_RED] = {
	'image':       'shot',
	'indexX':           0,
	'indexY':           4,
	'width':           22,
	'height':          23,
	'collisionWidth':  13,
	'collisionHeight': 13,
	'is_rotate':       false
};
BulletTypes[Constant.BULLET_DOUBLEBALL_PURPLE] = {
	'image':       'shot',
	'indexX':           4,
	'indexY':           4,
	'width':           22,
	'height':          23,
	'collisionWidth':  13,
	'collisionHeight': 13,
	'is_rotate':       false
};
// 5: 文：デカイオレンジ弾
BulletTypes[Constant.BULLET_BIG_ORANGE] = {
	'image':       'shot',
	'indexX':           4,
	'indexY':           1,
	'width':           64,
	'height':          64,
	'collisionWidth':  32,
	'collisionHeight': 32,
	'is_rotate':       false
};

BulletTypes[Constant.BULLET_BIG_PURPLE] = {
	'image':       'shot',
	'indexX':           6,
	'indexY':           1,
	'width':           64,
	'height':          64,
	'collisionWidth':  32,
	'collisionHeight': 32,
	'is_rotate':       false
};
// 10: 緑大玉
BulletTypes[Constant.BULLET_BIG_LIMEGREEN] = {
	'image':       'shot',
	'indexX':           6,
	'indexY':           0,
	'width':           64,
	'height':          64,
	'collisionWidth':  32,
	'collisionHeight': 32,
	'is_rotate':       false
};




// 6: 文：クナイみたいな赤い弾
BulletTypes[Constant.BULLET_KUNAI_RED] = {
	'image':       'shot',
	'indexX':           0,
	'indexY':           7,
	'width':           14,
	'height':          20,
	'collisionWidth':  10,
	'collisionHeight': 10,
	'is_rotate':       true
};

// クナイみたいな紫弾
BulletTypes[Constant.BULLET_KUNAI_PURPLE] = {
	'image':       'shot',
	'indexX':           4,
	'indexY':           7,
	'width':           14,
	'height':          20,
	'collisionWidth':  10,
	'collisionHeight': 10,
	'is_rotate':       true
};
BulletTypes[Constant.BULLET_KUNAI_LIMEGREEN] = {
	'image':       'shot',
	'indexX':           1,
	'indexY':           7,
	'width':           14,
	'height':          20,
	'collisionWidth':  10,
	'collisionHeight': 10,
	'is_rotate':       true
};

// 7: 文：黄色ビーム
BulletTypes[Constant.BULLET_BEAM_YELLOW] = {
	'image':       'beam',
	'indexX':           1,
	'indexY':           0,
	'width':           20,
	'height':          256,
	'collisionWidth':  0,
	'collisionHeight': 0,
	'is_rotate':       true
};

BulletTypes[Constant.BULLET_BUTTERFLY_ORANGE] = {
	'image':       'shot',
	'indexX':           7,
	'indexY':           4,
	'width':           34,
	'height':          32,
	'collisionWidth':  12,
	'collisionHeight': 12,
	'is_rotate':       true
};

BulletTypes[Constant.BULLET_BUTTERFLY_AQUA] = {
	'image':       'shot',
	'indexX':           9,
	'indexY':           4,
	'width':           34,
	'height':          32,
	'collisionWidth':  12,
	'collisionHeight': 12,
	'is_rotate':       true
};

BulletTypes[Constant.BULLET_BUTTERFLY_PURPLE] = {
	'image':       'shot',
	'indexX':          10,
	'indexY':           4,
	'width':           34,
	'height':          32,
	'collisionWidth':  12,
	'collisionHeight': 12,
	'is_rotate':       true
};

BulletTypes[Constant.BULLET_BUTTERFLY_YELLOW] = {
	'image':       'shot',
	'indexX':          11,
	'indexY':           4,
	'width':           34,
	'height':          32,
	'collisionWidth':  12,
	'collisionHeight': 12,
	'is_rotate':       true
};

BulletTypes[Constant.BULLET_BUTTERFLY_BLUE] = {
	'image':       'shot',
	'indexX':          12,
	'indexY':           4,
	'width':           34,
	'height':          32,
	'collisionWidth':  12,
	'collisionHeight': 12,
	'is_rotate':       true
};

BulletTypes[Constant.BULLET_BUTTERFLY_LIMEGREEN] = {
	'image':       'shot',
	'indexX':          13,
	'indexY':           4,
	'width':           34,
	'height':          32,
	'collisionWidth':  12,
	'collisionHeight': 12,
	'is_rotate':       true
};

BulletTypes[Constant.BULLET_BUTTERFLY_RED] = {
	'image':       'shot',
	'indexX':          14,
	'indexY':           4,
	'width':           34,
	'height':          32,
	'collisionWidth':  12,
	'collisionHeight': 12,
	'is_rotate':       true
};

module.exports = BulletTypes;
