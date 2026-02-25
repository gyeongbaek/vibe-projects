# README 작성

$ARGUMENTS 폴더를 확인하고 README 파일을 작성합니다.
파일이 없다면 새로 만들고, 이미 존재한다면 내용을 업데이트합니다.

## 포함할 내용

- 프로젝트 개요
- 배포 링크 (헤딩 없이 개요 바로 아래)
- 메인 화면 GIF (헤딩 없이 배포 링크 바로 아래, assets 폴더 내 위치)
- 주요 기능 및 특징
- 사용된 기술 스택
- 설치 및 실행 방법
- 제작 기간 및 일자

> 헤딩 위에는 <br/> 태그를 추가하여 가독성을 높입니다.

## GIF 캡처 방법

Playwright를 사용하여 GIF를 캡처합니다. Three.js/WebGL 렌더링을 위해 `headless: false` 옵션이 필수입니다.
assets/screeshot.gif로 저장하며, 이 외에 파일은 생성되더라도 제거합니다.

```javascript
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ["--window-position=-2000,-2000"], // 화면 밖으로 이동
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: { dir: "/tmp/videos/", size: { width: 1280, height: 800 } },
  });
  const page = await context.newPage();
  await page.goto("배포URL");
  await page.waitForTimeout(5000);
  await context.close();
  await browser.close();
})();
```

ffmpeg로 GIF 변환:

```bash
ffmpeg -i video.webm -vf "fps=15,scale=640:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 screenshot.gif
```

## 예시

````markdown
# ROOMS | 3D Interactive Portfolio

Three.js 기반의 인터랙티브 3D 포트폴리오 웹사이트입니다.
4개의 테마별 Room을 무한 슬라이더 형태로 탐색하며, 각 Room마다 다른 3D 오브젝트와 프로젝트 목록을 확인할 수 있습니다.

[ROOMS 배포 페이지](https://vibe.gyeongbaek.dev/01-rooms/)
![ROOMS 메인 화면](./assets/screenshot.gif)

## 주요 기능

- **3D Navigation**: 4개의 카테고리 (Development, Design, Projects, About)
- **무한 슬라이더**: 끊김 없는 순환 네비게이션
- **인터랙티브 3D 오브젝트**: 카테고리별로 다른 형태의 3D 메시 (Box, Icosahedron, Octahedron, TorusKnot)
- **동적 콘텐츠**: Room 전환 시 프로젝트 목록 자동 업데이트

## 기술 스택

| 분류        | 기술                                  |
| ----------- | ------------------------------------- |
| 3D Graphics | Three.js                              |
| Language    | Vanilla JavaScript (ES Modules)       |
| Markup      | HTML                                  |
| Styling     | CSS                                   |
| Fonts       | Google Fonts (Instrument Serif, Syne) |

## 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/gyeongbaek/vibe-projects.git
cd vibe-projects/01-rooms

# Live Server로 실행 (VS Code Extension 또는 다른 로컬 서버)
# index.html을 로컬 서버로 열기
```

> ES Modules를 사용하므로 로컬 서버가 필요합니다.

## 프로젝트 구조

```
01-rooms/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   └── screenshot.gif
└── README.md
```

## 제작 기간

- 2026년 1월 26일 (1일)
````
