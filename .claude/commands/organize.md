# 프로젝트 폴더 구조 정리

$ARGUMENTS 폴더를 관심사 분리 구조로 재구성해줘.

## 변환 규칙

- `*.css, *.scss` → `css/`
- `*.js, *.ts` (라이브러리 제외) → `js/`
- `*.min.js`, three.js, gsap 등 외부 라이브러리 → `libs/`
- `*.png, *.jpg, *.svg, *.webp, *.gif` → `assets/images/`
- `*.woff, *.woff2, *.ttf` → `assets/fonts/`
- `*.mp3, *.mp4, *.webm` → `assets/media/`
- `*.glb, *.gltf, *.obj` → `assets/models/`
- `*.json, *.csv` (package.json 제외) → `data/`

## 유지할 파일

- `index.html`, `favicon.ico`, `README.md`
- `package.json`, `vite.config.*`, `tsconfig.json`

## 작업 순서

1. 현재 폴더 구조 확인
2. 파일들을 적절한 하위 폴더로 이동
3. `index.html` 내 경로를 새 위치에 맞게 수정 (예: `style.css` → `./css/style.css`)
4. 최종 구조 출력
