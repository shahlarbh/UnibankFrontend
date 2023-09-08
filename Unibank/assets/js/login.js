// Change language
const langContainers = document.querySelectorAll('.login_lang, .account_lang, .registration_lang, .password_lang')

langContainers.forEach(container => {
    container.addEventListener('click', function(event) {
        const langLinks = container.querySelectorAll('a')
        langLinks.forEach(link => link.classList.remove('selected_lang'))
        event.target.classList.add('selected_lang')
    })
})

// Change cards
let dots = document.querySelectorAll('.card_control span')

for(let dot of dots) {
    dot.onclick = function() {
        let selected_card = document.querySelector('.selected_card')
        selected_card.classList.remove('selected_card')
        this.classList.add('selected_card')

        let id = this.getAttribute('data-id')
        let boxes = document.querySelectorAll('.left_content .box')

        for(let box of boxes) {
            if(id == box.id) {
                box.classList.remove('d-none')
            }
            else{
                box.classList.add('d-none')
            }
        }
    }
}

// Show password
document.querySelectorAll('.registration_input i, .reset_input i').forEach(function(icon) {
    icon.addEventListener('click', function() {
        let id = this.getAttribute('data-id')
        let inputs = document.querySelectorAll('.registration_input input, .reset_input input')

        for(let input of inputs) {
            if(id === input.id) {
                if(input.type === 'password') {
                    input.type = 'text'
                    icon.classList.replace('fa-eye', 'fa-eye-slash')
                }
                else{
                    input.type = 'password'
                    icon.classList.replace('fa-eye-slash', 'fa-eye')
                }
            }
        }
    })
})