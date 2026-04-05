/* =============================================
   main.js — 포트폴리오 인터랙션
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     1. 스크롤 등장 애니메이션 (양방향)
     ------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal');

  // 스크롤 방향 추적
  let scrollDir = 'down';
  let prevScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    scrollDir = window.scrollY > prevScrollY ? 'down' : 'up';
    prevScrollY = window.scrollY;
  }, { passive: true });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;

      if (entry.isIntersecting) {
        if (scrollDir === 'down') {
          // 아래에서 올라올 때: 열 수 기반 순차 등장
          const siblings = Array.from(el.parentElement.querySelectorAll('.reveal'));
          const idx = siblings.indexOf(el);

          const gridCols = getComputedStyle(el.parentElement).gridTemplateColumns;
          const colCount = (gridCols && gridCols !== 'none')
            ? gridCols.trim().split(/\s+/).length
            : 1;
          const delay = (colCount > 1) ? (idx % colCount) * 80 : idx * 80;

          clearTimeout(el._revealTimer);
          el._revealTimer = setTimeout(() => el.classList.add('visible'), delay);
        } else {
          // 위에서 내려올 때: 즉시 표시 (재애니메이션 없음)
          el.classList.add('visible');
        }
      } else {
        // 뷰포트를 벗어날 때
        clearTimeout(el._revealTimer);
        // 아래쪽으로 벗어남 (요소 top > 0) = 위로 스크롤하며 사라짐
        // scrollDir 타이밍 경쟁조건 대비: boundingClientRect.top 으로도 감지
        const rect = entry.boundingClientRect;
        if (scrollDir === 'up' || rect.top > 0) {
          el.classList.remove('visible');
        }
        // 위로 벗어남 (rect.top < 0) = 아래로 스크롤 중 지나간 요소 → visible 유지
      }
    });
  }, {
    threshold: 0,
    rootMargin: '0px 0px -100px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ------------------------------------------
     2. 숫자 카운트업 애니메이션
     ------------------------------------------ */
  const countEls = document.querySelectorAll('[data-count]');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1200;
        const step = 16;
        const increment = target / (duration / step);
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current);
        }, step);

        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  countEls.forEach(el => countObserver.observe(el));


  /* ------------------------------------------
     3. 햄버거 메뉴 (모바일)
     ------------------------------------------ */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  });

  // 메뉴 링크 클릭 시 닫기
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });


  /* ------------------------------------------
     4. 스크롤 시 내비게이션 배경 변화
     ------------------------------------------ */
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.style.background = 'rgba(0, 0, 0, 0.88)';
    } else {
      nav.style.background = 'rgba(0, 0, 0, 0.72)';
    }
  }, { passive: true });


  /* ------------------------------------------
     5. 부드러운 스크롤 (앵커 이동)
     ------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      const navHeight = document.getElementById('nav').offsetHeight;
      const top = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ------------------------------------------
     6. 작업물 카드 클릭 시 사이트 이동
     ------------------------------------------ */
  document.querySelectorAll('.work-card[data-href]').forEach(card => {
    card.addEventListener('click', () => {
      window.open(card.dataset.href, '_blank', 'noopener,noreferrer');
    });
  });


  /* ------------------------------------------
     7. 스크롤 위치 기반 내비게이션 활성화
     ------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkEls.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${entry.target.id}`
            ? '#fff'
            : 'rgba(255,255,255,0.7)';
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px'
  });

  sections.forEach(sec => sectionObserver.observe(sec));

});
