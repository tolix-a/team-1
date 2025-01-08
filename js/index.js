const elMain = document.querySelector('main');
const elIndi = document.querySelectorAll('.section-paging ul li');
const elArticle = document.querySelectorAll('article');
    
// 카카오 맵 리사이징 (반응형) 미디어쿼리
const t = window.matchMedia('(max-width:1199px)');
   
// 인디게이터 활성화
let init = ()=>{
    let update = (n)=>{
       
        // elIndi[0].classList.remove('active');
        // elIndi[1].classList.remove('active');
        // elIndi[2].classList.remove('active');
        // elIndi[3].classList.remove('active');
        // elIndi[4].classList.remove('active');
        elIndi.forEach((v)=>{
           v.classList.remove('active');
                }); 
        elIndi[n].classList.add('active');
        
    }
        
    //인디게이터 클릭 이동
    elIndi.forEach((ele,i)=>{
        ele.addEventListener('click',function(e){
            e.preventDefault();

            let idx = elArticle[i].offsetTop;
            elMain.style=`transform:translateY(-${idx}px)`;
            update(i);
        })
    })

    
    //마우스 휠 nextElmentsbling(형제찾기), offsetTop(세로값), 마지막은 윈도우 이너헤잇- 푸터값빼주기
    let t_device = t.matches; //t_devie는 태블릿 이하 사이즈에서 휠 기능 없애기

    elArticle.forEach((article,i)=>{
        article.addEventListener('wheel',function(e){
            try{
                if(!t_device){
                    let idx, num=i;
                    if(e.deltaY > 0){
                        if(this.nextElementSibling.tagName!=="FOOTER"){
                            idx = this.nextElementSibling.offsetTop;
                            num++;                         
                        }else{
                            idx = this.nextElementSibling.offsetTop - (window.innerHeight-this.nextElementSibling.offsetHeight);
                        }
                    }else{
                        idx = this.previousElementSibling.offsetTop;
                        num--;                  
                    }               
                    
                    elMain.style=`transform:translateY(-${idx}px)`;
                    update(num);
                }else{
                    elMain.style=`transform:translateY(-0px)`; //t_devie는 태블릿 이하 사이즈에서 휠 기능 없애고 0픽셀로 가라
                }
            }catch{}
        });
    });
    //테블릿에서 리사이징시 휠 기능없어지고 0픽셀로 가라
    t.onchange = function (e){
        t_device = e.matches ? true : false;
        if(t_device)  elMain.style=`transform:translateY(-0px)`;
    }
    
}
window.addEventListener('load',init)


//json 데이터 불러오기
fetch("./data/index.json")
.then(function(res){return res.json()})
.then(function(data){
    console.log(data);

    let dataFun = function (n){
        let rescue;
        const elP = document.querySelector('.tab01 ');
        const elFigure = document.querySelector('.figure-box ');
  
        switch(n){
            case 0: rescue = data.rescue[0].dolphin; break;
            case 1: rescue = data.rescue[1].turtle; break;
            default: rescue = data.rescue[2].etc; break;
           }
        elP.innerHTML='';
        elFigure.innerHTML='';//  값 reset
        rescue.text.forEach(item =>{
                elP.innerHTML+= `<p>${item}</p>`
        });
        rescue.photo.forEach(item =>{
            elFigure.innerHTML+= `<figure><img src="./img/main/${item}"}</figure>`
        });      
    }

    dataFun(0);// 첫 화면에 0을 보여줘라


    //구조치료실적 리스트 탭 활성화, 데이터 저장
    const menuLi = document.querySelectorAll('.tab-nav li a'),
          localBtn = document.querySelector('.figure-wrap > span > a');

    menuLi.forEach((v,i) => {  
     v.onclick=(function(e){
        localStorage.rescue = JSON.stringify( {  status : false, name:this.dataset.name } );
        console.log(JSON.parse(localStorage.rescue));
            menuLi.forEach(function(item,i){
                item.classList.remove('active'); //모두를 빼줘라
            });
            v.classList.add('active');  //내가 클린한것만 하얀 활성화 박스
        
        e.preventDefault(); //a링크 방지
        dataFun(i);
        
     });
     localBtn.onclick = function(e){
        aBtn = JSON.parse(localStorage.rescue);   //localStorage.rescue의 값을 불러와서 JSON의 객체 형태로 만들어줘(parse)
        aBtn.status = true;
        localStorage.rescue = JSON.stringify( aBtn );
        console.log(JSON.parse(localStorage.rescue));
  }
    });
  });


 //카카오 지도 자바스크립트
 // 마커를 담을 배열입니다

 var markers = [],ea=5;

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    }; 
// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 


mapContainer.onwheel = function(e){
    e.stopPropagation();
}





// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();  

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

// 키워드로 장소를 검색합니다
searchPlaces();

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {

    var keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch( keyword, placesSearchCB); 
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}
// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    var listEl = document.getElementById('placesList'), 
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment(), 
    bounds = new kakao.maps.LatLngBounds(), 
    listStr = '';
    
    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    
    for ( var i=0; i<ea; i++ ) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i), 
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function(marker, title) {
            kakao.maps.event.addListener(marker, 'mouseover', function() {
                displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });

            itemEl.onmouseover =  function () {
                displayInfowindow(marker, title);
            };

            itemEl.onmouseout =  function () {
                infowindow.close();
            };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}


// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

    var el = document.createElement('li'),
    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span class="jibun gray">' +  places.address_name  + '</span>';
    } else {
        itemStr += '    <span>' +  places.address_name  + '</span>'; 
    }
                 
      itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage 
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i; 

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }

    for (i=1; i<=pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
    
    var content = '<div style="color:black;text-align: center !important; padding:10px; z-index:1; font-size:14px;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
}

 // 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {   
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}

//로컬 데이터 값 저장 (보전활동대상생물)
const localSave = document.querySelectorAll('.icon-box > ul > li  a')

localSave.forEach((item, i)=>{
item.onclick = (e)=>{
    //e.preventDefault();
    localStorage.setItem('animal', JSON.stringify({state:true,name:item.dataset.name}) )
    console.log(item.dataset.name)
    console.log(
        localStorage.getItem('animal')
    ) 
}
});

//맵 아이콘 클릭시 나오고 들어가기
const mapBtn = document.querySelector('.map-quick-btn'),
      mapQuick = document.querySelector('.map-quick');

mapBtn.onclick = function(){
    mapQuick.classList.toggle('active');

}