fetch('./data/aqua_study.json')
.then(res => res.json())
.then(data=>{

    console.log(
        localStorage.getItem('id')
    )
    let studyData = data.학습게시판_1page
    console.log(studyData)
    console.log(localStorage.getItem('id')-1)
    const content = document.querySelector('.content_');
    let mainImg = '';
    studyData[localStorage.getItem('id')-1].detail.forEach(v => {
        mainImg += `<img src="./img/detail/${v}" alt="">`

        content.innerHTML = `<div class="research_list_menu">
                                <div class="list-title">
                                    <p>
                                        ${studyData[localStorage.getItem('id')-1].title}
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
    });
    localStorage.clear();
})