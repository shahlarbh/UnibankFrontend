// Currency update time
function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
}

const currentDate = new Date()
const formattedDate = formatDate(currentDate)

let update_currency = document.querySelectorAll('.update_time')

update_currency.forEach(element => {
    element.innerHTML = `Yeniləndi ${formattedDate}`
})

// Currency API
let usd_curr = document.querySelectorAll('.usd_curr')
let eur_curr = document.querySelectorAll('.eur_curr')
let gbp_curr = document.querySelectorAll('.gbp_curr')
let rub_curr = document.querySelectorAll('.rub_curr')

function getCurrency() {
    fetch('http://data.fixer.io/api/latest?access_key=832524f9e867585f0ee4038ac7afd6e6')
    .then(response => response.json())
    .then(data => {

        // Aşağıdakı əməliyyatlar API`nin əsas valyutasını EUR`dan AZN`nə çevirmək üçün olan əməliyyatlardır
        const azn = (data.rates['AZN'] / data.rates['AZN']).toFixed(4)
        const eur = (data.rates['EUR'] * data.rates['AZN']).toFixed(4)
        const usd = (data.rates['EUR'] / data.rates['USD'] * data.rates['AZN']).toFixed(4)
        const gbp = (data.rates['EUR'] / data.rates['GBP'] * data.rates['AZN']).toFixed(4)
        const rub = (data.rates['EUR'] / data.rates['RUB'] * data.rates['AZN']).toFixed(4)

        // Valyuta cədvəlinin dinamik olaraq API vasitəsi ilə doldurulması
        usd_curr.forEach(element => element.innerHTML = usd)
        eur_curr.forEach(element => element.innerHTML = eur)
        gbp_curr.forEach(element => element.innerHTML = gbp)
        rub_curr.forEach(element => element.innerHTML = rub)

        // Convert currency
        let first_input = document.querySelector('.first_input')
        let second_input = document.querySelector('.second_input')

        function convertCurrency(inputValue, fromCurrency, toCurrency) {
            if(isNaN(inputValue)) { // Inputun dəyərini sildikdə inputun NaN qaytarmaması üçün
                inputValue = 0
            }

            switch (`${fromCurrency}_${toCurrency}`) {
                case 'USD_AZN':
                    return (inputValue * usd).toFixed(2)
                case 'USD_EUR':
                    return (inputValue * usd / eur).toFixed(2)
                case 'USD_GBP':
                    return (inputValue * usd / gbp).toFixed(2)
                case 'USD_RUB':
                    return (inputValue * usd / rub).toFixed(2)
                case 'USD_USD':
                    return inputValue
                case 'EUR_USD':
                    return (inputValue * eur / usd).toFixed(2)
                case 'EUR_GBP':
                    return (inputValue * eur / gbp).toFixed(2)
                case 'EUR_AZN':
                    return (inputValue * eur / azn).toFixed(2)
                case 'EUR_RUB':
                    return (inputValue * eur / rub).toFixed(2)
                case 'EUR_EUR':
                    return inputValue
                case 'AZN_USD':
                    return (inputValue / usd).toFixed(2)
                case 'AZN_EUR':
                    return (inputValue / eur).toFixed(2)
                case 'AZN_GBP':
                    return (inputValue / gbp).toFixed(2)
                case 'AZN_RUB':
                    return (inputValue / rub).toFixed(2)
                case 'AZN_AZN':
                    return inputValue
                case 'GBP_AZN':
                    return (inputValue * gbp / azn).toFixed(2)
                case 'GBP_USD':
                    return (inputValue * gbp / usd).toFixed(2)
                case 'GBP_EUR':
                    return (inputValue * gbp / eur).toFixed(2)
                case 'GBP_RUB':
                    return (inputValue * gbp / rub).toFixed(2)
                case 'GBP_GBP':
                    return inputValue
                case 'RUB_AZN':
                    return (inputValue * rub / azn).toFixed(2)
                case 'RUB_USD':
                    return (inputValue * rub / usd).toFixed(2)
                case 'RUB_EUR':
                    return (inputValue * rub / eur).toFixed(2)
                case 'RUB_GBP':
                    return (inputValue * rub / gbp).toFixed(2)
                case 'RUB_RUB':
                    return inputValue
                default:
                    return inputValue
            }
        }
        
        function handleConversion() {
            let firstValue = parseFloat(first_input.value)
            let mainCurrency = first_currency.innerHTML
            let secondCurrency = second_currency.innerHTML
        
            if (mainCurrency !== secondCurrency) {
                let result = convertCurrency(firstValue, mainCurrency, secondCurrency)
                second_input.value = result
            } else {
                second_input.value = firstValue.toFixed(2)
            }
        }
        
        first_input.oninput = handleConversion
        second_input.oninput = function() {
            let secondValue = parseFloat(second_input.value)
            let mainCurrency = second_currency.innerHTML
            let secondCurrency = first_currency.innerHTML
        
            if (mainCurrency !== secondCurrency) {
                let result = convertCurrency(secondValue, mainCurrency, secondCurrency)
                first_input.value = result
            } else {
                first_input.value = secondValue.toFixed(2)
            }
        }
    })
    .catch(error => console.log(error))
}

