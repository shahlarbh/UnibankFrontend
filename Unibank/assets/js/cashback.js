// Category filter
document.querySelector('#select_category').addEventListener('change', function() {
    let value = this.value
    let boxes = document.querySelectorAll('.partner_box')

    for (let box of boxes) {
        let category = box.getAttribute('data-category')

        if (value === '' || value === category) {
            box.style.display = 'block'
        } else {
            box.style.display = 'none'
        }
    }
})

// Partner filter
document.addEventListener('DOMContentLoaded', function() {
    let selectCategory = document.querySelector('#select_category')
    let selectPartner = document.querySelector('#select_partner')
    let partnerBoxes = document.querySelectorAll('.partner_box')

    selectCategory.addEventListener('change', function() {
        let selectedCategory = selectCategory.value

        for(let i = 0; i < selectPartner.options.length; i++) {
            selectPartner.options[i].style.display = 'none'
        }

        for(let i = 0; i < partnerBoxes.length; i++) {
            let partnerBox = partnerBoxes[i]
            let partnerCategory = partnerBox.getAttribute('data-category')
            let partnerOptionValue = partnerBox.getAttribute('data-partner')

            if(selectedCategory === '' || partnerCategory === selectedCategory) {
                partnerBox.style.display = 'block'
                selectPartner.querySelector('option[value="' + partnerOptionValue + '"]').style.display = 'block'
            }
            else {
                partnerBox.style.display = 'none'
            }
        }

        selectPartner.selectedIndex = 0
    })

    selectPartner.addEventListener('change', function() {
        let selectedPartner = selectPartner.value

        for(let i = 0; i < partnerBoxes.length; i++) {
            let partnerBox = partnerBoxes[i]
            let partnerOptionValue = partnerBox.getAttribute('data-partner')
            let partnerCategory = partnerBox.getAttribute('data-category')

            if((selectedPartner === '' || partnerOptionValue === selectedPartner) && (selectCategory.value === '' || partnerCategory === selectCategory.value)) {
                partnerBox.style.display = 'block'
            }
            else {
                partnerBox.style.display = 'none'
            }
        }
    })
})

// Search filter
let searchInput = document.querySelector('#searchInput')
let partnerContainer = document.querySelector('#partnerContainer')
let partnerBoxes = partnerContainer.querySelectorAll('.partner_box')

searchInput.addEventListener('input', function() {
    let searchValue = this.value.trim().toLowerCase()

    for (let box of partnerBoxes) {
        let partnerInfo = box.querySelector('.partner_info')
        let partnerText = partnerInfo.textContent || partnerInfo.innerText
        let isMatched = partnerText.toLowerCase().indexOf(searchValue) !== -1
        box.style.display = isMatched ? 'block' : 'none'
    }
})

// Sort filter
document.addEventListener('DOMContentLoaded', function() {

    const partners = document.querySelectorAll('.partner_box')
    const partnerContainer = document.querySelector('#partnerContainer')

    function sortedFilter(sorted) {
        switch (sorted) {
            case '1':
                Array.from(partners).sort((a, b) => a.querySelector('h4').innerText.localeCompare(b.querySelector('h4').innerText)).forEach(partner => partnerContainer.appendChild(partner))
                break
            case '2':
                Array.from(partners).sort((a, b) => b.querySelector('h4').innerText.localeCompare(a.querySelector('h4').innerText)).forEach(partner => partnerContainer.appendChild(partner))
                break
            case '3':
                Array.from(partners).sort((a, b) => parseFloat(a.querySelector('h2').innerText) - parseFloat(b.querySelector('h2').innerText)).forEach(partner => partnerContainer.appendChild(partner))
                break
            case '4':
                Array.from(partners).sort((a, b) => parseFloat(b.querySelector('h2').innerText) - parseFloat(a.querySelector('h2').innerText)).forEach(partner => partnerContainer.appendChild(partner))
                break
            default:
                break
        }
    }

    const sortFilter = document.querySelector('#sortFilter')
    sortFilter.addEventListener('change', function() {
        const sorted = sortFilter.value
        sortedFilter(sorted)
    })

    sortedFilter('1')
})

