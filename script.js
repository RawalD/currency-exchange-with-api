const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

// fetch rates and update accordingly the dom
function calculate(){
   //console.log("rumi");

    const currencyOneValue = currencyOne.value;
    const currencyTwoValue = currencyTwo.value;

    //console.log(currencyOneValue, currencyTwoValue);

    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOneValue}`)
    .then(res => res.json())
    .then(data => {
        //console.log(data);
        const rates = data.rates[currencyTwoValue];

        //console.log(rate);
        
        rate.innerHTML =   `1 ${currencyOneValue} = ${rates} ${currencyTwoValue}`;

        amountTwo.value = (amountOne.value * rates).toFixed(2);
    });
}

// event listeners
currencyOne.addEventListener('change',calculate);
amountOne.addEventListener('input',calculate);
currencyTwo.addEventListener('change',calculate);
amountTwo.addEventListener('input',calculate);

swap.addEventListener('click', () => {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
});

calculate();