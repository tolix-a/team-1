fetch('./data/aqua_study.json')
.then(res => res.json())
.then(data=>{

    console.log(data.학습게시판_1page)

    let studyD = data.학습게시판_1page

    // 클래스 삭제 함수
    let rem = (del)=>{
        del.classList.remove('on')
    }
    // 클래스 생성 함수
    let add = (all,ad)=>{
        all.forEach((v,i)=>{
            v.classList.remove('on')
        })
        ad.classList.add('on')
    }

    const elContentCard = document.querySelector('main .content_cardlist');
    const elPage = document.querySelector('.content_research_list .page');
    // 데이터 자르기 한페이지당 8개 컨텐츠
    
    let studyData = [];
    for(let i=0; i < studyD.length; i+=8){
        studyData.push(studyD.slice(i,i+8));
    }





    // 페이지 버튼 생성
    console.log(studyData);
    let paging = ()=>{
        studyData.forEach((v,i)=>{
            elPage.innerHTML += `<a href="#" class="page-btn" id="page-btn">${i+1}</a>`
            if(i == 0){
                elPage.innerHTML = `<a href="#" class="page-btn on" id="page-btn">${i+1}</a>`
            }
        })

        const elPageBtn = document.querySelectorAll('.content_research_list .page .page-btn');
        elPageBtn.forEach((btn,pageNum)=>{
            
            btn.onclick = (a) => {
                a.preventDefault();
                itemPrint(pageNum);
                // 버튼클릭 클래스생성
                add(elPageBtn,btn)
                rem(elContentCard)
                // 마지막 페이지 클래스 추가
                if(pageNum == elPageBtn.length-1){
                    elContentCard.classList.add('on')
                    itemPrint(pageNum);
                    add(elPageBtn,btn)
                }else{
                    // a.preventDefault();
                itemPrint(pageNum);
                // 버튼클릭 클래스생성
                add(elPageBtn,btn)
                rem(elContentCard)
                }
            }            
        })
    }
    // 페이지 이동

    let itemPrint = (n) => {
        elContentCard.innerHTML = '';

        studyData[n].forEach((card,i)=>{
            elContentCard.innerHTML += `<figure class="content_card" id="${card.id}">
                                            <a href="study-detail.html">
                                                <p class="card-img">
                                                    <img src="./img/study/${card.detail[0]}" alt="">
                                                </p>
                                                <figcaption>
                                                    <p>${card.title}</p>
                                                </figcaption>
                                            </a>
                                        </figure>`
        })
        const card = document.querySelectorAll('.content_cardlist .content_card');
        card.forEach((v)=>{
            v.onclick = ()=>{
                localStorage.setItem('id',v.id);
            }
        })
    }

    itemPrint(0);
    paging();




    const search = document.querySelector('#searchTxt');
    const searchBtn = document.querySelector('#searchBtn');

    studyD.forEach((v,i)=>{



        let searching = function(){

            searchBtn.addEventListener('click', function(e){
                let searchD = studyD.filter((d) => d.title.includes(search.value))
        
                let searchData = [];
                for(let i=0; i<searchD.length; i+=8){
                    searchData.push(searchD.slice(i,i+8));
                }
        
                let searchPrint = function(s){
                    elContentCard.innerHTML = '';
                    searchData[s].forEach((a,b)=>{
                        elContentCard.innerHTML += `<figure class="content_card" id="${a.id}">
                                                        <a href="study-detail.html">
                                                            <p class="card-img">
                                                                <img src="./img/study/${a.detail[0]}" alt="">
                                                            </p>
                                                            <figcaption>
                                                                <p>${a.title}</p>
                                                            </figcaption>
                                                        </a>
                                                    </figure>`
                    })
        
                }
                searchPrint(0)
                paging();
            })
        } 
        searching();
        window.addEventListener('submit', function(e){
            e.preventDefault();
                searching();
        })
    })


})