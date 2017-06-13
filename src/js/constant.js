'use strict';

var Constant = {
	LOADING_SCENE:   0,
	TITLE_SCENE:     1,
	CONFIG_SCENE:    2,
	PROLOGUE2_SCENE: 3,
	STAGE_SCENE:     4,
	EPILOGUE_A_SCENE: 5,
	EPILOGUE_B_SCENE: 6,
	EPILOGUE_C_SCENE: 7,
	STAFFROLL_SCENE:  8,
	END_SCENE:        9,

	BUTTON_LEFT:  0x01,
	BUTTON_UP:    0x02,
	BUTTON_RIGHT: 0x04,
	BUTTON_DOWN:  0x08,
	BUTTON_Z:     0x10,
	BUTTON_X:     0x20,
	BUTTON_SHIFT: 0x40,
	BUTTON_SPACE: 0x80,

	START_STATE:  0,
	WAY_STATE:    1,
	TALK1_STATE:  2,
	BOSS_STATE:   3,
	TALK2_STATE:  4,
	CLEAR_STATE:  5,
	GAMEOVER_STATE: 6,
	PAUSE_STATE: 7,

	SPELLCARD_START_STATE:    0,
	SPELLCARD_BOSSMOVE_STATE: 1,
	SPELLCARD_EXEC_STATE:     2,
	SPELLCARD_END_STATE:      3,

	SHOT_NORMAL_TYPE: 0,
	SHOT_BOMB_TYPE:   1,
	SHOT_OPTION_TYPE: 2,

	BULLET_BALL_BLUE:      10,
	BULLET_BALL_LIMEGREEN: 11,

	BULLET_TINY_RED:       22,
	BULLET_TINY_LIMEGREEN: 23,
	BULLET_TINY_BLUE:      24,
	BULLET_TINY_YELLOW:    25,
	BULLET_TINY_AQUA:      26,
	BULLET_TINY_ORANGE:    27,
	BULLET_TINY_PURPLE:    28,
	BULLET_TINY_GRAY:      29,

	BULLET_DOUBLEBALL_RED: 38,
	BULLET_DOUBLEBALL_PURPLE: 39,

	BULLET_BIG_ORANGE:     49,
	BULLET_BIG_LIMEGREEN:  40,
	BULLET_BIG_PURPLE:     41,

	BULLET_KUNAI_RED:      52,
	BULLET_KUNAI_PURPLE:   53,
	BULLET_KUNAI_LIMEGREEN:54,

	BULLET_BEAM_YELLOW:    64,

	BULLET_BUTTERFLY_ORANGE:    75,
	BULLET_BUTTERFLY_PURPLE:    76,
	BULLET_BUTTERFLY_YELLOW:    77,
	BULLET_BUTTERFLY_BLUE:      78,
	BULLET_BUTTERFLY_LIMEGREEN: 79,
	BULLET_BUTTERFLY_RED:       70,
	BULLET_BUTTERFLY_AQUA:      71,

	ITEM_POWER_TYPE: 0,
	ITEM_SCORE_TYPE:  1,

	ENEMY_PURPLE_NEUTRAL_TYPE: 1,
	ENEMY_RED_NEUTRAL_TYPE:    2,
	ENEMY_BLUE_NEUTRAL_TYPE:   3,
	ENEMY_GREEN_NEUTRAL_TYPE:  4,
};

// デフォルトのキーコンフィグ
Constant.DEFAULT_KEYCONFIG = {
	0: Constant.BUTTON_Z,
	1: Constant.BUTTON_X,
	4: Constant.BUTTON_SHIFT,
	6: Constant.BUTTON_SPACE,
};

module.exports = Constant;
