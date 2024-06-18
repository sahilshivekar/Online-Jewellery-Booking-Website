
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
  const favBtns = document.querySelectorAll(".j-card .add-fav");

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




const addRemFav = async () => {
  console.log("addRemFav starts");
  //select favbtn
  const favBtns = document.querySelectorAll(".j-card .add-fav");
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
              window.open(`/jDetails?cardId=${cardId}`, "_blank")
          }

      })
  })
  console.log("open details ends");
}


//!Slider starts_______________________________________________________________________________________________________
const imageSlider = () => {

  let sliderListHolder = document.querySelector('.slider-list-container');
  let sliderItems = document.querySelectorAll('.slider-item');
  let sliderNext = document.querySelector('.slider-next');
  let sliderPrev = document.querySelector('.slider-prev');
  let sliderDots = document.querySelectorAll('.slider-dots div');


  let active = 0;
  sliderNext.onclick = () => {
    active = (active + 1) <= (sliderItems.length - 1) ? active + 1 : 0;
    reloadSlider();
  }

  sliderPrev.onclick = () => {
    active = active - 1 >= 0 ? active - 1 : (sliderItems.length - 1);
    reloadSlider();
  }

  let automove = setInterval(() => {
    sliderNext.click();
  }, 3000);

  function reloadSlider() {
    sliderListHolder.style.left = -sliderItems[active].offsetLeft + 'px';

    let sliderDotPrev = document.querySelector('.slider-dots div.active');
    sliderDotPrev.classList.remove('active');
    sliderDots[active].classList.add('active');

    clearInterval(automove);
    automove = setInterval(() => { sliderNext.click() }, 3000);
  }

  sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      active = index;
      reloadSlider();
    })
  })
  window.onresize = function (event) {
    reloadSlider();
  };
}

window.addEventListener("load", imageSlider);

//!Slider ends_______________________________________________________________________________________________________
//!Most Favourites starts____________________________________________________________________________________________


