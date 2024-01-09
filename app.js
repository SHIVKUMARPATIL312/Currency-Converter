const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropDowns=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("form button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let mess=document.querySelector(".msg");



for(let select of dropDowns){
    for( let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;

        if(select.name=="from" && currCode =="USD"){
            newOption.selected="selected";
        }

        if(select.name=="to" && currCode =="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (event)=>{
           updateFlag(event.target);
    });
}


const updateFlag=(element)=>{
     let currCode=element.value;
     let contryCode=countryList[currCode];
     let newSrc=`https://flagsapi.com/${contryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})


updateExchangeRate=async()=>{
    let amt=document.querySelector(".amount input");
    let amtValue=amt.value;
    if(amtValue=="" || amtValue<1){
        amtValue=1;
        amtValue.value="1";
    }

    const url=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let responce=await fetch(url);
    let data=await responce.json();
    let rate=data[toCurr.value.toLowerCase()];

    
    let finalAmount=rate*amtValue;  
     mess.innerText=`${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `
}


document.addEventListener("load", ()=>{
    updateExchangeRate();
})

