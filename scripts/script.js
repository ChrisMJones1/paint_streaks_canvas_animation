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


let vertSpace = -(2*radius + gap);
let horzSpace = -(2*radius + gap);


let rowchange = -1;

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
    for(let i = (2*radius + gap); i < clientWidth - (2*radius + gap); i += (2*radius + gap)) {
        r = 0;
        for(let j = (2*radius + gap); j <= clientHeight - (2*radius + gap); j += (2*radius + gap)) {
            r++;
            if(Math.random() > 0.6) {
                let circ = new Circle(i,j,r);
                circles.push(circ);
            }


        }//vert inner loop

    }//horz outer loop
    animationFrame = window.requestAnimationFrame(animationLoop);
}

const colorPalletes = [
    ["#F04462", "#F3B044", "#CAECC8", "#0DB9BD", "#117172"],
    ["#F0F2E9", "#C89F7E", "#B5ACC6", "#CC4F9B", "#2791A4"],
    ["#ffadad","#ffd6a5","#fdffb6","#caffbf","#9bf6ff","#a0c4ff","#bdb2ff","#ffc6ff","#fffffc"],
    ["#03071e","#370617","#6a040f","#9d0208","#d00000","#dc2f02","#e85d04","#f48c06","#faa307","#ffba08"],
    ["#7400b8","#6930c3","#5e60ce","#5390d9","#4ea8de","#48bfe3","#56cfe1","#64dfdf","#72efdd","#80ffdb"],
    ["#9b5de5","#f15bb5","#fee440","#00bbf9","#00f5d4"],

    

];

let colorPallete = colorPalletes[getRndInteger(0, colorPalletes.length)];

let frames = 0;
let drip = 0;

function animationLoop() {
    if(frames === 0) {
        let vFilter;
        let vertSpawn = true;
        //ctx.clearRect(0,0, clientWidth, 0);
        //ctx.clearRect(0,clientHeight/2, clientWidth, clientHeight / 2);

        for(circ of circles) {

            vFilter = 3000;
            ctx.fillStyle = circ.color;
            ctx.beginPath();
            ctx.arc(circ.x, circ.y, circ.radius, 0, Math.PI * 2);
            ctx.lineWidth = 5;
            ctx.fill();
            if(horzToggle) {
                circ.x += horzSpace;
            }


            if(vertToggle) {
                circ.y += 3;
            }
            // if(circ.y > clientHeight / 2 && Math.random() > 0.9) {
            //     circ.radius += Math.random();
            // }

            circ.row += rowchange;

            if(circ.y <= vFilter) {
                vFilter = circ.y - (2*radius + gap);
                if(vFilter < 0 - 2 * (2*radius + gap)) {
                    vertSpawn = false;
                }
            }
        }

        circles = circles.filter(circle => circle.y > -2 * (2*radius + gap) && circle.y < clientHeight + 2 * (2*radius + gap) && circle.x > -2 * (2*radius + gap) && circle.x < clientWidth + 2 * (2*radius + gap));

        if(vertToggle && vertSpawn) {
            for(let i = 0; i < clientWidth + 2 * (2*radius); i += (2*radius)) {
                if(Math.random() > 0.6) {
                    let radiusAdjustment = Math.random() > 0.5 ? (Math.random() * radius) / 2 * -1 : (Math.random() * radius) / 2;
                    let circ = new Circle(i, vFilter, r, radius + radiusAdjustment);
                    circles.push(circ);
                }
            }
        }

        if(horzToggle) {
            for(let i = (2*radius + gap); i < clientHeight - 2*(2*radius + gap); i += (2*radius + gap)) {
                if(Math.random() > 0.6) {
                    let circ = new Circle(colLine, i, r);
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


let horzToggle = false;
let vertToggle = true;

let triggerChance = 0;

function clickSwitch() {
    window.cancelAnimationFrame(animationFrame);


    if(Math.random() > (0.5 - triggerChance)) {
        triggerChance = 0;
        colLine = colLine === (clientWidth - (2*radius + gap)) ? (2*radius + gap) : (clientWidth - (2*radius + gap));
        horzSpace = horzSpace === -(2*radius + gap) ? (2*radius + gap) : -(2*radius + gap);
    } else {
        triggerChance += 0.1;
    }

    if(Math.random() > (0.5 - triggerChance)) {
        triggerChance = 0;
        rowLine = rowLine === (clientHeight - (2*radius + gap)) ? (2*radius + gap) : (clientHeight - (2*radius + gap));
        vertSpace = vertSpace === -(2*radius + gap) ? (2*radius + gap) : -(2*radius + gap);
    } else {
        triggerChance += 0.1;
    }

    horzToggle = Math.random() <= 0.5;

    vertToggle = Math.random() <= 0.5;

    if(!vertToggle && !horzToggle) {
        if(Math.random() > 0.5) {
            vertToggle = true;
        } else {
            horzToggle = true;
        }
    }
    //space *= -1;
    //rowchange *= -1;
    animationFrame = window.requestAnimationFrame(animationLoop);

}


function resize() {
    window.cancelAnimationFrame(animationFrame);
    pageHeight = window.innerHeight;
    pageWidth = window.innerWidth;

    ctx.canvas.width  = pageWidth;
    ctx.canvas.height = pageHeight;
    circles = [];
    animationFrame = window.requestAnimationFrame(animationStart);
}



document.addEventListener('click', clickSwitch);


animationFrame = window.requestAnimationFrame(animationStart);









