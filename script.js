document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. 卡片移动点亮特效 ---
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });

    // --- 2. 响应式移动端导航栏控制 ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinksContainer = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // 点击汉堡按钮，展开/收起菜单
    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });

        // 用户点击某一个链接后，自动收起菜单
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinksContainer.classList.remove('active');
            });
        });
    }
});


// Simple slideshow logic. Update filenames/captions as needed.
(function(){
    const images = [
        'assets/data upload.png',
        'assets/dashboard.png',
        'assets/risk table.png',
        'assets/plots.png',
        'assets/graph.png',
    ];
    const captions = [
        'Data Upload',
        'Dashboard Overview',
        'Prediction Table',
        'Charts',
        'Graph Visualization',
    ];

    // If your asset filenames differ, replace strings above with actual filenames.
    let idx = 0;
    const imgEl = document.getElementById('slideImg');
    const capEl = document.getElementById('slideCaption');
    const prevBtn = document.getElementById('slidePrev');
    const nextBtn = document.getElementById('slideNext');

    function show(i){
        idx = (i + images.length) % images.length;
        imgEl.src = images[idx];
        imgEl.alt = captions[idx];
        capEl.textContent = captions[idx];
    }

    prevBtn.addEventListener('click', () => show(idx - 1));
    nextBtn.addEventListener('click', () => show(idx + 1));

    // keyboard support
    document.addEventListener('keydown', (e)=> {
        if (e.key === 'ArrowLeft') show(idx - 1);
        if (e.key === 'ArrowRight') show(idx + 1);
    });

    // preload images
    images.forEach(src => { const p=new Image(); p.src=src; });

    // initialize
    show(0);
})();
