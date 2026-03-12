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


// --- Scrollytelling gallery (native page scroll) ---
(function () {
    const slides  = document.querySelectorAll('.story-slide');
    const dots    = document.querySelectorAll('.story-dot');
    const dotsNav = document.getElementById('storyDots');
    if (!slides.length || !dotsNav) return;

    // Track how many slides are currently intersecting
    let visibleCount = 0;

    function setActiveDot(index) {
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    // Observe slides against the viewport (root: null)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const slide = entry.target;
            if (entry.isIntersecting) {
                slide.classList.add('is-visible');
                setActiveDot(Number(slide.dataset.index));
                visibleCount++;
            } else {
                slide.classList.remove('is-visible');
                visibleCount = Math.max(0, visibleCount - 1);
            }
        });
        // Show dots only while at least one slide is on screen
        dotsNav.style.opacity = visibleCount > 0 ? '1' : '0';
        dotsNav.style.pointerEvents = visibleCount > 0 ? 'none' : 'none'; // gaps still pass-through
    }, {
        root: null,        // viewport
        threshold: 0.5     // fire when half the slide is visible
    });

    slides.forEach(s => observer.observe(s));

    // Dot click → smooth-scroll the target slide into view
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const target = document.getElementById(`slide-${dot.dataset.slide}`);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
})();
