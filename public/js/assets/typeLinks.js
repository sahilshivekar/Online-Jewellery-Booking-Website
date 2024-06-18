//!rings page open
(() => {
    const allLink = document.querySelector("#all-jewelleries");
    allLink.addEventListener("click", async (event) => {
        event.preventDefault();
        allLink.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
        allLink.style.color = "var(--dark-theme)";
        // allLink.style.transform = "scale(1.05)";
        allLink.style.transition = "0.2s ease";
        allLink.style.borderBottom = "3px solid var(--dark-theme)";
        location.assign('/jList?typeLink=all');
    })
})();


(() => {
    const menLink = document.querySelector("#for-men");
    menLink.addEventListener("click", async (event) => {
        event.preventDefault();
        menLink.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
        menLink.style.color = "var(--dark-theme)";
        // menLink.style.transform = "scale(1.05)";
        menLink.style.transition = "0.2s ease";
        menLink.style.borderBottom = "3px solid var(--dark-theme)";
        location.assign('/jList?gender=men')
    })
})();

(() => {
    const womenLink = document.querySelector("#for-women");
    womenLink.addEventListener("click", async (event) => {
        event.preventDefault();
        womenLink.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
        womenLink.style.color = "var(--dark-theme)";
        // womenLink.style.transform = "scale(1.05)";
        womenLink.style.transition = "0.2s ease";
        womenLink.style.borderBottom = "3px solid var(--dark-theme)";
        location.assign('/jList?gender=women')
    })
})();

(() => {
    const diamondLink = document.querySelector("#diamond");
    diamondLink.addEventListener("click", async (event) => {
        event.preventDefault();
        diamondLink.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
        diamondLink.style.color = "var(--dark-theme)";
        // diamondLink.style.transform = "scale(1.05)";
        diamondLink.style.transition = "0.2s ease";
        diamondLink.style.borderBottom = "3px solid var(--dark-theme)";
        location.assign('/jList?typeLink=diamond')
    })
})();

(() => {
    const goldLink = document.querySelector("#gold");
    goldLink.addEventListener("click", async (event) => {
        event.preventDefault();
        // const goldLink = document.querySelector("#gold");
        goldLink.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
        goldLink.style.color = "var(--dark-theme)";
        // goldLink.style.transform = "scale(1.05)";
        goldLink.style.transition = "0.2s ease";
        goldLink.style.borderBottom = "3px solid var(--dark-theme)";
        location.assign('/jList?typeLink=gold')
    })
})();

(() => {
    const bestLink = document.querySelector("#top-sellers");
    bestLink.addEventListener("click", async (event) => {
        event.preventDefault();
        bestLink.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
        bestLink.style.color = "var(--dark-theme)";
        // bestLink.style.transform = "scale(1.05)";
        bestLink.style.transition = "0.2s ease";
        bestLink.style.borderBottom = "3px solid var(--dark-theme)";
        location.assign('/jList?typeLink=topSellers')
    })
})();

(() => {
    const mostLink = document.querySelector("#most-favourites");
    mostLink.addEventListener("click", async (event) => {
        event.preventDefault();
        mostLink.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
        mostLink.style.color = "var(--dark-theme)";
        // mostLink.style.transform = "scale(1.05)";
        mostLink.style.transition = "0.2s ease";
        mostLink.style.borderBottom = "3px solid var(--dark-theme)";
        location.assign('/jList?typeLink=mostFavourites')
    })
})();