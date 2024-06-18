
const submitFormValues = async () => {

    const updateJewelleryForm = document.getElementById('updateJForm');

    updateJewelleryForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const _id = updateJewelleryForm._id.value;
        const name = updateJewelleryForm.name.value;
        const description = updateJewelleryForm.description.value;
        const price = updateJewelleryForm.price.value;
        const category = updateJewelleryForm.category.value;
        const gross_weight = updateJewelleryForm.gross_weight.value;
        const size = updateJewelleryForm.size.value;
        const picture1 = updateJewelleryForm.picture1.value;
        const picture2 = updateJewelleryForm.picture2.value;
        const gold_purity = updateJewelleryForm.gold_purity.value;
        const diamond_weight = updateJewelleryForm.diamond_weight.value;
        const qty = updateJewelleryForm.qty.value;
        const gender = updateJewelleryForm.gender.value;
        const gold = updateJewelleryForm.gold.checked;
        const diamond = updateJewelleryForm.diamond.checked;
        const silver = updateJewelleryForm.silver.checked;
        const availability = (qty > 0) ? true : false;
        const formData = {
            _id,
            name,
            description,
            price,
            category,
            size,
            gross_weight,
            picture1,
            picture2,
            gold_purity,
            diamond_weight,
            qty,
            gender,
            type: {
                gold,
                diamond,
                silver
            },
            availability
        };



        const res = await fetch('adminUpdateJForm/updateJ', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ formData })
        });
        const data = await res.json();

        console.log(data);
        if (res.ok) {
            // console.log(data.jewellery);
            alert("Jewellery is Updated");
            location.reload();
        } else {
            throw new Error('Failed to update jewellery. Try again!');
        }

    });
}


const setType = async () => {
    //checkboxes
    const goldC = document.querySelector('#gold');
    const diamondC = document.querySelector('#diamond');
    const silverC = document.querySelector('#silver');

    const goldGet = document.querySelector("#gold-get").getAttribute('value');
    const diamondGet = document.querySelector("#diamond-get").getAttribute('value');
    const silverGet = document.querySelector("#silver-get").getAttribute('value');

    if (goldGet == 'true') {
        goldC.checked = true;
    }
    if (diamondGet == 'true') {
        diamondC.checked = true;
    }
    if (silverGet == 'true') {
        silverC.checked = true;
    }


    const diaWeiInp = document.querySelector("#diamondWeight");
    const goldPurInp = document.querySelector("#goldPurity");


    diamondC.addEventListener('change', async (e) => {
        e.preventDefault();


        const diaWeiInp = document.querySelector("#diamondWeight");
        // const qty = document.querySelector("#qty");

        // console.log(diamondC.checked);
        if (diamondC.checked == true) {
            diamondC.checked = true;
            diaWeiInp.disabled = false;
            diaWeiInp.style.cursor = "text"

        } else {
            // console.log("0")
            diamondC.checked = false;
            diaWeiInp.value = '';
            diaWeiInp.disabled = true;
            diaWeiInp.style.cursor = "not-allowed"
        }

    })


    goldC.addEventListener('change', (e) => {
        e.preventDefault();

        const goldPurInp = document.querySelector("#goldPurity");

        // console.log(goldC.checked);
        if (goldC.checked == true) {
            // console.log("1")
            goldC.checked = true;

            goldPurInp.disabled = false;
            goldPurInp.style.cursor = "text"

        } else {
            // console.log("0")
            goldC.checked = false;
            goldPurInp.value = '';

            goldPurInp.disabled = true;
            goldPurInp.style.cursor = "not-allowed"
        }

    })

}

const setGender = async () => {
    const genInp = document.getElementById('gender-get');
    const genVal = genInp.getAttribute('value');
    // console.log(genVal)

    const gender = document.querySelector("#gender");
    // gender.selectedIndex = 2

    if (genVal == 'women') {
        gender.selectedIndex = gender.querySelector('option[value="women"]').index;
    }
    else if (genVal == 'men') {
        gender.selectedIndex = gender.querySelector('option[value="men"]').index;
    }
    else if (genVal == 'unisex') {
        gender.selectedIndex = gender.querySelector('option[value="unisex"]').index;
    }

    // const selected = document.getElementById('gender');
    // console.log(selected)

    // const men = document.getElementById('men');
    // const women = document.getElementById('women');
    // const unisex= document.getElementById('unisex');
}

