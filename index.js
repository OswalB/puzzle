let mesa1 = [], mesa2 = [], count=0
const ratio = 15, rowsMax = 5, mesa1x = 100, mesa1y = 100, margin = 2
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const fichas = [], board = [];

document.addEventListener('keydown', (event) => {
    // Verifica si la tecla presionada es la flecha derecha
    if (event.key === 'Enter') {
        const config = count%6;
        console.log('pulsada',config);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMesa(mesa1);
        setFicha(1,config,0,0,mesa1);
        count++;
    }
});

class Ficha {
    constructor(color) {
        this.position = 0; // Propiedad independiente, se puede leer y escribir
        this.color = color; // Propiedad independiente, se puede leer y escribir
        this.config = 0; // Usada como índice para piezas
        this.level = 0; // Usada como índice para piezas
        this.piezas = []; // Estructura multidimensional: piezas[level][config] = [{ px, py }]

        // Crear la primera pieza al crear la ficha
        this.addPieza(0, 0);
    }

    // Métodos de lectura y escritura para config y level
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

    // Método para obtener las piezas de los índices actuales (level, config)
    getPiezas() {
        return this.piezas?.[this.level]?.[this.config]?.map(p => ({ ...p })) || [];
    }
}


init();
async function init() {
    mesa1 = [...loadTable(mesa1x, mesa1y)];
    drawMesa(mesa1);
    await crearFichas();

}
async function crearFichas() {

    // Array para manejar las fichas
    // Crear una nueva ficha con configuración inicial 0 y posición inicial 10

    //********** mis fichas */  //  pieza[config][nivel]
    const ficha1 = crearFicha("green");
    ficha1.addPieza(1, 0);
    ficha1.addPieza(2, 0);
    ficha1.setConfig(1);
    ficha1.addPieza(0,0);
    ficha1.addPieza(1,1);
    ficha1.addPieza(1,2);
    ficha1.setConfig(2);
    ficha1.addPieza(0,0);
    ficha1.addPieza(0,1);
    ficha1.addPieza(-1,2);
    ficha1.setConfig(3);
    ficha1.addPieza(0,0);
    ficha1.addPieza(-1,0);
    ficha1.addPieza(-2,0);
    ficha1.setConfig(4);
    ficha1.addPieza(0,0);
    ficha1.addPieza(0,-1);
    ficha1.addPieza(-1,-2);
    ficha1.setConfig(5);
    ficha1.addPieza(0,0);
    ficha1.addPieza(1,-1);
    ficha1.addPieza(1,-2);

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
                    console.log(row, col)
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
    for (let row = 0; row <= ww; row++) {
        for (let col = 0; col <= ww; col++) {
            const { xx, yy, zone } = mesaArr[col][row];
            drawVoidCircle(xx, yy, ratio, zone ? 'black' : '#d6dbdf', 1);
        }
    }

}

function setFicha(position, config, level, idFicha, mesa) {
    const { row, col } = board[position];
    const ficha = fichas[idFicha];
    ficha.setConfig(config)
    const color = ficha.color;
    const setPiezas = ficha.getPiezas();
    setPiezas.forEach(element => {
        const xx = mesa[row + element.py][col + element.px].xx;
        const yy = mesa[row + element.py][col + element.px].yy;
        drawCircle(xx, yy, ratio, color);

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

