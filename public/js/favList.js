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
        const res = await fetch("/favList/getFavourites", {
            method: "POST",
            body: JSON.stringify({ userId }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        // console.log(data.Array);
        if (data.Array) {
            const array = data.Array;
            array.forEach((jewellery) => {
                const commaPrice = formatPrice(jewellery.price);

                parentDiv.innerHTML += `
                <div class="j-card">
                    <input class="j-id" type="hidden" value=${jewellery._id}>
                    <div class="delete-fav">
                        <i class="fa-solid fa-trash"></i>
                    </div>
        
                    <div class="j-card-element-img">
                        <img class="img1" src=${jewellery.picture1}>
                        <img class="img2" src=${jewellery.picture2}>
                    </div>
        
                    <div class="j-card-element">
                        <div class="name">
                            ${jewellery.name}
                        </div>
                    </div>
        
                    <div class="j-card-element">
                        <div class="price">
                            &#8377;${commaPrice}
                        </div>
                    </div>
        
                </div>`
                console.log("Inside loop");

            })
        }
        else if (data.err) {
            console.log("favList>>>>>>", err.message);
        }
        else if (data.Array == null) {
            console.log("null array no favs");
            parentDiv.innerHTML = `
            <div class="no-jewellery">
                <p>Dear Customer, You don't have any jewelleries marked as a favourite.</p>
            </div>
            `
        }

    }
    else {
        console.log("user is not logged in");
    }
    console.log("showList ends");

}








//delete from favourites
const removeFav = async () => {

    console.log("remove Starts");
    const trashBtns = document.querySelectorAll(".delete-fav");
    const emptyArray = []
    const userId = await checkUser();


    trashBtns.forEach((trashBtn) => {

        trashBtn.addEventListener("click", async () => {
            const jewelleryId = trashBtn.previousElementSibling.value;
            const trashBtnClass = trashBtn.firstElementChild.getAttribute("class")
            const Card = trashBtn.parentElement;
            const cardParent = Card.parentElement;

            if (trashBtnClass == `fa-solid fa-trash`) {
                const res = await fetch("/favList/remFav", {
                    method: "POST",
                    body: JSON.stringify({ userId, jewelleryId }),
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await res.json();
                if (data.delAck) {
                    console.log("removed from favourites")
                    cardParent.removeChild(Card);
                    console.log("Removed:", data.delAck.acknowledged, "Count:", data.delAck.deletedCount);
                    console.log("Remaining Favs:", cardParent.childElementCount);
                    if (cardParent.childElementCount == 0) {
                        cardParent.innerHTML = `
                            <div class="no-jewellery">
                                <p>Dear Customer, You don't have any jewelleries marked as a favourite</p>
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
            }
        })
    })
    console.log("remove ends")
}


const openDetails = async () => {
    console.log("open Details starts");

    const imgsDiv = document.querySelectorAll(".j-card .j-card-element-img")
    console.log(imgsDiv);
    let card;
    imgsDiv.forEach((imgDiv) => {
        const cardId = imgDiv.previousElementSibling.previousElementSibling.value;
        // console.log(card.childNodes[5].firstElementChild)
        imgDiv.addEventListener("click", async (event) => {
            event.preventDefault();
            console.log("clicked on card")
            console.log(cardId)
            if (cardId) {
                window.open(`/jDetails?cardId=${cardId}`, "_blank");
            }

        })
    })
    console.log("open details ends");
}


window.addEventListener("load", async () => {
    await showList();
    await removeFav();
    await openDetails();
});