
function orangeHarvest() {
    if (localStorage.getItem('oranges') == null) {
        localStorage.setItem('oranges', '0');
    }
    const oranges = Number(localStorage.getItem('oranges')) + 1;
    localStorage.setItem('oranges', oranges);
    document.getElementById('orangeCounter').textContent=millify(Number(oranges), {precision: 1,lowercase: true});
    // addParticle()
}

function setupCanvas() {
    var canvas = document.getElementById('treesCanvas');
    var img = document.getElementById('orangeTree');

    canvas.width=parseInt(img.width);
    canvas.height=parseInt(img.height);
}

// function addParticle() {
//     const canvas = document.getElementById('treesCanvas');
//     const ctx = canvas.getContext('2d');
//     const canvasSize = canvas.getBoundingClientRect();
//     const orangeTree = document.getElementById('orangeTree');
//     const orange = new Image();
//     orange.src = "../img/orange_32.png";

//     orangeTree.addEventListener('click', (event) => {
//         ctx.drawImage(orange, event.clientX - canvasSize.left, event.clientY - canvasSize.top)
//     })
// }