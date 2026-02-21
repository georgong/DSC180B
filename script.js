document.addEventListener("DOMContentLoaded", () => {
    // 选中所有的特效卡片
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("mousemove", e => {
            // 获取卡片的位置和尺寸信息
            const rect = card.getBoundingClientRect();
            
            // 计算鼠标在卡片内部的相对坐标
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // 将坐标传入 CSS 变量
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });
});