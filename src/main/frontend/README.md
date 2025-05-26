# 자동차 리콜 페이지 React 프론트엔드 요구사항 정의서(초안)

## 1. React 마이그레이션
기존 **Spring Boot + JSP** 기반 자동차 리콜 정보 제공 웹사이트의 프론트엔드를 **React**로 마이그레이션 

## 2. 주요 기능 목록
- **메인 페이지**: 리콜 정보 요약, 주요 공지, 통계 등
- **리콜 정보 검색 및 상세 조회**
- **결함 신고 및 신고 내역 조회/수정**
- **공지사항/FAQ 게시판**
- **통계**: 연도별, 제조사별, 월별 등
- **관리자 기능**: 공지작성/리콜 api 동기화

## 3. 각 기능별 상세 요구사항
- 모든 페이지는 **React Router**를 활용한 SPA로 구현
- API 연동은 기존 백엔드(Spring Boot) **REST API** 활용
- 데이터 **로딩/에러/빈 상태** 처리
- **반응형 UI**(PC/모바일 지원)
- 첨부파일 **다운로드** 지원

## 4. UI/UX 요구사항
- 기존 JSP 화면(부트스트랩 템플릿)과 유사한 **레이아웃 및 디자인 개선**
- **공통 레이아웃**(헤더, 푸터, 네비게이션) 컴포넌트화
<!-- 
## 5. 비기능 요구사항
- 코드 품질: **ESLint, Prettier** 적용
- 테스트: 기본 단위 테스트(**Jest, React Testing Library**)
- 빌드/배포: **CRA** 또는 **Vite** 기반, **Docker** 지원(필요시)
- 보안: **XSS, CSRF** 등 기본 보안 고려 -->

## 프로젝트 구조 및 주요 특징 요약
프로젝트 구조

### frontend
public/ : 정적 리소스(HTML, favicon, 이미지 등)
src : 실제 React 소스코드(App.js, 컴포넌트, 페이지 등)
package.json : 프론트엔드 의존성 및 스크립트

## 주요 구현 방식

### React 기반 SPA(Single Page Application)
- React Router를 사용하여 페이지 전환(라우팅) 구현
    - 예: /, /defectList, /recallList, /announce, /faq, /login 등 URL에 따라 컴포넌트가 동적으로 전환됨
- 각 주요 기능(리콜정보, 결함신고, 공지사항 등)은 별도의 페이지 컴포넌트로 분리
- 공통 레이아웃(헤더, 푸터, 네비게이션 등) 컴포넌트화
- REST API를 통해 Spring Boot 백엔드와 데이터 연동

- 반응형 UI(PC/모바일 모두 지원, CSS 및 미디어쿼리 활용)
파일 다운로드, 페이징, 검색 등 다양한 UI/UX 기능 구현
### React 마이그레이션 및 라우터 기반 앱 구조 설명
1. 마이그레이션 방법(기존 JSP → React)
- 기존 JSP/서버 템플릿 기반 페이지를 React 컴포넌트로 분리
- 각 JSP의 주요 화면/기능을 React의 "페이지 컴포넌트"로 변환
- 서버에서 처리하던 데이터 렌더링/상태관리를 React의 상태(state)와 props로 관리
- 서버에서 직접 처리하던 form/검색/페이징 등도 React에서 상태 기반으로 구현
- API 연동은 fetch/axios 등으로 REST 방식 호출
2. 라우터 기반 앱 기능 전환
#### React Router를 사용하여 SPA 내에서 URL 경로에 따라 컴포넌트 전환
예시(App.js):
```js
    import { BrowserRouter, Routes, Route } from 'react-router-dom';
    import MainPage from './pages/MainPage';
    import DefectReportList from './pages/DefectReportList';
    import RecallList from './pages/RecallList';
    // ...생략

    function App() {
    return (
        <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/defectList" element={<DefectReportList />} />
            <Route path="/recallList" element={<RecallList />} />
        </Routes>
        <Footer />
        </BrowserRouter>
    );
    }
```

- 사용자는 페이지 새로고침 없이 메뉴 클릭/URL 이동만으로 화면이 전환됨

3. 상태 관리 및 API 연동
- 각 페이지는 useState, useEffect 등 React 훅을 활용해 상태 관리
- 데이터는 REST API로 비동기 호출(fetch/axios 등)
예시:
```javascript
    useEffect(() => {
    fetch('/api/recall')
        .then(res => res.json())
        .then(data => setRecallList(data));
    }, []);
```
