fetch("./data/map.json")
.then(res => res.json())
.then(res => {
    const content_map = document.querySelector('.content_map');

    res.오시는길.forEach(Map => {
        let num=0,liTag='';
        for(let key in Map){
            num++;
            if(num>4){
                liTag += `<li>
                            <div>
                                <b>${key}</b>
                                <img src="./img/map/down.svg" alt="">
                            </div>
                            <p>${Map[key]}</p>
                          </li>`
            }
        };
        
        content_map.innerHTML +=   `<div>
                                        <b>아쿠아플라넷 ${Map.area}</b>
                                        <div class="map">
                                            <figure data-site="${Map.home}"><img src="${Map.img}"></figure>
                                            <div>
                                                <b>대표주소</b>
                                                <p>${Map.address}</p>
                                                <a href="${Map.home}" target='_blank'>자세한 위치 안내 보기</a>
                                                <br><br>
                                                <div class="move">
                                                    <div class="way">
                                                        <b>교통편</b>
                                                        <img src="./img/map/down.svg" alt="">
                                                    </div>
                                                    <ul>
                                                    ${liTag}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
    });


    const li = document.querySelectorAll('li');
    li.forEach((P)=>{
        P.onclick = function(){
            P.classList.toggle('active')
        }
    });
    
    const move = document.querySelectorAll('.move');
    move.forEach((U) => {
        U.onclick = function(){
            U.classList.toggle('active')
        };
    });

    
    let figure = document.querySelectorAll('.map figure');
    figure.forEach((img)=>{
        img.addEventListener("click",open)
        function open(){
            window.open(this.dataset.site, '_blank');
    
            // location.href = this.dataset.site;
            
        }

    })

    const map = document.querySelectorAll('.content_map > div');

    const interActive = function(i){
        i.forEach((map)=>{
            if(map.isIntersecting){
                map.target.classList.add('active');
            }
        })
    }
    
    const intersection = new IntersectionObserver(interActive);
    map.forEach((M)=>{
        intersection.observe(M);
    })

})