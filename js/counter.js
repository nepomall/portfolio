/* ==============================================
   counter.js — 숫자 카운트업 애니메이션
   ============================================== */
function initCounter() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;

  const DURATION = 1200; // 애니메이션 총 시간 (ms)
  const STEP     = 16;   // setInterval 간격. 약 60fps에 해당한다.

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el     = entry.target;
      const target = parseInt(el.dataset.count, 10);
      if (isNaN(target)) return;

      // 매 프레임마다 더할 값: 목표 숫자 / 총 프레임 수
      const increment = target / (DURATION / STEP);
      let   current   = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current);
      }, STEP);

      // 뷰포트에 다시 들어와도 재실행되지 않도록 관찰을 해제한다.
      observer.unobserve(el);
    });
  }, { threshold: 0.5 }); // 요소가 50% 이상 보일 때 시작

  els.forEach(el => observer.observe(el));
}
