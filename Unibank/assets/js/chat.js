let chat_icon = document.querySelector('.chat_icon')
let unibank_chat = document.querySelector('.unibank_chat')
let close_chat = document.querySelector('.close_chat')

// Open chat
chat_icon.onclick = function() {
    unibank_chat.classList.remove('d-none')
    chat_icon.classList.add('d-none')
    document.body.classList.add('chat_scroll')
}

// Close chat
close_chat.onclick = function() {
    unibank_chat.classList.add('d-none')
    chat_icon.classList.remove('d-none')
    document.body.classList.remove('chat_scroll')
    chat_options.classList.add('d-none') // Options menu aktiv halda chatı açıb-bağladıqda options menunun default olaraq bağlanması üçün
}

// Open/close the options menu in chat
let options = document.querySelector('.options')
let chat_options = document.querySelector('.chat_options')

options.onclick = function() {
    chat_options.classList.toggle('d-none')
}

// Sound on/off
let volume_options = document.querySelector('.volume_options')
let change_volume = document.querySelector('.change_volume')
let max_volume = document.querySelector('.max_volume')
let min_volume = document.querySelector('.min_volume')

volume_options.onclick = function() {
    volume_options.classList.toggle('color_transfer')
    change_volume.classList.toggle('margin_transfer')
    max_volume.classList.toggle('d-none')
    min_volume.classList.toggle('d-none')
}