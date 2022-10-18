const loadPhones = async (search, dataLimit) => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await (res.json());
    displayPhones(data.data, dataLimit)
}

const displayPhones = (phones, dataLimit )=> {
    const phoneContianerBox = document.getElementById('phonesContainer');
    phoneContianerBox.innerHTML = '';
    // console.log(phones);
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }else{
        showAll.classList.add('d-none');
    }
    const noFoundPhone = document.getElementById('no-found-phone');
    if(phones.length === 0){
        noFoundPhone.classList.remove('d-none');
        // toggle(false);
    }else{
        noFoundPhone.classList.add('d-none');
    }
    phones.forEach(phone => {
        // console.log(phone)
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
                    <div class="card h-100 p-4">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${phone.phone_name}</h5>
                          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                          <button class="btn btn-primary" 
                          onclick="showPhoneDetails('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#phoneModal">show Details</button>
                        </div>
                      </div>
        `;
        phoneContianerBox.appendChild(phoneDiv);
    });
    toggle(false);
}
const process = (dataLimit)  =>{
    toggle(true);
    const inputField = document.getElementById('inputField');
    const inputText = inputField.value;
    loadPhones(inputText, dataLimit);
    inputField.value='';
}

// search phones 
document.getElementById('btn-search').addEventListener('click', function(){
   process(10)
})

// enter key even handler
document.getElementById('inputField').addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      process(10);
    }
});

// loding spanner 
const toggle = isLodding =>{
const loderBox = document.getElementById('loder');
if(isLodding){
    loderBox.classList.remove('d-none');
}else{
    loderBox.classList.add('d-none');
}

}

// not the best way to load

 document.getElementById('showAll-btn').addEventListener('click', function(){
    process();
})

// show phone details using particular id
const showPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
 const res = await  fetch(url);
 const data = await (res.json());
phoneDetails(data.data);

}


const phoneDetails = (phone) =>{
    console.log(phone)
const phoneModalLabel =document.getElementById('phoneModalLabel');
phoneModalLabel.innerText = `${phone.name}`;
const modalBody = document.getElementById('modal-body');
modalBody.innerHTML =`
<p>Realase date: ${phone.releaseDate}</p>
<p>Mainu feature: ${phone.mainFeatures ? phone.mainFeatures.storage : 'no storage'}</p>
<p>Display size: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'no-displaysize'}</p>
<p>Display size: ${phone.mainFeatures ? phone.mainFeatures.sensors[0] : 'no sensors'}</p>
`;
}

loadPhones('iphone');