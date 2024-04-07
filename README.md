# Wiki Page

## 프로젝트 소개

Wiki Page는 사용자가 위키 항목을 생성, 읽기, 수정 및 삭제할 수 있는 웹 애플리케이션입니다. 사용자는 페이지를 통해 위키 항목을 만들고 관리할 수 있으며, 필요한 정보를 쉽게 찾을 수 있습니다.

## 배포 링크

[Wiki Page](https://wiki-page-blue.vercel.app/)

## 사용한 라이브러리

- **React**: 사용자 인터페이스를 만들기 위한 JavaScript 라이브러리
- **React Router Dom**: React 애플리케이션의 라우팅을 관리하기 위한 라이브러리
- **Firebase**: 데이터베이스 및 인증을 위한 클라우드 서비스
- **Styled Components**: CSS-in-JS 라이브러리로 스타일을 컴포넌트에 적용
- **Nanoid**: 고유한 ID를 생성하기 위한 라이브러리
- **React Paginate**: 페이지네이션 구현을 위한 React 컴포넌트 라이브러리

## 구현 기능

### 메인 페이지

<img src="https://github.com/yejify/KYJ_WikiPage/assets/116805856/74388151-09d1-40cd-8f34-64c9ca1dad59" width="400" alt="메인 페이지">

- 여러개의 위키 페이지 제목이 목록으로 나타납니다.
- 위키 페이지가 5개 이상일 때 페이지가 구분됩니다.
- 추가 버튼을 클릭하면 새로운 위키 항목을 입력할 수 있는 창이 나타납니다.

### 추가 페이지

<img src="https://github.com/yejify/KYJ_WikiPage/assets/116805856/72b66323-c5da-44d6-96ea-bffaae971702" width="400" alt="추가 페이지">

- 같은 제목의 위키 페이지가 이미 있을 때 경고 문구가 표시되고 저장 버튼이 비활성화됩니다.
- 저장 버튼을 클릭하면 메인 페이지로 이동하고 새로 추가된 항목이 반영됩니다.

### 위키 페이지

<img src="https://github.com/yejify/KYJ_WikiPage/assets/116805856/c4f77c3d-cd07-414b-bbbe-cf67a42cd321" width="400" alt="위키 페이지">

- 본문에 다른 위키 페이지 제목이 포함되어 있으면 자동으로 링크가 생성됩니다.
- 같은 단어가 들어간 제목이 있을 때는 가장 긴 제목부터 순회하여 인식합니다.
- 띄어쓰기를 포함한 제목을 인식하며, 해당 단어만 인식합니다(조사는 제외됩니다).
- 수정 버튼을 클릭하면 해당 페이지의 수정 페이지로 이동합니다.
- 삭제 버튼을 클릭하면 해당 페이지가 삭제되고 메인 페이지로 이동합니다.

### 수정 페이지

<img src="https://github.com/yejify/KYJ_WikiPage/assets/116805856/21078335-7ca0-4afa-b878-05ca4158bf8b" width="400" alt="수정 페이지">

- 수정한 내용이 있을 경우 저장 버튼이 활성화됩니다.
- 취소 버튼을 클릭하면 이전 페이지로 되돌아갑니다.
- 저장 버튼을 클릭하면 메인 페이지로 이동하고 수정된 내용이 반영됩니다.

### 에러 페이지

<img src="https://github.com/yejify/KYJ_WikiPage/assets/116805856/0c1ec96b-50da-4012-bfea-6ce61ccf4fe2" width="400" alt="에러 페이지">
