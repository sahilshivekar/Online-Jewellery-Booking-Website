function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}




const getJewelleries = async () => {
    const list = document.querySelector('#show-list-container');

    const res = await fetch('/jList/getJewelleries', {
        method: 'GET',
        headers: { 'Content-Type': 'appplication/json' }
    });
    const data = await res.json();
    // console.log(data);

    const jArray = data.data;
    jArray.forEach((jewellery) => {
        const commaPrice = formatPrice(jewellery.price);
        // console.log(name.slice(0,30));
        // console.log(name.length);
        // if (name.length > 40) {
        //     const cropName = name.slice(0, 40) + '...';
        // }
        const name = jewellery.name;
        const cropName = (name.length > 40) ? name.slice(0, 50) + '...' : name;
        // console.log(jewellery._id)
        list.innerHTML += `
        <div class="j-item">
        <input id="${jewellery._id}" type="hidden">
        <img src="${jewellery.picture2}" alt="">
            <div class="text-detail-item">
                <div class="name">${cropName}</div>
                    <div class="text-detail-bottom">
                        <p class="category">${jewellery.category}</p>
                        <p class="price">&#8377;${commaPrice}</p>
                    </div>
            </div>
        </div>
        `;

    })
}

const openDetails = async () => {
    const items = document.querySelectorAll('.j-item');
    // console.log(items)
    items.forEach(async (item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();

            const id = item.firstElementChild.getAttribute('id');
            // console.log(id);

            location.assign(`/adminRemJForm?id=${id}`);
        })
    })
}

const search = async () => {
    const searchInp = document.querySelector("#search-bar-input");
    const searchBtn = document.querySelector("#search-logo-div");
    const parentDiv = document.querySelector("#show-list-container");


    searchBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const toSearch = searchInp.value;
        console.log(toSearch)
        const res = await fetch("/jList/search", {
            method: "POST",
            body: JSON.stringify({ toSearch }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        console.log(data);

            console.log("yes", toSearch);
            
            if (data.jewellery.length == 0) {
                // while (parentDiv.firstChild) {
                //     parentDiv.removeChild(parentDiv.firstChild);
                // }
                console.log("null array no matches");

                parentDiv.innerHTML = `
                <div class="no-jewellery">
                    <p>Dear admin, jewelleries with your search are not found.</p>
                </div>
                `
            } else if (data.jewellery) {
                const jArray = data.jewellery;
                console.log(jArray)
                while (parentDiv.firstChild) {
                    parentDiv.removeChild(parentDiv.firstChild);
                }
                jArray.forEach((jewellery) => {
                    // console.log(jewellery._id)
                    const commaPrice = formatPrice(jewellery.price);
                    const name = jewellery.name;
                    const cropName = (name.length > 40) ? name.slice(0, 50) + '...' : name;
                    parentDiv.innerHTML += `
                    <div class="j-item">
                        <input id="${jewellery._id}" type="hidden">
                        <img src="${jewellery.picture2}" alt="">
                        <div class="text-detail-item">
                            <div class="name">${cropName}</div>
                            <div class="text-detail-bottom">
                                <p class="category">${jewellery.category}</p>
                                <p class="price">&#8377;${commaPrice}</p>
                            </div>
                        </div>
                    </div>
                    `;

                })
                await openDetails();

            } else if (data.err) {

                console.log("search>>>>>>", err.message);
            }

        
    })
}


document.addEventListener('DOMContentLoaded', async () => {
    await getJewelleries();
    await openDetails();
    await search();
});