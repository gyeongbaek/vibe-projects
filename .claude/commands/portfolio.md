# 포트폴리오에 프로젝트 추가

$ARGUMENTS 프로젝트를 루트의 `index.html` 포트폴리오에 추가해줘.

## 필요한 정보 (없으면 물어보거나 REAMDME 참고)

- **title**: 프로젝트 제목
- **desc**: 프로젝트 설명
- **tags**: 기술 태그 (예: Three.js, WebGL, Vanilla JS)

## 카드 템플릿

```html
<a href="./{폴더명}" class="project-card">
  <div class="card-preview">
    <div class="preview-iframe-wrapper">
      <iframe
        class="preview-iframe"
        src="./{폴더명}"
        loading="lazy"
        tabindex="-1"
      ></iframe>
    </div>
    <div class="preview-overlay"></div>
  </div>
  <div class="card-content">
    <div class="card-label">{번호} — {카테고리}</div>
    <h3 class="card-title">{제목}</h3>
    <p class="card-desc">{설명}</p>
    <div class="card-tags">
      <span class="tag">{태그1}</span>
      <span class="tag">{태그2}</span>
    </div>
  </div>
  <div class="card-footer">
    <span class="view-link">
      View Project
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </span>
    <span class="status">Live</span>
  </div>
</a>
```

## 작업 순서

1. 폴더명에서 번호 추출 (예: `02-ascii` → `02`)
2. `index.html`에서 `<!-- More projects can be added here -->` 주석 찾기
3. 해당 위치 앞에 새 프로젝트 카드 삽입
4. `<span class="project-count">` 숫자 업데이트
