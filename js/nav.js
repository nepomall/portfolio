/* ==============================================
   nav.js — 내비게이션
   ============================================== */
function initNav() {
  _initBackground();
  _initActiveLink();
  _initSmoothScroll();
}

function _initBackground() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  function update() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }

  Utils.addScrollListener(update);
  update();
}

function _initActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const activeHref = `#${entry.target.id}`;
      links.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === activeHref);
      });
    });
  }, {
    // 뷰포트 상단 40% / 하단 55%를 감지 영역에서 제외한다.
    // 결과적으로 화면 중앙 부근(5% 슬롯)에 들어온 섹션만 활성화된다.
    // 여러 섹션이 동시에 활성화되는 것을 방지하기 위한 설정이다.
    rootMargin: '-40% 0px -55% 0px',
  });

  sections.forEach(sec => observer.observe(sec));
}

function _initSmoothScroll() {
  const nav = document.getElementById('nav');

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      // fixed nav 높이만큼 오프셋을 빼지 않으면 콘텐츠가 nav 뒤에 가려진다.
      const navH = nav ? nav.offsetHeight : 0;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}
