var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

let cube = [
    [0, 0, 0],
    [0, 0, -100],
    [100, 0, -100],
    [100, 0, 0],
    [0, 100, 0],
    [0, 100, -100],
    [100, 100, -100],
    [100, 100, 0]
];



let xSize = canvas.width;
let ySize = canvas.height;
let dist = 1000000000;
let angleX =0;
let angleY = 0;
let angleZ = 0;

setInterval(draw, 100);



function degressToRadian(angle) {
    return angle * (Math.PI / 180);
}

function toScreenCoords(coords /* coords - массив [x,y,x], возвращает массив [x,y] */ ) {
    let x = coords[0] / (xSize / 2);
    let y = coords[1] / (ySize / 2);
    let z = (coords[2] + dist) / dist;
    let screenX = xSize / 2 + (xSize / 2) * (x / z);
    let screenY = ySize / 2 - (ySize / 2) * (y / z);
    return [screenX, screenY];
}

function rotateZ(coords, angleZ) {
    let newCoords = [];
    let angle = degressToRadian(angleZ);
    newCoords[0] = coords[0] * Math.cos(angle) + coords[1] * (-Math.sin(angle)) + coords[2] * 0;
    newCoords[1] = coords[0] * Math.sin(angle) + coords[1] * Math.cos(angle) + coords[2] * 0;
    newCoords[2] = coords[0] * 0 + coords[1] * 0 + coords[2] * 1;
    return newCoords;
}

function rotateX(coords, angleX) {
    let newCoords = [];
    let angle = degressToRadian(angleX);
    newCoords[0] = coords[0] * 1 + coords[1] * 0 + coords[2] * 0;
    newCoords[1] = coords[0] * 0 + coords[1] * Math.cos(angle) + coords[2] * (-Math.sin(angle));
    newCoords[2] = coords[0] * 0 + coords[1] * Math.sin(angle) + coords[2] * Math.cos(angle);
    return newCoords;
}

function rotateY(coords, angleY) {
    let newCoords = [];
    let angle = degressToRadian(angleY);
    newCoords[0] = coords[0] * Math.cos(angle) + coords[1] * 0 + coords[2] * Math.sin(angle);
    newCoords[1] = coords[0] * 0 + coords[1] * 1 + coords[2] * 0;
    newCoords[2] = coords[0] * (-Math.sin(angle)) + coords[1] * 0 + coords[2] * Math.cos(angle);
    return newCoords;
}

function getScreenCoordsArray(obj) {
    let cube2D = [];
    for (let i = 0; i < obj.length; i++) {
        let coordsR = rotateX(obj[i], angleX)
        coordsR = rotateY(coordsR, angleY);
        coordsR = rotateZ(coordsR, angleZ);
        cube2D.push(toScreenCoords(coordsR));
    }
    return cube2D;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let coords2D = getScreenCoordsArray(cube);
    for (let i = 1; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(coords2D[i][0], coords2D[i][1]);
        ctx.lineTo(coords2D[i - 1][0], coords2D[i - 1][1]);
        ctx.fillText(i + 1, coords2D[i][0] + 10, coords2D[i][1] + 10);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    ctx.beginPath();
    ctx.fillText(1, coords2D[0][0] + 10, coords2D[0][1] + 10);
    ctx.fill();
    ctx.moveTo(coords2D[3][0], coords2D[3][1])
    ctx.lineTo(coords2D[0][0], coords2D[0][1]);
    ctx.stroke();
    ctx.closePath();

    for (let i = 5; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(coords2D[i][0], coords2D[i][1]);
        ctx.lineTo(coords2D[i - 1][0], coords2D[i - 1][1]);
        ctx.fillText(i + 1, coords2D[i][0] + 10, coords2D[i][1] + 10);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    ctx.beginPath();
    ctx.fillText(5, coords2D[4][0] + 10, coords2D[4][1] + 10);
    ctx.fill();
    ctx.moveTo(coords2D[7][0], coords2D[7][1])
    ctx.lineTo(coords2D[4][0], coords2D[4][1]);
    ctx.stroke();
    ctx.closePath();

    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(coords2D[i][0], coords2D[i][1]);
        ctx.lineTo(coords2D[i + 4][0], coords2D[i + 4][1]);
        ctx.stroke();
        ctx.closePath();
    }
    ctx.fillText("X: " +angleX+ " Y: "+ angleY + " Z: " + angleZ, 10,10);
    ctx.stroke();
};

function btnClickX() {
   angleX+=10;
}

function btnClickY() {
   angleY+=10;
}

function btnClickZ() {
   angleZ+=10;
}

function btnClickXm() {
   angleX-=10;
}

function btnClickYm() {
   angleY-=10;
}

function btnClickZm() {
   angleZ-=10;
}
