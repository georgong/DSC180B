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


// --- Scrollytelling gallery ---
(function () {
    const gallery = document.getElementById('storyGallery');
    if (!gallery) return;

    const slides = gallery.querySelectorAll('.story-slide');
    const dots   = gallery.querySelectorAll('.story-dot');

    // Activate a dot
    function setActiveDot(index) {
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    // IntersectionObserver: mark slide visible when ≥ 55% in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const slide = entry.target;
            if (entry.isIntersecting) {
                slide.classList.add('is-visible');
                setActiveDot(Number(slide.dataset.index));
            } else {
                slide.classList.remove('is-visible');
            }
        });
    }, { root: gallery, threshold: 0.55 });

    slides.forEach(s => observer.observe(s));

    // Dot click → scroll that slide into view
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const target = gallery.querySelector(`.story-slide[data-index="${dot.dataset.slide}"]`);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        });
    });
})();
