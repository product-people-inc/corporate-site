document.addEventListener('DOMContentLoaded', function() {
    const newsList = document.querySelector('.news-list');
    const moreButton = document.querySelector('.news-more-button');
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

    moreButton.onclick = function() {
        // 次の10件を表示
        for (let i = currentlyShown; i < currentlyShown + itemsPerPage && i < newsItems.length; i++) {
            const item = newsItems[i];
            // まずdisplay: noneを解除
            item.style.display = '';
            // 次のフレームでアニメーション用のクラスを削除
            requestAnimationFrame(() => {
                item.classList.remove('hidden');
            });
        }
        
        currentlyShown += itemsPerPage;

        // すべての項目を表示したらボタンを非表示
        if (currentlyShown >= newsItems.length) {
            moreButton.style.display = 'none';
        }
    };
});