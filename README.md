# responsive Web
[한화해양생물연구센터](https://www.hmbrc.co.kr) 웹사이트를 반응형으로 리뉴얼했습니다.

배포 링크 [🏡](https://tolix-a.github.io/team-1)

##
     
### 개발 환경
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
<img src="https://img.shields.io/badge/jquery-0769AD?style=for-the-badge&logo=jquery&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white">

### 기간
2024.07 - 2024.08 (약 1달)
<br/>
<br/>
### 리뉴얼 사이트 선정 이유 및 개선사항
- 한화에서 운영하는 해양생물 관련 사이트 중 가장 관심도가 낮은 사이트로 사용자가 적은 만큼 오래된 상태로 방치되어

  노후화, 오래된 디자인이 고착되어있다는 점을 토대로 리뉴얼을 결정

- 한화에서 운영하는 다른 해양생물 사이트인 아쿠아플라넷 공식 사이트를 참고하여 리뉴얼 디자인을 진행

- 일반 사용자가 사용하기에 가독성을 더 높이고, 반응형으로 제작하여 모바일에서도 편하게 방문 할 수 있도록 개선
<br/>

### 기능
- 카카오톡 지도 api를 이용한 센터 위치 확인
- 법안 및 생물 설명 팝업
- 게시판 검색 기능
- 탑 버튼
- 로컬스토리지를 이용한 메인 페이지와 다른 페이지 탭 연결
- intersectionObserver를 이용한 글자 움직임

<br/>

### 팀원
  
| 이름   | 담당              |      페이지  |
|-------|-------------------|---|
| 강민현 | 팀장, 기획, 서브페이지  | 수행연구, 보호대상해양생물 영상자료, 학습게시판
| 고유나 | 기획, 서브페이지       | 연구센터 안내, 대상생물, 연구분야
| 박민지 | 서브페이지            | 인삿말, 오시는 길, 서식지 외 보전기관, 해양동물전문구조 치료기관
| 박지연 | 메인페이지, 디자인     | 메인, 구조·치료실적

##
### 역할
배너 애니메이션, 팝업 디자인, 탭 & 팝업 구현, 해당 페이지 디자인, 반응형 구현, 대상생물 JSON 작업


### 트러블슈팅

- 팝업창에 들어가는 이미지 크기가 다 달라서 동물 머리가 잘리는 현상

  : 문제가 있는 팝업 클릭시 이미지 위치를 바꾸는 클래스를 추가해서 해결했습니다. 그런데 클래스 추가만 했더니 다른 동물들 머리가 보이지 않기 시작해서 팝업을 닫으면 이미지 위치를 조정하는 클래스들이 사라지게 수정했습니다.
  
![머리가 안 보이는 펭귄 1](https://github.com/user-attachments/assets/8c735548-6335-4594-b0ca-640eadcf24f8)
![온전한 펭귄 1](https://github.com/user-attachments/assets/a892783b-1c73-4658-8a3b-fec96b996f0b)

- 메인페이지 보전 활동 대상 생물을 클릭하면 대상생물 페이지의 해당 동물 탭으로 이동. 그 후 다른 페이지에 갔다가 다시 대상생물에 들어가면 전체 탭이 아니라 메인페이지로 들어간 탭이 열리는 현상.
  
  : 데이터가 출력된 후 객체의 상태를 false로 만들고 객체를 JSON 문자열로 변환해 localStorage에 저장해서 메인에서 대상생물로 이동할 때만 실행되도록 바꾸었습니다.
