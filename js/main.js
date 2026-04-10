/* ==============================================
   main.js — 진입점
   나머지 모듈을 순서대로 동적 로드한 뒤 초기화한다.
   <script> 태그 주입 방식이므로 file:// 에서도 동작한다.
   ============================================== */
(function () {
  const modules = [
    'js/utils.js',
    'js/reveal.js',
    'js/strengths.js',
    'js/counter.js',
    'js/nav.js',
    'js/ui.js',
  ];

  function init() {
    initReveal();
    initStrengths();
    initCounter();
    initNav();
    initUI();
  }

  // 스크립트를 순서대로 1개씩 로드한다.
  // 병렬로 로드하면 Utils가 정의되기 전에 다른 모듈이 실행될 수 있으므로 직렬로 처리한다.
  function loadNext(index) {
    if (index >= modules.length) {
      // 모든 모듈 로드 완료 → DOM 준비 여부에 따라 즉시 또는 이벤트 후 초기화
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
      } else {
        init();
      }
      return;
    }

    const script    = document.createElement('script');
    script.src      = modules[index];
    script.onload   = () => loadNext(index + 1);
    script.onerror  = (e) => console.error(`[main] 로드 실패: ${modules[index]}`, e);
    document.head.appendChild(script);
  }

  loadNext(0);
})();
