const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
const fromCurrency = document.getElementById('convert_from');
const toCurrency = document.getElementById('convert_to');
const amount = document.getElementById('amount');
// responseJSON
const getRates = fetch("https://api.freecurrencyapi.com/v1/latest?apikey=eXYV0MnciTJWkdKjCRLmWYsmEYla5uxNOGdjqRrs", requestOptions)
    .then(response => response.json());

// get options for select
getRates.then(res => Object.keys(res.data))
    .then(res => {
        const options = res.map(value => {
            return `<option value="${value}">${value}</option>`
        }).join('');
        fromCurrency.innerHTML = options;
        toCurrency.innerHTML = options;
    })
    .catch(error => console.log('error', error));

// convert currency
document.getElementById('convert').addEventListener('click', () => {
    getRates.then(res => {
        let finalAmount =
            amount.value * res.data[toCurrency.value] / res.data[fromCurrency.value];
        document.getElementById('result').innerHTML =
            `<div style="background-color: ivory;
                         color: green;
                         font-size: xxx-large;
                         font-weight: bolder;
                         padding: 50px;
                         margin: 0 50px">
                         ${amount.value} ${fromCurrency.value} = 
                         ${finalAmount.toFixed(2)} ${toCurrency.value}</div>`
    })

})


