function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//   const commaPrice = formatPrice(jewellery.price);
//show list favourites
const showList = async () => {
    console.log("showList starts")
    const parentDiv = document.querySelector(".show-section .show-list");
    const cards = document.querySelectorAll(".show-section .show-list .j-card");

    const res = await fetch("/adminTopSellers/getTopSellers", {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    console.log(data.topSellers);
    if (data.topSellers) {
        const array = data.topSellers;
        array.forEach((jewellery) => {
            const commaPrice = formatPrice(jewellery.price);

            parentDiv.innerHTML += `
                        <div class="item-container">

                            <input value="${jewellery.jewelleryId}" hidden>
                            <input value="${jewellery._id}" hidden>
                            <input value="${jewellery.qty}" hidden>
                            <input value="${jewellery.category}" hidden>
                            <input value="${jewellery.price}" hidden>
                            <input value="${jewellery.name}" hidden>
                            <input value="${jewellery.picture2}" hidden>
                            

                            <div class="image2">
                                <img src="${jewellery.picture1}"
                                    alt="failed to load image">
                                <img src="${jewellery.picture2}"
                                    alt="failed to load image">
                            </div>

                            <div class="details-label">
                                <div class="check-details-div">
                                    <label>Jewellery ID</label>
                                </div>
                                <div class="check-details-div">
                                    <label>Jewellery Name</label>
                                </div>
                                <div class="check-details-div">
                                    <label>Category</label>
                                </div>
                                <div class="check-details-div">
                                    <label>Total times sold</label>
                                </div>
                                <div class="check-details-div">
                                    <label>Price</label>
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
                            </div>
                            <div class="details-value">
                                <div class="booking-id check-details-div">
                                    <p>${jewellery._id}</p>
                                </div>
                                <div class="booking-category check-details-div">
                                    <p>${jewellery.name} </p>
                                </div>
                                <div class="booking-name check-details-div">
                                    <p>${jewellery.category}</p>
                                </div>
                                <div class="booking-name check-details-div">
                                    <p>${jewellery.soldCount}</p>
                                </div>
                                <div class="booking-qty check-details-div">
                                    <p>&#8377;${commaPrice}</p>
                                </div>
                                
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
        console.log("null array no jewelleries");
        parentDiv.innerHTML = `
            <div class="no-jewellery">
                <p>There are no jewelleries marked as favourite!</p>
            </div>
            `
    }

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
            const res = await fetch("/adminTopSellers/search", {
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
                        <p>Dear admin, jewelleries with your search are not found.</p>
                    </div>
                    `
            } else if (data.newJewellery) {
                const jArray = data.newJewellery;
                console.log(jArray)
                while (parentDiv.firstChild) {
                    parentDiv.removeChild(parentDiv.firstChild);
                }
                jArray.forEach((jewellery) => {
                    // console.log(jewellery._id)
                    const commaPrice = formatPrice(jewellery.price);
                    const name = jewellery.name;
                    const cropName = (name.length > 40) ? name.slice(0, 50) + '...' : name;
                    // const commaPrice = formatPrice(jewellery.price);

                    parentDiv.innerHTML += `
                        <div class="item-container">

                            <input value="${jewellery.jewelleryId}" hidden>
                            <input value="${jewellery._id}" hidden>
                            <input value="${jewellery.qty}" hidden>
                            <input value="${jewellery.category}" hidden>
                            <input value="${jewellery.price}" hidden>
                            <input value="${jewellery.name}" hidden>
                            <input value="${jewellery.picture2}" hidden>
                            

                            <div class="image2">
                                <img src="${jewellery.picture1}"
                                    alt="failed to load image">
                                <img src="${jewellery.picture2}"
                                    alt="failed to load image">
                            </div>

                            <div class="details-label">
                                <div class="check-details-div">
                                    <label>Jewellery ID</label>
                                </div>
                                <div class="check-details-div">
                                    <label>Jewellery Name</label>
                                </div>
                                <div class="check-details-div">
                                    <label>Category</label>
                                </div>
                                <div class="check-details-div">
                                    <label>Total times sold</label>
                                </div>
                                <div class="check-details-div">
                                    <label>Price</label>
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
                            </div>
                            <div class="details-value">
                                <div class="booking-id check-details-div">
                                    <p>${jewellery._id}</p>
                                </div>
                                <div class="booking-category check-details-div">
                                    <p>${jewellery.name} </p>
                                </div>
                                <div class="booking-name check-details-div">
                                    <p>${jewellery.category}</p>
                                </div>
                                <div class="booking-name check-details-div">
                                    <p>${jewellery.sold}</p>
                                </div>
                                <div class="booking-qty check-details-div">
                                    <p>&#8377;${commaPrice}</p>
                                </div>
                                
                                </div>
                            </div>
                        </div>
                `
                });

            } else if (data.err) {

                console.log("search>>>>>>", err.message);
            }
        // }
        // else{
            // location.reload('/')
        // }



    })
}

window.addEventListener("load", async () => {
    await showList();
    await search();
});