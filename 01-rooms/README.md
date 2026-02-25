# ROOMS - 3D Interactive Portfolio

Three.js 기반의 인터랙티브 3D 포트폴리오 웹사이트입니다. 4개의 테마별 Room을 무한 슬라이더 형태로 탐색하며, 각 Room마다 다른 3D 오브젝트와 프로젝트 목록을 확인할 수 있습니다.

## 배포 링크

[ROOMS Portfolio](https://vibe.gyeongbaek.dev/01-rooms/)

## 스크린샷

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
