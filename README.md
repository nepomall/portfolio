# 포트폴리오 — GitHub Pages 배포 가이드

## 📁 폴더 구조

```
portfolio/
│
├── index.html            ← 메인 페이지 (여기서 시작)
│
├── css/
│   ├── reset.css         ← 브라우저 기본 스타일 초기화
│   ├── style.css         ← 메인 스타일
│   └── responsive.css    ← 반응형 미디어쿼리
│
├── js/
│   └── main.js           ← 스크롤 애니메이션, 인터랙션
│
├── img/
│   ├── works/            ← 작업물 썸네일 이미지 (권장: 800×500px, webp)
│   │   ├── accdlac.webp
│   │   ├── goobne.webp
│   │   └── ...
│   └── icons/            ← 파비콘 등
│       └── favicon.ico
│
└── README.md
```

---

## 🚀 GitHub Pages 배포 방법

### 1단계 — 저장소 만들기
1. GitHub에서 새 저장소 생성
2. **저장소 이름을 반드시** `[내아이디].github.io` 로 설정
   - 예: `honggildong.github.io`
3. Public으로 설정 후 생성

### 2단계 — 파일 업로드
```bash
# 로컬에서 git 사용 시
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/[내아이디]/[내아이디].github.io.git
git push -u origin main
```
또는 GitHub 웹에서 파일을 직접 drag & drop 업로드해도 됩니다.

### 3단계 — Pages 활성화
1. 저장소 → **Settings** 탭
2. 좌측 메뉴 **Pages** 클릭
3. Source → **Deploy from a branch**
4. Branch → **main** / **(root)** 선택 후 Save

### 4단계 — 접속 확인
- 1~2분 후 `https://[내아이디].github.io` 로 접속

---

## ✏️ 수정이 필요한 항목

### index.html
| 위치 | 수정 내용 |
|------|-----------|
| `<title>` | 본인 이름으로 변경 |
| `.hero-name` | 본인 이름 |
| `.hero-title` | 한 줄 소개 |
| `contact-email` href + 텍스트 | 실제 이메일 |
| `exp-*` 항목들 | 실제 경력 내용 |
| `work-card` `data-href` | 실제 사이트 URL |
| `footer` 이름, 연도 | 본인 정보 |

### css/style.css
- `.accent-blue` 색상: 원하는 포인트 컬러로 변경 가능
- `--accent-blue: #2997ff` 값을 원하는 색상으로 교체

### 작업물 이미지 교체 방법
1. 스크린샷을 `img/works/` 폴더에 저장 (800×500px 권장)
2. `index.html` 내 `.work-thumb` 의 `background` 를 이미지로 교체:
```html
<!-- 기존 -->
<div class="work-thumb" style="background:#1a1a2e;">

<!-- 이미지로 교체 -->
<div class="work-thumb" style="background: url('../img/works/accdlac.webp') center/cover no-repeat;">
```

---

## 💡 팁

- 이미지는 **WebP 형식** 권장 (용량 40~60% 절약)
- 파비콘은 [favicon.io](https://favicon.io) 에서 무료 생성 가능
- 도메인 연결: Settings → Pages → Custom domain 에서 본인 도메인 입력 가능
