# ROOMS - Portfolio

인터랙티브 3D 포트폴리오 웹사이트입니다. Three.js를 활용한 3D 오브젝트와 무한 슬라이더 네비게이션을 통해 프로젝트들을 카테고리별로 탐색할 수 있습니다.

## 기술 스택

- **HTML / CSS / JavaScript** - 바닐라 웹 기술
- **Three.js v0.160.0** - WebGL 기반 3D 렌더링

## 주요 기능

- 4개의 Room(카테고리)으로 구성된 포트폴리오
  - Development - 개발 프로젝트
  - Design - 디자인 작업
  - Projects - 프로젝트 이력
  - About - 소개
- 3D 기하학적 오브젝트 애니메이션 (Box, Icosahedron, Octahedron, TorusKnot)
- 무한 루프 슬라이더
- 반응형 디자인
- 터치 스와이프 및 키보드 네비게이션

## 실행 방법

별도의 빌드 과정 없이 정적 파일로 실행됩니다.

## 프로젝트 구조

```
01-rooms/
└── index.html    # 전체 애플리케이션 (HTML + CSS + JS)
```

## 조작 방법

| 입력                 | 동작                |
| -------------------- | ------------------- |
| `←` / `→` 화살표 키  | 이전/다음 Room 이동 |
| 화면 좌우 버튼 클릭  | 이전/다음 Room 이동 |
| 하단 인디케이터 클릭 | 해당 Room으로 이동  |
| 터치 스와이프        | 이전/다음 Room 이동 |

## 커스터마이징

`index.html` 파일 내 `rooms` 배열을 수정하여 콘텐츠를 변경할 수 있습니다:

```javascript
const rooms = [
  {
    name: "Development",
    label: "Room 01",
    titleHtml: "Develop<em>ment</em>",
    color: 0xe8ff47, // 3D 오브젝트 색상
    items: [
      {
        year: "2026",
        title: "프로젝트명",
        desc: "설명",
        tags: ["태그1", "태그2"],
      },
    ],
  },
];
```

## 라이선스

MIT License
