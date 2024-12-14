let mesa1 = [], mesa2 = [], count = 5, countPos = 0, salir = false;
let countF = -1, countSuccess = 0, paint = false;
const ratio = 15, rowsMax = 5, mesa1x = 100, mesa1y = 100, margin = 2
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const fichas = [], board = [], success = [];

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
    if (event.key === 'z') countSuccess = 0;

    if (event.key === 's') countPos++;
    if (event.key === 'a') countPos += 14;
    if (event.key === 'Enter') count++;
    if (event.key === 'f') countF++;
    if (event.key === 'k') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        clear();
        success[countSuccess].forEach(element => {
            setFicha(element.lugar, element.config, 0, element.idFicha, mesa1);
            drawMesa(mesa1);
        })
        countSuccess++;
    }
    if (['s', 'a', 'Enter', 'f'].includes(event.key)) {
        localPos = countPos % 15;
        const config = count % 6;
        const idFicha = countF % fichas.length;
        //console.log('pos', localPos, 'conf', config);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        clear();
        const setOk = setFicha(localPos, config, 0, idFicha, mesa1);
        console.log(`Test: ${setOk}, P: ${localPos}, C: ${config}, F: ${idFicha} `)
        drawMesa(mesa1);
        //setFicha(localPos, config, 0, 0, mesa1);
    }

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

    const ficha1 = crearFicha("green");
    configPieza(ficha1, 'pieza0');
    configPieza(ficha1, 'pieza1');
    configPieza(ficha1, 'pieza2');
    //configPieza(ficha2,'pieza4');

    const ficha0 = crearFicha("blue");
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza1');
    configPieza(ficha0, 'pieza4');

    const ficha3 = crearFicha("yellow");
    configPieza(ficha3, 'pieza0');
    configPieza(ficha3, 'pieza3');
    configPieza(ficha3, 'pieza4');

    const ficha4 = crearFicha("brown");
    configPieza(ficha4, 'pieza0');
    configPieza(ficha4, 'pieza1');
    configPieza(ficha4, 'pieza3');

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
            const { xx, yy, zone, colord, buzy, base } = mesaArr[col][row];
            drawVoidCircle(xx, yy, ratio, zone ? 'black' : '#d6dbdf', 1);
            if (buzy) {
                drawCircle(xx, yy, ratio2, zone ? colord : '#d6dbdf');
                if (base) drawCircle(xx, yy, ratio * 0.3, '#ffffff');
            }

        }
    }

}

