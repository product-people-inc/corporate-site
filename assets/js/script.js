document.addEventListener('DOMContentLoaded', function() {
    // ニュース関連の機能
    const newsList = document.querySelector('.news-list');
    const moreButton = document.querySelector('.news-more-button');
    if (newsList && moreButton) {
        const newsItems = newsList.querySelectorAll('li');
        const itemsPerPage = 10;
        let currentlyShown = itemsPerPage;

        // 初期表示は10件まで
        newsItems.forEach((item, index) => {
            if (index >= itemsPerPage) {
                item.classList.add('hidden');
            }
        });

        // もし総件数が10件以下の場合はボタンを非表示
        if (newsItems.length <= itemsPerPage) {
            moreButton.style.display = 'none';
        }

        moreButton.addEventListener('click', function() {
            // 次の10件を表示
            for (let i = currentlyShown; i < currentlyShown + itemsPerPage && i < newsItems.length; i++) {
                const item = newsItems[i];
                item.style.display = '';
                requestAnimationFrame(() => {
                    item.classList.remove('hidden');
                });
            }
            
            currentlyShown += itemsPerPage;

            // すべての項目を表示したらボタンを非表示
            if (currentlyShown >= newsItems.length) {
                moreButton.style.display = 'none';
            }
        });
    }

    // ハンバーガーメニュー関連の機能
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    if (hamburger && nav) {
        // ハンバーガーメニューのクリックイベント
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation(); // イベントの伝播を停止
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // ナビゲーションリンクのクリックイベント
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const headerHeight = document.querySelector('.site-header').offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
                
                // モバイルメニューを閉じる
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            });
        });

        // 画面外クリックでメニューを閉じる
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            }
        });

        // モバイルメニュー内のクリックがメニューを閉じないようにする
        nav.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});