// phina.js をグローバル領域に展開
phina.globalize();

// MainScene クラスを定義
phina.define('MainScene', {
  superClass: 'CanvasScene',
  // 初期化処理
  init: function() {
    this.superInit();
    // 背景色を指定
    this.backgroundColor = '#F0F0F0';
    // ラベルを生成
    this.label = Label('Hello, phina.js!!!').addChildTo(this);
    this.label.x = this.gridX.center(); // x 座標
    this.label.y = this.gridY.center(); // y 座標
    this.label.fill = 'blue'; // 塗りつぶし色

    (99).times(function(cnt) {
      console.log("GOMA=" + cnt);
    });
  },

  // 周期的に実施させる処理
  update: function() {
    console.log("update !!");
  }
});

// メイン処理
phina.main(function() {
  // アプリケーション生成
  var app = GameApp({
    startLabel: 'main', // メインシーンから開始する
    fps:30,
  });
  // アプリケーション実行
  app.run();
});