// Load more
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreButton = document.querySelector('#loadMore')
    const partnerContainer = document.querySelector('#partnerContainer')
    const partnerBoxes = partnerContainer.querySelectorAll('.partner_box')
    const initialDisplayCount = 10
    let currentDisplayCount = initialDisplayCount

    function updateLoadMoreButton() {
        if (currentDisplayCount >= partnerBoxes.length) {
            loadMoreButton.textContent = 'Daha az göstər'
        } else {
            loadMoreButton.textContent = 'Tam siyahı'
        }
    }

    function displayPartnerBoxes(startIndex, endIndex) {
        for (let i = 0; i < partnerBoxes.length; i++) {
            if (i >= startIndex && i < endIndex) {
                partnerBoxes[i].style.display = 'block'
            } else {
                partnerBoxes[i].style.display = 'none'
            }
        }
    }

    function updateDisplayBasedOnCategory() {
        const selectedCategory = document.querySelector('#select_category').value
        let visibleCount = 0

        for (let i = 0; i < partnerBoxes.length; i++) {
            const partnerBox = partnerBoxes[i]
            const partnerCategory = partnerBox.getAttribute('data-category')

            if (selectedCategory === '' || selectedCategory === partnerCategory) {
                if (visibleCount < initialDisplayCount) {
                    partnerBox.style.display = 'block'
                    visibleCount++
                } else {
                    partnerBox.style.display = 'none'
                }
            }
        }

        updateLoadMoreButton()
    }

    loadMoreButton.addEventListener('click', function(event) {
        event.preventDefault()

        if (loadMoreButton.textContent === 'Daha az göstər') {
            currentDisplayCount = initialDisplayCount
        } else {
            currentDisplayCount = partnerBoxes.length
        }

        displayPartnerBoxes(0, currentDisplayCount)
        updateLoadMoreButton()
    })

    const selectCategory = document.querySelector('#select_category')
    selectCategory.addEventListener('change', function() {
        currentDisplayCount = initialDisplayCount
        updateDisplayBasedOnCategory()
        updateLoadMoreButton()
    })

    updateDisplayBasedOnCategory()
})

// Cashback infobox
let cashback_tabmenu = document.querySelectorAll('.cashback_tabs a')
let cashback_context = document.querySelectorAll('.cashback_information .cashback_context')

cashback_tabmenu[0].classList.add('selected_tab')

for (let i = 1; i < cashback_context.length; i++) {
    cashback_context[i].classList.add('d-none')
}

for(let tabmenu of cashback_tabmenu) {
    tabmenu.onclick = function(e) {
        e.preventDefault()
        let selected_tab = document.querySelector('.selected_tab')
        selected_tab.classList.remove('selected_tab')
        this.classList.add('selected_tab')

        let id = this.getAttribute('data-id')

        for(let context of cashback_context) {
            if(id == context.id) {
                context.classList.remove('d-none')
            }

            else{
                context.classList.add('d-none')
            }
        }
    }
}

// Calculate cashback
document.querySelector('#partner').addEventListener('change', function() {
    let value = this.value
    let boxes = document.querySelectorAll('.partner_box')

    for(let box of boxes) {
        let partner = box.getAttribute('data-partner')

        if(value === partner) {
            let cashback = (box.querySelector('h2').innerHTML).slice(0,1)
            document.querySelector('#hideCashback').innerHTML = cashback
            document.querySelector('#calculate_cashback').oninput()
        }
    }
})

document.querySelector('#calculate_cashback').oninput = function() {
    let cash = this.value
    let percentage = Number(document.querySelector('#hideCashback').innerHTML)
    document.querySelector('#cashback').innerHTML = cash * percentage / 100
}

// Responsive cashback tabmenu
let responsive_tabmenu = document.querySelector('#responsive_tabmenu')
let cashback_header = document.querySelector('.cashback_header')

responsive_tabmenu.onclick = () => cashback_header.classList.toggle('steels')

// Responsive cashback infobox
let responsive_tabs = document.querySelectorAll('.responsive_cashback_tabs a')
let responsive_contexts = document.querySelectorAll('.responsive_cashback .cashback_context')

responsive_tabs[0].classList.add('selected_tab')
document.querySelectorAll('.responsive_cashback_tabs a i')[0].classList.add('active_arrow')

for (let i = 1; i < responsive_contexts.length; i++) {
    responsive_contexts[i].classList.add('d-none')
}

for(let tab of responsive_tabs) {
    tab.addEventListener('click', function(e) {
        e.preventDefault()
        this.classList.toggle('selected_tab')

        let id = this.getAttribute('data-id')

        for(let context of responsive_contexts) {
            if(id == context.id) {
                context.classList.toggle('d-none')
                tab.querySelector('i').classList.toggle('active_arrow')
            }
        }
    })
}

// Open the cashback details
let cashback_boxes = document.querySelectorAll('.cashback_partners .partner_box')

for(let box of cashback_boxes) {
    box.onclick = function() {
        const location = box.getAttribute('data-cashback')
        window.location.href = location
    }
}