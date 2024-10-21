
const li3 = document.querySelectorAll('.nine li');

let test = new IntersectionObserver(function(entry){
   entry.forEach((entry2)=>{
      if(entry2.isIntersecting){
         const di3 = entry2.target.querySelectorAll('.iconbox');
         di3.forEach((li,idx) => {
            setTimeout(() => {
               li.classList.add('observer');
            }, 200*idx);
         })
      }
   })
}, { threshold: 0.5 });

li3.forEach((i)=>{
   test.observe(i)
})




// window.addEventListener('load', function(){
//    const box = document.querySelectorAll('.iconbox');

//    let test = function(entry){
//       entry.forEach((e) => {
//          if(e.isIntersecting){
//             e.target.classList.add('observer');
//          }
//       })
//    }

//    const option = {threshold: 0.5};
//    const intersection = new IntersectionObserver(test,option);
   
//    box.forEach((i)=>{
//       intersection.observe(i)
//    })
// })