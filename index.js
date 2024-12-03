let mesa1 = [], mesa2 = []
const ratio = 15, rowsMax = 5, mesa1x = 100, mesa1y = 100, margin = 2
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
init();




function init() {
    mesa1 = [...loadTable(mesa1x, mesa1y)];
    drawMesa(mesa1)
}

function loadTable(x, y) {
    const
        arr = [],
        ww = rowsMax + (margin * 2)
        ;
    for (let row = 0; row <= ww; row++) {
        let rowArray = []
        let xx = row % 2 === 0 ? x : x - ratio, yy = y;
        for (let col = 0; col <= ww; col++) {
            let zone = false;
            if (row >= margin && row-margin < rowsMax) {
                center = Math.round((rowsMax + margin) / 2);
                l = col >= (center -Math.trunc((row-margin)/2 ));
                h = col <= (center +Math.round((row-margin)/2 ));
                if (l && h) {
                    zone = true;
                    console.log(row,col)
                }

            }
            rowArray.push({
                zone, buzy: false,
                xx: xx + (ratio * 2 * col*1.02),
                yy: yy + (ratio * 1.75 * row*1.02)
            });
            
        }
        arr.push(rowArray);
    }


    return arr;

}

function drawMesa(mesaArr) {
    const ww = rowsMax + (margin * 2);
    for (let row = 0; row <= ww; row++) {
        for (let col = 0; col <= ww; col++) {
            const { xx, yy, zone } = mesaArr[col][row];
            drawVoidCircle(xx, yy, ratio, zone ? 'black' : '#d6dbdf', 1);
        }
    }

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

