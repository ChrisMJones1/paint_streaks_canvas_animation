function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function getRndIntegerInc(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getRndHexColor() {
    // let r = getRndInteger(0, (256));
    // let g = getRndInteger(0, (256));
    // let b = getRndInteger(0, (256));
    return "#" + (getRndInteger(0, (256))).toString(16).padStart(2, '0') + (getRndInteger(0, (256))).toString(16).padStart(2, '0') + (getRndInteger(0, (256))).toString(16).padStart(2, '0');

}

function getRndArrayColor(themeColors) {

    // return "#" + (getRndInteger(0, (256))).toString(16).padStart(2, '0') + (getRndInteger(0, (256))).toString(16).padStart(2, '0') + (getRndInteger(0, (256))).toString(16).padStart(2, '0');
    return themeColors[getRndInteger(0, themeColors.length)];

}





const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');


let clientHeight = window.innerHeight;
let clientWidth = window.innerWidth;



ctx.canvas.width = clientWidth;
ctx.canvas.height = clientHeight;

let radius = 20;

let gap = 5;

let circles = [];





let rowLine = (clientHeight - (2*radius + gap));

let colLine = (clientWidth - (2*radius + gap));


class Circle {
    constructor(x, y, row, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = getRndArrayColor(colorPallete);
        this.row = row;
    }
}
let r;

function animationStart() {
    window.onresize = resize;
    for(let i = 0; i < clientWidth + 2 * (2*radius); i += (2*radius)) {
        if(Math.random() > 0.6) {
            let radiusAdjustment = Math.random() > 0.5 ? (Math.random() * radius) / 2 * -1 : (Math.random() * radius) / 2;
            let circ = new Circle(i, 0, r, radius + radiusAdjustment);
            circles.push(circ);
        }
    }
    animationFrame = window.requestAnimationFrame(animationLoop);
}

const colorPalletes = [
    ["#F04462", "#F3B044", "#CAECC8", "#0DB9BD", "#117172"],
    ["#F0F2E9", "#C89F7E", "#B5ACC6", "#CC4F9B", "#2791A4"],
    ["#ffadad","#ffd6a5","#fdffb6","#caffbf","#9bf6ff","#a0c4ff","#bdb2ff","#ffc6ff","#fffffc"],
    ["#03071e","#370617","#6a040f","#9d0208","#d00000","#dc2f02","#e85d04","#f48c06","#faa307","#ffba08"],
    ["#7400b8","#6930c3","#5e60ce","#5390d9","#4ea8de","#48bfe3","#56cfe1","#64dfdf","#72efdd","#80ffdb"],
    ["#9b5de5","#f15bb5","#fee440","#00bbf9","#00f5d4"],
    ["#2d00f7","#6a00f4","#8900f2","#a100f2","#b100e8","#bc00dd","#d100d1","#db00b6","#e500a4","#f20089"],
    ["#ef476f","#ffd166","#06d6a0","#118ab2","#073b4c"],
    ["#ffbe0b","#fb5607","#ff006e","#8338ec","#3a86ff"],
    ["#0c0f0a","#ff206e","#fbff12","#41ead4","#ffffff"],
    ["#b76935","#a56336","#935e38","#815839","#6f523b","#5c4d3c","#4a473e","#38413f","#263c41","#143642"],
    ["#ffffff","#81f4e1","#56cbf9","#ff729f","#d3c4d1"],
    ["#4d9de0","#e15554","#e1bc29","#3bb273","#7768ae"],




];

let palleteIndex = getRndInteger(0, colorPalletes.length);

let colorPallete = colorPalletes[palleteIndex];

let frames = 0;
let drip = 0;

function animationLoop() {
    if(frames === 0) {
        let vFilter;
        let vertSpawn = true;

        for(circ of circles) {

            vFilter = 3000;
            ctx.fillStyle = circ.color;
            ctx.beginPath();
            ctx.arc(circ.x, circ.y, circ.radius, 0, Math.PI * 2);
            ctx.lineWidth = 5;
            ctx.fill();




            circ.y += 3;



            if(circ.y <= vFilter) {
                vFilter = circ.y - (2*radius + gap);
                if(vFilter < 0 - 2 * (2*radius + gap)) {
                    vertSpawn = false;
                }
            }
        }

        circles = circles.filter(circle => circle.y > -2 * (2*radius + gap) && circle.y < clientHeight + 2 * (2*radius + gap) && circle.x > -2 * (2*radius + gap) && circle.x < clientWidth + 2 * (2*radius + gap));

        if(vertSpawn) {
            for(let i = 0; i < clientWidth + 2 * (2*radius); i += (2*radius)) {
                if(Math.random() > 0.6) {
                    let radiusAdjustment = Math.random() > 0.5 ? (Math.random() * radius) / 2 * -1 : (Math.random() * radius) / 2;
                    let circ = new Circle(i, vFilter, r, radius + radiusAdjustment);
                    circles.push(circ);
                }
            }
        }



    }
    frames ++;

    if(frames > 1) {
        frames = 0;
    }
    animationFrame = window.requestAnimationFrame(animationLoop);

}



let vertToggle = true;

let triggerChance = 0;

function clickSwitch() {

    //ensure the color pallete changes every click.
    let currentIndex = palleteIndex;
    while(palleteIndex === currentIndex) {
        palleteIndex = getRndInteger(0, colorPalletes.length);
    }

    colorPallete = colorPalletes[palleteIndex];

}


function resize() {

    pageHeight = window.innerHeight;
    pageWidth = window.innerWidth;

    ctx.canvas.width  = pageWidth;
    ctx.canvas.height = pageHeight;
    clientHeight = pageHeight;
    clientWidth = pageWidth;
    
}



document.addEventListener('click', clickSwitch);


animationFrame = window.requestAnimationFrame(animationStart);









