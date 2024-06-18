function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// const commaPrice = formatPrice(jewellery.price);
//getting userId
const checkUser = async () => {
    console.log("-----checking user-----")
    try {
        const res = await fetch('/jList/user', {
            method: "GET",
            headers: { 'Content-Type': 'application/josn' }
        })
        const data = await res.json();
        if (data.userId) {
            return data.userId;
        }
        else {
            return null;
        }
    } catch (err) {
        console.log("checkUser>>> ", err.message);
        return null;
    }


}




//show list favourites
const showList = async () => {
    console.log("showList starts")
    const parentDiv = document.querySelector(".show-section .show-list");
    const cards = document.querySelectorAll(".show-section .show-list .j-card");
    const userId = await checkUser();

    if (userId) {
        const res = await fetch("/bookList/getBookings", {
            method: "POST",
            body: JSON.stringify({ userId }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        console.log(data.Array);
        if (data.Array) {
            const array = data.Array;
            array.forEach((booking) => {
                const bookingDateString = booking.createdAt;
                const bookingDate = new Date(bookingDateString)
                console.log(typeof bookingDate)

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
                            

                            <div class="cancel-booking">
                                <i class="fa-solid fa-trash"></i>
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
                            </div>
                            <div class="details-value">
                                <div class="booking-id check-details-div">
                                    <p>${booking._id}</p>
                                </div>
                                <div class="booking-name check-details-div">
                                    <p>${booking.name}</p>
                                </div>
                                <div class="booking-category check-details-div">
                                    <p>${booking.category} </p>
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
            <p>Dear Customer, You don't have any acitve bookings now.</p>
            </div>
            `
        }

    }
    else {
        console.log("user is not logged in");
    }
    console.log("showList ends");

}








//cancel booking
const remBook = async () => {

    console.log("remove booking Starts");
    const cancelBtns = document.querySelectorAll(".item-container .cancel-booking");
    const userId = await checkUser();



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


            const res = await fetch("/bookList/getBookingSingle", {
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


            const cancelBtn2 = document.querySelector(".cancel-booking-section .cancel-btn");
            const cancelBookingSection = document.querySelector(".cancel-booking-section");
            cancelBookingSection.classList.add("active");
            const noBtn = document.querySelector(".cancel-booking-section .no-btn");


            const cancelBookingListner = async (event) => {
                event.preventDefault();

                const dark = document.querySelector(".dark");
                dark.classList.add("active");

                const res = await fetch("/bookList/remBook", {
                    method: "POST",
                    body: JSON.stringify({ userId, jewelleryId, qtyBooked, _id }),
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
                        <p>Dear Customer, You don't have any acitve bookings now.</p>
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




window.addEventListener("load", async () => {
    await showList();
    await remBook();
});