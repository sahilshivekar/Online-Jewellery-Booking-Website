

const getUsers = async () => {
    const list = document.querySelector('#show-list-container');

    const res = await fetch('/adminUsersDetails/getUsers', {
        method: 'GET',
        headers: { 'Content-Type': 'appplication/json' }
    });
    const data = await res.json();
    console.log(data);

    const uArray = data.usersList;
    uArray.forEach((user) => {
        const dob = user.dob;
        const shortDate = new Date(dob).toLocaleDateString('en-IN')


        const fullName = (user.fullName) ? user.fullName : "   -   ";
        const showDate = (user.dob) ? shortDate : "   -   ";
        const phone = (user.phone) ? user.phone : "   -   ";
        list.innerHTML += `
        <div class="j-item">
            <img src="/images/profile.png" alt="">
            <div class="text-detail-item">
                <div class="left-detail">
                    <div class="left">Full Name</div>
                    <div class="left">EmailID</div>
                    <div class="left">Date of Birth</div>
                    <div class="left">Contact No.</div>
                </div>
                <div class="center-detail">
                    <div class="center">:</div>
                    <div class="center">:</div>
                    <div class="center">:</div>
                    <div class="center">:</div>
                </div>
                <div class="right-detail">
                    <div class="fname right">${fullName}</div>
                    <div class="email right">${user.email}</div>
                    <div class="dob right">${showDate}</div>
                    <div class="phone right">${phone}</div>
                </div>
            </div>
        </div>
        `;

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
        const res = await fetch("/adminUsersDetails/search", {
            method: "POST",
            body: JSON.stringify({ toSearch }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        console.log(data);

        searchInp.value = toSearch;

            console.log("yes", toSearch);

            if (data.user.length == 0) {
                // while (parentDiv.firstChild) {
                //     parentDiv.removeChild(parentDiv.firstChild);
                // }
                console.log("null array no matches");

                parentDiv.innerHTML = `
                <div class="no-jewellery">
                    <p>Dear admin, users with your search are not found.</p>
                </div>
                `
            } else if (data.user) {
                const uArray = data.user;
                console.log(uArray)
                while (parentDiv.firstChild) {
                    parentDiv.removeChild(parentDiv.firstChild);
                }
                uArray.forEach((user) => {

                    const dob = user.dob;
                    const shortDate = new Date(dob).toLocaleDateString('en-IN')


                    const fullName = (user.fullName) ? user.fullName : "   -   ";
                    const showDate = (user.dob) ? shortDate : "   -   ";
                    const phone = (user.phone) ? user.phone : "   -   ";

                    parentDiv.innerHTML += `
                    <div class="j-item">
                        <img src="/images/profile.png" alt="">
                        <div class="text-detail-item">
                            <div class="left-detail">
                                <div class="left">Full Name</div>
                                <div class="left">EmailID</div>
                                <div class="left">Date of Birth</div>
                                <div class="left">Contact No.</div>
                            </div>
                            <div class="center-detail">
                                <div class="center">:</div>
                                <div class="center">:</div>
                                <div class="center">:</div>
                                <div class="center">:</div>
                            </div>
                            <div class="right-detail">
                                <div class="fname right">${fullName}</div>
                                <div class="email right">${user.email}</div>
                                <div class="dob right">${showDate}</div>
                                <div class="phone right">${phone}</div>
                            </div>
                        </div>
                    </div>
        `;

                })

            } else if (data.err) {

                console.log("search>>>>>>", err.message);
            }

    })
}


document.addEventListener('DOMContentLoaded', async () => {
    await getUsers();
    await search();
    // await openDetails();
});