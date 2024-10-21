// const elui = document.querySelector('.content_ ul');

// let inter = new IntersectionObserver(function(entry){
//    entry.forEach((ele)=>{
//       if(ele.isIntersecting){
//          const eli = ele.target.querySelectorAll('.content_ li');
//          console.log(eli);
//          eli.forEach((li,idx)=>{
//             setTimeout(()=>{
//                li.classList.add('uppp');
//             }, 1000*idx)
//          })
//       }
//    })
// })

// inter.observe(elui)

window.addEventListener('load',function(){
   const eli = document.querySelectorAll('.content_ li');

   let actibe1 = function(entry){
      entry.forEach((e)=>{
         if(e.isIntersecting){
            e.target.classList.add('uppp');}
      })
   }

   const option = {threshold: 0.3};
   const intersection = new IntersectionObserver(actibe1,option);
   eli.forEach((list)=>{
      intersection.observe(list);
   })

})


