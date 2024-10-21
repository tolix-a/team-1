$(window).scroll(function(){
    if( $(this).scrollTop() > 100 ){
        $("#top-btn").addClass("top-btn-on");
        }
        else{
        $("#top-btn").removeClass("top-btn-on");
    }
});

    

$("#top-btn").click(function(){
window.scrollTo({top : 0, behavior: 'smooth'});
});

$(document).ready(function(){
    $(".familysitesgo").click(function(){
        $(".family_menu").toggleClass("family_menu_on");
        $(".familyarrow").toggleClass("familyarrow_on");
        $(".familysitesgo").toggleClass("familysitesgo_on");

        });
})


