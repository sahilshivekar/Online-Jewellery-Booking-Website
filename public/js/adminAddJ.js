document.addEventListener('DOMContentLoaded', () => {
    const addJewelleryForm = document.getElementById('addJewelleryForm');

    addJewelleryForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = addJewelleryForm.name.value;
        const description = addJewelleryForm.description.value;
        const price = addJewelleryForm.price.value;
        const category = addJewelleryForm.category.value;
        const gross_weight = addJewelleryForm.gross_weight.value;
        const size = addJewelleryForm.size.value;
        const picture1 = addJewelleryForm.picture1.value;
        const picture2 = addJewelleryForm.picture2.value;
        const gold_purity = addJewelleryForm.gold_purity.value;
        const diamond_weight = addJewelleryForm.diamond_weight.value;
        const qty = addJewelleryForm.qty.value;
        const gender = addJewelleryForm.gender.value;
        const gold = addJewelleryForm.gold.checked;
        const diamond = addJewelleryForm.diamond.checked;
        const silver = addJewelleryForm.silver.checked;
        const availability = (qty>0) ? true:false;
        const formData = {
            name,
            description,
            price,
            category,
            gross_weight,
            size,
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


        const response = await fetch('adminAddJ/addJ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ formData })
        });
        
        if (response.ok) {
            alert('Jewellery added successfully!');
            location.reload();
        } else {
            throw new Error('Failed to add jewellery');
        }

    });
});

