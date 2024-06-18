const afterChooseWay = () => {
    //for opening and closing of user login properly
    const customerOpn = document.querySelector(".choose-way-section #customer");
    const userInPop = document.querySelector(".login-popup-section");
    const choosePop = document.querySelector(".choose-way-section");
    const userIncls = document.querySelector(".login-popup-container .close-div");
    const newCustomer = document.querySelector(".login-popup-container .user-signup-call");

    customerOpn.addEventListener("click", () => {
        userInPop.classList.add("active");
        choosePop.classList.remove("active");
    });

    newCustomer.addEventListener("click", () => {
        userUpPop.classList.add("active");
        userInPop.classList.remove("active");
    });

    userIncls.addEventListener("click", () => {
        userInPop.classList.remove("active");
    })


    //for opening and closing of user signup
    const userUpPop = document.querySelector(".user-signup-section");
    const userUpcls = document.querySelector(".user-signup-section .popup-close-div");
    const AlreadyCustomer = document.querySelector(".user-signup-section .user-login-call");

    AlreadyCustomer.addEventListener("click", () => {
        userInPop.classList.add("active");
        userUpPop.classList.remove("active");
    });

    userUpcls.addEventListener("click", () => {
        userUpPop.classList.remove("active");
    })


    //for opening and closing of shopkeeper
    const adminOpn = document.querySelector(".choose-way-section #admin");
    const admincls = document.querySelector(".admin-section .popup-close-div");
    const adminPop = document.querySelector(".admin-section");

    admincls.addEventListener("click", () => {
        adminPop.classList.remove("active");
        // choosePop.classList.add("active");
    })

    adminOpn.addEventListener("click", async () => {

        const res = await fetch("/authentication/adminAlready", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        console.log(data);
        if (data.noAdmin) {
            adminPop.classList.add("active");
            choosePop.classList.remove("active");
        } else if (data.token) {
            console.log("already signed in");
            choosePop.classList.remove("active");
            const section = document.querySelector(".already-in-section");
            setTimeout(() => {
                section.classList.add("active");
            }, 500);
            setTimeout(() => {
                section.classList.remove("active");
                window.open("/admin", "_blank");
            }, 4000)

        }
    });

}


window.addEventListener("load", afterChooseWay)


//!user signup sending request__________________________________________________________________________
const userSignup = async () => {

    const formUserSignup = document.querySelector("#form-user-signup");
    const emailError = document.querySelector("#form-user-signup #email-error");
    const passwordError = document.querySelector("#form-user-signup #password-error");

    //listener to post the reuqest and get response
    formUserSignup.addEventListener('submit', async (event) => {
        event.preventDefault();

        //getting elements of form
        try {
            const email = formUserSignup.email.value;
            const password = formUserSignup.password.value;

            //writing the post request to get response
            const res = await fetch('/authentication/userSignup', {
                method: 'POST',
                body: JSON.stringify({ email: email, password: password }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();


            if (data.errors) {
                emailError.textContent = data.errors.email;
                passwordError.textContent = data.errors.password;
            } else {
                emailError.textContent = null;
                passwordError.textContent = null;
            }

            if (data.user) {
                const userUpPop = document.querySelector(".user-signup-section");
                userUpPop.classList.remove("active");
                setTimeout(() => {
                    location.reload('/');
                }, 500);
            }

        }
        catch (err) {
            console.log(err);
        }
    })
}
window.addEventListener("load", userSignup);


//!user login sending request__________________________________________________________________________
const userLogin = () => {

    const formUserLogin = document.querySelector("#form-user-login");
    const emailError = document.querySelector("#form-user-login #email-error");
    const passwordError = document.querySelector("#form-user-login #password-error");

    //listener to post the reuqest and get response
    formUserLogin.addEventListener('submit', async (event) => {
        event.preventDefault();

        //getting elements of form
        try {
            const email = formUserLogin.email.value;
            const password = formUserLogin.password.value;

            //writing the post request to get response
            const res = await fetch('/authentication/userSignin', {
                method: 'POST',
                body: JSON.stringify({ email: email, password: password }),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await res.json();
            console.log(data)
            if (data.errors) {
                emailError.textContent = data.errors.email;
                passwordError.textContent = data.errors.password;
            } else {
                emailError.textContent = null;
                passwordError.textContent = null;
            }

            if (data.user) {
                const userInPop = document.querySelector(".login-popup-section");
                userInPop.classList.remove("active");
                setTimeout(() => {
                    location.reload('/');
                }, 500);
            }
        }
        catch (err) {
            console.log(err);
        }
    })
}
window.addEventListener("load", userLogin);

//!admin login
const signinAdmin = async () => {

    const adminForm = document.querySelector("#admin-signin-form");
    const usernameError = document.querySelector("#username-error-admin")
    const passwordError = document.querySelector("#password-error-admin")

    // console.log(idError, passwordError)

    adminForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        try {
            const username = adminForm.username.value;
            const password = adminForm.password.value;

            const res = await fetch('/authentication/adminSignin', {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            })
            const data = await res.json();
            // console.log(data);

            if (data.admin) {
                console.log(data.admin);
                const adminPop = document.querySelector(".admin-section");
                adminPop.classList.remove("active");
                setTimeout(()=>{
                    window.open('/admin', '_blank');                    
                },500)
            }
            if (data.errors) {
                // console.log(data.errors)
                usernameError.textContent = data.errors.username;
                passwordError.textContent = data.errors.password;
            } else {
                usernameError.textContent = null;
                passwordError.textContent = null;
            }
        }

        catch (err) {
            console.log(`admin>>>>${err.message}`);
        }
    })
}

window.addEventListener("load", signinAdmin);

//!password toggle for all

const togglePassUserLogin = () => {


    const eye = document.querySelector(".login-popup-section .input-div span button")
    const passInput = document.querySelector(".login-popup-section .input-div .pass-input")
    eye.addEventListener("click", () => {
        const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
        if (type == 'text') {
            eye.innerHTML = '<i class="fa-solid fa-eye"></i>';
        } else {
            eye.innerHTML = '<i class="fa-sharp fa-solid fa-eye-slash"></i>'
        }
        passInput.setAttribute('type', type);
    })

}
window.addEventListener("load", togglePassUserLogin)

const togglePassUserSignup = () => {


    const eye = document.querySelector(".user-signup-section .input-div span button")
    const passInput = document.querySelector(".user-signup-section .input-div .pass-input")
    eye.addEventListener("click", () => {
        const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
        if (type == 'text') {
            eye.innerHTML = '<i class="fa-solid fa-eye"></i>';
        } else {
            eye.innerHTML = '<i class="fa-sharp fa-solid fa-eye-slash"></i>'
        }
        passInput.setAttribute('type', type);
    })

}
window.addEventListener("load", togglePassUserSignup)

const togglePasssAdmin = () => {


    const eye = document.querySelector(".admin-section .input-div span button")
    const passInput = document.querySelector(".admin-section .input-div .pass-input-admin")
    eye.addEventListener("click", () => {
        const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
        if (type == 'text') {
            eye.innerHTML = '<i class="fa-solid fa-eye"></i>';
        } else {
            eye.innerHTML = '<i class="fa-sharp fa-solid fa-eye-slash"></i>'
        }
        passInput.setAttribute('type', type);
    })

}
window.addEventListener("load", togglePasssAdmin)

