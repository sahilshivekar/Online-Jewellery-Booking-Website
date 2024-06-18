// const emailEntered = () => {
//     const form = document.querySelector(".forgot-body");

    
//     form.addEventListener('submit', async (event) => {
//         event.preventDefault();
        
//         const email = form.email.value;
//         const res = await fetch('/forgot/emailEntered',{
//             method:"POST",
//             body:JSON.stringify({email:email}),
//             headers: {'Content-Type':'application/json'}
//         });
//         const data = res.json();
//     })
// }







// window.addEventListener('load', emailEntered);