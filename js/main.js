/* ロード画面
-----------------------------------------------------------------*/
$(document).ready(function () {
  // ページの読み込みが完了したら実行
  var minimumDisplayTime = 2000; // 最低表示時間
  var maximumWaitTime = 5000;   // 最大待機時間
  var contentDelay = 500; // ロード画面後、コンテンツ表示までの時間
  var loadingScreen = $('.l-loading'); //ロード画面
  var content = $('.l-content'); //コンテンツ

  // スクロール禁止
  $('html, body').css('overflow', 'hidden');

  // 処理開始時間
  var startTime = new Date().getTime();

  // 最低表示時間経過
  setTimeout(function () {
    var currentTime = new Date().getTime();
    if (currentTime - startTime >= minimumDisplayTime) {
      loadingScreen.fadeOut(function () {
        // ロード画面非表示後、スクロールを許可
        $('html, body').css('overflow', 'auto');
      });
      content.delay(contentDelay).fadeIn();
    }
  }, minimumDisplayTime);

  // 最大待機時間経過時
  setTimeout(function () {
    loadingScreen.fadeOut(function () {
      // ロード画面非表示後、スクロールを許可
      $('html, body').css('overflow', 'auto');
      content.delay(contentDelay).fadeIn();
    });
    content.fadeIn();
  }, maximumWaitTime);
});
/* ハンバーガーメニュー
-----------------------------------------------------------------*/
$(document).ready(function () {
  var header = $('.l-header');
  var headerButton = $('.l-header__button');
  var navContainer = $('.l-header__navContainer');
  var link = $('.l-header__navLink');
  var headerHeight = header.height();

  // 画面幅判定を行う関数
  function checkScreenWidth() {
    if (window.innerWidth >= 768) {
      // 768px以上の場合
      navContainer.show();
    } else {
      // 768px未満の場合
      navContainer.hide();
    }
  }

  // ウィンドウのリサイズ時に画面幅を判別
  $(window).on('resize', function () {
    checkScreenWidth();
  });

  // ページ読み込み時にも画面幅判別を実行
  checkScreenWidth();

  // ボタンクリック時の処理
  headerButton.click(function () {
    navContainer.fadeToggle(300); // フェードイン/フェードアウト実行
  });

  // ウィンドウの初回読み込み時とリサイズ時にヘッダーの高さを再計算
  function updateHeaderHeight() {
    headerHeight = header.height();
  }

  // ウィンドウがリサイズされたときにヘッダーの高さを再計算
  $(window).on('resize', updateHeaderHeight);

  // メニュー内のリンクをクリックしたときの処理
  link.on('click', function (event) {
    //スクロール
    if (this.hash !== '') {
      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top - headerHeight
      }, 800, function () {
        window.location.hash = hash;
      });
    }

    //768px未満の場合、メニューを閉じる
    if (window.innerWidth < 768)
      navContainer.fadeOut(300);
  });
});

/* フェードイン
-----------------------------------------------------------------*/
$(window).on('scroll', function () {
  var windowHeight = $(window).height();
  var scrollPos = $(window).scrollTop();

  $('.c-animFadeInUp').each(function () {
    var offsetTop = $(this).offset().top;

    if (scrollPos > offsetTop - windowHeight + 100) {
      $(this).addClass('c-animFadeInUp--active');
    }
  });
});