
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//sending request to get products and showing them!
const getJewelleries = async () => {

    console.log("getJewelleries Started")

    const parentDiv = document.querySelector(".cards-section .cards-div");

    const res = await fetch("/jList/getJewelleries", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json();
    // console.log(typeof data)
    // console.log(typeof data.data)
    const jArray = data.data;
    const commaPrice = formatPrice(jewellery.price);
    jArray.forEach((jewellery) => {
        // console.log(jewellery._id)
        parentDiv.innerHTML += `
        <div class="j-card" >
            <input class="j-id" type="hidden" value=${jewellery._id}>
            <div class="add-fav">
                <i class="fa-regular fa-heart"></i>
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

        </div>`;

    })

    console.log("getJewelleries Ended")
}









//getting userId
const checkUser = async () => {
    try {
        const res = await fetch('/jList/user', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
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










//show that it is in fav or not with heart filled  on screen load
const showFavOnLoad = async () => {
    console.log("showfav started");
    const favBtns = document.querySelectorAll(".cards-section .cards-div .j-card .add-fav");

    const emptyArray = []
    const userId = await checkUser();


    const arrayCreate = () => {
        for (i = 0; i < favBtns.length; i++) {
            emptyArray[i] = favBtns[i].previousElementSibling.value;
            if (i + 1 == favBtns.length) {
                return emptyArray;
            }
        }
    }
    const jArray = arrayCreate();
    // console.log(jArray)

    const res = await fetch("/jList/showFav", {
        method: "POST",
        body: JSON.stringify({ userId, jArray }),
        headers: { 'Content-Type': 'application/json' }
    })

    const data = await res.json();
    if (data.resFavIds) {
        const favJdata = data.resFavIds;

        favBtns.forEach((favBtn) => {
            const favBtnSibValue = favBtn.previousElementSibling.value;
            // console.log(favBtnSibValue)
            favJdata.forEach((favJ) => {
                if (favJ) {
                    const jewelleryId = favJ.jewelleryId;
                    if (jewelleryId === favBtnSibValue) {
                        favBtn.innerHTML = `<i class="fa-solid fa-heart"></i>`
                    }
                }
            })
        })
        console.log("marked all favourties")
    }
    else if (data.resFavIds == null) {
        console.log("null array to show fav");
    }
    else if (data.err) {
        console.log("showFav>>>", data.err);
    }
    else {
        console.log("showFav>>> Unknown Error");
    }

    console.log("showfav ended")

}












//sorting popup
const sortPopup = async () => {
    const select = document.querySelector(".filter-sort-section .sort .select");
    const selected = document.querySelector(".filter-sort-section .sort .select .selected");
    const menu = document.querySelector(".filter-sort-section .sort .menu");
    const options = document.querySelectorAll(".filter-sort-section .sort .menu li");



    select.addEventListener("click", (event) => {
        event.preventDefault();
        // console.log("hhhhh clicked")
        select.classList.toggle("select-clicked");
        menu.classList.toggle("menu-open");
    })

    options.forEach(async (option) => {
        option.addEventListener("click", async () => {

            selected.textContent = option.textContent;
            // console.log(selected.textContent);
            select.classList.remove("select-clicked")
            menu.classList.remove("menu-open")

            options.forEach((option) => {
                option.classList.remove("active");
            })
            option.classList.add("active");
            await sortBackend();


        })


    })


}

const sortBackend = async () => {
    const selected = document.querySelector(".filter-sort-section .sort .select .selected");

    const parentDiv = document.querySelector(".cards-section .cards-div");
    const cards = document.querySelectorAll(".j-card");
    const jewelleryIds = [];

    cards.forEach((card) => {
        const jewelleryId = card.firstElementChild.getAttribute('value');
        jewelleryIds.push(jewelleryId);
    })

    console.log(jewelleryIds);
    const current = selected.textContent;
    const res = await fetch("/jList/sort", {
        method: "POST",
        body: JSON.stringify({ current, jewelleryIds }),
        headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json();
    console.log(data)
    
    if (data.sorted.length == 0) {

        while (parentDiv.firstChild) {
            parentDiv.removeChild(parentDiv.firstChild);
        }
        console.log("null array no matches");
        
        parentDiv.innerHTML = `
        <div class="no-jewellery">
            <p>Dear Customer, jewelleries with your specifications are not found.</p>
        </div>
        `
    } else if (data.sorted) {

        while (parentDiv.firstChild) {
            parentDiv.removeChild(parentDiv.firstChild);
        }
        const jArray = data.sorted;
        console.log(jArray)
        jArray.forEach((jewellery) => {



            // console.log(formatPrice(jewellery.price));
            console.log("inside for each j sort")

            const commaPrice = formatPrice(jewellery.price);
            parentDiv.innerHTML += `
        <div class="j-card" >
            <input class="j-id" type="hidden" value=${jewellery._id}>
            <div class="add-fav">
                <i class="fa-regular fa-heart"></i>
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

        </div>`;
        })
    } else if (data.err) {
        console.log("filter>>>>>>", err.message);
    }

    if (selected.textContent != 'Most Favourites') {
        mostLink.style.backgroundColor = 'white';
        mostLink.style.borderBottom = "3px solid transparent";
        mostLink.addEventListener('mouseover', () => {
            mostLink.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
            mostLink.style.color = "var(--dark-theme)";
            mostLink.style.transition = "0.2s ease";
            mostLink.style.borderBottom = "3px solid var(--dark-theme)";
        });
        mostLink.addEventListener('mouseout', () => {
            mostLink.style.backgroundColor = 'white';
            mostLink.style.borderBottom = "3px solid transparent";
        });
    }
    if (selected.textContent != 'Best Sellers') {
        bestLink.style.backgroundColor = 'white';
        bestLink.style.borderBottom = "3px solid transparent";
        bestLink.addEventListener('mouseover', () => {
            bestLink.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
            bestLink.style.color = "var(--dark-theme)";
            bestLink.style.transition = "0.2s ease";
            bestLink.style.borderBottom = "3px solid var(--dark-theme)";
        });
        bestLink.addEventListener('mouseout', () => {
            bestLink.style.backgroundColor = 'white';
            bestLink.style.borderBottom = "3px solid transparent";
        });
    }
    await showFavOnLoad();
    await addRemFav();
    await openDetails();
}










//filter popup 
const filterPopup = async () => {

    //!only open close of popup filter
    const filterButton = document.querySelector(".filter-sort-section .filter-button");
    const closeFilter = document.querySelector(".filter-popup-section .close-filter");
    const filterPopupSec = document.querySelector(".filter-popup-section");
    const filterPopupCon = document.querySelector(".filter-popup-container");

    filterButton.addEventListener("click", () => {
        filterPopupSec.classList.add("active");
        filterPopupCon.classList.add("active");
    })
    closeFilter.addEventListener("click", () => {
        filterPopupSec.classList.remove("active");
        filterPopupCon.classList.remove("active");
    })


    //!only category input option open close
    const categoryShow = document.querySelector(".filter-popup-section .show-filter-option.category");
    const categoryInput = document.querySelector(".filter-popup-section .input-filter-option.category");
    const categoryCaret = document.querySelector(".filter-popup-section .option-caret.category");

    categoryShow.addEventListener("click", () => {
        categoryShow.classList.toggle("selected");
        categoryInput.classList.toggle("active");
        categoryCaret.classList.toggle("rotate");
    })

    //!only type input option open close
    const typeShow = document.querySelector(".filter-popup-section .show-filter-option.type");
    const typeInput = document.querySelector(".filter-popup-section .input-filter-option.type");
    const typeCaret = document.querySelector(".filter-popup-section .option-caret.type");

    typeShow.addEventListener("click", () => {
        typeShow.classList.toggle("selected");
        typeInput.classList.toggle("active");
        typeCaret.classList.toggle("rotate");
    })

    //!only purity input option open close
    const purityShow = document.querySelector(".filter-popup-section .show-filter-option.purity");
    const purityInput = document.querySelector(".filter-popup-section .input-filter-option.purity");
    const purityCaret = document.querySelector(".filter-popup-section .option-caret.purity");

    purityShow.addEventListener("click", () => {
        purityShow.classList.toggle("selected");
        purityInput.classList.toggle("active");
        purityCaret.classList.toggle("rotate");
    })

    // //!only price input option open close
    // const priceShow = document.querySelector(".filter-popup-section .show-filter-option.price");
    // const priceInput = document.querySelector(".filter-popup-section .input-filter-option.price");
    // const priceCaret = document.querySelector(".filter-popup-section .option-caret.price");

    // priceShow.addEventListener("click", () => {
    //     priceShow.classList.toggle("selected");
    //     priceInput.classList.toggle("active");
    //     priceCaret.classList.toggle("rotate");
    // })

    //!only gender input option open close
    const genderShow = document.querySelector(".filter-popup-section .show-filter-option.gender");
    const genderInput = document.querySelector(".filter-popup-section .input-filter-option.gender");
    const genderCaret = document.querySelector(".filter-popup-section .option-caret.gender");

    genderShow.addEventListener("click", () => {
        genderShow.classList.toggle("selected");
        genderInput.classList.toggle("active");
        genderCaret.classList.toggle("rotate");
    })






    const filter = document.querySelector(".filter-form");



    const rings = document.querySelector('.input-checkbox input[ value="rings"]');
    const necklaces = document.querySelector('.input-checkbox input[ value="necklaces"]');
    const goldcoins = document.querySelector('.input-checkbox input[ value="goldcoins"]');
    const earrings = document.querySelector('.input-checkbox input[ value="earrings"]');
    const pendants = document.querySelector('.input-checkbox input[ value="pendants"]');
    const bracelets = document.querySelector('.input-checkbox input[ value="bracelets"]');
    const chains = document.querySelector('.input-checkbox input[ value="chains"]');
    const bangles = document.querySelector('.input-checkbox input[ value="bangles"]');
    const nosepins = document.querySelector('.input-checkbox input[ value="nosepins"]');
    const mangalsutras = document.querySelector('.input-checkbox input[ value="mangalsutras"]');



    const gold = document.querySelector('.input-checkbox input[ value="gold"]');
    const diamond = document.querySelector('.input-checkbox input[ value="diamond"]');
    const silver = document.querySelector('.input-checkbox input[ value="silver"]');



    const nine = document.querySelector('.input-checkbox input[ value="9"]');
    const ten = document.querySelector('.input-checkbox input[ value="10"]');
    const fourteen = document.querySelector('.input-checkbox input[ value="14"]');
    const eighteen = document.querySelector('.input-checkbox input[ value="18"]');
    const twentytwo = document.querySelector('.input-checkbox input[ value="22"]');
    const twentyfour = document.querySelector('.input-checkbox input[ value="24"]');



    const male = document.querySelector('.input-checkbox input[ value="male"]');
    const female = document.querySelector('.input-checkbox input[ value="female"]');
    const unisex = document.querySelector('.input-checkbox input[ value="unisex"]');

    const filterSection = document.querySelector(".filter-popup-section");


    filter.addEventListener("submit", async (event) => {
        event.preventDefault();

        const ringsC = rings.checked;
        const necklacesC = necklaces.checked;
        const goldcoinsC = goldcoins.checked;
        const earringsC = earrings.checked;
        const pendantsC = pendants.checked;
        const braceletsC = bracelets.checked;
        const chainsC = chains.checked;
        const banglesC = bangles.checked;
        const nosepinsC = nosepins.checked;
        const mangalsutrasC = mangalsutras.checked;



        const goldC = gold.checked;
        const diamondC = diamond.checked;
        const silverC = silver.checked;


        const nineC = nine.checked;
        const tenC = ten.checked;
        const fourteenC = fourteen.checked;
        const eighteenC = eighteen.checked;
        const twentytwoC = twentytwo.checked;
        const twentyfourC = twentyfour.checked;



        const maleC = male.checked;
        const femaleC = female.checked;
        const unisexC = unisex.checked;


        if (diamondC == false) {
            diamondLink.style.backgroundColor = 'white';
            diamondLink.style.borderBottom = "3px solid transparent";
            diamondLink.addEventListener('mouseover', () => {
                diamondLink.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                diamondLink.style.color = "var(--dark-theme)";
                diamondLink.style.transition = "0.2s ease";
                diamondLink.style.borderBottom = "3px solid var(--dark-theme)";
            });
            diamondLink.addEventListener('mouseout', () => {
                diamondLink.style.backgroundColor = 'white';
                diamondLink.style.borderBottom = "3px solid transparent";
            });
        }
        if (goldC == false) {
            goldLink.style.backgroundColor = 'white';
            goldLink.style.borderBottom = "3px solid transparent";
            goldLink.addEventListener('mouseover', () => {
                goldLink.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                goldLink.style.color = "var(--dark-theme)";
                goldLink.style.transition = "0.2s ease";
                goldLink.style.borderBottom = "3px solid var(--dark-theme)";
            });
            goldLink.addEventListener('mouseout', () => {
                goldLink.style.backgroundColor = 'white';
                goldLink.style.borderBottom = "3px solid transparent";
            });
        }
        if (maleC == false) {
            menLink.style.backgroundColor = 'white';
            menLink.style.borderBottom = "3px solid transparent";
            menLink.addEventListener('mouseover', () => {
                menLink.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                menLink.style.color = "var(--dark-theme)";
                menLink.style.transition = "0.2s ease";
                menLink.style.borderBottom = "3px solid var(--dark-theme)";
            });
            menLink.addEventListener('mouseout', () => {
                menLink.style.backgroundColor = 'white';
                menLink.style.borderBottom = "3px solid transparent";
            });
        }
        if (femaleC == false) {
            womenLink.style.backgroundColor = 'white';
            womenLink.style.borderBottom = "3px solid transparent";
            womenLink.addEventListener('mouseover', () => {
                womenLink.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                womenLink.style.color = "var(--dark-theme)";
                womenLink.style.transition = "0.2s ease";
                womenLink.style.borderBottom = "3px solid var(--dark-theme)";
            });
            womenLink.addEventListener('mouseout', () => {
                womenLink.style.backgroundColor = 'white';
                womenLink.style.borderBottom = "3px solid transparent";
            });
        }
        if (ringsC || necklacesC || goldcoinsC || earringsC || pendantsC || braceletsC || chainsC || banglesC || nosepinsC || mangalsutrasC) {
            allLink.style.backgroundColor = 'white';
            allLink.style.borderBottom = "3px solid transparent";
            allLink.addEventListener('mouseover', () => {
                allLink.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                allLink.style.color = "var(--dark-theme)";
                allLink.style.transition = "0.2s ease";
                allLink.style.borderBottom = "3px solid var(--dark-theme)";
            });
            allLink.addEventListener('mouseout', () => {
                allLink.style.backgroundColor = 'white';
                allLink.style.borderBottom = "3px solid transparent";
            });
        }
        //removing type links click;
        //  allLink.style.backgroundColor = 'white';
        //  allLink.style.borderBottom = "3px solid transparent";




        const res = await fetch('/jlist/filter', {
            method: 'POST',
            body: JSON.stringify({
                ringsC,
                necklacesC,
                goldcoinsC,
                earringsC,
                pendantsC,
                braceletsC,
                chainsC,
                banglesC,
                nosepinsC,
                mangalsutrasC,
                goldC,
                diamondC,
                silverC,
                nineC,
                tenC,
                fourteenC,
                eighteenC,
                twentytwoC,
                twentyfourC,
                maleC,
                femaleC,
                unisexC,
                // minPrice,
                // maxPrice
            }),
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json();
        // console.log(data.filtered.length);

        const parentDiv = document.querySelector(".cards-section .cards-div");

        if (data.filtered.length == 0) {
            // console.log(data.filtered.filtered);
            filterSection.classList.remove("active")

            while (parentDiv.firstChild) {
                parentDiv.removeChild(parentDiv.firstChild);
            }
            console.log("null array no matches");
            // parentDiv.style.display = "flex";
            parentDiv.innerHTML = `
            <div class="no-jewellery">
                <p>Dear Customer, jewelleries with your specifications are not found.</p>
            </div>
            `
        } else if (data.filtered) {
            filterSection.classList.remove("active")

            while (parentDiv.firstChild) {
                parentDiv.removeChild(parentDiv.firstChild);
            }
            const jArray = data.filtered;
            console.log(jArray)
            jArray.forEach((jewellery) => {
                // console.log(jewellery._id)
                const commaPrice = formatPrice(jewellery.price);
                console.log("inside for each j filtersubmit")

                parentDiv.innerHTML += `
            <div class="j-card" style="display: none;">
                <input class="j-id" type="hidden" value=${jewellery._id}>
                <div class="add-fav">
                    <i class="fa-regular fa-heart"></i>
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
    
            </div>`;

            })
        } else if (data.err) {
            filterSection.classList.remove("active")

            console.log("filter>>>>>>", err.message);
        }






        await sortBackend();




    })
    // filter.submit()


}












const addRemFav = async () => {
    console.log("addRemFav starts");
    //select favbtn
    const favBtns = document.querySelectorAll(".cards-section .cards-div .j-card .add-fav");
    const userId = await checkUser();

    //loop for each card
    favBtns.forEach(async (favBtn) => {

        favBtn.addEventListener("click", async () => {

            const favBtnClass = favBtn.firstElementChild.getAttribute("class")
            const jewelleryId = favBtn.previousElementSibling.value;
            if (userId && favBtnClass == `fa-regular fa-heart`) {
                const res = await fetch("/jList/addFav", {
                    method: "POST",
                    body: JSON.stringify({ userId, jewelleryId }),
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await res.json();
                console.log(data.add);
                if (data.add) {
                    console.log("Added to favourites");
                    favBtn.innerHTML = `<i class="fa-solid fa-heart"></i>`
                }
                else if (data.err) {
                    console.log("addFav>>>", data.err);
                }
                else {
                    console.log("addFav>>>Unknown Error");
                }
            }
            else if (userId && favBtnClass == `fa-solid fa-heart`) {
                const res = await fetch("/jList/remFav", {
                    method: "POST",
                    body: JSON.stringify({ userId, jewelleryId }),
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await res.json();
                console.log(data.currentJ);
                if (data.currentJ) {
                    console.log("Removed from favourites");
                    favBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`
                }
                else if (data.err) {
                    console.log("remFav>>>", data.err);
                }
                else {
                    console.log("remFav>>>Unknown Error");
                }
            }
            else if (!userId) {
                const userInPop = document.querySelector(".login-popup-section");
                userInPop.classList.add("active");
            }
        })
    })
    console.log("addRemFav ends")
}







const openDetails = async () => {
    console.log("open Details starts");

    const imgsDiv = document.querySelectorAll(".cards-section .cards-div .j-card .j-card-element-img")
    // console.log(imgsDiv);
    let card;
    imgsDiv.forEach((imgDiv) => {
        const cardId = imgDiv.previousElementSibling.previousElementSibling.value;
        // console.log(card.childNodes[5].firstElementChild)
        imgDiv.addEventListener("click", async (event) => {
            event.preventDefault();
            console.log("clicked on card")
            console.log(cardId)
            if (cardId) {
                window.open(`/jDetails?cardId=${cardId}`, "_blank")
            }

        })
    })
    console.log("open details ends");
}


const allLink = document.querySelector("#all-jewelleries");
const menLink = document.querySelector("#for-men");
const womenLink = document.querySelector("#for-women");
const goldLink = document.querySelector("#gold");
const diamondLink = document.querySelector("#diamond");
const bestLink = document.querySelector("#top-sellers");
const mostLink = document.querySelector("#most-favourites");

const selected = document.querySelector(".filter-sort-section .sort .select .selected");


const getSetParams = async () => {
    const params = new URLSearchParams(window.location.search);
    // console.log(params);
    const rings = document.querySelector('.input-checkbox input[ value="rings"]');
    const necklaces = document.querySelector('.input-checkbox input[ value="necklaces"]');
    const goldcoins = document.querySelector('.input-checkbox input[ value="goldcoins"]');
    const earrings = document.querySelector('.input-checkbox input[ value="earrings"]');
    const pendants = document.querySelector('.input-checkbox input[ value="pendants"]');
    const bracelets = document.querySelector('.input-checkbox input[ value="bracelets"]');
    const chains = document.querySelector('.input-checkbox input[ value="chains"]');
    const bangles = document.querySelector('.input-checkbox input[ value="bangles"]');
    const nosepins = document.querySelector('.input-checkbox input[ value="nosepins"]');
    const mangalsutras = document.querySelector('.input-checkbox input[ value="mangalsutras"]');


    const male = document.querySelector('.input-checkbox input[ value="male"]');
    const female = document.querySelector('.input-checkbox input[ value="female"]');
    const unisex = document.querySelector('.input-checkbox input[ value="unisex"]');

    const gold = document.querySelector('.input-checkbox input[ value="gold"]');
    const diamond = document.querySelector('.input-checkbox input[ value="diamond"]');



    const filter = document.querySelector(".filter-form");



    const gender = params.get('gender');

    if (gender == 'men') {
        male.checked = true;

        menLink.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
        menLink.style.color = "var(--dark-theme)";
        // menLink.style.transform = "scale(1.05)";
        menLink.style.transition = "0.2s ease";
        menLink.style.borderBottom = "3px solid var(--dark-theme)";

    } else if (gender == 'women') {
        female.checked = true;

        womenLink.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
        womenLink.style.color = "var(--dark-theme)";
        // womenLink.style.transform = "scale(1.05)";
        womenLink.style.transition = "0.2s ease";
        womenLink.style.borderBottom = "3px solid var(--dark-theme)";

    } else if (gender == 'unisex') {
        unisex.checked = true;
    }


    const category = params.get('category');

    if (category === 'necklaces') {
        necklaces.checked = true;
    } else if (category === 'rings') {
        rings.checked = true;
    } else if (category === 'goldcoins') {
        goldcoins.checked = true;
    } else if (category === 'earrings') {
        earrings.checked = true;
    } else if (category === 'pendants') {
        pendants.checked = true;
    } else if (category === 'bracelets') {
        bracelets.checked = true;
    } else if (category === 'chains') {
        chains.checked = true;
    } else if (category === 'bangles') {
        bangles.checked = true;
    } else if (category === 'nosepins') {
        nosepins.checked = true;
    } else if (category === 'mangalsutras') {
        mangalsutras.checked = true;
    }


    const typeLink = params.get('typeLink');
    const options = document.querySelectorAll(".filter-sort-section .sort .menu li");


    const bestSellersO = document.querySelector("#best-sellers");
    const mostFavourites = document.querySelector("#most-favourites");

    // console.log(bestSellersO)
    // console.log(mostFavourites)
    if (typeLink === 'gold') {
        gold.checked = true;

        goldLink.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
        goldLink.style.color = "var(--dark-theme)";
        // goldLink.style.transform = "scale(1.05)";
        goldLink.style.transition = "0.2s ease";
        goldLink.style.borderBottom = "3px solid var(--dark-theme)";

    }
    else if (typeLink === 'diamond') {
        diamond.checked = true;

        diamondLink.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
        diamondLink.style.color = "var(--dark-theme)";
        // diamondLink.style.transform = "scale(1.05)";
        diamondLink.style.transition = "0.2s ease";
        diamondLink.style.borderBottom = "3px solid var(--dark-theme)";
    }
    else if (typeLink === 'topSellers') {
        selected.textContent = 'Best Sellers';
        options.forEach((option) => {
            option.classList.remove("active");
        })
        bestSellersO.classList.add('active');

        bestLink.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
        bestLink.style.color = "var(--dark-theme)";
        // bestLink.style.transform = "scale(1.05)";
        bestLink.style.transition = "0.2s ease";
        bestLink.style.borderBottom = "3px solid var(--dark-theme)";
    }
    else if (typeLink === 'mostFavourites') {
        selected.textContent = 'Most Favourites';
        options.forEach((option) => {
            option.classList.remove("active");
        })

        mostLink.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
        mostLink.style.color = "var(--dark-theme)";
        // mostLink.style.transform = "scale(1.05)";
        mostLink.style.transition = "0.2s ease";
        mostLink.style.borderBottom = "3px solid var(--dark-theme)";
    }
    else if (typeLink === 'all') {
        allLink.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
        allLink.style.color = "var(--dark-theme)";
        // allLink.style.transform = "scale(1.05)";
        allLink.style.transition = "0.2s ease";
        allLink.style.borderBottom = "3px solid var(--dark-theme)";
    }





    filter.dispatchEvent(new Event('submit'));




}


const searchParams = async () => {
    const params = new URLSearchParams(window.location.search);

    const toSearch = params.get('toSearch');
    const res = await fetch("/jList/search", {
        method: "POST",
        body: JSON.stringify({ toSearch }),
        headers: { 'Content-Type': 'application/json' }
    });
    

    const searchInp = document.querySelector("#search-bar-input");
    searchInp.value = toSearch;

    const data = await res.json();
    // console.log(data.jewellery);

    const parentDiv = document.querySelector(".cards-section .cards-div");

    if (toSearch) {
        console.log("yes", toSearch);

        if (data.jewellery.length == 0) {
            // while (parentDiv.firstChild) {
            //     parentDiv.removeChild(parentDiv.firstChild);
            // }
            console.log("null array no matches");

            parentDiv.innerHTML = `
            <div class="no-jewellery">
                <p>Dear Customer, jewelleries with your search are not found.</p>
            </div>
            `
        } else if (data.jewellery) {
            const jArray = data.jewellery;
            console.log(jArray)
            // while (parentDiv.firstChild) {
            //     parentDiv.removeChild(parentDiv.firstChild);
            // }
            jArray.forEach((jewellery) => {
                // console.log(jewellery._id)
                const commaPrice = formatPrice(jewellery.price);
                console.log("inside for each j search")
                parentDiv.innerHTML += `
            <div class="j-card" style="display: none";>
                <input class="j-id" type="hidden" value=${jewellery._id}>
                <div class="add-fav">
                    <i class="fa-regular fa-heart"></i>
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
    
            </div>`;

            })
            await sortBackend();
        } else if (data.err) {

            console.log("search>>>>>>", err.message);
        }

    } else {
        getSetParams();
    }

}



window.addEventListener("load", async () => {
    // await getJewelleries();
    await checkUser();
    await filterPopup();
    // await getSetParams();
    await searchParams();
    await sortPopup();

});

