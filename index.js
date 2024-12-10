let mesa1 = [], mesa2 = [], count = 5, countPos = 0
const ratio = 15, rowsMax = 5, mesa1x = 100, mesa1y = 100, margin = 2
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const fichas = [], board = [];

const configuraciones = {
    pieza0: [
        { cx: 0, cy: 0 },
        { cx: 0, cy: 0 },
        { cx: 0, cy: 0 },
        { cx: 0, cy: 0 },
        { cx: 0, cy: 0 },
        { cx: 0, cy: 0 },
        { cx: 0, cy: 0 },
        { cx: 0, cy: 0 },
        { cx: 0, cy: 0 },
        { cx: 0, cy: 0 },
        { cx: 0, cy: 0 },
        { cx: 0, cy: 0 }
    ],
    pieza1: [
        { cx: 0, cy: 1 },
        { cx: -1, cy: 0 },
        { cx: 0, cy: -1 },
        { cx: 1, cy: -1 },
        { cx: 1, cy: 0 },
        { cx: 1, cy: 1 },//pag2
        { cx: -1, cy: 1 },
        { cx: -1, cy: 0 },
        { cx: -1, cy: -1 },
        { cx: 0, cy: -1 },
        { cx: 1, cy: 0 },
        { cx: 0, cy: 1 },
    ],
    pieza5: [
        { cx: 1, cy: -1 },
        { cx: 1, cy: 0 },
        { cx: 1, cy: 1 },
        { cx: 0, cy: 1 },
        { cx: -1, cy: 0 },
        { cx: 0, cy: -1 },
        //pag2

        { cx: 0, cy: -1 },
        { cx: 1, cy: 0 },
        { cx: 0, cy: 1 },
        { cx: -1, cy: 1 },
        { cx: -1, cy: 0 },
        { cx: -1, cy: -1 },
    ],
    pieza2: [
        { cx: -1, cy: 2 },
        { cx: -2, cy: 0 },
        { cx: -1, cy: -2 },
        { cx: 1, cy: -2 },
        { cx: 2, cy: 0 },
        { cx: 1, cy: 2 },//pag2
        { cx: -1, cy: 2 },
        { cx: -2, cy: 0 },
        { cx: -1, cy: -2 },
        { cx: 1, cy: -2 },
        { cx: 2, cy: 0 },
        { cx: 1, cy: 2 },
    ],
    pieza3: [
        { cx: 1, cy: 1 },
        { cx: 0, cy: 1 },
        { cx: -1, cy: 0 },
        { cx: 0, cy: -1 },
        { cx: 1, cy: -1 },
        { cx: 1, cy: 0 },//pag2
        { cx: 0, cy: 1 },
        { cx: -1, cy: 1 },
        { cx: -1, cy: 0 },
        { cx: -1, cy: -1 },
        { cx: 0, cy: -1 },
        { cx: 1, cy: 0 },

    ],
    pieza4: [
        { cx: 0, cy: 2 },
        { cx: -1, cy: 1 },
        { cx: -1, cy: -1 },
        { cx: 0, cy: -2 },
        { cx: 2, cy: -1 },
        { cx: 2, cy: 1 },//pag2
        { cx: 0, cy: 2 },
        { cx: -2, cy: 1 },
        { cx: -2, cy: -1 },
        { cx: 0, cy: -2 },
        { cx: 1, cy: -1 },
        { cx: 1, cy: 1 },

    ]
}

document.addEventListener('keydown', (event) => {
    // Verifica si la tecla presionada es la flecha derecha
    let localPos = 0
    if (event.key === 's') countPos++;
    if (event.key === 'a') countPos += 14;
    if (event.key === 'Enter') count++;
    localPos = countPos % 15;
    const config = count % 6;

    //console.log('pos', localPos, 'conf', config);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clear();
    const setOk = setFicha(localPos, config, 0, 0, mesa1);
    console.log(setOk)
    drawMesa(mesa1);
    //setFicha(localPos, config, 0, 0, mesa1);


});

class Ficha {
    constructor(color) {
        this.position = 0;
        this.color = color;
        this.config = 0;
        this.level = 0;
        this.piezas = []; // Estructura multidimensional: piezas[level][config] = [{ px, py }]
    }

