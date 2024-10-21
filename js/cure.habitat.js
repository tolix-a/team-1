document.addEventListener('DOMContentLoaded', function() {
    var popupOpen = document.querySelector('.popup-open');
    var popup = document.querySelector('.popup-wrap');
    
    // 이미지를 클릭하면 팝업을 보여줌
    popupOpen.addEventListener('click', function() {
       popup.style.display = 'flex';
    });
    
    // 닫기 버튼 클릭 시 팝업을 닫음 (a 태그)
    var closeButtonA = document.querySelector('.close-button-1'); // 첫 번째 a 태그 선택
    closeButtonA.addEventListener('click', function(e) {
       e.preventDefault(); // 기본 동작 방지 (링크 이동 X)
       popup.style.display = 'none';
    });
 
    var closeButtonA = document.querySelector('.close-button-2'); // 첫 번째 a 태그 선택
    closeButtonA.addEventListener('click', function(e) {
       e.preventDefault(); // 기본 동작 방지 (링크 이동 X)
       popup.style.display = 'none';
    });
 
 
    // 팝업 배경을 클릭하면 팝업을 닫음
    popup.addEventListener('click', function(e) {
       if (e.target !== this) return; // 이미지를 클릭하면 닫히지 않도록 함
       popup.style.display = 'none';
    });
}); 