/* ==============================================
   utils.js — 공통 유틸리티
   ============================================== */
const Utils = (() => {
  let _dir   = 'down';
  let _prevY = window.scrollY;

  const _listeners = new Set();
  let   _ticking   = false;

  function _dispatch() {
    _listeners.forEach(cb => cb());
    _ticking = false;
  }

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    _dir   = y > _prevY ? 'down' : 'up';
    _prevY = y;

    // scroll 이벤트는 1초에 수십 번 발생할 수 있다.
    // _ticking 플래그로 중복 rAF 요청을 막고,
    // 다음 프레임에 한 번만 콜백을 실행한다.
    if (!_ticking) {
      requestAnimationFrame(_dispatch);
      _ticking = true;
    }
  }, { passive: true });

  function getScrollDir() { return _dir; }

  function addScrollListener(cb)    { _listeners.add(cb); }
  function removeScrollListener(cb) { _listeners.delete(cb); }

  function getGridColCount(el) {
    if (!el) return 1;
    // getComputedStyle은 "200px 200px 200px" 처럼 실제 계산된 값을 반환한다.
    // 공백으로 split하면 열 수를 알 수 있다.
    const cols = getComputedStyle(el).gridTemplateColumns;
    if (!cols || cols === 'none') return 1;
    return cols.trim().split(/\s+/).length;
  }

  return { getScrollDir, addScrollListener, removeScrollListener, getGridColCount };
})();
