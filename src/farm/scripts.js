const { millify } = require('millify');

function orangeHarvest() {
    if (localStorage.getItem('oranges') == null) {
        localStorage.setItem('oranges', '0');
    }
    const oranges = Number(localStorage.getItem('oranges')) + 1;
    localStorage.setItem('oranges', oranges);
    document.getElementById('orangeCounter').textContent=millify(Number(oranges));
}