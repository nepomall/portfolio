/* ==============================================
   strengths.js — 스크롤 핀 텍스트 전환
   ============================================== */
function initStrengths() {
  const section = document.getElementById('strengths');
  if (!section) return;

  const texts = Array.from(section.querySelectorAll('.strength-text'));
  if (!texts.length) return;

  const n = texts.length;

  // 섹션 진입 직후 바로 텍스트가 나오면 어색하므로
  // 전체 스크롤 범위의 6%를 여백으로 남긴다.
  const OFFSET  = 0.06;
  const segSize = (1 - OFFSET) / n; // 텍스트 1개당 스크롤 비율

  function update() {
    const rect = section.getBoundingClientRect();

    // 섹션 높이(400vh) - 뷰포트 높이(100vh) = 실제 스크롤 가능 거리(300vh)
    // sticky 요소가 고정된 채로 스크롤되는 구간이 이 길이다.
    const scrollable = section.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;

    // rect.top은 섹션 상단이 뷰포트 상단으로부터 얼마나 떨어져 있는지를 나타낸다.
    // 섹션에 진입하면 음수가 되므로 부호를 뒤집어 0→1 범위로 정규화한다.
    const progress = Math.max(0, Math.min(1, -rect.top / scrollable));

    texts.forEach((text, i) => {
      const segStart = OFFSET + i * segSize;
      // 마지막 텍스트는 섹션이 끝날 때까지 사라지지 않아야 한다.
      // 1.1로 설정하면 progress가 최대 1.0이므로 past 상태에 절대 진입하지 않는다.
      const segEnd = i === n - 1 ? 1.1 : OFFSET + (i + 1) * segSize;

      if (progress < segStart) {
        text.classList.remove('active', 'past'); // 아직 미등장
      } else if (progress >= segEnd) {
        text.classList.remove('active');
        text.classList.add('past');              // 위로 퇴장
      } else {
        text.classList.remove('past');
        text.classList.add('active');            // 현재 표시
      }
    });
  }

  Utils.addScrollListener(update);
  update(); // 페이지 첫 로드 시 현재 스크롤 위치에 맞게 즉시 적용
}
