---
name: wit
description: Web Insight & Transcript skill that analyzes web content and provides structured summaries using specialized agents.
---

# wit: Web Insight & Transcript Skill

이 스킬은 웹페이지, 공식 문서, 블로그 글 등의 URL을 분석하여 주제와 톤앤매너를 파악하고, 구조화된 요약본을 제공합니다. 작업의 효율성을 위해 전문 서브 에이전트들을 호출하여 상세 분석을 수행합니다.

## 주요 기능

### 1. 웹 분석 및 요약 (`/wit:analyze`)
제공된 URL의 콘텐츠를 심층 분석하여 구조화된 요약 결과물을 생성합니다.

### 2. 웹페이지 번역 (`/wit:translate`)
제공된 URL의 콘텐츠를 대상 언어로 전문 번역합니다. 마크다운 형식을 유지하며 기술 용어를 정확하게 처리합니다.

## 실행 절차 (SOP - Standard Operating Procedure)

### [공통] 데이터 추출 (Extraction Phase)
1.  **고유 작업 디렉토리 생성**: 각 작업마다 `.gemini/skills/wit/temp_[output_name]_[unique_id]/` 형태의 고유 폴더를 생성합니다.
2.  **데이터 수집**: `wit-reader-agent`를 호출하여 URL 내용을 해당 고유 폴더 내의 `cleaned_content.md`로 정제합니다.

### [분석 모드] (`/wit:analyze`)
1.  **분석 및 요약**: 고유 폴더 내의 파일을 대상으로 에이전트들을 호출합니다.
2.  **포맷팅 및 정리**: `wit-formatter-agent`가 최종 보고서를 작성한 후, **해당 고유 작업 디렉토리를 완전히 삭제**합니다.

### [번역 모드] (`/wit:translate`)
1.  **전문 번역**: 고유 폴더 내의 파일을 대상으로 번역을 수행합니다.
2.  **정리**: 번역본(`.md`) 저장 완료 후, **고유 작업 디렉토리를 완전히 삭제**합니다.

## 에이전트 자동 위임 가이드
- 요약/분석 요청: "요약해줘", "주제가 뭐야?", "리뷰해줘"
- 번역 요청: "한글로 번역해줘", "이 페이지 번역해줘", "영어로 바꿔줘"

## Commands

### `/wit:analyze`
사용법: `/wit:analyze <url> [output_file_path]`
- 예시: `/wit:analyze https://cloud.google.com/blog`

### `/wit:translate`
사용법: `/wit:translate <url> [target_lang] [output_file_path]`
- `<url>`: 필수. 분석할 웹페이지 주소.
- `[target_lang]`: 선택. 번역 대상 언어 (기본값: `ko`).
- `[output_file_path]`: 선택. 결과 파일 저장 경로 (기본값: `translated.md`).

예시:
- `/wit:translate https://react.dev/blog ko`
- `/wit:translate https://example.com en ./english-ver.md`
