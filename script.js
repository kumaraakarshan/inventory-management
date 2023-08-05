
async function displayAppointmentData(data) {
    const itemList = document.getElementById('items');
    itemList.innerHTML = ''; // Clear the existing list items
    itemList.addEventListener('click', handleItemClick);

    // Loop through localStorage and display the data
    data.forEach((item)=> {
        const {name,Description,quantity,price,_id} =item;
        var buy1 = document.createElement('button');
        var buy2 = document.createElement('button');
        var buy3 = document.createElement('button');
        const li = document.createElement('li');
        li.className = 'list-group-item';
        const combinedText = `${name} ${Description}-${quantity} ${item.price}`;
        li.appendChild(document.createTextNode(combinedText));
        buy1.className = 'btn btn-primary btn-sm float-right buy1';
        buy1.dataset.key = _id;
        buy1.appendChild(document.createTextNode('Buy1'));
        buy2.className = 'btn btn-primary btn-sm float-right buy2';
        buy3.className = 'btn btn-primary btn-sm float-right buy3';
        buy2.dataset.key = _id;
        buy3.dataset.key = _id;
        buy2.appendChild(document.createTextNode('buy2'));
       
        buy3.appendChild(document.createTextNode('buy3'));
        li.appendChild(buy1);
        li.appendChild(buy2);
        li.appendChild(buy3);
        itemList.appendChild(li);
    });
}

async function handleItemClick(e) {
    if (e.target.classList.contains('buy1')) {
        if (confirm('Are you sure you want to purchase 1 item?')) {

            const key = e.target.dataset.key;
            try{
            const response=await axios.get(`https://crudcrud.com/api/cd67f6f701e24856a7e17337e2315e5a/itemData/${key}`)
            
                console.log(response);
                const data =response.data;
                data.quantity =data.quantity-1;

                await axios.put(`https://crudcrud.com/api/cd67f6f701e24856a7e17337e2315e5a/itemData/${key}`, {
                     quantity: data.quantity,
                     name:data.name,
                     price:data.price,
                     Description:data.Description
                    });
                        fetchDataAndDisplay();
                    }
                    catch(err){ console.log(err);
                    }    
        }
    } else if (e.target.classList.contains('buy2')) {
        if (confirm('Are you sure you want to purchase 2 item?')) {

            const key = e.target.dataset.key;
            try{
            const response=await axios.get(`https://crudcrud.com/api/cd67f6f701e24856a7e17337e2315e5a/itemData/${key}`)
            
                console.log(response);
                const data =response.data;
                data.quantity =data.quantity-2;

                await axios.put(`https://crudcrud.com/api/cd67f6f701e24856a7e17337e2315e5a/itemData/${key}`, {
                     quantity: data.quantity,
                     name:data.name,
                     price:data.price,
                     Description:data.Description
                    });
                        fetchDataAndDisplay();
                    }
                    catch(err){ console.log(err);
                    }    
        }


    } else if (e.target.classList.contains('buy3')) {
        if (confirm('Are you sure you want to purchase 3 item?')) {

            const key = e.target.dataset.key;
            try{
            const response=await axios.get(`https://crudcrud.com/api/cd67f6f701e24856a7e17337e2315e5a/itemData/${key}`)
            
                console.log(response);
                const data =response.data;
                data.quantity =data.quantity-3;

                await axios.put(`https://crudcrud.com/api/cd67f6f701e24856a7e17337e2315e5a/itemData/${key}`, {
                     quantity: data.quantity,
                     name:data.name,
                     price:data.price,
                     Description:data.Description
                    });
                        fetchDataAndDisplay();
                    }
                    catch(err){ console.log(err);
                    }    
        }


    }
}
async function fetchDataAndDisplay() {
    try {
        const response = await axios.get(`https://crudcrud.com/api/cd67f6f701e24856a7e17337e2315e5a/itemData`);
        const data = response.data;
        displayAppointmentData(data);
    } catch (err) {
        console.log(err);
    }
}


document.getElementById("submitBtn").addEventListener("click", async function() {
    const name = document.getElementById("name").value;
    const Description = document.getElementById("Description").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;
    
    const key = document.getElementById("submitBtn").getAttribute('data-key');

    if (key) {
        // If key exists, it means we are editing an existing item
        let myObj = {
            name: name,
            Description: Description,
            quantity: quantity,
            price: price
            
        };
        let myObj_serialized = JSON.stringify(myObj);
        try{
        const response=await axios.put(`https://crudcrud.com/api/cd67f6f701e24856a7e17337e2315e5a/itemData/${key}`, myObj_serialized, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
            console.log(response);
            // Refresh the data after successful upprice
            fetchDataAndDisplay();
        }
        catch(err) {console.log(err);
        }
       
        document.getElementById("submitBtn").textContent = "Add Data";
       // document.getElementById("submitBtn").removeAttribute("data-key");
    } else {
        // If key doesn't exist, it means we are adding a new item
        
        let myObj = {
            name: name,
            Description: Description,
            quantity: quantity,
            price: price
        };
        let myObj_serialized = JSON.stringify(myObj);
        try{
        const response=await axios.post("https://crudcrud.com/api/cd67f6f701e24856a7e17337e2315e5a/itemData", myObj_serialized,{
            headers: {
                'Content-Type': 'application/json'
              }
        });
        
            fetchDataAndDisplay(); 
          console.log(response);
        }
        catch(err) {console.log(err);
        }
        
    }

   
    clearInputFields();
});

function clearInputFields() {
    document.getElementById("name").value = '';
    document.getElementById("Description").value = '';
    document.getElementById("quantity").value = '';
    document.getElementById("price").value = '';
    
}

fetchDataAndDisplay();

