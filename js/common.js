

//트리거 클릭시 헤더메뉴 토글 기능
let nav = ()=>{
    const btnClose= document.querySelector('.trigger');
    const spanClose= document.querySelector('.longline');
    const elHeader= document.querySelector('header');
    const elArticle = document.querySelectorAll('article');
    const btnNav= document.querySelectorAll('header nav > ul > li');
    
    let toggleFun = function(){
        elHeader.classList.toggle('active'); 
    }
    btnClose.onclick = toggleFun;
    spanClose.onclick = toggleFun;

    btnNav.forEach((navLi,i)=>{
        navLi.onclick = function(e){
            // e.preventDefault();
            btnNav.forEach((delLi)=>{delLi.classList.remove('active')});
            this.classList.add('active'); 
        }
    })


//마우스 휠 기능시 내릴때 숨고 올릴때 생기고 올릴때 하얀배경색
    elArticle.forEach((article,i)=>{
        article.addEventListener('wheel',function(e){
            try{
                let idx;
                if(e.deltaY > 0){
                    idx = this.nextElementSibling.offsetTop;
                    elHeader.classList.add('active2');
                }else{          
                    idx = this.previousElementSibling.offsetTop;
                    elHeader.classList.remove('active2');
                    if(idx!==0){
                        elHeader.style.backgroundColor= "rgba(255,255,255,0.3)";
                    }else{
                        elHeader.style.backgroundColor= "";
                    }
                }                    
            }catch{}
        });
    })
}


//제이쿼리 명령어로 헤더를 불러오기
$('body').prepend('<header></header>');
$('header').load('./header.html .header-wrap, .line',nav);


