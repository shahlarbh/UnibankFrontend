// Change menu
document.querySelectorAll('.menu a').forEach(function(menu) {
    menu.addEventListener('click', function() {
        document.querySelector('.menu .active').classList.remove('active')
        menu.classList.add('active')
    })
})

// Change language
document.querySelectorAll('.lang a').forEach(function(lang) {
    lang.addEventListener('click', function() {
        document.querySelector('.lang .d-none').classList.remove('d-none')
        lang.classList.add('d-none')
    })
})

// Darkmode with session storage & autotime
function toggleTheme(isDaytime) {
    const body = document.body
    const darkmode = document.querySelector('.theme .moon')
    const lightmode = document.querySelector('.theme .sun')
    const responsive_darkmode = document.querySelector('.theme_hamburger .moon')
    const responsive_lightmode = document.querySelector('.theme_hamburger .sun')

    if(isDaytime) {
        body.classList.remove('darkmode')
        darkmode.classList.remove('d-none')
        lightmode.classList.add('d-none')
        responsive_darkmode.classList.remove('d-none')
        responsive_lightmode.classList.add('d-none')
    }
    else {
        body.classList.add('darkmode')
        darkmode.classList.add('d-none')
        lightmode.classList.remove('d-none')
        responsive_darkmode.classList.add('d-none')
        responsive_lightmode.classList.remove('d-none')
    }
}

function setChatIconVisibility(isDaytime) {
    const chatIcon = document.querySelector('.chat_icon')
    const hour = new Date().getHours()

    if(hour >= 6 && hour < 18) {
        chatIcon.classList.remove('d-none')
    }
    else {
        chatIcon.classList.add('d-none')
    }
}

function setThemeBasedOnTime() {
    const hour = new Date().getHours()
    const isDaytime = hour >= 6 && hour < 18
    toggleTheme(isDaytime)
    sessionStorage.setItem('isDaytime', isDaytime.toString())
    setChatIconVisibility(isDaytime)
}

function initializeLocalStorage() {
    const storedValue = sessionStorage.getItem('isDaytime')

    if(storedValue === null) {
        setThemeBasedOnTime()
    }
    else {
        updateTheme()
    }
}

function updateTheme() {
    const storedValue = sessionStorage.getItem('isDaytime')
    const isDaytime = storedValue === 'true'
    toggleTheme(isDaytime)
    setChatIconVisibility(isDaytime)
}

document.addEventListener('DOMContentLoaded', () => {
    initializeLocalStorage()

    const sunIcons = document.querySelectorAll('.theme .sun, .theme_hamburger .sun')
    const moonIcons = document.querySelectorAll('.theme .moon, .theme_hamburger .moon')

    sunIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const isDaytime = true
            toggleTheme(isDaytime)
            sessionStorage.setItem('isDaytime', 'true')
            setChatIconVisibility(isDaytime, true)
        })
    })

    moonIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const isDaytime = false
            toggleTheme(isDaytime)
            sessionStorage.setItem('isDaytime', 'false')
            setChatIconVisibility(isDaytime, true)
        })
    })

    window.addEventListener('storage', (event) => {
        if(event.key === 'isDaytime') {
            updateTheme()
        }
    })

    setInterval(setThemeBasedOnTime, 3600000)
})

// Search panel
let search_loop = document.querySelector('.search_loop')
let search_panel = document.querySelector('.search_panel')
let hidden_panel = document.querySelector('.hidden_panel')
let close = document.querySelector('.close')
let loop = document.querySelector('.loop')

search_loop.onclick = () => {
    search_panel.classList.toggle('d-none')
    document.querySelector('body').classList.toggle('noscroll')
    hidden_panel.classList.add('d-none') // hidden_panel aktiv vəziyətdə olduğu zaman search_loop`u açıb-bağladıqda hidden_panel`in avtomatik olaraq görünməməsi üçün
}

close.onclick = () => {
    search_panel.classList.add('d-none')
    document.querySelector('body').classList.toggle('noscroll')
}

loop.onclick = () => hidden_panel.classList.toggle('d-none')

// Hamburger menu
let hamburger_menu = document.querySelector('.hamburger_icon')
let hamburger_panel = document.querySelector('.hamburger_panel')

hamburger_menu.onclick = () => {
    hamburger_panel.classList.toggle('active_hamburger')
    document.querySelector('body').classList.toggle('noscroll')
}

// Change responsive menu
document.querySelectorAll('.menu_hamburger a').forEach(function(menu) {
    menu.addEventListener('click', function() {
        document.querySelector('.menu_hamburger .active').classList.remove('active')
        menu.classList.add('active')
    })
})

// Change responsive language
document.querySelectorAll('.responsive_language a').forEach(function(lang) {
    lang.addEventListener('click', function() {
        document.querySelector('.responsive_language .d-none').classList.remove('d-none')
        lang.classList.add('d-none')
    })
})

// Select location for pages
const allLinks = document.querySelectorAll('.hr_links a, .transfer_link a')

allLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault()

        allLinks.forEach(otherLink => {
            otherLink.classList.remove('select_location')
        })

        link.classList.add('select_location')
        window.location.href = link.getAttribute('href')
    })
})

const currentURL = window.location.href

allLinks.forEach(link => {
    if(link.href === currentURL) {
        link.classList.add('select_location')
    }
})

// Click the digital box
let digital_box = document.querySelectorAll('.digital_box')

for(let box of digital_box) {
    box.onclick = function() {
        const url = box.getAttribute('data-url')
        window.location.href = url
    }
}

// Play video
function playVideo() {
    let iframe = document.querySelector('.unibank_video iframe')
    iframe.setAttribute("src", iframe.getAttribute("src") + "&autoplay=1")

    iframe.style.opacity = '1'
    iframe.style.height = '400px'

    document.querySelector('.unibank_video').style.height = '400px'
    document.querySelector('.unibank_video i').style.opacity = '0'
}

// Click the contact box
let contact_box = document.querySelectorAll('.contact_box')

for(let box of contact_box) {
    box.onclick = function() {
        const location = box.getAttribute('data-location')
        window.location.href = location

        if(location === '#chat') {
            chat_icon.onclick()
        }
    }
}

// Click the top news details
let news_box = document.querySelectorAll('.news .box')

for(let box of news_box) {
    box.onclick = function() {
        const location = box.getAttribute('data-news')
        window.location.href = location
    }
}

// Click the bank boxes
let bank_boxes = document.querySelectorAll('.bank_boxes .bank_box')

for(let box of bank_boxes) {
    box.onclick = function() {
        const location = box.getAttribute('data-about')
        window.location.href = location
    }
}

// Click the HR boxes
let hr_boxes = document.querySelectorAll('.hr_information .box')

for(let box of hr_boxes) {
    box.onclick = function() {
        const location = box.getAttribute('data-hr')
        window.location.href = location
    }
}