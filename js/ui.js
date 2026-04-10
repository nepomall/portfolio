/* ==============================================
   ui.js — UI 인터랙션
   ============================================== */
function initUI() {
  _initHamburger();
  _initWorksAccordion();
  _initCardLinks();
}

function _initHamburger() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

function _initWorksAccordion() {
  const btn   = document.getElementById('worksMoreBtn');
  const extra = document.getElementById('worksExtra');
  if (!btn || !extra) return;

  btn.addEventListener('click', () => {
    const expanded = btn.classList.toggle('expanded');
    btn.setAttribute('aria-expanded', String(expanded));

    const label = btn.querySelector('.btn-label');
    if (label) label.textContent = expanded ? '숨기기' : '더보기';

    // CSS 클래스만으로는 실제 콘텐츠 높이를 알 수 없다.
    // scrollHeight로 현재 콘텐츠의 실제 높이를 읽어 max-height에 적용해야
    // 열릴 때 자연스러운 속도로 아코디언이 동작한다.
    extra.style.maxHeight = expanded ? `${extra.scrollHeight}px` : '0px';

    // 닫힐 때 카드의 visible 상태를 초기화한다.
    // 아코디언을 다시 열었을 때 스크롤 진입 애니메이션이 재생되도록 하기 위함이다.
    // 트랜지션(650ms)이 끝난 후 제거해야 닫히는 도중에 카드가 사라지는 것을 방지한다.
    if (!expanded) {
      setTimeout(() => {
        extra.querySelectorAll('.reveal').forEach(card => card.classList.remove('visible'));
      }, 650);
    }
  });
}

function _initCardLinks() {
  document.querySelectorAll('.work-card[data-href]').forEach(card => {
    card.addEventListener('click', () => {
      // noopener: 새 탭에서 window.opener로 부모 페이지에 접근하는 것을 차단한다.
      // noreferrer: HTTP Referer 헤더를 전송하지 않는다.
      window.open(card.dataset.href, '_blank', 'noopener,noreferrer');
    });
  });
}
