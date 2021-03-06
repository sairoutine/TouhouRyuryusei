'use strict';

var Factory = require("./factory");

var Manager = function(Class, stage) {
	// StageScene インスタンス
	this.stage = stage;

	// オブジェクト生成クラス
	this.factory = new Factory(Class, stage);

	// 画面上のオブジェクト一覧
	this.objects = {};

	// フレーム数
	this.frame_count = 0;
};

// 初期化
Manager.prototype.init = function() {
	// 画面上のオブジェクト一覧
	this.objects = {};

	// フレーム数
	this.frame_count = 0;
};

// オブジェクト生成
Manager.prototype.create = function() {
	var obj = this.factory.get.apply(this.factory, arguments);

	this.objects[obj.id] = obj;

	return obj;
};

// オブジェクト削除
Manager.prototype.remove = function(id) {
	this.factory.free(this.objects[id]);

	delete this.objects[id];
};

// フレーム処理
Manager.prototype.run = function(){
	this.frame_count++;

	// オブジェクト一覧
	for(var id in this.objects) {
		this.objects[id].run();
	}

	// 画面外に出たオブジェクトを削除
	this.removeOutOfStageObjects();
};

// オブジェクトを全て消去する
Manager.prototype.removeAll = function() {
	for(var id in this.objects) {
		this.remove(id);
	}
};

// 画面外に出たオブジェクトを消去する
Manager.prototype.removeOutOfStageObjects = function() {
	// オブジェクトが画面外に出たかどうか判定
	for(var id in this.objects) {
		if(this.objects[id].isOutOfStage()) {
			this.remove(id);
		}
	}
};

// 画面更新
Manager.prototype.updateDisplay = function(){
	// オブジェクト一覧
	for(var id in this.objects) {
		this.objects[id].updateDisplay();
	}

};

// Object と Manager の衝突判定
Manager.prototype.checkCollisionWithObject = function(obj1) {
	// 衝突判定
	for(var id in this.objects) {
		var obj2 = this.objects[id];
		if(obj1.checkCollision(obj2)) {
			obj1.notifyCollision(obj2);
			obj2.notifyCollision(obj1);
		}
	}
};

// Manager と Manager の衝突判定
Manager.prototype.checkCollisionWithManager = function(manager) {
	// 衝突判定
	OUT: for(var obj1_id in this.objects) {
		for(var obj2_id in manager.objects) {
			if(this.objects[obj1_id].checkCollision(manager.objects[obj2_id])) {
				var obj1 = this.objects[obj1_id];
				var obj2 = manager.objects[obj2_id];

				// 衝突を通知
				obj1.notifyCollision(obj2);
				obj2.notifyCollision(obj1);
				break OUT;
			}
		}
	}
};

// ボムの使用を通知
Manager.prototype.notifyUseBomb = function() {
	for(var id in this.objects) {
		this.objects[id].notifyUseBomb();
	}
};

// Object と Manager のグレイズ判定
Manager.prototype.checkGrazeWithObject = function(obj1) {
	// 衝突判定
	for(var id in this.objects) {
		var obj2 = this.objects[id];
		if(obj1.checkGraze(obj2)) {
			obj1.notifyGraze(obj2);
			obj2.notifyGraze(obj1);
			break;
		}
	}
};






module.exports = Manager;
