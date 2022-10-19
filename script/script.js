

const addresFrom = document.querySelector("#addres-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const city = document.querySelector("#city");
const bairro = document.querySelector("#bairro");
const region  = document.querySelector("#region");
const formInputs  = document.querySelectorAll("[data-input]");
const fadeElement = document.querySelector('#fade');
const btn = document.querySelector("#btn");

const closeButton = document.querySelector("#close-message");
//Validade CEPP
cepInput.addEventListener("keypress",(e) => {

    const onlyNumbers = /[0-9]/;
    const key = String.fromCharCode(e.keyCode);

    if(!onlyNumbers.test(key)){
        e.preventDefault();
        return;
    }
    
})

cepInput.addEventListener("keyup", (e) =>{
    const inputValue = e.target.value;

    //Check if we have correct lengh
    if(inputValue.length === 8){
        getAddress(inputValue);
    }
});


const getAddress = async (cep) => {
    toggleLoader();
    cepInput.blur();

    const apiUrl =`https://viacep.com.br/ws/${cep}/json`;
    const response = await fetch(apiUrl)

    const data = await response.json();

    //Error
    if(data.erro === true ){
        if(!addressInput.hasAttribute("disabled")){
            toggleDisabled();

        }
        addresFrom.reset();
        toggleLoader();
        toggleMessage('CEP invalido,tente novamente');
        return;
        
    }
    if(bairro.value === ""){
        toggleDisabled();
    }
    
    addressInput.value =data.logradouro;
    city.value =data.localidade
    bairro.value = data.bairro;
    region.value = data.uf;

    toggleLoader();
}
//Remove disabled

const toggleDisabled = () =>  {
    if(region.hasAttribute('disabled')){
        formInputs.forEach((input) => {
            input.removeAttribute('disabled')
            
        });
    }else{
        formInputs.forEach((input) => {
            input.setAttribute("disabled", "disabled");
        });
    }
}

//Shoe or hider loader

const toggleLoader = () =>{
    const loaderElemento = document.querySelector('#loader')

    fadeElement.classList.toggle('hide')
    loaderElemento.classList.toggle('hide')
}

// close modal
closeButton.addEventListener('click',() => toggleMessage() )

const toggleMessage = (msg) =>{

    const messageElement = document.querySelector('#message');
    const messageText = document.querySelector("#message p");
    messageText.innerText = msg;
    cepInput.removeAttribute('disabled')


    fadeElement.classList.toggle('hide')
    messageElement.classList.toggle('hide')
};


addresFrom.addEventListener('submit', (e) => {
    e.preventDefault();

    toggleLoader();

    setTimeout(()=>{
        toggleLoader();
        
        toggleMessage("Endereço salvo com sucesso!");
        
        addresFrom.reset();
        
        toggleDisabled();
        
    },1000);
} );




