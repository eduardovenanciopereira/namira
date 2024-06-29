function toggleMenu() {
    var listRedirect = document.getElementById('list-redirect')
    listRedirect.classList.toggle('active')
}

document.addEventListener('DOMContentLoaded', () => {
    var openMenu = document.getElementById('open-menu')
    openMenu.addEventListener('click', () => {
        toggleMenu()
    })
    var closeMenu = document.getElementById('close-menu')
    closeMenu.addEventListener('click', () => {
        toggleMenu()
    })
})