// Slider carusel
let slider = document.querySelector('.slider')
let slider_count = document.querySelectorAll('.slider .slider_page').length
slider.style.width = `${100 * slider_count}%`

const carusel_control = document.querySelector('.carusel_control ul')

for (let i = 0; i < slider_count; i++) {
    const slider_control = document.createElement('li')
    carusel_control.appendChild(slider_control)
}

carusel_control.querySelector('li').classList.add('selected')

const indicators = document.querySelectorAll('.carusel_control ul li')
let current_index = 0

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        document.querySelector('.carusel_control .selected').classList.remove('selected')
        indicator.classList.add('selected')
        current_index = index

        updateSliderPosition()
    })
})

function updateSliderPosition() {
    const translateX = current_index *(-100 / slider_count)
    slider.style.transform = `translate(${translateX}%)`
}

function updateSelectedIndicator() {
    document.querySelector('.carusel_control .selected').classList.remove('selected')
    indicators[current_index].classList.add('selected')
}

function nextSlider() {
    current_index = (current_index + 1) % indicators.length
    updateSliderPosition()
    updateSelectedIndicator()
}

setInterval(nextSlider, 3000)