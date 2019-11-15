// グローバルに展開
phina.globalize();
// アセット
var ASSETS = {
  // 画像
  image: {
    // 地面
    // 'ground': 'https://rawgit.com/alkn203/tomapiko_void/master/assets/image/ground.png',
    // 'tipset': './img/gr01.png',
    'underground' : './img/bg01.png',
    'ground': './img/bg02.png',
    'sky': './img/bg03.png',
    'cloud': './img/bg04.png',
    'btnU' : './img/btn_up.png',
    'btnD' : './img/btn_down.png',
    'btnL' : './img/btn_left.png',
    'btnR' : './img/btn_right.png',
    'btnC' : './img/btn_n.png',
    'charset' : './img/charA.png',
  },
  spritesheet: {
    'char01': "./spritesheet/charA.json",
  }
};
// 定数
var SCREEN_WIDTH   = 640; // 画面横サイズ
// var SCREEN_WIDTH   = 1200; // 画面横サイズ
var SCREEN_HEIGHT  = 960; // 画面縦サイズ

var charX = 64 * 4;
var charDir = 'N';
/*
 * メインシーン
 */
phina.define("MainScene", {
  // 継承
  superClass: 'DisplayScene',
  charap: null,
  // コンストラクタ
  init: function() {
    // 親クラス初期化
    this.superInit({
      // 画面サイズ指定
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    // 背景色
    // this.backgroundColor = 'skyblue';
    // カスタムGrid
    var grid = Grid(SCREEN_WIDTH, 10);
    // thisを退避
    var self = this;
    // 空配置
    (10).times(function(x) {
      (9).times(function(y) {
        Sky().addChildTo(self).setPosition(grid.span(x), grid.span(y));
      });
    });
    // 地面配置
    (10).times(function(x) {
      Ground().addChildTo(self).setPosition(grid.span(x), grid.span(9));
    });

    // 地中配置
    (10).times(function(x) {
      (5).times(function(y) {
        UnderGround().addChildTo(self).setPosition(grid.span(x), grid.span(10+y));
      });
    });
    // 雲配置
    Cloud().addChildTo(self).setPosition(grid.span(6), grid.span(2));
    Cloud().addChildTo(self).setPosition(grid.span(8), grid.span(5));

    // ボタン配置
    BtnU().addChildTo(self).setPosition(grid.span(2), grid.span(10));
    BtnD().addChildTo(self).setPosition(grid.span(2), grid.span(12));
    BtnL().addChildTo(self).setPosition(grid.span(1), grid.span(11));
    BtnR().addChildTo(self).setPosition(grid.span(3), grid.span(11));
    BtnC().addChildTo(self).setPosition(grid.span(2), grid.span(11));

    // キャラ配置
    charap = Charap(this);

  },
  update : function() {
    charap.goma();
  }
});

/*
 * 地面クラス
 */
phina.define("Ground", {
  // 継承
  superClass: 'Sprite',
  // コンストラクタ
  init: function() {
    // 親クラス初期化
    this.superInit('ground', 64, 64);
    // 原点を左上に
    this.origin.set(0, 0);
  },
});

/*
 * 地中クラス
 */
phina.define("UnderGround", {
  // 継承
  superClass: 'Sprite',
  // コンストラクタ
  init: function() {
    // 親クラス初期化
    this.superInit('underground', 64, 64);
    // 原点を左上に
    this.origin.set(0, 0);
  },
});

// 空クラス
phina.define("Sky", {
  // 継承
  superClass: 'Sprite',
  // コンストラクタ
  init: function() {
    // 親クラス初期化
    this.superInit('sky', 64, 64);
    // 原点を左上に
    this.origin.set(0, 0);
  },
});

// 雲クラス
phina.define("Cloud", {
  // 継承
  superClass: 'Sprite',
  // コンストラクタ
  init: function() {
    // 親クラス初期化
    this.superInit('cloud', 64, 64);
    // 原点を左上に
    this.origin.set(0, 0);
  },
});

/////////////////////////////
// ボタン
phina.define("BtnU", {
  superClass: 'Sprite',
  init: function() {
    this.superInit('btnU', 64, 64);
    // 原点を左上に
    this.origin.set(0, 0);
  },
});
phina.define("BtnD", {
  superClass: 'Sprite',
  init: function() {
    this.superInit('btnD', 64, 64);
    // 原点を左上に
    this.origin.set(0, 0);
  },
});
phina.define("BtnL", {
  superClass: 'Sprite',
  init: function() {
    this.superInit('btnL', 64, 64);
    // 原点を左上に
    this.origin.set(0, 0);

    this.setInteractive(true);
    this.onpointstart = function() {
      charDir = 'L';
    };
    this.onpointend = function() {
      charDir = 'N';
    };
  },
});
phina.define("BtnR", {
  superClass: 'Sprite',
  init: function() {
    this.superInit('btnR', 64, 64);
    // 原点を左上に
    this.origin.set(0, 0);

    this.setInteractive(true);
    this.onpointstart = function() {
      charDir = 'R';
    };
    this.onpointend = function() {
      charDir = 'N';
    };
  },
});
phina.define("BtnC", {
  superClass: 'Sprite',
  init: function() {
    this.superInit('btnC', 64, 64);
    // 原点を左上に
    this.origin.set(0, 0);
  },
});

// キャラクタクラスを定義
phina.define("Charap", {
  superClass: 'Sprite',
  anim: null,
  derection: 'R',
  // コンストラクタ
  init: function(parentVal) {
    this.superInit('charset', 64, 64);
    this.addChildTo(parentVal);
    anim = FrameAnimation('char01').attachTo(this);
    anim.gotoAndPlay('walkR');
    this.x = charX;
    this.y = parentVal.gridY.span(9);
  },
  goma : function() {
    if(charDir == 'R') {
      this.gomaR();
    }
    if(charDir == 'L') {
      this.gomaL();
    }
  },
  gomaL: function() {
    if(this.derection != 'L') {
      anim.gotoAndPlay('walkL');
      this.derection = 'L';
    }
    this.x--;
  },
  gomaR: function() {
    if(this.derection != 'R') {
      anim.gotoAndPlay('walkR');
      this.derection = 'R';
    }
    this.x++;
  },
});


//============================================
// マネージャーシーン
//============================================
phina.define('MyManagerScene' , {
  superClass: 'ManagerScene' ,
  init: function() {
    this.superInit({
      scenes: [
        {
          label: 'main',
          className: 'MainScene'
        }
      ]
    });
  }
});


/*
 * メイン処理
 */
phina.main(function() {
  // アプリケーションを生成
  var app = GameApp({
    // メインシーンから開始
    startLabel: 'main',
    // 画面サイズ指定
    width: SCREEN_WIDTH,
    // height: SCREEN_HEIGHT,
    // アセット読み込み
    assets: ASSETS,
  });
  // app.replaceScene(MyManagerScene());
  // 実行
  app.run();
});

