let mesa1 = [], mesa2 = []
const ratio = 30, rowsMax =5, mesa1x=320, mesa1y = 100
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
init();




function init() {
    mesa1 = [...loadTable(  mesa1x, mesa1y)];
    drawMesa(mesa1)
}

function loadTable(  xx, yy) {
    const arr = []
    for (i = 0; i < rowsMax; i++) {
        yy = yy + (ratio * 1.75);
        xx = xx-(ratio);
        for (j = 0; j <= i; j++) {
            x2 = xx + (ratio*2 * j);
            arr.push({ xx:x2, yy })
        }

    }
    return arr;

}

function drawMesa(mesaArr){
    
    mesaArr.forEach(fila => {
        drawVoidCircle(fila.xx,fila.yy,ratio,'#d6dbdf',2)
    });
}




function drawCircle(x, y, radio, color) {
    ctx.beginPath();
    ctx.arc(x, y, radio, 0, Math.PI * 2); 
    ctx.fillStyle = color;              
    ctx.fill();                         
    ctx.closePath();
}
function drawVoidCircle(x, y, radio, colorBorde, grosorBorde) {
    ctx.beginPath();
    ctx.arc(x, y, radio, 0, Math.PI * 2); 
    ctx.strokeStyle = colorBorde;        
    ctx.lineWidth = grosorBorde;         
    ctx.stroke();                        
    ctx.closePath();
}


// Dibujar varios círculos
//drawCircle(200, 200, 50, "green");   // Círculo rojo en (100, 100) con radio 50

