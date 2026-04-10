/* ==============================================
   reveal.js — 스크롤 등장 애니메이션 (양방향)
   ============================================== */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;

      if (entry.isIntersecting) {
        if (Utils.getScrollDir() === 'down') {
          // 아래로 스크롤할 때만 stagger를 적용한다.
          // 위로 스크롤 시 즉시 표시하는 이유:
          // 이미 본 콘텐츠가 다시 올라올 때 재생되면 어색하기 때문이다.
          const siblings = Array.from(el.parentElement.querySelectorAll('.reveal'));
          const idx      = siblings.indexOf(el);
          const colCount = Utils.getGridColCount(el.parentElement);
          // Grid일 때는 같은 행의 열 번호 기준으로 딜레이를 준다.
          // (idx % colCount) 덕분에 2행째 카드가 1행 누적 딜레이를 받지 않는다.
          const delay    = colCount > 1 ? (idx % colCount) * 80 : idx * 80;

          clearTimeout(el._revealTimer);
          el._revealTimer = setTimeout(() => el.classList.add('visible'), delay);
        } else {
          el.classList.add('visible');
        }
      } else {
        clearTimeout(el._revealTimer);
        const { top } = entry.boundingClientRect;
        // scrollDir만으로 판단하면 IO 콜백과 scroll 이벤트 간 타이밍 차이로
        // 방향을 잘못 읽는 경우가 생긴다.
        // top > 0이면 요소가 뷰포트 아래쪽으로 빠진 것이므로 병행 체크한다.
        if (Utils.getScrollDir() === 'up' || top > 0) {
          el.classList.remove('visible');
        }
        // top < 0(위로 지나침)이고 스크롤이 down이면 visible을 유지한다.
        // 한번 지나간 요소를 다시 보여주지 않기 위함이다.
      }
    });
  }, {
    threshold:  0,
    // 요소가 뷰포트 하단 100px 안쪽에 들어올 때 트리거한다.
    // 즉 완전히 노출되기 100px 전부터 애니메이션을 시작해 자연스럽게 보인다.
    rootMargin: '0px 0px -100px 0px',
  });

  els.forEach(el => observer.observe(el));
}