getCurrency()

// Show exchange_div
function toggleBox(box, exchange, chevron) {
    box.onclick = function() {
        exchange.classList.toggle('d-none')
        chevron.classList.toggle('rotate')
    }
}

const first_box = document.querySelector('.first_box')
const second_box = document.querySelector('.second_box')
const first_exchange = document.querySelector('.first_exchange')
const second_exchange = document.querySelector('.second_exchange')
const first_chevron = document.querySelector('.first_chevron')
const second_chevron = document.querySelector('.second_chevron')

toggleBox(first_box, first_exchange, first_chevron)
toggleBox(second_box, second_exchange, second_chevron)

// Change currency
function toggleExchange(exchanges, currencyElement, boxElement, flagElement, hideClass) {
    exchanges.forEach(function(exchange) {
        exchange.onclick = function(e) {
            e.preventDefault();

            exchanges.forEach(function(item) {
                if (exchange !== item) {
                    item.classList.remove('d-none')
                } else {
                    item.classList.add('d-none')
                }
            })

            boxElement.onclick()

            let exchangeSpan = exchange.querySelectorAll('span')
            currencyElement.innerHTML = exchangeSpan[1].innerHTML

            if (exchangeSpan[1].innerHTML in flags) {
                flagElement.style.backgroundImage = `url(${flags[exchangeSpan[1].innerHTML]})`
            }

            if (exchangeSpan[1].innerHTML === hideClass) {
                document.querySelector(`.${hideClass}`).classList.add('d-none')
            }
        }
    })
}

const exchange_first = document.querySelectorAll('.first_exchange a')
const exchange_second = document.querySelectorAll('.second_exchange a')
const first_currency = document.querySelector('.first_currency')
const second_currency = document.querySelector('.second_currency')
const first_flag = document.querySelector('#first_flag')
const second_flag = document.querySelector('#second_flag')
const flags = {
    'AZN': 'https://unibank.az/assets/images/azn.png',
    'USD': 'https://unibank.az/assets/images/usd.png',
    'RUB': 'https://unibank.az/assets/images/rub.png',
    'GBP': 'https://unibank.az/assets/images/gbp.png',
    'EUR': 'https://unibank.az/assets/images/euro.png'
}

toggleExchange(exchange_first, first_currency, first_box, first_flag, 'AZN')
toggleExchange(exchange_second, second_currency, second_box, second_flag, 'USD')

// Responsive currency tabmenu
let currency_tabmenu = document.querySelectorAll('.currency_tabmenu a')
let divs = document.querySelectorAll('.currency_box .box')

currency_tabmenu[0].classList.add('selected_tab')

for (let i = 1; i < divs.length; i++) {
    divs[i].classList.add('display_none')
}

for(let tabmenu of currency_tabmenu) {
    tabmenu.onclick = function(e) {
        e.preventDefault()
        let selected_tab = document.querySelector('.selected_tab')
        selected_tab.classList.remove('selected_tab')
        this.classList.add('selected_tab')

        let id = this.getAttribute('data-id')

        for(let div of divs) {
            if(id == div.id) {
                div.classList.remove('display_none')
            }

            else{
                div.classList.add('display_none')
            }
        }
    }
}