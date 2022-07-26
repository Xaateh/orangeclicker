
function orangeHarvest() {
    if (localStorage.getItem('oranges') == null) {
        localStorage.setItem('oranges', '0');
        console.log('???')
    }
    const oranges = Number(localStorage.getItem('oranges')) + 1;
    localStorage.setItem('oranges', oranges);
    document.getElementById('orangeCounter').innerHTML = '<img src=\'../../build/orange_512.ico\' alt=\'[orange.png]\'>' + oranges;
}