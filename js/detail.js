fetch('./data/aqua_study.json')
.then(res => res.json())
.then(data=>{

    let detailData = data.수행연구

    // console.log(detailData)
    // console.log(localStorage.getItem('id'))
    // console.log(detailData[localStorage.getItem('id')-1].detail)
    
    const content= document.querySelector('.content_');

    // 이중배열로 되어있는 사진 데이터 반복해서 쌓기
    let mainImg = '';
    detailData[localStorage.getItem('id')-1].detail.forEach(v => {
        mainImg += `<img src="./img/detail/${v}" alt="">`
    });


    content.innerHTML = `<div class="research_list_menu">
                            <div class="year">
                                <p>${detailData[localStorage.getItem('id')-1].year}</p>
                            </div>
                            <div class="list-title">
                                <p>
                                    ${detailData[localStorage.getItem('id')-1].address}
                                </p>
                                <p>
                                    ${detailData[localStorage.getItem('id')-1].title}
                                </p>
                            </div>
                        </div>
                        <p class="detail-content">
                            ${mainImg}
                        </p>
                        <div class="line">
                            <span class="content-line"></span>
                            <a href="aqua.html" class="list">목록</a>
                        </div>`

    // 저장소 id가 사라져야 다시 다른 정보가 들어와 데이터가 알맞게 들어감.
    localStorage.clear();
})