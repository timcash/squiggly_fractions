let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.font = "24px sans-serif";
ctx.fillStyle = '#ccc'
ctx.lineWidth=1;
ctx.translate(0.5, 0.5);


function Drawer () {
    this.offset = 75
    this.amplitude = 30
    this.subdiv = 1
    this.gridCount = 13
    this.decay = 0.1
    this.timestep = 0.005
    this.draw = () => {
        draw(
            this.timestep,
            this.offset,
            this.amplitude,
            this.subdiv,
            this.gridCount,
            this.decay
        )
    }
}

window.onload = function() {
    let drawer = new Drawer();
    let gui = new dat.GUI();
    gui.add(drawer, 'timestep', 0.0001, 0.01);
    gui.add(drawer, 'offset', 35, 300);
    gui.add(drawer, 'amplitude', 15, 100);
    gui.add(drawer, 'gridCount', 1, 25);
    gui.add(drawer, 'decay', 0, 0.5);
    gui.add(drawer, 'draw');

    drawer.draw()
};

// controller.onFinishChange(function(value) {
//   // Fires when a controller loses focus.
//   alert("The new value is " + value);
// });
  

function getx (t, m) {
    return Math.cos(t * 2 * Math.PI * m)
}

function gety (t, m) {
    return Math.sin(t * 2 * Math.PI * m)
}

function getColor(t) {
    let r = Math.floor(0)
    let g = Math.floor(t * 255)
    let b = Math.floor(t * 255)
    return `rgb(${r}, ${g}, ${b})`
}

console.log(getColor(0.5))

function drawGizmo (timestep, xo, yo, amplitude, nom, dom, ampDecay) {
    
    let t = 0
    while(t <= 1.00) {
        ctx.beginPath();

        let x1 = getx(t, dom) * amplitude + xo
        let y1 = gety(t, nom) * amplitude + yo
        ctx.moveTo(x1, y1);
        t += timestep
        let x2 = getx(t, dom) * amplitude + xo
        let y2 = gety(t, nom) * amplitude + yo
        ctx.strokeStyle = getColor(t)
        ctx.lineTo(x2, y2);
        ctx.stroke();
        amplitude -= ampDecay
    }
}

function draw (timestep, offset, amplitude, subdiv, gridCount, decay) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for(let i = 1; i <= gridCount; i++) {
        ctx.fillText(i.toString(), offset * i - (amplitude /2), amplitude);
    }
    for(let j = 1; j <= gridCount; j++) {
        ctx.fillText(j.toString(), amplitude / 3, offset * j + 10);
    }
    for(let i = 1; i <= gridCount; i++) {
        for(let j = 1; j <= gridCount; j++) {
            drawGizmo(timestep, offset * i, offset * j, amplitude, i / subdiv, j / subdiv, decay)
        }
    }
}


