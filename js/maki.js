// phina.js をグローバル領域に展開
phina.globalize();

var ASSETS = {
  image: {
    'charset' : './img/sample2.png',
  },
  spritesheet: {
    'char01': {
      'frame': {
        'width': 48,
        'height': 80,
        'cols': 12,
        'rows': 8,
      },
      'animations': {
        'walkR': {
          'frames': [24, 25, 26, 25],
          'next': 'walkR',
          'frequency': 6,
        },
        'walkL': {
          'frames': [12, 13, 14, 13],
          'next': 'walkL',
          'frequency': 6,
        }
      }
    }
  }
};

var cntr = 0;
var die = 0;
var anim;
// MainScene クラスを定義
phina.define('MainScene', {
  superClass: 'CanvasScene',
  init: function() {
    this.superInit();
    // 背景色を指定
    this.backgroundColor = '#444';
    // ラベルを生成
    this.label = Label('Hello, phina.js!').addChildTo(this);
    this.label.x = this.gridX.center(); // x 座標
    this.label.y = this.gridY.center(); // y 座標
    this.label.fill = 'white'; // 塗りつぶし色

    // スプライト画像作成
    var sprite = Sprite('charset', 48, 80).addChildTo(this);
    // スプライトにフレームアニメーションをアタッチ
    anim = FrameAnimation('char01').attachTo(sprite);
    // アニメーションを指定
    anim.gotoAndPlay('walkR');
    sprite.x = this.gridX.center();
    sprite.y = this.gridY.center(2);
  },
  // 周期的に実施させる処理
  update: function() {
    console.log("update !! = " + cntr++ );
    if((cntr % 100) == 0) {
      if(die == 0) {
        die = 1;
        anim.gotoAndPlay('walkL');
      } else {
        die = 0;
        anim.gotoAndPlay('walkR');
      }
    }
  }
});

// メイン処理
phina.main(function() {
  // アプリケーション生成
  var app = GameApp({
    startLabel: 'main', // メインシーンから開始する
    fps:30,
    // アセット読み込み
    assets: ASSETS,
  });
  // アプリケーション実行
  app.run();
});
