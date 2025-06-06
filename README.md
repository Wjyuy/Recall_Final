# KH아카데미 파일럿 프로젝트_리콜 센터
made by. team_KH리콜안전공단

**Spring Boot,React 기반 리콜 정보 조회 사이트**
빅데이터 기반(파이썬·자바·웹) 엘라스틱 검색엔진 개발자과정 `2025. 01. 15 ~ 2025. 07. 10`

<br>

1조 3차 프로젝트 진행 기간 `2025. 05. 19 ~ 2025. 05. 25`

[마이그레이션 전 [파일럿 프로젝트 링크](https://github.com/Wjyuy/project_2)]

## 프로젝트 포스터

![포스터](./images/poster.png)

## 💡 프로젝트 선정 배경

* [파일럿 프로젝트](https://github.com/Wjyuy/project_2)에서 재작한 기존 JSP 기반의 리콜 정보 시스템은 유지보수와 확장성, 사용자 경험(UX) 측면에서 한계 발견
* 최신 웹 트렌드에 맞는 **React 기반 SPA**로 프론트엔드 마이그레이션
* Spring Boot 백엔드, REST API 연동

---

### 사용 기술 스택

- **Frontend**
  - React (SPA, React Router)
  - JavaScript (ES6+)
  - CSS3, HTML5
  - UI 프레임워크: UIKit, Bootstrap 등
- **Backend**
  - Spring Boot (REST API)
  - Java 17+
  - MyBatis 
  - Gradle 
  - Flask
  - JWT token
- **Database & Infra**
  - MySQL
  - pgAdmin4 (DB 관리)
  - Render (클라우드 배포)
- **기타**
  - Sourcetree
  - GitHub 
  - Slack
  - Jira
  - Notion 

## 설계

### DB diagram을 사용한 erd 테이블 설계
![erd](./images/ERD.png)

### 업무 흐름도
<table>
  <tr>
    <td align="center">센터,통계</td>
    <td align="center">관리자</td>
    <td align="center">리콜정보,결함신고</td>
  </tr>
  <tr>
    <td><img src="./images/센터_통계_흐름도.jpg" alt="flow1" width="300"></td>
    <td><img src="./images/관리자_흐름도.jpg" alt="flow2" width="300"></td>
    <td><img src="./images/리콜정보_결함신고_흐름도.jpg" alt="flow3" width="300"></td>
  </tr>
</table>

### 서비스 설계단 흐름
<table>
  <tr>
    <td align="center">메뉴 구조도</td>
  </tr>
  <tr>
    <td><img src="./images/메뉴구조도1.jpg" alt="메뉴" width="400"></td>
    <td><img src="./images/메뉴구조도2.jpg" alt="메뉴" width="400"></td>
  </tr>
</table>

### 기타 문서
  * <a href="./pptx/테이블명세서.pdf" download="document.pdf">테이블 명세서</a>
  * <a href="./pptx/화면설계서.pdf" download="document.pdf">화면 설계서</a>
---

## 협업툴 자동화 활용

  <table>
    <tr>
      <td align="center">slack</td>
      <td align="center">jira</td>
    </tr>
    <tr>
      <td><img src="./images/slack.png" alt="slack" width="400"></td>
      <td><img src="./images/jira.png" alt="jira" width="400"></td>
    </tr>
  </table>

## 🚀 주요 기능

- **리콜 정보 검색/상세 조회**
  - 다양한 조건(제품명, 제조사, 모델명 등)으로 리콜 내역 검색
  - 반응형 테이블 및 상세 정보 제공
  - Flask 사용한 유사 리콜 기능 구현
- **결함 신고 및 내역 조회/수정**
  - 사용자 결함 신고 등록 및 본인 신고 내역 확인/수정
  - 신고 시 비밀번호, 공개여부 등 선택 가능
- **공지사항/FAQ 게시판**
  - 관리자 공지 작성, FAQ 관리
  - 사용자 공지/FAQ 열람
  - 다양한 조건으로 게시판 검색
- **리콜 통계**
  - 연도별, 제조사별, 월별 등 다양한 통계 시각화
  - PDF 다운로드 구현, Gemini를 사용한 통계분석 기능
  - 중복 리콜 모델을 카운트하여 시각화
- **관리자 기능**
  - JWT 토큰으로 로그인, 로그아웃 구현
  - 리콜 정보 검수/승인, 공지사항 작성, 데이터 동기화 
- **첨부파일 다운로드**
  - 리콜/신고 내역 엑셀, CSV, 리콜통계 PDF 등 파일 다운로드 지원
- **반응형 UI**
  - PC/모바일 모두 최적화된 화면 제공
  - Gemini를 사용한 챗봇 기능, 프롬프트를 사용해 페이지와 관계있는 질문에만 대답

---

## 📁 폴더 구조 및 마이그레이션 설명

- `src/main/frontend`  
  - 기존 JSP 기반 프론트엔드-> React SPA 마이그레이션  
  - 각 JSP 화면을 React 컴포넌트/페이지로 분리  
  - React Router로 URL 기반 화면 전환  
  - `src/main/frontend/src/service`: REST API로 Spring Boot 백엔드와 연동

- `src/main/java/com/boot`  
  - Controller, DAO, DTO, Mapper 등 백엔드 비즈니스 로직  
  - `React...Controller`: React로 마이그레이션하며 Json전송 RestController 전체변환
  - Gradle 기반 빌드/의존성 관리  
  - `webapp` 폴더에 마이그레이션 전 JSP 파일 보관

---

## 마이그레이션 완료된 React 디렉토리 구조
```
.
└── RECALL_FINAL
    ├── gradle/
    ├── images/
    ├── node_modules/
    └── src/
        └── main/
            └── frontend/
                ├── node_modules/
                ├── public/
                ├── src/
                │   ├── assets/
                │   ├── components/
                │   ├── hooks/
                │   ├── layout/
                │   ├── pages/
                │   ├── services/
                │   ├── styles/
                │   ├── utils/
                │   ├── App.js
                │   ├── App.test.js
                │   ├── appbackup.js
                │   ├── index.css
                │   ├── index.js
                │   ├── logo.svg
                │   ├── reportWebVitals.js
                │   ├── setupProxy.js
                │   └── setupTests.js
                ├── .env.development
                ├── .env.production
                ├── .gitignore
                ├── package-lock.json
                └── package.json
```

## 🛠️ 마이그레이션 방식 요약

- JSP에서 처리하던 화면/로직을 React **컴포넌트로 분리**
- 서버 템플릿 렌더링 → 클라이언트 렌더링(SPA)
- 페이지 이동은 **React Router로 구현 (새로고침 없이 전환)**
- 데이터 연동은 **REST API 호출**(fetch/axios 등)
- 공통 레이아웃(헤더/푸터/네비) 컴포넌트화
- 반응형 UI 및 사용자 경험(UX) 개선

---

## 결과

### 메인 화면
<table>
  <tr>
    <td align="center">메인화면</td>
    <td align="center">챗봇 채팅 화면</td>
  </tr>
  <tr>
    <td><img src="./images/메인_챗봇.png" alt="메인" width="400"></td>
    <td><img src="https://github.com/user-attachments/assets/72b00276-146c-4e78-bfc4-62e42e088b85" alt="챗봇" width="400"></td>
  </tr>
</table>

- 플로팅 버튼으로 TOP VIEW , CHATBOT 기능 구현
- CHATBOT 은 popup으로, 리액트 라우터 구현이기 때문에 페이지 전환되어도 채팅기록 남음
- 드래그 앤 드랍 위치도 고정

### 리콜 정보 
<table>
  <tr>
    <td align="center">리콜내역</td>
    <td align="center">리콜내역 기능</td>
  </tr>
  <tr>
    <td><img src="./images/리콜내역.png" alt="메인" width="400"></td>
    <td><img src="https://github.com/user-attachments/assets/e03e397e-61d2-4e9f-9898-5acaf1ffabfb" alt="리콜내역" width="400"></td>
  </tr>
</table>

- 리콜내역([공공데이터포털](https://www.data.go.kr/data/3048950/fileData.do)) 의 XML파일을 MySQL 로 데이터 파싱 ->*추후 관리자 기능에서 추가,동기화 구현*
- 페이징 처리, 검색에 따른 리스트 출력 기능 구현
- 유사 리콜 기능 : TF-IDF + 코사인 유사도 방식으로 Flask 배포된 python 서버 이용
- 엑셀, CSV 다운로드 지원

### 리콜 통계
<table>
  <tr>
    <td align="center">연도별 리콜통계</td>
  </tr>
  <tr>
    <td><img src="./images/연리콜통계1.png" alt="메인" width="400"></td>
    <td><img src="./images/연리콜통계2.png" alt="리콜내역" width="400"></td>
  </tr>
  <tr>
    <td><img src="./images/연리콜통계3.png" alt="메인" width="400"></td>
    <td><img src="./images/연리콜통계6.png" alt="리콜내역" width="400"></td>
  </tr>
</table>

<table>
  <tr>
    <td align="center">월별 리콜통계 기능</td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/ebc60902-f29a-4e59-ad51-36361e95021b" alt="통계"></td>
  </tr>
</table>

- 연도와 월별 기능이 유사
- 시작연도 / 종료연도 / 시작월 / 종료월 선택 -> 국산, 수입에 따른 요약 표, 그래프, PDF다운로드 지원
- 시작연도 / 종료연도 / 시작월 / 종료월 선택 -> 제조사별 요약 표, 합산표, 도넛 차트, PDF다운로드 지원
- PDF 다운로드에는 프롬프트 적용된 Gemini가 통계 자료를 분석한 내용 포함

### 결함신고
<table>
  <tr>
    <td align="center">결함신고</td>
    <td align="center">결함신고조회</td>
  </tr>
  <tr>
    <td><img src="./images/결함신고1.png" alt="결함신고" width="400"></td>
    <td><img src="./images/결함신고내역.png" alt="결함신고" width="400"></td>
  </tr>
  <tr>
    <td align="center">결함신고 상세페이지</td>
    <td align="center">결함신고 기능</td>
  </tr>
  <tr>
    <td><img src="./images/신고내역세부.png" alt="결함신고" width="400"></td>
    <td><img src="https://github.com/user-attachments/assets/efdc84e8-3393-4295-989d-ae37ad245796" alt="결함신고" width="400"></td>
  </tr>
</table>


- 결함신고 페이지는 소비자가 작성
- 작성완료 시 신고조회페이지에서 조회 가능
- PW 체크 후 수정/삭제 가능
- 페이징 처리, 검색에 따른 리스트 출력 기능 구현

### FAQ
<table>
  <tr>
    <td align="center">FAQ</td>
    <td align="center">FAQ작성</td>
  </tr>
  <tr>
    <td><img src="./images/FAQ.png" alt="FAQ" width="400"></td>
    <td><img src="./images/FAQ작성.png" alt="FAQ" width="400"></td>
  </tr>
</table>

- QNA 작성기능
- title만 출력하고, 클릭 시 토글되어 답변 내용이 보임 

### 공지사항
<table>
  <tr>
    <td align="center">공지사항</td>
    <td align="center">공지사항 세부</td>
  </tr>
  <tr>
    <td><img src="./images/공지사항.png" alt="공지사항" width="400"></td>
    <td><img src="./images/공지사항세부.png" alt="공지사항" width="400"></td>
  </tr>
</table>

- 공지사항 작성 - 관리자 기능
- 공지사항 상세페이지에서 작성시간,제목,내용 출력
- DTO에 이전글, 다음글 기능 구현 위해 Total값 추가

### 관리자
<table>
  <tr>
    <td align="center">관리자 로그인</td>
    <td align="center">관리자신고검수</td>
  </tr>
  <tr>
    <td><img src="./images/관리자로그인.png" alt="결함신고" width="400"></td>
    <td><img src="./images/관리자신고검수.png" alt="결함신고" width="400"></td>
  </tr>
</table>

<table>
  <tr>
    <td align="center">관리자 기능</td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/6fdcffab-7598-4f94-ac4e-bf95aba702ec" alt="관리자"></td>
  </tr>
</table>

- JWT 토큰 활용한 로그인 구현
- 유저가 작성한 결함신고 내역을 체크하여 리콜리스트 추가 가능
- 리콜내역([공공데이터포털](https://www.data.go.kr/data/3048950/fileData.do))  자료를 DB로 추가 하는 기능, 자료 추가 될 시 동기화 기능


## 🔗 관련 링크

  * [[Render 배포링크](https://recall-final-front.onrender.com/)]
    * 서버 불안정으로 동작 안될 수 있음
    * 리콜통계 부분은 render 서버로 호환x 
  * **GitHub Repository:** 
    * [[팀장 우주연-GitHub Repository URL](https://github.com/Wjyuy/KH_PJ4)]
    * [[팀원 성유리-GitHub Repository URL](https://github.com/yuriuser126/Carrecallbigdata_project4)]
    * [[팀원 김채윤-GitHub Repository URL](https://github.com/Chaeyoon-k/pilotproject_04.git)]
    * [[팀원 권준우-GitHub Repository URL](https://github.com/kjo5191/Project_RecallCenter)]

  * **발표자료** 

  * <a href="./pptx/pptx.pdf" download="document.pdf">PDF 미리보기</a>
  * [최신 발표 자료 다운로드 (릴리스)](https://github.com/Wjyuy/Recall_Final/releases/tag/latest)

  * **시연영상 보기**

  [![Video Label](http://img.youtube.com/vi/cTVAbfrtdEs/0.jpg)](https://www.youtube.com/watch?v=cTVAbfrtdEs)
