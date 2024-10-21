//트리거 클릭시 헤더메뉴 토글 기능
let nav = ()=>{
    const btnClose= document.querySelector('.trigger');
    const spanClose= document.querySelector('.longline');
    const elHeader= document.querySelector('header');
    const elArticle = document.querySelectorAll('article');
    
    let toggleFun = function(){
        elHeader.classList.toggle('active');   
    }
    btnClose.onclick = toggleFun;
    spanClose.onclick = toggleFun;

const pos = {y:0, dy:0, state:true}

window.addEventListener('scroll',()=>{
    
    pos.y = window.pageYOffset;
    pos.state = (pos.y > pos.dy) ? true: false ;
    pos.dy = pos.y;

    

    if(pos.state){
        //header 클래스 추가
        elHeader.classList.add('active2');
    }else{
        //header 클래스 삭제
        elHeader.classList.remove('active2');
    }
    if(pos.y > 500){
        elHeader.style.backgroundColor= "rgba(0,0,0,0.6)";
    }else{
        elHeader.style.backgroundColor= "";
    }
})
}

//제이쿼리 명령어로 헤더를 불러오기
$('body').prepend('<header></header>');
$('header').load('./header.html .header-wrap, .line',nav);