const favSlider = () => {
  const favButtons = document.querySelectorAll(".fav-buttons");
  const cardsContainer = document.querySelector(".j-cards-container");
  const cardInstance = document.querySelector(".j-card");
  const scrollbar = document.querySelector(".fav-scrollbar");
  const scrollbarThumb = document.querySelector(".fav-scrollbar-thumb");

  // Calculating width of card including padding, border, and margin
  const computedStyle = getComputedStyle(cardInstance);
  // const paddingLeft = parseFloat(computedStyle.paddingLeft);
  // const paddingRight = parseFloat(computedStyle.paddingRight);
  // const borderLeftWidth = parseFloat(computedStyle.borderLeftWidth);
  // const borderRightWidth = parseFloat(computedStyle.borderRightWidth);
  const marginLeft = parseFloat(computedStyle.marginLeft);
  const marginRight = parseFloat(computedStyle.marginRight);
  const totalWidth = cardInstance.offsetWidth + marginLeft + marginRight;

  // Function to update scrollbar thumb position
  const updateScrollThumb = () => {
    const scrollPercentage = (cardsContainer.scrollLeft / (cardsContainer.scrollWidth - cardsContainer.clientWidth)) * 100;
    const thumbPosition = (scrollbar.clientWidth - scrollbarThumb.offsetWidth) * (scrollPercentage / 100);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  // Event listener for card container scroll
  cardsContainer.addEventListener("scroll", updateScrollThumb);

  // Event listeners for prev and next buttons
  favButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "fav-prev" ? -1 : 1;
      const scrollAmount = totalWidth * direction;
      cardsContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  // Event listener for window resize
  window.addEventListener("resize", updateScrollThumb);
};

// window.addEventListener("load", favSlider);
//!Most Favourites Ends_____________________________________________________________________________________________



//!Shop by category starts_____________________________________________________________________________________________

//!Shop by category ends_________________________________________________________________________________________________



//!tops sellers starts_____________________________________________________________________________________________
const topSellersSlider = () => {
  const buttons = document.querySelectorAll(".top-sellers-cards-outside-container .top-sellers-buttons");
  const cardsContainer = document.querySelector(".top-sellers-cards-outside-container .j-cards-container");
  const cardInstance = document.querySelector(".top-sellers-cards-outside-container .j-card");
  const scrollbar = document.querySelector(".top-sellers-cards-outside-container .top-sellers-scrollbar");
  const scrollbarThumb = document.querySelector(".top-sellers-cards-outside-container .top-sellers-scrollbar-thumb");

  // Calculating width of card including padding, border, and margin
  const computedStyle = getComputedStyle(cardInstance);
  // const paddingLeft = parseFloat(computedStyle.paddingLeft);
  // const paddingRight = parseFloat(computedStyle.paddingRight);
  // const borderLeftWidth = parseFloat(computedStyle.borderLeftWidth);
  // const borderRightWidth = parseFloat(computedStyle.borderRightWidth);
  const marginLeft = parseFloat(computedStyle.marginLeft);
  const marginRight = parseFloat(computedStyle.marginRight);
  const totalWidth = cardInstance.offsetWidth + marginLeft + marginRight;

  // Function to update scrollbar thumb position
  const updateScrollThumb = () => {
    const scrollPercentage = (cardsContainer.scrollLeft / (cardsContainer.scrollWidth - cardsContainer.clientWidth)) * 100;
    const thumbPosition = (scrollbar.clientWidth - scrollbarThumb.offsetWidth) * (scrollPercentage / 100);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  // Event listener for card container scroll
  cardsContainer.addEventListener("scroll", updateScrollThumb);

  // Event listeners for prev and next buttons
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "top-sellers-prev" ? -1 : 1;
      const scrollAmount = totalWidth * direction;
      cardsContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  // Event listener for window resize
  window.addEventListener("resize", updateScrollThumb);
};

// window.addEventListener("load", topSellers);
//!tops sellers ends_____________________________________________________________________________________________



//sending request to get most favourites;
const getMostFav = async () => {


  console.log("getMostFAv Started")

  const parentDiv = document.querySelector(".j-cards-outside-container .j-cards-container");

  const res = await fetch("/getMostFav", {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await res.json();
  console.log(data)
  const jArray = data.mostFavs;
  jArray.forEach((jewellery) => {
    const commaPrice = formatPrice(jewellery.price);

    parentDiv.innerHTML += `
      <div class="j-card">
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

  console.log("getMost fav Ended")


}



//sending request to get most favourites;
const getTopSellers = async () => {


  console.log("getTopSellers Started")

  const parentDiv = document.querySelector(".top-sellers-cards-outside-container .j-cards-container");
  console.log(parentDiv)
  const res = await fetch("/getTopSellers", {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await res.json();
  console.log(data)
  const jArray = data.topSellers;
  jArray.forEach((jewellery) => {
    const commaPrice = formatPrice(jewellery.price);

    parentDiv.innerHTML += `
      <div class="j-card">
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

  console.log("getTop sellers Ended")


}





const shopCategory = async () => {
  const shopRings = document.querySelector(".shop-rings");
  const shopNecklaces = document.querySelector(".shop-necklaces");
  const shopChains = document.querySelector(".shop-chains");
  const shopEarrings = document.querySelector(".shop-earrings");
  const shopPendants = document.querySelector(".shop-pendants");
  const shopBracelets = document.querySelector(".shop-bracelets");
  const shopNosePins = document.querySelector(".shop-nosepins");
  const shopBangles = document.querySelector(".shop-bangles");
  const shopGoldCoins = document.querySelector(".shop-goldcoins");
  const shopMangalsutras = document.querySelector(".shop-mangalsutras");

  shopRings.addEventListener('click', () => {
    console.log("Clicked on Rings");
    location.assign("/jlist?category=rings");
  });

  shopNecklaces.addEventListener('click', () => {
    console.log("Clicked on Necklaces");
    location.assign("/jlist?category=necklaces");
  });

  shopChains.addEventListener('click', () => {
    console.log("Clicked on Chains");
    location.assign("/jlist?category=chains");
  });

  shopEarrings.addEventListener('click', () => {
    console.log("Clicked on Earrings");
    location.assign("/jlist?category=earrings");
  });

  shopPendants.addEventListener('click', () => {
    console.log("Clicked on Pendants");
    location.assign("/jlist?category=pendants");
  });

  shopBracelets.addEventListener('click', () => {
    console.log("Clicked on Bracelets");
    location.assign("/jlist?category=bracelets");
  });

  shopNosePins.addEventListener('click', () => {
    console.log("Clicked on Nose Pins");
    location.assign("/jlist?category=nosepins");
  });

  shopBangles.addEventListener('click', () => {
    console.log("Clicked on Bangles");
    location.assign("/jlist?category=bangles");
  });

  shopGoldCoins.addEventListener('click', () => {
    console.log("Clicked on Gold Coins");
    location.assign("/jlist?category=goldcoins");
  });

  shopMangalsutras.addEventListener('click', () => {
    console.log("Clicked on Mangalsutras");
    location.assign("/jlist?category=mangalsutras");
  });


}


const shopGender = () => {

  const shopMen = document.querySelector(".shop-gender-card-container .men-gender");
  const shopWomen = document.querySelector(".shop-gender-card-container .women-gender");
  const shopUnisex = document.querySelector(".shop-gender-card-container .unisex-gender");

  shopMen.addEventListener('click', () => {
    console.log("Clicked on Rings");
    location.assign("/jlist?gender=men");
  });

  shopWomen.addEventListener('click', () => {
    console.log("Clicked on Necklaces");
    location.assign("/jlist?gender=women");
  });

  shopUnisex.addEventListener('click', () => {
    console.log("Clicked on Chains");
    location.assign("/jlist?gender=unisex");
  });
}






window.addEventListener("load", async () => {
  await getMostFav();
  await getTopSellers();
  await favSlider();
  await topSellersSlider();
  await shopCategory();
  await shopGender();
  // await typeLinks();
  await showFavOnLoad();
  await addRemFav();
  await openDetails();
})









