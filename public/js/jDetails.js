function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// const commaPrice = formatPrice(jewellery.price);
// getting userId
const checkUser = async () => {
    console.log("---checking user---")
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

const changeImage = async () => {
    console.log("<<changeImage started>>");

    const smallImage1 = document.querySelector(".img-container .small-images .small-image1");
    const smallImage2 = document.querySelector(".img-container .small-images .small-image2");
    const bigImage = document.querySelector(".img-container .big-image");
    const big2Image = document.querySelector(".j-details-container .img-container .big-image .big2")
    // const smallImage1Path = smallImage1.firstElementChild.getAttribute('src')
    // const smallImage2Path = smallImage2.firstElementChild.getAttribute('src')
    // const bigImagePath = bigImage.firstElementChild.getAttribute('src')
    smallImage1.style.opacity = .5;
    smallImage1.addEventListener("click", (event) => {
        event.preventDefault();
        if (big2Image.style.opacity == 1) {
            big2Image.style.opacity = 0;
            smallImage1.style.opacity = .5;
            smallImage2.style.opacity = 1;
        }
    })
    smallImage2.addEventListener("click", (event) => {
        event.preventDefault();
        if (big2Image.style.opacity == 0) {
            big2Image.style.opacity = 1;
            smallImage1.style.opacity = 1;
            smallImage2.style.opacity = .5;
        }

    })

    console.log(">>changeImage ended<<");

}



const showFav = async () => {
    console.log("<<showfav started>>");
    const favBtn = document.querySelector(".details-container .detail-book-fav .fav");
    const jewelleryId = document.querySelector(".details-container .detail-id").getAttribute("value");
    const userId = await checkUser();

    const res = await fetch("/jDetails/showFav", {
        method: "POST",
        body: JSON.stringify({ userId, jewelleryId }),
        headers: { 'Content-Type': 'application/json' }
    })

    const data = await res.json();
    if (data.inFav) {
        favBtn.name = "inFav";
        favBtn.textContent = "Remove from Favourites"
        console.log(favBtn.name)
        console.log("marked favourtie")
    }
    else if (data.notInFav) {
        favBtn.name = "notInFav";
        favBtn.textContent = "Add to Favourites"
        console.log(favBtn.name)
    }
    else if (data.err) {
        console.log("showFav>>>", data.err);
    }
    else {
        console.log("showFav>>> Unknown Error");
    }

    console.log(">>showfav ended<<")

}



const addRemFav = async () => {
    console.log("<<addRemFav started>>");

    const userId = await checkUser();
    const favBtn = document.querySelector(".details-container .detail-book-fav .fav");
    const jewelleryId = document.querySelector(".details-container .detail-id").getAttribute("value");


    favBtn.addEventListener("click", async (event) => {
        if (userId) {
            event.preventDefault();
            // console.log("favBtn Clicked");
            // console.log(jewelleryId);
            // console.log(userId);

            if (userId && favBtn.name == "notInFav") {
                const res = await fetch("/jDetails/addFav", {
                    method: "POST",
                    body: JSON.stringify({ jewelleryId, userId }),
                    headers: { 'Content-Type': 'application/json' }
                })
                const data = await res.json();
                if (data.add) {
                    favBtn.name = "inFav";
                    favBtn.textContent = "Remove from Favourites"
                    console.log("added favourites");
                    console.log(data.add)
                }
                else if (data.err) {
                    console.log("addFav>>>", data.err);
                }
                else {
                    console.log("addFav>>> Unknown Error");
                }
            }
            else if (userId && favBtn.name == "inFav") {
                const res = await fetch("/jDetails/remFav", {
                    method: "POST",
                    body: JSON.stringify({ jewelleryId, userId }),
                    headers: { 'Content-Type': 'application/json' }
                })
                const data = await res.json();
                if (data.rem) {
                    favBtn.name = "notInFav";
                    favBtn.textContent = "Add in Favourites"
                    console.log("removed favourites");
                    console.log(data.rem);
                }
                else if (data.err) {
                    console.log("remFav>>>", data.err);
                }
                else {
                    console.log("remFav>>> Unknown Error");
                }
            }
        } else if (!userId) {
            const userInPop = document.querySelector(".login-popup-section");
            userInPop.classList.add("active");
        }
    })
    console.log(">>addRemFav ended<<");
}



// const showBook = async () => {
//     console.log("<<showBook started>>");
//     const bookBtn = document.querySelector(".details-container .detail-book-fav .book");
//     const jewelleryId = document.querySelector(".details-container .detail-id").getAttribute("value");
//     const userId = await checkUser();

//     const res = await fetch("/jDetails/showBook", {
//         method: "POST",
//         body: JSON.stringify({ userId, jewelleryId }),
//         headers: { 'Content-Type': 'application/json' }
//     })

//     const data = await res.json();
//     if (data.inBook) {
//         bookBtn.name = "inBook";
//         bookBtn.textContent = "Cancel Booking";
//         console.log(bookBtn.name);
//         console.log("marked favourtie");
//     }
//     else if (data.notInBook) {
//         bookBtn.name = "notInBook";
//         bookBtn.textContent = "Book Now";
//         console.log(bookBtn.name);
//     }
//     else if (data.err) {
//         console.log("showBook>>>", data.err);
//     }
//     else {
//         console.log("showBook>>> Unknown Error");
//     }

//     console.log(">>showBook ended<<")

// }
const qtyIncDec = async () => {
    console.log("<<qtyIncDec started>>")
    let qtyCurrent = document.querySelector(".details-container .detail-qty .number");
    // let qtyCurrentValue = qtyCurrent.getAttribute("value");
    const qtyInc = document.querySelector(".details-container .detail-qty .increment button");
    const qtyDec = document.querySelector(".details-container .detail-qty .decrement button");
    const qtyFetched = parseInt(qtyCurrent.textContent);
    // console.log(qtyFetched)


    //setting is as 1 or 0 by default depend on qty
    if (parseInt(qtyCurrent.textContent) >= 1) {
        qtyCurrent.textContent = 1;
    }
    if (parseInt(qtyCurrent.textContent) == 0) {
        qtyCurrent.textContent = 0;
        qtyInc.style.backgroundColor = "grey";
        qtyDec.style.backgroundColor = "grey";
    }

    //to show disable enable increment button on load
    if (qtyCurrent.textContent == qtyFetched) {
        qtyInc.style.cursor = "not-allowed";
    }

    //to show disable enable decrement button on load
    if (qtyCurrent.textContent <= 1) {
        qtyDec.style.cursor = "not-allowed";
    }

    //to show disable enable increment button after each click
    qtyInc.addEventListener("click", (event) => {

        event.preventDefault();

        let qtyCurrentInt = parseInt(qtyCurrent.textContent);


        if (qtyCurrentInt == qtyFetched) {
            console.log("reached maximum qty");
            qtyInc.style.cursor = "not-allowed"
        }
        else if (qtyCurrentInt < qtyFetched) {
            qtyCurrent.textContent = parseInt(qtyCurrent.textContent) + 1;
            qtyDec.style.cursor = "pointer"
            if (qtyCurrent.textContent == qtyFetched) {
                qtyInc.style.cursor = "not-allowed";
            }
        }
    })

    //to show disable enable decrement button after each click
    qtyDec.addEventListener("click", (event) => {
        event.preventDefault();

        let qtyCurrentInt = parseInt(qtyCurrent.textContent);

        if (qtyCurrentInt == 1) {
            console.log("reached minimum qty 1");
            qtyDec.style.cursor = "not-allowed"

        }
        else if (qtyCurrentInt > 1) {
            qtyCurrent.textContent = parseInt(qtyCurrent.textContent) - 1;
            qtyInc.style.cursor = "pointer"
            if (qtyCurrent.textContent == 1) {
                qtyDec.style.cursor = "not-allowed";
            }
        }
    })
    console.log(">>qtyIncDec started<<")
}



//to add bookings
const addBook = async () => {
    console.log("<<addBook started>>");

    const bookBtn = document.querySelector(".details-container .detail-book-fav .book");
    const jewelleryId = document.querySelector(".details-container .detail-id").getAttribute("value");
    const userId = await checkUser();
    const price = document.querySelector(".detail-price p span");
    const basePriceInt = parseInt(price.textContent);
    price.textContent = formatPrice(basePriceInt)

    if (bookBtn) {
        bookBtn.addEventListener("click", (event) => {
            event.preventDefault();

            if (userId) {
                const qtyCurrent = document.querySelector(".details-container .detail-qty .number");
                const qty = parseInt(qtyCurrent.textContent);


                //getting details of popup to add active then to confirm or cancel booking
                // const priceFixed = document.querySelector(".details-container .detail-price span");
                const checkDetailsSection = document.querySelector(".check-details-section");
                let qtyPopup = document.querySelector(".check-details-section .booking-qty p");
                let pricePopup = document.querySelector(".check-details-section .booking-price p");
                const confirmBooking = document.querySelector(".check-details-section .confirm-btn");
                const cancelBooking = document.querySelector(".check-details-section .cancel-btn");



                // console.log(formatPrice(basePriceInt));

                //setting qty and popup before popup happens to show correct value;
                qtyPopup.textContent = qty;
                const totalPrice = basePriceInt * qty;
                const commaTotalPrice = formatPrice(totalPrice);
                // console.log(parseInt(textContent))
                // console.log(totalPrice);
                // const CommaTotalPrice = formatPrice(totalPrice);
                // commaPrice = commaPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                pricePopup.innerHTML = `<p>&#8377;${commaTotalPrice}</p>`;
                // pricePopup.innerHTML = `<p>&#8377;${CommaTotalPrice}</p>`;
                // console.log(price.textContent);
                // console.log(parseInt(price.textContent))
                //opening popup
                checkDetailsSection.classList.add("active");


                //confirm bokking button listener

                const confirmBookingListner = async (event) => {
                    event.preventDefault();
                    
                    const dark = document.querySelector(".dark");
                    dark.classList.add("active");
                    // console.log(qtyToSend, "send this instead")
                    if (userId && qty && jewelleryId && totalPrice) {
                        const res = await fetch("/jDetails/addBook", {
                            method: "POST",
                            body: JSON.stringify({ jewelleryId, userId, qty, totalPrice }),
                            headers: { 'Content-Type': 'application/json' }
                        })

                        const data = await res.json();

                        if (data.add && data.updateAck && data.updatedJewellery) {
                            console.log(`Id: ${data.add._id}\nModified Count: ${data.updateAck.modifiedCount}\navailability status: ${data.updatedJewellery.availability}\nquatity: ${data.updatedJewellery.qty}\n`);
                            //getting note popup details for active remove add
                            const noteSection = document.querySelector(".note-section");
                            const noteOpenBookingList = document.querySelector(".note-section .open-booking-list");
                            const noteCloseBtn = document.querySelector(".note-section .note-buttons .close-btn");

                            dark.classList.remove("active")

                            checkDetailsSection.classList.remove("active");
                            noteSection.classList.add("active");
                            console.log("here");
                            //for closing note popup
                            noteCloseBtn.addEventListener("click", (event) => {
                                event.preventDefault();
                                noteSection.classList.remove("active");
                                setTimeout(() => {
                                    location.reload();
                                }, 500)
                            })


                            //for opening booking list
                            noteOpenBookingList.addEventListener("click", (event) => {
                                event.preventDefault();
                                noteSection.classList.remove("active");
                                setTimeout(() => {
                                    location.reload();
                                }, 500)
                                setTimeout(() => {
                                    location.assign('/bookList');
                                }, 100);

                            })

                        }
                        else if (data.err) {
                            console.log("addBook>>>", data.err);
                        }
                        else {
                            console.log("addBook>>> Unknown Error");
                        }

                    }

                }
                cancelBooking.addEventListener("click", (event) => {
                    event.preventDefault();
                    checkDetailsSection.classList.remove("active");
                    confirmBooking.removeEventListener("click", confirmBookingListner)
                })
                confirmBooking.addEventListener("click", confirmBookingListner)

            } else if (!userId) {
                const userInPop = document.querySelector(".login-popup-section");
                userInPop.classList.add("active");
            }

            // else if (userId && bookBtn.name == "inBook") {
            //     const res = await fetch("/jDetails/remBook", {
            //         method: "POST",
            //         body: JSON.stringify({ jewelleryId, userId }),
            //         headers: { 'Content-Type': 'application/json' }
            //     })
            //     const data = await res.json();
            //     if (data.rem) {
            //         bookBtn.name = "notInBook";
            //         bookBtn.textContent = "Book Now"
            //         console.log("canceled booking");
            //         console.log(data.rem);
            //     }
            //     else if (data.err) {
            //         console.log("remBook>>>", data.err);
            //     }
            //     else {
            //         console.log("remBook>>> Unknown Error");
            //     }
            // }
        })
    }


    console.log(">>addBook ended<<");
}


window.addEventListener("load", async () => {
    await changeImage();
    await showFav();
    await addRemFav();
    await qtyIncDec()
    // await showBook();
    // await priceFormatting();
    await addBook();
})