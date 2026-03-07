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

    // --- 3. Methods 网格 hover 展开图片（来自 /img） ---
    const methodsWrap = document.getElementById('methods-hover-img-wrap');
    const methodsImg = document.getElementById('methods-hover-img');
    const methodBoxes = document.querySelectorAll('.method-box[data-method-img]');
    if (methodsWrap && methodsImg && methodBoxes.length) {
        methodBoxes.forEach(box => {
            box.addEventListener('mouseenter', () => {
                const src = box.getAttribute('data-method-img') || '';
                if (src) {
                    methodsImg.src = src;
                    methodsImg.alt = box.querySelector('h3')?.textContent || 'Method';
                    methodsWrap.classList.add('visible');
                    methodsWrap.setAttribute('aria-hidden', 'false');
                }
            });
            box.addEventListener('mouseleave', () => {
                methodsWrap.classList.remove('visible');
                methodsWrap.setAttribute('aria-hidden', 'true');
            });
        });
        methodsWrap.addEventListener('mouseleave', () => {
            methodsWrap.classList.remove('visible');
            methodsWrap.setAttribute('aria-hidden', 'true');
        });
    }
});