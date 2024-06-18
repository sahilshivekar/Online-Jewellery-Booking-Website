//!user logout
const logout = async () => {

    const logoutBtn = document.querySelector(".logout button");

    logoutBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        try {
            const res = await fetch('/admin/logout', {
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

const mostFav = async () => {
    const mostFavBtn = document.querySelector(".most-fav");

    mostFavBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        location.assign('/AdminMostFav');

    })
}

const topSellers = async () => {
    const topSellersBtn = document.querySelector(".top-sellers");

    topSellersBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        location.assign('/adminTopSellers');

    })
}

const usersDetails = async () => {
    const usersDetailsBtn = document.querySelector(".users-details");

    usersDetailsBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        location.assign('/adminUsersDetails');

    })
}

const manageBookings = async () => {
    const manageBookingsBtn = document.querySelector(".manage-bookings");

    manageBookingsBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        location.assign('/adminManageBookings');

    })
}
const addJ = async () => {
    const addJBtn = document.querySelector(".addJ");

    addJBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        location.assign('/adminAddJ');

    })
}
const readJ = async () => {
    const readJBtn = document.querySelector(".readJ");

    readJBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        location.assign('/adminReadJ');

    })
}
const updateJ = async () => {
    const updateJBtn = document.querySelector(".updateJ");

    updateJBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        location.assign('/adminUpdateJ');

    })
}




const remJ = async () => {
    const remJBtn = document.querySelector(".remJ");

    remJBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        location.assign('/adminRemJ');

    })
}
window.addEventListener("load", async () => {
    await logout();
    await mostFav();
    await topSellers();
    await usersDetails();
    await manageBookings();
    await addJ();
    await remJ();
    await updateJ();
    await readJ();
});