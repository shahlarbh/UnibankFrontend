// Log out
let log = document.querySelector('.log')

log.onclick = () => document.querySelector('.logout').classList.toggle('d-none')

// Request count
let request_content = document.querySelectorAll('.request_result .request_content')
let request_count = 0

for(let content of request_content) {
    if(content.innerHTML !== '') {
        request_count++
    }
}

document.querySelector('.request_box span').innerHTML = request_count

if(request_count == 0) {
    document.querySelector('.alert').classList.remove('d-none')
}
else {
    document.querySelector('.alert').classList.add('d-none')
}

let request_result = document.querySelectorAll('.request_result')

for(let result of request_result) {
    if(result.querySelector('.request_content').innerHTML == '') {
        result.classList.add('d-none')
    }
    else {
        result.classList.remove('d-none')
    }
}

// Request row
let request_row = document.querySelectorAll('.request_result .request_row')

if (request_count > 0) {
    for (i = 1; i <= request_count; i++) {
        request_row[i - 1].innerHTML = i
    }
}