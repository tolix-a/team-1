fetch('./data/aqua_study.json')
.then(res => res.json())
.then(data=>{

    let aquaD = data.수행연구

    console.log(aquaD)
    const recentContent = document.querySelector('.content_cardlist')
    const contentList = document.querySelector('.research_list');

    // 카드리스트 데이터 쪼개기
    let aquaData = [];
    for(let i=0; i<aquaD.length; i+=4){
        aquaData.push(aquaD.slice(i,i+4))
    }
    // 최근 수행연구 카드리스트 자료 출력
    aquaData[0].forEach(card => {
        recentContent.innerHTML += `<figure class="content_card" id="${card.id}">
                                        <a href="detail.html">
                                            <p class="card-img">
                                                <img src="./img/aqua/${card.detail[0]}" alt="">
                                            </p>
                                            <figcaption>
                                                <p>${card.title}</p>
                                                <p>${card.address}</p>
                                            </figcaption>
                                        </a>
                                    </figure>`
        
    });
    // card 컨텐츠 생성 후 변수 선언 및 id 저장소 저장
    const card = document.querySelectorAll('.content_card');

    card.forEach((v)=>{
        console.log(v.id)
        v.onclick = ()=>{
            localStorage.setItem('id',v.id);
        };
    });


    // 수행연구 리스트 출력
    aquaD.forEach((v,i)=>{
        contentList.innerHTML += `<li class="research_list_menu" id="${v.id}">
                                        <a href="detail.html">
                                            <div class="year">
                                                <p>${v.year}</p>
                                            </div>
                                            <div class="list-title">
                                                <p>
                                                    ${v.address}
                                                </p>
                                                <p>
                                                    ${v.title}
                                                </p>
                                            </div>
                                            <div class="list-go">
                                                <span>
                                                    <img src="./img/aqua/list-go.svg" alt="">
                                                </span>
                                            </div>
                                        </a>
                                    </li>`
    })

    // list 컨텐츠 생성 후 변수 선언 및 id 저장소 저장
    const list = document.querySelectorAll('.research_list_menu')

    list.forEach((a)=>{
        console.log(a.id)
        a.onclick = ()=>{
            localStorage.setItem('id',a.id);
        };
    });

    const search = document.querySelector('#searchTxt');
    const searchBtn = document.querySelector('#searchBtn');

    aquaD.forEach((v,i)=>{



        let searching = function(){

            searchBtn.addEventListener('click', function(e){
                let searchD = aquaD.filter((d) => d.title.includes(search.value))
        
                let searchPrint = function(s){
                    contentList.innerHTML = '';
                    searchD.forEach((a,b)=>{
                        contentList.innerHTML += `<li class="research_list_menu" id="${a.id}">
                                                    <a href="detail.html">
                                                        <div class="year">
                                                            <p>${a.year}</p>
                                                        </div>
                                                        <div class="list-title">
                                                            <p>
                                                                ${a.address}
                                                            </p>
                                                            <p>
                                                                ${a.title}
                                                            </p>
                                                        </div>
                                                        <div class="list-go">
                                                            <span>
                                                                <img src="./img/aqua/list-go.svg" alt="">
                                                            </span>
                                                        </div>
                                                    </a>
                                                </li>`
                    })
                }
                searchPrint(0)
                
                const resultF = document.querySelector('.content_list-top span');
                let total = searchD.length;
                resultF.innerHTML = `${total}`;
            })
        } 
        searching();
        window.addEventListener('submit', function(e){
            e.preventDefault();
            searching();
        })
    })






})