# 간단 | 간단하고 단순한 카운터

클릭 한 번으로 숫자를 세는 심플한 카운터 앱입니다.
뜨개질 단 수 세기, 운동 횟수 카운팅 등 다양한 상황에서 사용할 수 있습니다.
반복(루프) 기능, 소리 피드백, 다크모드를 지원합니다.

[간단 배포 페이지](https://vibe.gyeongbaek.dev/03-counter/)

![간단 메인 화면](./assets/screenshot.gif)

<br/>

## 주요 기능

- **클릭/스페이스바 카운팅**: 화면 클릭 또는 스페이스바로 간편하게 카운트
- **반복(루프) 기능**: 설정한 숫자에 도달하면 자동으로 1로 리셋되며 반복 횟수 표시
- **소리 피드백**: 카운트 시 클릭음, 루프 완료 시 차임음 재생
- **다크모드**: 시스템 설정에 따른 자동 적용 및 수동 전환 지원
- **상태 저장**: localStorage를 통해 브라우저 종료 후에도 상태 유지
- **햅틱 피드백**: 모바일 기기에서 진동 피드백 제공

<br/>

## 기술 스택

| 분류       | 기술                                    |
| ---------- | --------------------------------------- |
| Language   | Vanilla JavaScript (ES Modules)         |
| Markup     | HTML                                    |
| Styling    | CSS (CSS Variables, Dark Mode)          |
| Audio      | Web Audio API                           |
| Storage    | localStorage                            |

<br/>

## 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/gyeongbaek/vibe-projects.git
cd vibe-projects/03-counter

# Live Server로 실행 (VS Code Extension 또는 다른 로컬 서버)
# index.html을 로컬 서버로 열기
```

> ES Modules를 사용하지 않으므로 파일을 직접 열어도 실행 가능합니다.

<br/>

## 프로젝트 구조

```
03-counter/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   └── screenshot.gif
└── README.md
```

<br/>

## 제작 기간

- 2026년 2월 25일 ~ 26일 (2일)
