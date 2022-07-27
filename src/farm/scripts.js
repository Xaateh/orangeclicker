
function setup() {
    document.getElementById('orangeCounter').textContent=localStorage.getItem('oranges');
    // coinsElement = document.getElementById('coinCounter');
    // coinsValue = localStorage.getItem('coins');
    // if (coinsValue == null || coinsValue == 0) {
    //     coinsElement.parentElement.style="display: none;"
    // } else {
    //     coinsElement.textContent='sex';
    // }
}


function orangeHarvest() {
    if (localStorage.getItem('oranges') == null) {
        localStorage.setItem('oranges', '0');
    }
    const oranges = Number(localStorage.getItem('oranges')) + 1;
    localStorage.setItem('oranges', oranges);
    document.getElementById('orangeCounter').textContent=oranges;
}