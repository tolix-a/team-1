
const aLi = document.querySelector('.animali');

fetch("./data/animal.json")
.then((res)=>res.json())
.then((data)=>{
   
   //탭에 동물목록 뿌리는 함수
   let tabAll = (type)=>{
      aLi.innerHTML = '';
      data.대상생물.forEach(a => {
            a.contents.forEach(b =>{
               if (type === a.type || type === '전체'){
               aLi.innerHTML += `<figure class="popup-open" data-num="${b.title}">
                                    <img src="./img/animal/${b.photo}" alt="">
                                    <figcaption>${b.title}</figcaption>
                                 </figure>`;
               }
            })
      
      const pop = document.querySelectorAll('.popup-open');
      const popWrap = document.querySelector('.popup-wrap');
   
      // const scrollup = document.querySelector('.animali');
      let inter = new IntersectionObserver(function(entry){
         entry.forEach((ee)=>{
            if(ee.isIntersecting){
               const supli = ee.target.querySelectorAll('.popup-open');
               supli.forEach((fa,idx)=>{
                  setTimeout(()=>{
                     fa.classList.add('animation');
                  }, 200*idx)
               })
            }
         });
      })
      inter.observe(aLi)
      


   //팝업 내용물
   pop.forEach((pp,o)=>{
      let ppap = (title)=>{
         data.대상생물.forEach(x => {
            x.contents.forEach(y =>{
               console.log(y)
               if (title === y.title){
               popWrap.innerHTML = `
               <div class="popup">
                  <p class="name">${y.title}</p>
                  <a href="#" class="close-button-1"><img src="./img/animal/icon-close.svg" alt=""></a>
                  <div class="content">
                     <figure class="animalphoto"><img src="./img/animal/${y.photo}"></figure>
                     <p>${y.detail}</p>
                  </div>
                  <a href="#" class="close-button-2">닫기</a>
               </div>`;
               }
            })
         })
      }

      //팝업 펭귄 해마 이미지 위치조정
      pp.addEventListener('click', ()=>{
         const popName = pp.dataset.num;

         ppap(popName)
         popWrap.classList.add('active');

         if(popName === '펭귄'){
            popWrap.classList.add('top')
         }
         if(popName === '해마'){
            popWrap.classList.add('down')
         }
         
         //팝업 안에 닫기 버튼 활성화
         const closeA = document.querySelector('.close-button-1'); 
         closeA.addEventListener('click', function(e) {
            e.preventDefault();
            popWrap.classList.remove('active');
            popWrap.classList.remove('top');
            popWrap.classList.remove('down');
         });
         
         const closeB = document.querySelector('.close-button-2');
         closeB.addEventListener('click', function(e) {
            e.preventDefault(); 
            popWrap.classList.remove('active');
            popWrap.classList.remove('top');
            popWrap.classList.remove('down');
         });
      })
      
   })
      });
   }
   tabAll('전체');

   //팝업 열고 닫기
   const menuLi = document.querySelectorAll('.tab-menu li');
   
   menuLi.forEach((li,i) => {
      li.addEventListener('click', () => {
         aLi.innerHTML = '';
         const tabName = li.dataset.num;
      
            tabAll(tabName);
            menuLi.forEach(menu => menu.classList.remove('active'));
            li.classList.add('active');
            
      })
   })

   //메인 버튼 클릭시 동물 탭 바로 열리게
   let a = JSON.parse( localStorage.getItem('animal'))
   if( a.state ){
      tabAll(a.name);
      menuLi.forEach((li,i)=>{
         if(a.name === li.dataset.num){
            menuLi[i].click();
         }
      })

      a.state = false;
      localStorage.animal = JSON.stringify(a);
   }else{tabAll('전체');}

   
})




