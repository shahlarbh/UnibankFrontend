// Show branchs
let branch_tabmenu = document.querySelectorAll('.atm a')
branch_tabmenu[0].classList.add('select_location')

for(let tabmenu of branch_tabmenu) {
    tabmenu.onclick = function(e) {
        e.preventDefault()
        let select_location = document.querySelector('.select_location')
        select_location.classList.remove('select_location')
        this.classList.add('select_location')

        let branchs = document.querySelectorAll('.branch')

        for(let branch of branchs) {
            let id = branch.getAttribute('data-id')

            if(id.includes(this.id)) {
                branch.classList.remove('d-none')
            }
            else{
                branch.classList.add('d-none')
            }
        }
    }
}