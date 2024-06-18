//!choose way starts___________________________________________________________________________________________

chooseWay = () => {


    //for opening and closing of choose way properly
    const accountBtn = document.querySelector("#account-div-empty");
    const choosePop = document.querySelector(".choose-way-section");
    const chooseCls = document.querySelector(".choose-way-section .close-div");
    if (accountBtn) {
        accountBtn.addEventListener("click", () => {
            choosePop.classList.add("active");
        })
        chooseCls.addEventListener("click", () => {
            choosePop.classList.remove("active");
        })

    }
}


window.addEventListener("load", chooseWay)
//!choose way ends_____________________________________________________________________________________________



//!dashboard opening user

const userProfile = () => {
    const proBtn = document.querySelector("#account-div-userProfile");
    if (proBtn) {
        proBtn.addEventListener('click', async () => {
            location.assign('/userAccount');
        })
    }
}
window.addEventListener("load", userProfile);


//!favourites opening
const favList = () => {
    const favBtn = document.querySelector("#favorites-div");
    if (favBtn) {
        favBtn.addEventListener('click', async () => {
            location.assign('/favList');
        })
    }
}

window.addEventListener("load", favList);


//!bookings opening
const bookList = () => {
    const bookBtn = document.querySelector("#bookings-div");
    if (bookBtn) {
        bookBtn.addEventListener('click', async () => {
            location.assign('/bookList');
        })
    }
}

window.addEventListener("load", bookList);



const searchBar = () => {
    const searchForm = document.querySelector("#search-bar-container");
    const searchBtn = document.querySelector("#search-logo-div");

    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const toSearch = searchForm.searchInput.value;
        const searchInp = document.querySelector("#search-bar-input");
        searchInp.value = toSearch;
        location.assign(`/jList?toSearch=${toSearch}`);
        // toSearch.value = toSearch.searchInput.value;

    })
}


window.addEventListener("load", searchBar);