function clear() {
    mesa1.forEach(row => {
        row.forEach(col => {
            col.buzy = false;
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
    let base = true;
    for (const element of setPiezas) {
        const ocupado = mesa[row + element.py][col + element.px].buzy
        const desborde = !mesa[row + element.py][col + element.px].zone;
        if (ocupado || desborde) {
            //console.log('ocupado', ocupado, 'desborde', desborde);
            ok = false;
        }
        mesa[row + element.py][col + element.px].buzy = true;
        mesa[row + element.py][col + element.px].colord = color;
        mesa[row + element.py][col + element.px].base = base;
        base = false;
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


function explorar(fichas, mesa) {
    const totalPosiciones = 15; // Número de posiciones en el tablero
    const totalConfiguraciones = 6; // Configuraciones posibles por ficha
    const level = 0; // Nivel fijo según el problema

    // Array para almacenar combinaciones válidas
    const combinacionesValidas = [];

    // Recorrer todas las combinaciones de idFicha, config y position
    for (let idFicha = 0; idFicha < fichas.length; idFicha++) {
        for (let position = 0; position < totalPosiciones; position++) {
            let configuracionValidaEncontrada = false;

            for (let config = 0; config < totalConfiguraciones; config++) {
                // Intentar colocar la ficha en la posición con la configuración dada
                const setOk = setFicha(position, config, level, idFicha, mesa);
                drawMesa(mesa1);
                if (setOk) {
                    // Si es válida, guardar la combinación
                    combinacionesValidas.push({ idFicha, config, position });
                    console.log(`Válido: idFicha=${idFicha}, config=${config}, position=${position}`);
                    configuracionValidaEncontrada = true;

                    // No seguimos probando más configuraciones si una ya es válida
                    break;
                } else {
                    // Limpiar la mesa si la combinación no es válida
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    clear(mesa);
                }
            }

            // Si no encontramos ninguna configuración válida, abortamos el resto de posiciones
            if (!configuracionValidaEncontrada) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                clear(mesa); // Asegurarse de limpiar antes de pasar a la siguiente posición
                break;
            }
        }
    }

    // Mostrar el total de combinaciones válidas encontradas
    console.log(`Total de combinaciones válidas: ${combinacionesValidas.length}`);
    return combinacionesValidas;
}

// Ejemplo de uso
async function explore() {
    const valms = document.getElementById('delay');
    let localPos = 0
    for (let i = 0; i <= 14; i++) {
        console.log(i); // Muestra el índice
        countPos++;
        for (j = 0; j < 6; j++) {
            count++;
            localPos = countPos % 15;
            const config = count % 6;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            clear();
            const setOk = setFicha(localPos, config, 0, 0, mesa1);
            console.log(setOk)
            drawMesa(mesa1);

            await new Promise(resolve => setTimeout(resolve, parseInt(valms.value)));
        }
        console.log("Fin del bucle");
    }
}



// Archivo: combinaciones.js

// Función para generar combinaciones de k elementos de un array
function combinaciones(array, k) {
    if (k === 0) return [[]];
    if (array.length === 0) return [];
    const [primero, ...resto] = array;
    const conPrimero = combinaciones(resto, k - 1).map(comb => [primero, ...comb]);
    const sinPrimero = combinaciones(resto, k);
    return conPrimero.concat(sinPrimero);
}

// Función para generar permutaciones de un array
function permutaciones(array) {
    if (array.length === 0) return [[]];
    return array.flatMap((val, i) =>
        permutaciones(array.slice(0, i).concat(array.slice(i + 1))).map(perm => [val, ...perm])
    );
}

// Función principal
async function generarCombinaciones(localBoard) {
    const valms = document.getElementById('delay');
    let intentos = 0;
    //const success = []; // Array para almacenar configuraciones exitosas
    const objetos = []; // Array de objetos (puede cambiar dinámicamente)
    for (let i in fichas) {
        objetos.push(parseInt(i));
    }
    //const lugares = [0, 1, 2, 3, 4, 5];
    //const lugares = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // Array de lugares (puede cambiar dinámicamente)
    
    
    const lugares = [];
    for (let i in localBoard) {
        lugares.push(parseInt(i));
    }
    
    const posiciones = [0, 1, 2, 3, 4, 5]; // Posiciones (como números)

    const numeroObjetos = objetos.length;

    // Generar combinaciones de lugares en función del tamaño de objetos
    const combinacionesLugares = combinaciones(lugares, numeroObjetos);

    // Función para asignar posiciones
    function asignarPosiciones(indices) {
        if (indices.length === 0) return [[]];
        const [primerIndice, ...resto] = indices;
        return posiciones.flatMap(pos =>
            asignarPosiciones(resto).map(asignacion => [[primerIndice, pos], ...asignacion])
        );
    }

    // Generar todas las permutaciones y asignar posiciones
    for (let lugaresSeleccionados of combinacionesLugares) {
        for (let permutacionObjetos of permutaciones(objetos)) {
            const asignaciones = asignarPosiciones(permutacionObjetos);
            for (let asignacion of asignaciones) {
                if (paint) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }

                clear();

                let countFail = 0;
                const configuracionActual = []; // Array temporal para almacenar la configuración actual

                for (let i = 0; i < lugaresSeleccionados.length; i++) {
                    intentos++;
                    if (intentos % 5000 === 0) console.log(intentos/1000000);
                    const lugar = lugaresSeleccionados[i];
                    const [idFicha, config] = asignacion[i];
                    const localPos = lugar;

                    const setOk = setFicha(localPos, config, 0, idFicha, mesa1);
                    if (!setOk) {
                        countFail++;
                        break; // Si hay error, no es necesario continuar esta configuración
                    }

                    configuracionActual.push({ lugar, config, idFicha });
                }

                if (countFail === 0) {
                    success.push([...configuracionActual]); // Guardar configuración exitosa
                    console.log('combinacion ok en linea: ', intentos)
                }
                if (paint) {
                    drawMesa(mesa1);
                    await new Promise(resolve => setTimeout(resolve, parseInt(valms.value)));
                }


            }
        }
    }
    console.log("Combinaciones probadas:", intentos);
    console.log("Configuraciones exitosas:", success);
}




// Ejecutar la función

