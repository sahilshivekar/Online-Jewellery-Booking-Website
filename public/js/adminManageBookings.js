// const { checkUser } = require("../../controller/bookListController");

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//show list favourites
const showList = async () => {
    console.log("showList starts")
    const parentDiv = document.querySelector(".show-section .show-list");
    const cards = document.querySelectorAll(".show-section .show-list .j-card");

    const res = await fetch("/adminManageBookings/getBookings", {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    console.log(data.Array);
    if (data.Array) {
        const array = data.Array;
        array.forEach((booking) => {
            const bookingDateString = booking.createdAt;
            const bookingDate = new Date(bookingDateString)
            // console.log(typeof bookingDate)
            // <i class="fa-solid fa-trash"></i>
            const commaPrice = formatPrice(booking.totalPrice);

            parentDiv.innerHTML += `
                        <div class="item-container">

                            <input value="${booking.jewelleryId}" hidden>
                            <input value="${booking._id}" hidden>
                            <input value="${booking.qty}" hidden>
                            <input value="${booking.category}" hidden>
                            <input value="${booking.totalPrice}" hidden>
                            <input value="${booking.name}" hidden>
                            <input value="${booking.picture2}" hidden>
                            

                            <div class="mark-sold-booking">
                                <button>Mark as Sold</button>
                            </div>
                            <div class="cancel-booking">
                                <button>Cancel Booking</button>
                            </div>

                            <div class="image2">
                                <img src="${booking.picture1}"
                                    alt="failed to load image">
                                <img src="${booking.picture2}"
                                    alt="failed to load image">
                            </div>

                            <div class="details-label">
                                <div class="check-details-div">
                                    <label>Booking ID</label>
                                </div>
                                <div class="check-details-div">
                                    <label>User's EmailID</label>
                                </div>
                                <div class="check-details-div">
                                    <label>Jewellery Name</label>
                                </div>
                                <div class="check-details-div">
                                    <label>Category</label>
                                </div>
                                <div class="check-details-div">
                                    <label>Quantity</label>
                                </div>
                                <div class="check-details-div">
                                    <label>Booking Date</label>
                                </div>
                                <div class="check-details-div">
                                    <label>Total Price</label>
                                </div>
                            </div>
                            <div class="details-colon">
                                <div class="check-details-div">
                                    <p>:</p>
                                </div>
                                <div class="check-details-div">
                                    <p>:</p>
                                </div>
                                <div class="check-details-div">
                                    <p>:</p>
                                </div>
                                <div class="check-details-div">
                                    <p>:</p>
                                </div>
                                <div class="check-details-div">
                                    <p>:</p>
                                </div>
                                <div class="check-details-div">
                                    <p>:</p>
                                </div>
                                <div class="check-details-div">
                                    <p>:</p>
                                </div>
                            </div>
                            <div class="details-value">
                                <div class="booking-id check-details-div">
                                    <p>${booking._id}</p>
                                </div>
                                <div class="booking-category check-details-div">
                                    <p>${booking.email} </p>
                                </div>
                                <div class="booking-name check-details-div">
                                    <p>${booking.name}</p>
                                </div>
                                <div class="booking-name check-details-div">
                                    <p>${booking.category}</p>
                                </div>
                                <div class="booking-qty check-details-div">
                                    <p>${booking.qty}</p>
                                </div>
                                <div class="booking-date check-details-div">
                                    <p>${bookingDate.toLocaleDateString('en-IN')}</p>
                                </div>
                                <div class="booking-price check-details-div">
                                    <p>&#8377;${commaPrice}</p>
                                </div>
                            </div>
                        </div>
                `
            console.log("Inside loop");

        })
    }
    else if (data.err) {
        console.log("bookList>>>>>>", err.message);
    }
    else if (data.Array == null) {
        console.log("null array no bookings");
        parentDiv.innerHTML = `
            <div class="no-jewellery">
            <p>There are no active bookings!</p>
            </div>
            `
    }

}



//cancel booking
const remBook = async () => {
    // const userId = await checkUser();
    console.log("remove booking Starts");
    const cancelBtns = document.querySelectorAll(".item-container .cancel-booking");



    cancelBtns.forEach(async (cancelBtn1) => {
        cancelBtn1.addEventListener("click", async () => {

            const card = cancelBtn1.parentElement;
            const cardsParent = card.parentElement;
            const jewelleryId = card.childNodes[1].getAttribute('value');
            const _id = card.childNodes[3].getAttribute('value');
            const qtyBooked = parseInt(card.childNodes[5].getAttribute('value'));

            //getting popup to <p> to know where to add
            const showJewelleryName = document.querySelector(".cancel-booking-section .booking-name p")
            const showJewelleryQty = document.querySelector(".cancel-booking-section .booking-qty p")
            const showJewelleryCategory = document.querySelector(".cancel-booking-section .booking-category p")
            const showJewelleryPrice = document.querySelector(".cancel-booking-section .booking-price p")
            const showBookingP2 = document.querySelector(".cancel-booking-section .image-of-jewellery img")


            const res = await fetch("/adminManageBookings/getBookingSingle", {
                method: "POST",
                body: JSON.stringify({ _id }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            if (data.Details) {
                console.log(data.Details);

                showJewelleryName.innerHTML = data.Details.name;
                showJewelleryQty.innerHTML = data.Details.qty;
                showJewelleryCategory.innerHTML = data.Details.category;

                const commaPrice = formatPrice(data.Details.totalPrice);

                showJewelleryPrice.innerHTML = "&#8377;" + commaPrice
                showBookingP2.setAttribute('src', data.Details.picture2)
            }


            const cancelBtn2 = document.querySelector(".cancel-booking-section .cancel-btn");
            const cancelBookingSection = document.querySelector(".cancel-booking-section");
            cancelBookingSection.classList.add("active");
            const noBtn = document.querySelector(".cancel-booking-section .no-btn");


            const cancelBookingListner = async (event) => {
                event.preventDefault();

                const dark = document.querySelector(".dark");
                dark.classList.add("active");
                const res = await fetch("/adminManageBookings/remBook", {
                    method: "POST",
                    body: JSON.stringify({ jewelleryId, qtyBooked, _id }),
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await res.json();
                if (data.delAck && data.addQty) {
                    console.log("Booking is canceled")
                    cardsParent.removeChild(card);
                    console.log("Removed:", data.delAck.acknowledged, "Count:", data.delAck.deletedCount);
                    console.log("Remaining bookings:", cardsParent.childElementCount);
                    if (cardsParent.childElementCount == 0) {
                        cardsParent.innerHTML = `
                        <div class="no-jewellery">
                        <p>There are no active bookings!</p>
                        </div>
                        `
                        
                    }
                }
                else if (data.err) {
                    console.log("trashBtn>>>", data.err);
                }
                else {
                    console.log("trashBtn>>>Unknown error");
                }
                dark.classList.remove("active");
                cancelBookingSection.classList.remove("active");
                // alert("Jewellery booking is canceled and email is sent");

            }

            cancelBtn2.addEventListener("click", cancelBookingListner)

            //if we don't remove the old event listner then if i use nobtn on ohter jewelleries then after i do cancle boolking on one jewellery it deletes all
            noBtn.addEventListener("click", (event) => {
                event.preventDefault();
                cancelBookingSection.classList.remove("active");
                cancelBtn2.removeEventListener("click", cancelBookingListner);
            })


        })
    })
    console.log("cancel booking ends")
}



//cancel booking
const markSold = async () => {

    console.log("mark sold booking Starts");
    const markSoldBtns = document.querySelectorAll(".item-container .mark-sold-booking");


    markSoldBtns.forEach(async (markSoldBtn1) => {
        markSoldBtn1.addEventListener("click", async () => {

            const card = markSoldBtn1.parentElement;
            const cardsParent = card.parentElement;
            const jewelleryId = card.childNodes[1].getAttribute('value');
            const _id = card.childNodes[3].getAttribute('value');
            const qtyBooked = parseInt(card.childNodes[5].getAttribute('value'));

            //getting popup to <p> to know where to add
            const showJewelleryName = document.querySelector(".mark-booking-section .booking-name p")
            const showJewelleryQty = document.querySelector(".mark-booking-section .booking-qty p")
            const showJewelleryCategory = document.querySelector(".mark-booking-section .booking-category p")
            const showJewelleryPrice = document.querySelector(".mark-booking-section .booking-price p")
            const showBookingP2 = document.querySelector(".mark-booking-section .image-of-jewellery img")


            const res = await fetch("/adminManageBookings/getBookingSingle", {
                method: "POST",
                body: JSON.stringify({ _id }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            if (data.Details) {
                console.log(data.Details);

                showJewelleryName.innerHTML = data.Details.name;
                showJewelleryQty.innerHTML = data.Details.qty;
                showJewelleryCategory.innerHTML = data.Details.category;

                const commaPrice = formatPrice(data.Details.totalPrice);

                showJewelleryPrice.innerHTML = "&#8377;" + commaPrice;
                showBookingP2.setAttribute('src', data.Details.picture2)
            }


            const markBtn2 = document.querySelector(".mark-booking-section .mark-btn");
            const markBookingSection = document.querySelector(".mark-booking-section");
            markBookingSection.classList.add("active");
            const noBtn = document.querySelector(".mark-booking-section .no-btn");


            const markBookingListner = async (event) => {
                event.preventDefault();
                const dark = document.querySelector(".dark");
                dark.classList.add("active");

                const res = await fetch("/adminManageBookings/markSold", {
                    method: "POST",
                    body: JSON.stringify({ jewelleryId, qtyBooked, _id }),
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await res.json();
                if (data.delAck && data.newJ) {
                    console.log("Marked")
                    cardsParent.removeChild(card);
                    console.log("Removed:", data.delAck.acknowledged, "Count:", data.delAck.deletedCount);
                    console.log("Remaining bookings:", cardsParent.childElementCount);
                    if (cardsParent.childElementCount == 0) {
                        cardsParent.innerHTML = `
                        <div class="no-jewellery">
                        <p>There are no active bookings!</p>
                        </div>
                        `
                    }
                }
                else if (data.err) {
                    console.log("mark sold Btn>>>", data.err);
                }
                else {
                    console.log("mark sold Btn>>>Unknown error");
                }
                dark.classList.remove("active");
                markBookingSection.classList.remove("active");
                // alert("Jewellery is Marked as sold and email is sent");
            }

            markBtn2.addEventListener("click", markBookingListner)

            //if we don't remove the old event listner then if i use nobtn on ohter jewelleries then after i do cancle boolking on one jewellery it deletes all
            noBtn.addEventListener("click", (event) => {
                event.preventDefault();
                markBookingSection.classList.remove("active");

                markBtn2.removeEventListener("click", markBookingListner);
            })
        })
    })
    console.log("mark sold booking ends")
}




const search = async () => {
    const searchInp = document.querySelector("#search-bar-input");
    const searchBtn = document.querySelector("#search-logo-div");
    const parentDiv = document.querySelector(".show-list");


    searchBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const toSearch = searchInp.value;
        console.log(toSearch)

        // if (toSearch.length != 0) {
        const res = await fetch("/adminManageBookings/search", {
            method: "POST",
            body: JSON.stringify({ toSearch }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        console.log(data);

        // searchInp.value = toSearch;

        console.log("yes", toSearch);

        if (data.newJewellery.length == 0) {
            // while (parentDiv.firstChild) {
            //     parentDiv.removeChild(parentDiv.firstChild);
            // }
            console.log("null array no matches");

            parentDiv.innerHTML = `
                    <div class="no-jewellery">
                        <p>Dear admin, bookings with your search are not found.</p>
                    </div>
                    `
        } else if (data.newJewellery) {
            const jArray = data.newJewellery;
            console.log(jArray)
            while (parentDiv.firstChild) {
                parentDiv.removeChild(parentDiv.firstChild);
            }
            jArray.forEach((booking) => {
                // console.log(jewellery._id)
                const bookingDateString = booking.createdAt;
                const bookingDate = new Date(bookingDateString)
                // console.log(typeof bookingDate)
                // <i class="fa-solid fa-trash"></i>
                const commaPrice = formatPrice(booking.totalPrice);


                // const commaPrice = formatPrice(booking.price);
                const name = booking.name;
                const cropName = (name.length > 40) ? name.slice(0, 50) + '...' : name;
                // const commaPrice = formatPrice(jewellery.price);

                parentDiv.innerHTML += `
                        <div class="item-container">

                            <input value="${booking.jewelleryId}" hidden>
                            <input value="${booking._id}" hidden>
                            <input value="${booking.qty}" hidden>
                            <input value="${booking.category}" hidden>
                            <input value="${booking.totalPrice}" hidden>
                            <input value="${booking.name}" hidden>
                            <input value="${booking.picture2}" hidden>
                            

                            <div class="mark-sold-booking">
                                <button>Mark as Sold</button>
                            </div>
                            <div class="cancel-booking">
                                <button>Cancel Booking</button>
                            </div>

                            <div class="image2">
                                <img src="${booking.picture1}"
                                    alt="failed to load image">
                                <img src="${booking.picture2}"
                                    alt="failed to load image">
                            </div>

                            <div class="details-label">
                                <div class="check-details-div">
                                    <label>Booking ID</label>
                                </div>
                                <div class="check-details-div">
                                    <label>User's EmailID</label>
                                </div>
                                <div class="check-details-div">
                                    <label>Jewellery Name</label>
                                </div>
                                <div class="check-details-div">
                                    <label>Category</label>
                                </div>
                                <div class="check-details-div">
                                    <label>Quantity</label>
                                </div>
                                <div class="check-details-div">
                                    <label>Booking Date</label>
                                </div>
                                <div class="check-details-div">
                                    <label>Total Price</label>
                                </div>
                            </div>
                            <div class="details-colon">
                                <div class="check-details-div">
                                    <p>:</p>
                                </div>
                                <div class="check-details-div">
                                    <p>:</p>
                                </div>
                                <div class="check-details-div">
                                    <p>:</p>
                                </div>
                                <div class="check-details-div">
                                    <p>:</p>
                                </div>
                                <div class="check-details-div">
                                    <p>:</p>
                                </div>
                                <div class="check-details-div">
                                    <p>:</p>
                                </div>
                                <div class="check-details-div">
                                    <p>:</p>
                                </div>
                            </div>
                            <div class="details-value">
                                <div class="booking-id check-details-div">
                                    <p>${booking._id}</p>
                                </div>
                                <div class="booking-category check-details-div">
                                    <p>${booking.email} </p>
                                </div>
                                <div class="booking-name check-details-div">
                                    <p>${booking.name}</p>
                                </div>
                                <div class="booking-name check-details-div">
                                    <p>${booking.category}</p>
                                </div>
                                <div class="booking-qty check-details-div">
                                    <p>${booking.qty}</p>
                                </div>
                                <div class="booking-date check-details-div">
                                    <p>${bookingDate.toLocaleDateString('en-IN')}</p>
                                </div>
                                <div class="booking-price check-details-div">
                                    <p>&#8377;${commaPrice}</p>
                                </div>
                            </div>
                        </div>
                `
            });

        } else if (data.err) {

            console.log("search>>>>>>", err.message);
        }
        await remBook();
        await markSold();



    })
}

window.addEventListener("load", async () => {
    await showList();
    await remBook();
    await markSold();
    await search();
});