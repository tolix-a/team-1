fetch('./data/rescue.json')
.then(res => res.json())
.then(data=>{

    // type별 변수
    // let dolphin = data.rescue.돌고래
    // let turtle = data.rescue.바다거북
    // let otter0 = data.rescue.수달
    // let shark = data.rescue.고래상어
    // let triton = data.rescue.나팔고둥

            // 탭버튼
    const tabNav = document.querySelector('.tab .nav'),
            tab = document.querySelector('.tab'),
            tabLi = document.querySelectorAll('.tab-menu >li'),
            tabA = document.querySelectorAll('.tab-menu >li a'),
            // 상세내용
            ListWrap = document.querySelector('.structure-list-wrap'),
            elTxt = document.querySelector('.content_txt')
            contentBox = document.querySelector('.structure-list-wrap ul');

    console.log(data.rescue)
    
    let add = (all,ad)=>{
        all.forEach((v,i)=>{
            v.classList.remove('active')
        })
        ad.classList.add('active')
    }


    

    let a = (n)=>{

        contentBox.innerHTML = '';
        data.rescue.forEach((v,i) => {
            
            if(n == i){
                v.items.forEach((item,num)=>{

                    
                    let imgHtml = '';
                    item.photo.forEach((img,b)=>{
                    imgHtml += `<figure class="swiper-slide"><img src="./img/rescue/${img}" alt="${v.title}구조이미지${item.id}"></figure>`
                    })

                        elTxt.innerText = `${v.explain}`
                        contentBox.innerHTML += `<li>
                                                <div class="structure-txt">
                                                    <time>${item.date}</time>
                                                    <dl>
                                                        <div class="row-flex">
                                                        <dt>구조 대상:</dt>
                                                        <dd>${item.who}</dd>
                                                        </div>
                                                        <div class="row-flex">
                                                        <dt>구조 장소:</dt>
                                                        <dd>${item.place}</dd>
                                                        </div>
                                                        <div class="row-flex">
                                                        <dt>구조 과정:</dt>
                                                        <dd>${item.process}</dd>
                                                        </div>
                                                    </dl>
                                                </div>
                                                <div class="structure-img">
                                                <div class="swiper-wrapper">
                                                    ${imgHtml}                                   
                                                    </div>
                                                    <div class="swiper-button-next"></div>
                                                    <div class="swiper-button-prev"></div>
                                                    <div class="swiper-pagination"></div>
                                                </div>
                                            </li>`    
                    
                
                });
            }
            
        })
        var swiper = new Swiper('.structure-img', {
            slidesPerView: 4,       
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                },
                on: {
                resize: function () {
                    // swiper.changeDirection(getDirection());
                },
                },
            });

    }

    tabLi.forEach((tab,index)=>{
        tab.onclick = (e)=>{
            e.preventDefault()
            add(tabLi,tab);
            a(index)
        }
    })

    let n = 0;
    let rescue = JSON.parse(localStorage.getItem('rescue'));
    switch(rescue.name){
        case "돌고래" : n=0; break;
        case "바다거북" : n=1; break;
        case "수달" : n=2; break;
    }
    (rescue.status) ? tabLi[n].click() : a(0);
    rescue.status = false;
    localStorage.setItem('rescue',JSON.stringify(rescue))



    
// window.onblur
// window.onfocuse
    
    // data.rescue.forEach((data,i)=>{
    //     console.log(data.title == '돌고래')
    //     // 메인에서 local값 받아서 화면 띄우기
    //     a()
    //     let aaa = localStorage.getItem('rescue')
        
    //     aaa = JSON.parse(  {status:false, name:'바다거북'}  )
    
    //     if(aaa.status){
    //         tabLi.forEach((tab,index)=>{
    //                 add(tabLi,tab);
    //                 a(index)
    //         })
    //         bbb(aaa.name)
    //     }else{
    //     bbb('돌고래')
    //     }
    // })








})