    setConfig(config) {
        this.config = config;
    }

    getConfig() {
        return this.config;
    }

    setPosition(position) {
        this.position = position;
    }

    getPosition() {
        return this.position;
    }

    setLevel(level) {
        this.level = level;
    }

    setLevelConfig(level, config) {
        this.level = level;
        this.config = config;
    }

    getLevel() {
        return this.level;
    }

    getStatus() {
        return { level: this.level, config: this.config }
    }

    // Método para agregar una pieza a los índices actuales (level, config)
    addPieza(px, py) {
        if (!this.piezas[this.level]) {
            this.piezas[this.level] = [];
        }
        if (!this.piezas[this.level][this.config]) {
            this.piezas[this.level][this.config] = [];
        }

        // Agregar la pieza
        this.piezas[this.level][this.config].push({ px, py });
    }


    getPiezas(row) {
        if (typeof row !== "number") {
            throw new Error("El parámetro 'row' debe ser un número.");
        }

        const isRowEven = row % 2 === 0; // Determina si la fila es par o impar
        const adjustedPosition = isRowEven ? this.config : this.config + 6; // Ajusta la posición según el tipo de fila

        return this.piezas?.[this.level]?.[adjustedPosition]?.map(p => ({ ...p })) || [];
    }

}


init();
async function init() {
    mesa1 = [...loadTable(mesa1x, mesa1y)];
    drawMesa(mesa1);
    await crearFichas();

}
async function crearFichas() {

    const ficha2 = crearFicha("red");
    configPieza(ficha2, 'pieza0');
    configPieza(ficha2, 'pieza1');
    configPieza(ficha2, 'pieza5');
    //configPieza(ficha2,'pieza4');

}

function configPieza(obj, tipoPieza) {
    piezaAct = configuraciones[tipoPieza];
    piezaAct.forEach((configuration, index) => {
        obj.setConfig(index);
        obj.addPieza(configuration.cx, configuration.cy);
    })

}

function crearFicha(color) {
    const nuevaFicha = new Ficha(color);
    fichas.push(nuevaFicha);
    return nuevaFicha;
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
            if (row >= margin && row - margin < rowsMax) {
                center = Math.round((rowsMax + margin) / 2);
                l = col >= (center - Math.trunc((row - margin) / 2));
                h = col <= (center + Math.round((row - margin) / 2));
                if (l && h) {
                    zone = true;
                    //console.log(row, col)
                    board.push({ row, col })
                }

            }
            rowArray.push({
                zone, buzy: false,
                xx: xx + (ratio * 2 * col * 1.02),
                yy: yy + (ratio * 1.75 * row * 1.02)
            });

        }
        arr.push(rowArray);
    }


    return arr;

}

function drawMesa(mesaArr) {
    const ww = rowsMax + (margin * 2);
    const ratio2 = ratio * 0.92;
    for (let row = 0; row <= ww; row++) {
        for (let col = 0; col <= ww; col++) {
            const { xx, yy, zone, colord, buzy } = mesaArr[col][row];
            drawVoidCircle(xx, yy, ratio, zone ? 'black' : '#d6dbdf', 1);
            if (buzy) {
                drawCircle(xx, yy, ratio2, zone?colord: '#d6dbdf');
            }

        }
    }

}

function clear(){
    mesa1.forEach(row=>{
        row.forEach(col=>{
            col.buzy =false;
        })
    })

}

function setFicha(position, config, level, idFicha, mesa) {
    const { row, col } = board[position];
    const ficha = fichas[idFicha];
    let ok = true;
    ficha.setConfig(config);
    ficha.setPosition(position);
    const color = ficha.color;
    const setPiezas = ficha.getPiezas(row);
    //console.log(setPiezas)
    for (const element of setPiezas) {
        const ocupado = mesa[row + element.py][col + element.px].buzy 
        const desborde = !mesa[row + element.py][col + element.px].zone;
        if (ocupado || desborde) {
            console.log('ocupado',ocupado , 'desborde',desborde)
            ok = false;
        }
        mesa[row + element.py][col + element.px].buzy = true;
        mesa[row + element.py][col + element.px].colord = color;
    }
    return ok;
    
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