const setCategory = async () => {
    const catInp = document.getElementById('category-get');
    const catVal = catInp.getAttribute('value');
    // console.log(catVal)

    const category = document.querySelector('#category-selector');
    // console.log(category)
    if (catVal == 'rings') {
        category.selectedIndex = category.querySelector('option[value="rings"]').index;
    }
    else if (catVal == 'necklaces') {
        category.selectedIndex = category.querySelector('option[value="necklaces"]').index;
    }
    else if (catVal == 'chains') {
        category.selectedIndex = category.querySelector('option[value="chains"]').index;
    }
    else if (catVal == 'earrings') {
        category.selectedIndex = category.querySelector('option[value="earrings"]').index;
    }
    else if (catVal == 'pendants') {
        category.selectedIndex = category.querySelector('option[value="pendants"]').index;
    }
    else if (catVal == 'bracelets') {
        category.selectedIndex = category.querySelector('option[value="bracelets"]').index;
    }
    else if (catVal == 'nosepins') {
        category.selectedIndex = category.querySelector('option[value="nosepins"]').index;
    }
    else if (catVal == 'bangles') {
        category.selectedIndex = category.querySelector('option[value="bangles"]').index;
    }
    else if (catVal == 'goldcoins') {
        category.selectedIndex = category.querySelector('option[value="goldcoins"]').index;
    }
    else if (catVal == 'mangalsutras') {
        category.selectedIndex = category.querySelector('option[value="mangalsutras"]').index;
    }

    category.addEventListener('change', async (e) => {
        await setSize();
    })
}


const disInps = async () => {
    const goldC = document.querySelector('#gold').checked;
    const diamondC = document.querySelector('#diamond').checked;
    // const silverC = document.querySelector('#silver');


    const goldPurInp = document.querySelector("#goldPurity");
    const diaWeiInp = document.querySelector("#diamondWeight");

    // console.log(goldC, diamondC);
    if (goldC == false) {
        goldPurInp.disabled = true;
        goldPurInp.style.cursor = "not-allowed"
        goldPurInp.value = goldPurInp.defaultValue;
    }
    if (diamondC == false) {
        diaWeiInp.disabled = true;
        diaWeiInp.style.cursor = "not-allowed"
        diaWeiInp.value = diaWeiInp.defaultValue;
    }


}

const setSize = async () => {
    const catInp = document.getElementById('category-get');
    // const catVal = catInp.getAttribute('value');

    const category = document.querySelector('#category-selector');
    const catVal = category.options[category.selectedIndex].value;

    const sizeDiv = document.querySelector(".size-div");
    const sizeVal = document.querySelector("#size").getAttribute('value');
    const sizeInp = document.querySelector("#size");

    // console.log(sizeDiv.innerHTML);
    if (catVal == 'bracelets') {
        sizeDiv.innerHTML = ''
        sizeDiv.innerHTML = `
        <label for="size">Size(CMS):</label>
        <input type="number" value="${sizeVal}" id="size" name="size">
        `
    } else if (catVal == "rings" || catVal == "bangles") {
        sizeDiv.innerHTML = ''
        sizeDiv.innerHTML = `
        <label for="size">Size(MM):</label>
        <input type="number" value="${sizeVal}" id="size" name="size">
        `
    } else if (catVal == "mangalsutras" || catVal == "chains") {
        sizeDiv.innerHTML = ''
        sizeDiv.innerHTML = `
        <label for="size">Size(INCHES):</label>
        <input type="number" value="${sizeVal}" id="size" name="size">
        `
    } else {
        const sizeLabel = document.querySelector(".size-div label");
        sizeLabel.textContent = 'Size:'
        sizeInp.disabled = true;
        sizeInp.style.cursor = "not-allowed";
    }
}

// const resetForm = async () => {
//     const reset = document.querySelector("#reset");
//     const updateJewelleryForm = document.getElementById('updateJForm');

//     reset.addEventListener("click", (e) => {
//         e.preventDefault();
//         // updateJewelleryForm.reset()

//         var formElements = updateJewelleryForm.elements;

//         // Iterate over all form elements
//         for (var i = 0; i < formElements.length; i++) {
//             var element = formElements[i];

//             // Check if the element is an input field, textarea, or select element
//             if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
//                 // Set the value of the element to an empty string
//                 element.value = '';
//             }
//         }
//     })
// }



document.addEventListener('DOMContentLoaded', async () => {
    await setType();
    await setGender();
    await setCategory();
    await disInps();
    await setSize();
    // await resetForm();
    await submitFormValues();
});