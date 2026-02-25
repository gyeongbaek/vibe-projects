# 포트폴리오에 프로젝트 추가

$ARGUMENTS 프로젝트를 `data/projects.json`에 추가해줘.

## 필요한 정보 (없으면 물어보거나 README 참고)

- **id**: 폴더명 (예: 01-rooms)
- **number**: 프로젝트 번호 (예: 01)
- **title**: 프로젝트 제목
- **category**: 카테고리 (예: 3D Portfolio, Utility)
- **desc**: 프로젝트 설명
- **tags**: 기술 태그 배열 (예: ["Three.js", "WebGL", "Vanilla JS"])
- **date**: 개발 날짜 (YYYY-MM-DD 형식)

## 프로젝트 데이터 구조

`data/projects.json` 파일에 새 프로젝트 객체를 추가합니다:

```json
{
  "id": "01-rooms",
  "number": "01",
  "title": "ROOMS",
  "category": "3D Portfolio",
  "desc": "Three.js를 활용한 인터랙티브 3D 포트폴리오. 무한 슬라이더와 기하학적 오브젝트 애니메이션.",
  "tags": ["Three.js", "WebGL", "Vanilla JS"],
  "date": "2025-01-15"
}
```

## 카드 레이아웃 구조

```
+----------------------------------+
|  [태그1] [태그2] [태그3]          |  <- 상단: 기술 태그 (썸네일 위)
|                                  |
|        (iframe 프리뷰)            |  <- 중앙: 프로젝트 미리보기
|                                  |
|  01 ROOMS | 3D PORTFOLIO         |  <- 하단: 번호 + 제목 + 카테고리 (썸네일 위)
+----------------------------------+
|  설명 텍스트...           2025.01|  <- 콘텐츠: 설명 + 날짜
+----------------------------------+
```

## 작업 순서

1. 프로젝트 폴더의 README 또는 index.html에서 정보 수집
2. `data/projects.json` 파일을 읽고 새 객체 추가
3. 날짜 형식은 `YYYY-MM-DD` (예: 2025-01-15)

## 정렬 기능

index.html에서 자동으로 정렬됩니다:
- 최신순: 날짜 기준 내림차순
- 넘버링순: number 기준 오름차순
- 오래된순: 날짜 기준 오름차순
