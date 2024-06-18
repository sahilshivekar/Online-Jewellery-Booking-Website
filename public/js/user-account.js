//!listeners for opening and closing of edit popup
const userDash = () => {
  const editBtn = document.querySelector("#edit-btn");
  const editPop = document.querySelector(".edit-popup-section");
  const editCls = document.querySelector("#cancel-close-popup");


  editBtn.addEventListener("click", () => {
    editPop.classList.add("active");
  })
  editCls.addEventListener("click", () => {
    editPop.classList.remove("active")
  })


}
window.addEventListener("load", userDash);


//!user logout
const logout = async () => {

  const logoutBtn = document.querySelector("#logout-user");

  logoutBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const res = await fetch('/userAccount/logout', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      if (res.ok) {
        location.assign('/');
      }
    } catch (err) {
      console.log(err);
    }

  })
}


window.addEventListener("load", logout);


//!save info of user

const saveInfo = () => {
  const form = document.querySelector("#edit-user-form");

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      const email = form.email.value;
      const phone = form.phone.value;
      const fullName = form.fullName.value;
      const dob = form.dob.value;

      const fullNameError = document.querySelector("#fullName-error");
      const dobError = document.querySelector("#dob-error");
      const phoneError = document.querySelector("#phone-error");



      const res = await fetch('/userAccount/saveInfo', {
        method: 'PUT',
        body: JSON.stringify({ email: email, phone: phone, fullName: fullName, dob: dob }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (res.ok) {
        location.assign('/userAccount');
      }
      if(data.errors){
        fullNameError.textContent = data.errors.fullName;
        dobError.textContent = data.errors.dob;
        phoneError.textContent = data.errors.phone;
      }else{
        fullNameError.textContent = null;
        dobError.textContent = null;
        phoneError.textContent = null;
      }
      
    } catch (err) {
      console.log(err);
    }


  })
}



window.addEventListener('load', saveInfo);