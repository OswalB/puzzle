let mesa1 = [], mesa2 = [], salir = false, erase = [], configuraciones, successFinal = [];
let count = {
    config: 0, position: 0, ficha: 0,
    level: 0, estado: 0, exito: 0
};
let paint = false, currentState = {}, success = [], successB = [];
const boards = [], configs = [], estados = [], exito = [];
const ratio = 15, wCeldas = 20, hCeldas = 12, mesa1x = 80, mesa1y = 30
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const fichas = [], setStates = [];
const set1 = [0, 1, 2, 3, 4];
const set2 = [5, 6, 7, 8, 9, 10];
//const set2 = [0,1, 2, 3, 4];

function final() {
    const level = 1;
    for (let i = 0; i < successB.length; i++) {
        const temPrueba = { tableroA: [], tableroB: [] };
        temPrueba.tableroA.push(success[i]);
        //success[i].forEach(tableroA => {
        clear();
        successB[i].forEach(pieza => {
            const { position, config, idFicha } = pieza;
            testFicha(position, config, level, idFicha, false);
        });
        let error = false;
        for (let p = 0; p < success.length; p++) {
            temPrueba.tableroB.push(success[p]);
            for (let c = 0; c < success[p].length; p++) {
                const { position, config, idFicha } = success[p][c];
                error = testFicha(position, config, 0, idFicha, false);
                if (error) break;
            }



        }
        if (!error) {
            successFinal.push(temPrueba);
            console.log(temPrueba);
        }
        //})


    }
    //drawMesa(mesa1)
}

async function initArrays() {
    configs.push(0, 1, 2, 3, 4, 5);
    count.config = configs.length - 1;
    const ax = 2, ay = 2;
    const bx = 8, by = 6;
    const cx = 14, cy = 2;
    const board0 = [], board1 = [], board2 = [];
    board0.push(
        [ax + 2, ay + 0],
        [ax + 2, ay + 1], [ax + 3, ay + 1],
        [ax + 1, ay + 2], [ax + 2, ay + 2], [ax + 3, ay + 2],
        [ax + 1, ay + 3], [ax + 2, ay + 3], [ax + 3, ay + 3], [ax + 4, ay + 3],
        [ax + 0, ay + 4], [ax + 1, ay + 4], [ax + 2, ay + 4], [ax + 3, ay + 4], [ax + 4, ay + 4],
    );
    count.position = board0.length - 1;
    board1.push(
        [bx + 2, by + 0],
        [bx + 2, by + 1], [bx + 3, by + 1],
        [bx + 1, by + 2], [bx + 2, by + 2], [bx + 3, by + 2],
        [bx + 1, by + 3], [bx + 2, by + 3], [bx + 3, by + 3], [bx + 4, by + 3],
        [bx + 0, by + 4], [bx + 1, by + 4], [bx + 2, by + 4], [bx + 3, by + 4], [bx + 4, by + 4],
    );
    board2.push(
        [cx + 2, cy + 0],
        [cx + 2, cy + 1], [cx + 3, cy + 1],
        [cx + 1, cy + 2], [cx + 2, cy + 2], [cx + 3, cy + 2],
        [cx + 1, cy + 3], [cx + 2, cy + 3], [cx + 3, cy + 3], [cx + 4, cy + 3],
        [cx + 0, cy + 4], [cx + 1, cy + 4], [cx + 2, cy + 4], [cx + 3, cy + 4], [cx + 4, cy + 4],
    )
    boards.push(board0);
    boards.push(board1);
    boards.push(board2);
    erase = [...board0, ...board1, ...board2];

    configuraciones = {
        piezaA: [
            { cx: 0, cy: 0, brd: 2 },
            { cx: 0, cy: 0, brd: 2 },
            { cx: 0, cy: 0, brd: 2 },
            { cx: 0, cy: 0, brd: 2 },
            { cx: 0, cy: 0, brd: 2 },
            { cx: 0, cy: 0, brd: 2 },
            { cx: 0, cy: 0, brd: 2 },
            { cx: 0, cy: 0, brd: 2 },
            { cx: 0, cy: 0, brd: 2 },
            { cx: 0, cy: 0, brd: 2 },
            { cx: 0, cy: 0, brd: 2 },
            { cx: 0, cy: 0, brd: 2 }
        ],
        piezaB: [
            { cx: 1, cy: -1, brd: 2 },
            { cx: 1, cy: 0, brd: 2 },
            { cx: 1, cy: 1, brd: 2 },
            { cx: 0, cy: 1, brd: 2 },
            { cx: -1, cy: 0, brd: 2 },
            { cx: 0, cy: -1, brd: 2 },
            { cx: 0, cy: -1, brd: 2 },
            { cx: 1, cy: 0, brd: 2 },
            { cx: 0, cy: 1, brd: 2 },
            { cx: -1, cy: 1, brd: 2 },
            { cx: -1, cy: 0, brd: 2 },
            { cx: -1, cy: -1, brd: 2 }
        ],
        piezaC: [
            { cx: 1, cy: 0, brd: 2 },
            { cx: 1, cy: 1, brd: 2 },
            { cx: 0, cy: 1, brd: 2 },
            { cx: -1, cy: 0, brd: 2 },
            { cx: 0, cy: -1, brd: 2 },
            { cx: 1, cy: -1, brd: 2 },
            { cx: 1, cy: 0, brd: 2 },
            { cx: 0, cy: 1, brd: 2 },
            { cx: -1, cy: 1, brd: 2 },
            { cx: -1, cy: 0, brd: 2 },
            { cx: -1, cy: -1, brd: 2 },
            { cx: 0, cy: -1, brd: 2 },
        ],
        piezaF: [
            { cx: -1, cy: 0, brd: 2 },
            { cx: 0, cy: -1, brd: 2 },
            { cx: 1, cy: -1, brd: 2 },
            { cx: 1, cy: 0, brd: 2 },
            { cx: 1, cy: 1, brd: 2 },
            { cx: 0, cy: 1, brd: 2 },
            { cx: -1, cy: 0, brd: 2 },
            { cx: -1, cy: -1, brd: 2 },
            { cx: 0, cy: -1, brd: 2 },
            { cx: 1, cy: 0, brd: 2 },
            { cx: 0, cy: 1, brd: 2 },
            { cx: -1, cy: 1, brd: 2 },
        ],
        piezaG: [
            { cx: 0, cy: -1, brd: 2 },
            { cx: 1, cy: -1, brd: 2 },
            { cx: 1, cy: 0, brd: 2 },
            { cx: 1, cy: 1, brd: 2 },
            { cx: 0, cy: 1, brd: 2 },
            { cx: -1, cy: 0, brd: 2 },
            { cx: -1, cy: -1, brd: 2 },
            { cx: 0, cy: -1, brd: 2 },
            { cx: 1, cy: 0, brd: 2 },
            { cx: 0, cy: 1, brd: 2 },
            { cx: -1, cy: 1, brd: 2 },
            { cx: -1, cy: 0, brd: 2 },

        ],
        pieza0: [
            { cx: 0, cy: 0, brd: 0 },
            { cx: 0, cy: 0, brd: 0 },
            { cx: 0, cy: 0, brd: 0 },
            { cx: 0, cy: 0, brd: 0 },
            { cx: 0, cy: 0, brd: 0 },
            { cx: 0, cy: 0, brd: 0 },
            { cx: 0, cy: 0, brd: 0 },
            { cx: 0, cy: 0, brd: 0 },
            { cx: 0, cy: 0, brd: 0 },
            { cx: 0, cy: 0, brd: 0 },
            { cx: 0, cy: 0, brd: 0 },
            { cx: 0, cy: 0, brd: 0 }
        ],
        pieza1: [
            { cx: 0, cy: 1, brd: 0 },
            { cx: -1, cy: 0, brd: 0 },
            { cx: 0, cy: -1, brd: 0 },
            { cx: 1, cy: -1, brd: 0 },
            { cx: 1, cy: 0, brd: 0 },
            { cx: 1, cy: 1, brd: 0 },//pag2
            { cx: -1, cy: 1, brd: 0 },
            { cx: -1, cy: 0, brd: 0 },
            { cx: -1, cy: -1, brd: 0 },
            { cx: 0, cy: -1, brd: 0 },
            { cx: 1, cy: 0, brd: 0 },
            { cx: 0, cy: 1, brd: 0 },
        ],
        pieza5: [
            { cx: 1, cy: -1, brd: 0 },
            { cx: 1, cy: 0, brd: 0 },
            { cx: 1, cy: 1, brd: 0 },
            { cx: 0, cy: 1, brd: 0 },
            { cx: -1, cy: 0, brd: 0 },
            { cx: 0, cy: -1, brd: 0 },
            { cx: 0, cy: -1, brd: 0 },
            { cx: 1, cy: 0, brd: 0 },
            { cx: 0, cy: 1, brd: 0 },
            { cx: -1, cy: 1, brd: 0 },
            { cx: -1, cy: 0, brd: 0 },
            { cx: -1, cy: -1, brd: 0 },
        ],
        pieza2: [
            { cx: -1, cy: 2, brd: 0 },
            { cx: -2, cy: 0, brd: 0 },
            { cx: -1, cy: -2, brd: 0 },
            { cx: 1, cy: -2, brd: 0 },
            { cx: 2, cy: 0, brd: 0 },
            { cx: 1, cy: 2, brd: 0 },//pag2
            { cx: -1, cy: 2, brd: 0 },
            { cx: -2, cy: 0, brd: 0 },
            { cx: -1, cy: -2, brd: 0 },
            { cx: 1, cy: -2, brd: 0 },
            { cx: 2, cy: 0, brd: 0 },
            { cx: 1, cy: 2, brd: 0 },
        ],
        pieza3: [
            { cx: 1, cy: 1, brd: 0 },
            { cx: 0, cy: 1, brd: 0 },
            { cx: -1, cy: 0, brd: 0 },
            { cx: 0, cy: -1, brd: 0 },
            { cx: 1, cy: -1, brd: 0 },
            { cx: 1, cy: 0, brd: 0 },//pag2
            { cx: 0, cy: 1, brd: 0 },
            { cx: -1, cy: 1, brd: 0 },
            { cx: -1, cy: 0, brd: 0 },
            { cx: -1, cy: -1, brd: 0 },
            { cx: 0, cy: -1, brd: 0 },
            { cx: 1, cy: 0, brd: 0 },

        ],
        pieza4: [
            { cx: 0, cy: 2, brd: 0 },
            { cx: -1, cy: 1, brd: 0 },
            { cx: -1, cy: -1, brd: 0 },
            { cx: 0, cy: -2, brd: 0 },
            { cx: 2, cy: -1, brd: 0 },
            { cx: 2, cy: 1, brd: 0 },//pag2
            { cx: 0, cy: 2, brd: 0 },
            { cx: -2, cy: 1, brd: 0 },
            { cx: -2, cy: -1, brd: 0 },
            { cx: 0, cy: -2, brd: 0 },
            { cx: 1, cy: -1, brd: 0 },
            { cx: 1, cy: 1, brd: 0 },

        ],
        pieza6: [
            { cx: 1, cy: -1, brd: 0 },
            { cx: 1, cy: 0, brd: 0 },
            { cx: 1, cy: 1, brd: 0 },
            { cx: 0, cy: 1, brd: 0 },
            { cx: -1, cy: 0, brd: 0 },
            { cx: 0, cy: -1, brd: 0 },
            { cx: 0, cy: -1, brd: 0 },
            { cx: 1, cy: 0, brd: 0 },
            { cx: 0, cy: 1, brd: 0 },
            { cx: -1, cy: 1, brd: 0 },
            { cx: -1, cy: 0, brd: 0 },
            { cx: -1, cy: -1, brd: 0 }
        ],
        pieza7: [

            { cx: 1, cy: 0, brd: 0 },
            { cx: 1, cy: 1, brd: 0 },
            { cx: 0, cy: 1, brd: 0 },
            { cx: -1, cy: 0, brd: 0 },
            { cx: 0, cy: -1, brd: 0 },
            { cx: 1, cy: -1, brd: 0 },


            { cx: 1, cy: 0, brd: 0 },
            { cx: 0, cy: 1, brd: 0 },
            { cx: -1, cy: 1, brd: 0 },
            { cx: -1, cy: 0, brd: 0 },
            { cx: -1, cy: -1, brd: 0 },
            { cx: 0, cy: -1, brd: 0 },
        ]
    }
    //[idFicha][level]
    estados.push(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    for (i in estados) {
        estados[i] = [];
        estados[i].push(0, 1);
    };
    estados[0][0] =
        [
            {
                "position": 0,
                "config": 0
            },
            {
                "position": 0,
                "config": 5
            },
            {
                "position": 1,
                "config": 0
            },
            {
                "position": 1,
                "config": 5
            },
            {
                "position": 2,
                "config": 0
            },
            {
                "position": 2,
                "config": 5
            },
            {
                "position": 3,
                "config": 0
            },
            {
                "position": 3,
                "config": 3
            },
            {
                "position": 3,
                "config": 4
            },
            {
                "position": 3,
                "config": 5
            },
            {
                "position": 4,
                "config": 0
            },
            {
                "position": 4,
                "config": 5
            },
            {
                "position": 5,
                "config": 0
            },
            {
                "position": 5,
                "config": 1
            },
            {
                "position": 5,
                "config": 2
            },
            {
                "position": 5,
                "config": 5
            },
            {
                "position": 6,
                "config": 3
            },
            {
                "position": 6,
                "config": 4
            },
            {
                "position": 7,
                "config": 3
            },
            {
                "position": 7,
                "config": 4
            },
            {
                "position": 8,
                "config": 1
            },
            {
                "position": 8,
                "config": 2
            },
            {
                "position": 9,
                "config": 1
            },
            {
                "position": 9,
                "config": 2
            },
            {
                "position": 10,
                "config": 3
            },
            {
                "position": 10,
                "config": 4
            },
            {
                "position": 11,
                "config": 3
            },
            {
                "position": 11,
                "config": 4
            },
            {
                "position": 12,
                "config": 1
            },
            {
                "position": 12,
                "config": 2
            },
            {
                "position": 12,
                "config": 3
            },
            {
                "position": 12,
                "config": 4
            },
            {
                "position": 13,
                "config": 1
            },
            {
                "position": 13,
                "config": 2
            },
            {
                "position": 14,
                "config": 1
            },
            {
                "position": 14,
                "config": 2
            }
        ];
    estados[0][1] =
        [
            {
                "position": 0,
                "config": 0
            },
            {
                "position": 0,
                "config": 5
            },
            {
                "position": 1,
                "config": 0
            },
            {
                "position": 1,
                "config": 5
            },
            {
                "position": 2,
                "config": 0
            },
            {
                "position": 2,
                "config": 5
            },
            {
                "position": 3,
                "config": 0
            },
            {
                "position": 3,
                "config": 3
            },
            {
                "position": 3,
                "config": 4
            },
            {
                "position": 3,
                "config": 5
            },
            {
                "position": 4,
                "config": 0
            },
            {
                "position": 4,
                "config": 5
            },
            {
                "position": 5,
                "config": 0
            },
            {
                "position": 5,
                "config": 1
            },
            {
                "position": 5,
                "config": 2
            },
            {
                "position": 5,
                "config": 5
            },
            {
                "position": 6,
                "config": 3
            },
            {
                "position": 6,
                "config": 4
            },
            {
                "position": 7,
                "config": 3
            },
            {
                "position": 7,
                "config": 4
            },
            {
                "position": 8,
                "config": 1
            },
            {
                "position": 8,
                "config": 2
            },
            {
                "position": 9,
                "config": 1
            },
            {
                "position": 9,
                "config": 2
            },
            {
                "position": 10,
                "config": 3
            },
            {
                "position": 10,
                "config": 4
            },
            {
                "position": 11,
                "config": 3
            },
            {
                "position": 11,
                "config": 4
            },
            {
                "position": 12,
                "config": 1
            },
            {
                "position": 12,
                "config": 2
            },
            {
                "position": 12,
                "config": 3
            },
            {
                "position": 12,
                "config": 4
            },
            {
                "position": 13,
                "config": 1
            },
            {
                "position": 13,
                "config": 2
            },
            {
                "position": 14,
                "config": 1
            },
            {
                "position": 14,
                "config": 2
            }
        ];
    estados[1][0] = [
        {
            "position": 0,
            "config": 0
        },
        {
            "position": 1,
            "config": 0
        },
        {
            "position": 1,
            "config": 5
        },
        {
            "position": 2,
            "config": 0
        },
        {
            "position": 2,
            "config": 1
        },
        {
            "position": 3,
            "config": 0
        },
        {
            "position": 3,
            "config": 4
        },
        {
            "position": 3,
            "config": 5
        },
        {
            "position": 4,
            "config": 0
        },
        {
            "position": 4,
            "config": 1
        },
        {
            "position": 4,
            "config": 3
        },
        {
            "position": 4,
            "config": 5
        },
        {
            "position": 5,
            "config": 0
        },
        {
            "position": 5,
            "config": 1
        },
        {
            "position": 5,
            "config": 2
        },
        {
            "position": 6,
            "config": 4
        },
        {
            "position": 6,
            "config": 5
        },
        {
            "position": 7,
            "config": 1
        },
        {
            "position": 7,
            "config": 3
        },
        {
            "position": 7,
            "config": 4
        },
        {
            "position": 7,
            "config": 5
        },
        {
            "position": 8,
            "config": 1
        },
        {
            "position": 8,
            "config": 2
        },
        {
            "position": 8,
            "config": 3
        },
        {
            "position": 8,
            "config": 5
        },
        {
            "position": 9,
            "config": 1
        },
        {
            "position": 9,
            "config": 2
        },
        {
            "position": 10,
            "config": 4
        },
        {
            "position": 11,
            "config": 3
        },
        {
            "position": 11,
            "config": 4
        },
        {
            "position": 12,
            "config": 2
        },
        {
            "position": 12,
            "config": 3
        },
        {
            "position": 12,
            "config": 4
        },
        {
            "position": 13,
            "config": 2
        },
        {
            "position": 13,
            "config": 3
        },
        {
            "position": 14,
            "config": 2
        }
    ];
    estados[1][1] = [
        {
            "position": 0,
            "config": 0
        },
        {
            "position": 1,
            "config": 0
        },
        {
            "position": 1,
            "config": 5
        },
        {
            "position": 2,
            "config": 0
        },
        {
            "position": 2,
            "config": 1
        },
        {
            "position": 3,
            "config": 0
        },
        {
            "position": 3,
            "config": 4
        },
        {
            "position": 3,
            "config": 5
        },
        {
            "position": 4,
            "config": 0
        },
        {
            "position": 4,
            "config": 1
        },
        {
            "position": 4,
            "config": 3
        },
        {
            "position": 4,
            "config": 5
        },
        {
            "position": 5,
            "config": 0
        },
        {
            "position": 5,
            "config": 1
        },
        {
            "position": 5,
            "config": 2
        },
        {
            "position": 6,
            "config": 4
        },
        {
            "position": 6,
            "config": 5
        },
        {
            "position": 7,
            "config": 1
        },
        {
            "position": 7,
            "config": 3
        },
        {
            "position": 7,
            "config": 4
        },
        {
            "position": 7,
            "config": 5
        },
        {
            "position": 8,
            "config": 1
        },
        {
            "position": 8,
            "config": 2
        },
        {
            "position": 8,
            "config": 3
        },
        {
            "position": 8,
            "config": 5
        },
        {
            "position": 9,
            "config": 1
        },
        {
            "position": 9,
            "config": 2
        },
        {
            "position": 10,
            "config": 4
        },
        {
            "position": 11,
            "config": 3
        },
        {
            "position": 11,
            "config": 4
        },
        {
            "position": 12,
            "config": 2
        },
        {
            "position": 12,
            "config": 3
        },
        {
            "position": 12,
            "config": 4
        },
        {
            "position": 13,
            "config": 2
        },
        {
            "position": 13,
            "config": 3
        },
        {
            "position": 14,
            "config": 2
        }
    ];
    estados[2][0] = [
        {
            "position": 0,
            "config": 0
        },
        {
            "position": 1,
            "config": 0
        },
        {
            "position": 1,
            "config": 5
        },
        {
            "position": 2,
            "config": 0
        },
        {
            "position": 2,
            "config": 1
        },
        {
            "position": 3,
            "config": 0
        },
        {
            "position": 3,
            "config": 4
        },
        {
            "position": 3,
            "config": 5
        },
        {
            "position": 4,
            "config": 0
        },
        {
            "position": 4,
            "config": 1
        },
        {
            "position": 4,
            "config": 3
        },
        {
            "position": 4,
            "config": 5
        },
        {
            "position": 5,
            "config": 0
        },
        {
            "position": 5,
            "config": 1
        },
        {
            "position": 5,
            "config": 2
        },
        {
            "position": 6,
            "config": 4
        },
        {
            "position": 6,
            "config": 5
        },
        {
            "position": 7,
            "config": 1
        },
        {
            "position": 7,
            "config": 3
        },
        {
            "position": 7,
            "config": 4
        },
        {
            "position": 7,
            "config": 5
        },
        {
            "position": 8,
            "config": 1
        },
        {
            "position": 8,
            "config": 2
        },
        {
            "position": 8,
            "config": 3
        },
        {
            "position": 8,
            "config": 5
        },
        {
            "position": 9,
            "config": 1
        },
        {
            "position": 9,
            "config": 2
        },
        {
            "position": 10,
            "config": 4
        },
        {
            "position": 11,
            "config": 3
        },
        {
            "position": 11,
            "config": 4
        },
        {
            "position": 12,
            "config": 2
        },
        {
            "position": 12,
            "config": 3
        },
        {
            "position": 12,
            "config": 4
        },
        {
            "position": 13,
            "config": 2
        },
        {
            "position": 13,
            "config": 3
        },
        {
            "position": 14,
            "config": 2
        }
    ];
    estados[2][1] = [
        {
            "position": 0,
            "config": 0
        },
        {
            "position": 1,
            "config": 0
        },
        {
            "position": 1,
            "config": 5
        },
        {
            "position": 2,
            "config": 0
        },
        {
            "position": 2,
            "config": 1
        },
        {
            "position": 3,
            "config": 0
        },
        {
            "position": 3,
            "config": 4
        },
        {
            "position": 3,
            "config": 5
        },
        {
            "position": 4,
            "config": 0
        },
        {
            "position": 4,
            "config": 1
        },
        {
            "position": 4,
            "config": 3
        },
        {
            "position": 4,
            "config": 5
        },
        {
            "position": 5,
            "config": 0
        },
        {
            "position": 5,
            "config": 1
        },
        {
            "position": 5,
            "config": 2
        },
        {
            "position": 6,
            "config": 4
        },
        {
            "position": 6,
            "config": 5
        },
        {
            "position": 7,
            "config": 1
        },
        {
            "position": 7,
            "config": 3
        },
        {
            "position": 7,
            "config": 4
        },
        {
            "position": 7,
            "config": 5
        },
        {
            "position": 8,
            "config": 1
        },
        {
            "position": 8,
            "config": 2
        },
        {
            "position": 8,
            "config": 3
        },
        {
            "position": 8,
            "config": 5
        },
        {
            "position": 9,
            "config": 1
        },
        {
            "position": 9,
            "config": 2
        },
        {
            "position": 10,
            "config": 4
        },
        {
            "position": 11,
            "config": 3
        },
        {
            "position": 11,
            "config": 4
        },
        {
            "position": 12,
            "config": 2
        },
        {
            "position": 12,
            "config": 3
        },
        {
            "position": 12,
            "config": 4
        },
        {
            "position": 13,
            "config": 2
        },
        {
            "position": 13,
            "config": 3
        },
        {
            "position": 14,
            "config": 2
        }
    ];
    estados[3][0] = [
        {
            "position": 1,
            "config": 0
        },
        {
            "position": 2,
            "config": 2
        },
        {
            "position": 3,
            "config": 0
        },
        {
            "position": 4,
            "config": 0
        },
        {
            "position": 4,
            "config": 1
        },
        {
            "position": 4,
            "config": 2
        },
        {
            "position": 5,
            "config": 2
        },
        {
            "position": 6,
            "config": 0
        },
        {
            "position": 7,
            "config": 3
        },
        {
            "position": 7,
            "config": 4
        },
        {
            "position": 7,
            "config": 5
        },
        {
            "position": 8,
            "config": 0
        },
        {
            "position": 8,
            "config": 1
        },
        {
            "position": 8,
            "config": 2
        },
        {
            "position": 9,
            "config": 2
        },
        {
            "position": 11,
            "config": 1
        },
        {
            "position": 12,
            "config": 4
        },
        {
            "position": 13,
            "config": 1
        }
    ];
    estados[3][1] = [
        {
            "position": 1,
            "config": 0
        },
        {
            "position": 2,
            "config": 2
        },
        {
            "position": 3,
            "config": 0
        },
        {
            "position": 4,
            "config": 0
        },
        {
            "position": 4,
            "config": 1
        },
        {
            "position": 4,
            "config": 2
        },
        {
            "position": 5,
            "config": 2
        },
        {
            "position": 6,
            "config": 0
        },
        {
            "position": 7,
            "config": 3
        },
        {
            "position": 7,
            "config": 4
        },
        {
            "position": 7,
            "config": 5
        },
        {
            "position": 8,
            "config": 0
        },
        {
            "position": 8,
            "config": 1
        },
        {
            "position": 8,
            "config": 2
        },
        {
            "position": 9,
            "config": 2
        },
        {
            "position": 11,
            "config": 1
        },
        {
            "position": 12,
            "config": 4
        },
        {
            "position": 13,
            "config": 1
        }
    ];
    estados[4][0] = [
        {
            "position": 1,
            "config": 0
        },
        {
            "position": 2,
            "config": 2
        },
        {
            "position": 3,
            "config": 0
        },
        {
            "position": 4,
            "config": 0
        },
        {
            "position": 4,
            "config": 1
        },
        {
            "position": 4,
            "config": 2
        },
        {
            "position": 5,
            "config": 2
        },
        {
            "position": 6,
            "config": 0
        },
        {
            "position": 7,
            "config": 3
        },
        {
            "position": 7,
            "config": 4
        },
        {
            "position": 7,
            "config": 5
        },
        {
            "position": 8,
            "config": 0
        },
        {
            "position": 8,
            "config": 1
        },
        {
            "position": 8,
            "config": 2
        },
        {
            "position": 9,
            "config": 2
        },
        {
            "position": 11,
            "config": 1
        },
        {
            "position": 12,
            "config": 4
        },
        {
            "position": 13,
            "config": 1
        }
    ];
    estados[4][1] = [
        {
            "position": 1,
            "config": 0
        },
        {
            "position": 2,
            "config": 2
        },
        {
            "position": 3,
            "config": 0
        },
        {
            "position": 4,
            "config": 0
        },
        {
            "position": 4,
            "config": 1
        },
        {
            "position": 4,
            "config": 2
        },
        {
            "position": 5,
            "config": 2
        },
        {
            "position": 6,
            "config": 0
        },
        {
            "position": 7,
            "config": 3
        },
        {
            "position": 7,
            "config": 4
        },
        {
            "position": 7,
            "config": 5
        },
        {
            "position": 8,
            "config": 0
        },
        {
            "position": 8,
            "config": 1
        },
        {
            "position": 8,
            "config": 2
        },
        {
            "position": 9,
            "config": 2
        },
        {
            "position": 11,
            "config": 1
        },
        {
            "position": 12,
            "config": 4
        },
        {
            "position": 13,
            "config": 1
        }
    ];
    estados[5][0] = [
        {
            "position": 0,
            "config": 0
        },
        {
            "position": 1,
            "config": 0
        },
        {
            "position": 1,
            "config": 4
        },
        {
            "position": 1,
            "config": 5
        },
        {
            "position": 2,
            "config": 0
        },
        {
            "position": 2,
            "config": 1
        },
        {
            "position": 2,
            "config": 2
        },
        {
            "position": 3,
            "config": 0
        },
        {
            "position": 3,
            "config": 4
        },
        {
            "position": 3,
            "config": 5
        },
        {
            "position": 4,
            "config": 0
        },
        {
            "position": 4,
            "config": 1
        },
        {
            "position": 4,
            "config": 2
        },
        {
            "position": 4,
            "config": 3
        },
        {
            "position": 4,
            "config": 4
        },
        {
            "position": 4,
            "config": 5
        },
        {
            "position": 5,
            "config": 0
        },
        {
            "position": 5,
            "config": 1
        },
        {
            "position": 5,
            "config": 2
        },
        {
            "position": 6,
            "config": 0
        },
        {
            "position": 6,
            "config": 4
        },
        {
            "position": 6,
            "config": 5
        },
        {
            "position": 7,
            "config": 0
        },
        {
            "position": 7,
            "config": 1
        },
        {
            "position": 7,
            "config": 2
        },
        {
            "position": 7,
            "config": 3
        },
        {
            "position": 7,
            "config": 4
        },
        {
            "position": 7,
            "config": 5
        },
        {
            "position": 8,
            "config": 0
        },
        {
            "position": 8,
            "config": 1
        },
        {
            "position": 8,
            "config": 2
        },
        {
            "position": 8,
            "config": 3
        },
        {
            "position": 8,
            "config": 4
        },
        {
            "position": 8,
            "config": 5
        },
        {
            "position": 9,
            "config": 0
        },
        {
            "position": 9,
            "config": 1
        },
        {
            "position": 9,
            "config": 2
        },
        {
            "position": 10,
            "config": 4
        },
        {
            "position": 11,
            "config": 2
        },
        {
            "position": 11,
            "config": 3
        },
        {
            "position": 11,
            "config": 4
        },
        {
            "position": 12,
            "config": 2
        },
        {
            "position": 12,
            "config": 3
        },
        {
            "position": 12,
            "config": 4
        },
        {
            "position": 13,
            "config": 2
        },
        {
            "position": 13,
            "config": 3
        },
        {
            "position": 13,
            "config": 4
        },
        {
            "position": 14,
            "config": 2
        }
    ];
    estados[5][1] = [
        {
            "position": 0,
            "config": 0
        },
        {
            "position": 1,
            "config": 0
        },
        {
            "position": 1,
            "config": 4
        },
        {
            "position": 1,
            "config": 5
        },
        {
            "position": 2,
            "config": 0
        },
        {
            "position": 2,
            "config": 1
        },
        {
            "position": 2,
            "config": 2
        },
        {
            "position": 3,
            "config": 0
        },
        {
            "position": 3,
            "config": 4
        },
        {
            "position": 3,
            "config": 5
        },
        {
            "position": 4,
            "config": 0
        },
        {
            "position": 4,
            "config": 1
        },
        {
            "position": 4,
            "config": 2
        },
        {
            "position": 4,
            "config": 3
        },
        {
            "position": 4,
            "config": 4
        },
        {
            "position": 4,
            "config": 5
        },
        {
            "position": 5,
            "config": 0
        },
        {
            "position": 5,
            "config": 1
        },
        {
            "position": 5,
            "config": 2
        },
        {
            "position": 6,
            "config": 0
        },
        {
            "position": 6,
            "config": 4
        },
        {
            "position": 6,
            "config": 5
        },
        {
            "position": 7,
            "config": 0
        },
        {
            "position": 7,
            "config": 1
        },
        {
            "position": 7,
            "config": 2
        },
        {
            "position": 7,
            "config": 3
        },
        {
            "position": 7,
            "config": 4
        },
        {
            "position": 7,
            "config": 5
        },
        {
            "position": 8,
            "config": 0
        },
        {
            "position": 8,
            "config": 1
        },
        {
            "position": 8,
            "config": 2
        },
        {
            "position": 8,
            "config": 3
        },
        {
            "position": 8,
            "config": 4
        },
        {
            "position": 8,
            "config": 5
        },
        {
            "position": 9,
            "config": 0
        },
        {
            "position": 9,
            "config": 1
        },
        {
            "position": 9,
            "config": 2
        },
        {
            "position": 10,
            "config": 4
        },
        {
            "position": 11,
            "config": 2
        },
        {
            "position": 11,
            "config": 3
        },
        {
            "position": 11,
            "config": 4
        },
        {
            "position": 12,
            "config": 2
        },
        {
            "position": 12,
            "config": 3
        },
        {
            "position": 12,
            "config": 4
        },
        {
            "position": 13,
            "config": 2
        },
        {
            "position": 13,
            "config": 3
        },
        {
            "position": 13,
            "config": 4
        },
        {
            "position": 14,
            "config": 2
        }
    ];
    estados[6][0] = [
        {
            "position": 1,
            "config": 0
        },
        {
            "position": 1,
            "config": 3
        },
        {
            "position": 2,
            "config": 2
        },
        {
            "position": 2,
            "config": 5
        },
        {
            "position": 3,
            "config": 0
        },
        {
            "position": 3,
            "config": 3
        },
        {
            "position": 4,
            "config": 0
        },
        {
            "position": 4,
            "config": 1
        },
        {
            "position": 4,
            "config": 2
        },
        {
            "position": 4,
            "config": 3
        },
        {
            "position": 4,
            "config": 4
        },
        {
            "position": 4,
            "config": 5
        },
        {
            "position": 5,
            "config": 2
        },
        {
            "position": 5,
            "config": 5
        },
        {
            "position": 6,
            "config": 0
        },
        {
            "position": 6,
            "config": 3
        },
        {
            "position": 7,
            "config": 0
        },
        {
            "position": 7,
            "config": 1
        },
        {
            "position": 7,
            "config": 2
        },
        {
            "position": 7,
            "config": 3
        },
        {
            "position": 7,
            "config": 4
        },
        {
            "position": 7,
            "config": 5
        },
        {
            "position": 8,
            "config": 0
        },
        {
            "position": 8,
            "config": 1
        },
        {
            "position": 8,
            "config": 2
        },
        {
            "position": 8,
            "config": 3
        },
        {
            "position": 8,
            "config": 4
        },
        {
            "position": 8,
            "config": 5
        },
        {
            "position": 9,
            "config": 2
        },
        {
            "position": 9,
            "config": 5
        },
        {
            "position": 11,
            "config": 1
        },
        {
            "position": 11,
            "config": 4
        },
        {
            "position": 12,
            "config": 1
        },
        {
            "position": 12,
            "config": 4
        },
        {
            "position": 13,
            "config": 1
        },
        {
            "position": 13,
            "config": 4
        }
    ];
    estados[6][1] = [
        {
            "position": 1,
            "config": 0
        },
        {
            "position": 1,
            "config": 3
        },
        {
            "position": 2,
            "config": 2
        },
        {
            "position": 2,
            "config": 5
        },
        {
            "position": 3,
            "config": 0
        },
        {
            "position": 3,
            "config": 3
        },
        {
            "position": 4,
            "config": 0
        },
        {
            "position": 4,
            "config": 1
        },
        {
            "position": 4,
            "config": 2
        },
        {
            "position": 4,
            "config": 3
        },
        {
            "position": 4,
            "config": 4
        },
        {
            "position": 4,
            "config": 5
        },
        {
            "position": 5,
            "config": 2
        },
        {
            "position": 5,
            "config": 5
        },
        {
            "position": 6,
            "config": 0
        },
        {
            "position": 6,
            "config": 3
        },
        {
            "position": 7,
            "config": 0
        },
        {
            "position": 7,
            "config": 1
        },
        {
            "position": 7,
            "config": 2
        },
        {
            "position": 7,
            "config": 3
        },
        {
            "position": 7,
            "config": 4
        },
        {
            "position": 7,
            "config": 5
        },
        {
            "position": 8,
            "config": 0
        },
        {
            "position": 8,
            "config": 1
        },
        {
            "position": 8,
            "config": 2
        },
        {
            "position": 8,
            "config": 3
        },
        {
            "position": 8,
            "config": 4
        },
        {
            "position": 8,
            "config": 5
        },
        {
            "position": 9,
            "config": 2
        },
        {
            "position": 9,
            "config": 5
        },
        {
            "position": 11,
            "config": 1
        },
        {
            "position": 11,
            "config": 4
        },
        {
            "position": 12,
            "config": 1
        },
        {
            "position": 12,
            "config": 4
        },
        {
            "position": 13,
            "config": 1
        },
        {
            "position": 13,
            "config": 4
        }
    ];
    estados[7][0] = [
        {
            "position": 1,
            "config": 3
        },
        {
            "position": 1,
            "config": 4
        },
        {
            "position": 2,
            "config": 0
        },
        {
            "position": 2,
            "config": 5
        },
        {
            "position": 3,
            "config": 3
        },
        {
            "position": 3,
            "config": 4
        },
        {
            "position": 4,
            "config": 0
        },
        {
            "position": 4,
            "config": 1
        },
        {
            "position": 4,
            "config": 2
        },
        {
            "position": 4,
            "config": 3
        },
        {
            "position": 4,
            "config": 4
        },
        {
            "position": 4,
            "config": 5
        },
        {
            "position": 5,
            "config": 0
        },
        {
            "position": 5,
            "config": 5
        },
        {
            "position": 6,
            "config": 3
        },
        {
            "position": 6,
            "config": 4
        },
        {
            "position": 7,
            "config": 0
        },
        {
            "position": 7,
            "config": 1
        },
        {
            "position": 7,
            "config": 2
        },
        {
            "position": 7,
            "config": 3
        },
        {
            "position": 7,
            "config": 4
        },
        {
            "position": 7,
            "config": 5
        },
        {
            "position": 8,
            "config": 0
        },
        {
            "position": 8,
            "config": 1
        },
        {
            "position": 8,
            "config": 2
        },
        {
            "position": 8,
            "config": 3
        },
        {
            "position": 8,
            "config": 4
        },
        {
            "position": 8,
            "config": 5
        },
        {
            "position": 9,
            "config": 0
        },
        {
            "position": 9,
            "config": 5
        },
        {
            "position": 11,
            "config": 1
        },
        {
            "position": 11,
            "config": 2
        },
        {
            "position": 12,
            "config": 1
        },
        {
            "position": 12,
            "config": 2
        },
        {
            "position": 13,
            "config": 1
        },
        {
            "position": 13,
            "config": 2
        }
    ];
    estados[7][1] = [
        {
            "position": 1,
            "config": 3
        },
        {
            "position": 1,
            "config": 4
        },
        {
            "position": 2,
            "config": 0
        },
        {
            "position": 2,
            "config": 5
        },
        {
            "position": 3,
            "config": 3
        },
        {
            "position": 3,
            "config": 4
        },
        {
            "position": 4,
            "config": 0
        },
        {
            "position": 4,
            "config": 1
        },
        {
            "position": 4,
            "config": 2
        },
        {
            "position": 4,
            "config": 3
        },
        {
            "position": 4,
            "config": 4
        },
        {
            "position": 4,
            "config": 5
        },
        {
            "position": 5,
            "config": 0
        },
        {
            "position": 5,
            "config": 5
        },
        {
            "position": 6,
            "config": 3
        },
        {
            "position": 6,
            "config": 4
        },
        {
            "position": 7,
            "config": 0
        },
        {
            "position": 7,
            "config": 1
        },
        {
            "position": 7,
            "config": 2
        },
        {
            "position": 7,
            "config": 3
        },
        {
            "position": 7,
            "config": 4
        },
        {
            "position": 7,
            "config": 5
        },
        {
            "position": 8,
            "config": 0
        },
        {
            "position": 8,
            "config": 1
        },
        {
            "position": 8,
            "config": 2
        },
        {
            "position": 8,
            "config": 3
        },
        {
            "position": 8,
            "config": 4
        },
        {
            "position": 8,
            "config": 5
        },
        {
            "position": 9,
            "config": 0
        },
        {
            "position": 9,
            "config": 5
        },
        {
            "position": 11,
            "config": 1
        },
        {
            "position": 11,
            "config": 2
        },
        {
            "position": 12,
            "config": 1
        },
        {
            "position": 12,
            "config": 2
        },
        {
            "position": 13,
            "config": 1
        },
        {
            "position": 13,
            "config": 2
        }
    ];
    estados[8][0] = [
        {
            "position": 1,
            "config": 5
        },
        {
            "position": 1,
            "config": 0
        },
        {
            "position": 2,
            "config": 1
        },
        {
            "position": 2,
            "config": 2
        },
        {
            "position": 3,
            "config": 0
        },
        {
            "position": 3,
            "config": 5
        },
        {
            "position": 4,
            "config": 0
        },
        {
            "position": 4,
            "config": 1
        },
        {
            "position": 4,
            "config": 2
        },
        {
            "position": 4,
            "config": 3
        },
        {
            "position": 4,
            "config": 4
        },
        {
            "position": 4,
            "config": 5
        },
        {
            "position": 5,
            "config": 1
        },
        {
            "position": 5,
            "config": 2
        },
        {
            "position": 6,
            "config": 0
        },
        {
            "position": 6,
            "config": 5
        },
        {
            "position": 7,
            "config": 0
        },
        {
            "position": 7,
            "config": 1
        },
        {
            "position": 7,
            "config": 2
        },
        {
            "position": 7,
            "config": 3
        },
        {
            "position": 7,
            "config": 4
        },
        {
            "position": 7,
            "config": 5
        },
        {
            "position": 8,
            "config": 0
        },
        {
            "position": 8,
            "config": 1
        },
        {
            "position": 8,
            "config": 2
        },
        {
            "position": 8,
            "config": 3
        },
        {
            "position": 8,
            "config": 4
        },
        {
            "position": 8,
            "config": 5
        },
        {
            "position": 9,
            "config": 1
        },
        {
            "position": 9,
            "config": 2
        },
        {
            "position": 11,
            "config": 3
        },
        {
            "position": 11,
            "config": 4
        },
        {
            "position": 12,
            "config": 3
        },
        {
            "position": 12,
            "config": 4
        },
        {
            "position": 13,
            "config": 3
        },
        {
            "position": 13,
            "config": 4
        }
    ];
    estados[8][1] = [
        {
            "position": 1,
            "config": 5
        },
        {
            "position": 1,
            "config": 0
        },
        {
            "position": 2,
            "config": 1
        },
        {
            "position": 2,
            "config": 2
        },
        {
            "position": 3,
            "config": 0
        },
        {
            "position": 3,
            "config": 5
        },
        {
            "position": 4,
            "config": 0
        },
        {
            "position": 4,
            "config": 1
        },
        {
            "position": 4,
            "config": 2
        },
        {
            "position": 4,
            "config": 3
        },
        {
            "position": 4,
            "config": 4
        },
        {
            "position": 4,
            "config": 5
        },
        {
            "position": 5,
            "config": 1
        },
        {
            "position": 5,
            "config": 2
        },
        {
            "position": 6,
            "config": 0
        },
        {
            "position": 6,
            "config": 5
        },
        {
            "position": 7,
            "config": 0
        },
        {
            "position": 7,
            "config": 1
        },
        {
            "position": 7,
            "config": 2
        },
        {
            "position": 7,
            "config": 3
        },
        {
            "position": 7,
            "config": 4
        },
        {
            "position": 7,
            "config": 5
        },
        {
            "position": 8,
            "config": 0
        },
        {
            "position": 8,
            "config": 1
        },
        {
            "position": 8,
            "config": 2
        },
        {
            "position": 8,
            "config": 3
        },
        {
            "position": 8,
            "config": 4
        },
        {
            "position": 8,
            "config": 5
        },
        {
            "position": 9,
            "config": 1
        },
        {
            "position": 9,
            "config": 2
        },
        {
            "position": 11,
            "config": 3
        },
        {
            "position": 11,
            "config": 4
        },
        {
            "position": 12,
            "config": 3
        },
        {
            "position": 12,
            "config": 4
        },
        {
            "position": 13,
            "config": 3
        },
        {
            "position": 13,
            "config": 4
        }
    ];
    estados[9][0] = [
        {
            "position": 0,
            "config": 5
        },
        {
            "position": 1,
            "config": 3
        },
        {
            "position": 1,
            "config": 4
        },
        {
            "position": 1,
            "config": 5
        },
        {
            "position": 2,
            "config": 0
        },
        {
            "position": 2,
            "config": 1
        },
        {
            "position": 2,
            "config": 5
        },
        {
            "position": 3,
            "config": 3
        },
        {
            "position": 3,
            "config": 4
        },
        {
            "position": 3,
            "config": 5
        },
        {
            "position": 4,
            "config": 0
        },
        {
            "position": 4,
            "config": 1
        },
        {
            "position": 4,
            "config": 2
        },
        {
            "position": 4,
            "config": 3
        },
        {
            "position": 4,
            "config": 4
        },
        {
            "position": 4,
            "config": 5
        },
        {
            "position": 5,
            "config": 0
        },
        {
            "position": 5,
            "config": 1
        },
        {
            "position": 5,
            "config": 5
        },
        {
            "position": 6,
            "config": 5
        },
        {
            "position": 6,
            "config": 3
        },
        {
            "position": 6,
            "config": 4
        },
        {
            "position": 6,
            "config": 5
        },
        {
            "position": 7,
            "config": 0
        },
        {
            "position": 7,
            "config": 1
        },
        {
            "position": 7,
            "config": 2
        },
        {
            "position": 7,
            "config": 3
        },
        {
            "position": 7,
            "config": 4
        },
        {
            "position": 7,
            "config": 5
        },
        {
            "position": 8,
            "config": 0
        },
        {
            "position": 8,
            "config": 1
        },
        {
            "position": 8,
            "config": 2
        },
        {
            "position": 8,
            "config": 3
        },
        {
            "position": 8,
            "config": 4
        },
        {
            "position": 9,
            "config": 5
        },
        {
            "position": 9,
            "config": 0
        },
        {
            "position": 9,
            "config": 1
        },
        {
            "position": 10,
            "config": 3
        },
        {
            "position": 11,
            "config": 1
        },
        {
            "position": 11,
            "config": 2
        },
        {
            "position": 11,
            "config": 3
        },

        {
            "position": 12,
            "config": 1
        },
        {
            "position": 12,
            "config": 2
        },
        {
            "position": 12,
            "config": 3
        },
        {
            "position": 13,
            "config": 1
        },
        {
            "position": 13,
            "config": 2
        },
        {
            "position": 13,
            "config": 3
        },
        {
            "position": 14,
            "config": 1
        }
    ];
    estados[9][1] = [
        {
            "position": 0,
            "config": 5
        },
        {
            "position": 1,
            "config": 3
        },
        {
            "position": 1,
            "config": 4
        },
        {
            "position": 1,
            "config": 5
        },
        {
            "position": 2,
            "config": 0
        },
        {
            "position": 2,
            "config": 1
        },
        {
            "position": 2,
            "config": 5
        },
        {
            "position": 3,
            "config": 3
        },
        {
            "position": 3,
            "config": 4
        },
        {
            "position": 3,
            "config": 5
        },
        {
            "position": 4,
            "config": 0
        },
        {
            "position": 4,
            "config": 1
        },
        {
            "position": 4,
            "config": 2
        },
        {
            "position": 4,
            "config": 3
        },
        {
            "position": 4,
            "config": 4
        },
        {
            "position": 4,
            "config": 5
        },
        {
            "position": 5,
            "config": 0
        },
        {
            "position": 5,
            "config": 1
        },
        {
            "position": 5,
            "config": 5
        },
        {
            "position": 6,
            "config": 5
        },
        {
            "position": 6,
            "config": 3
        },
        {
            "position": 6,
            "config": 4
        },
        {
            "position": 6,
            "config": 5
        },
        {
            "position": 7,
            "config": 0
        },
        {
            "position": 7,
            "config": 1
        },
        {
            "position": 7,
            "config": 2
        },
        {
            "position": 7,
            "config": 3
        },
        {
            "position": 7,
            "config": 4
        },
        {
            "position": 7,
            "config": 5
        },
        {
            "position": 8,
            "config": 0
        },
        {
            "position": 8,
            "config": 1
        },
        {
            "position": 8,
            "config": 2
        },
        {
            "position": 8,
            "config": 3
        },
        {
            "position": 8,
            "config": 4
        },
        {
            "position": 9,
            "config": 5
        },
        {
            "position": 9,
            "config": 0
        },
        {
            "position": 9,
            "config": 1
        },
        {
            "position": 10,
            "config": 3
        },
        {
            "position": 11,
            "config": 1
        },
        {
            "position": 11,
            "config": 2
        },
        {
            "position": 11,
            "config": 3
        },

        {
            "position": 12,
            "config": 1
        },
        {
            "position": 12,
            "config": 2
        },
        {
            "position": 12,
            "config": 3
        },
        {
            "position": 13,
            "config": 1
        },
        {
            "position": 13,
            "config": 2
        },
        {
            "position": 13,
            "config": 3
        },
        {
            "position": 14,
            "config": 1
        }
    ];
    estados[10][0] = [
        {
            "position": 1,
            "config": 0
        },
        {
            "position": 1,
            "config": 5
        },
        {
            "position": 2,
            "config": 1
        },
        {
            "position": 2,
            "config": 2
        },
        {
            "position": 3,
            "config": 0
        },
        {
            "position": 3,
            "config": 5
        },
        {
            "position": 4,
            "config": 0
        },
        {
            "position": 4,
            "config": 1
        },
        {
            "position": 4,
            "config": 2
        },
        {
            "position": 4,
            "config": 3
        },
        {
            "position": 4,
            "config": 4
        },
        {
            "position": 4,
            "config": 5
        },
        {
            "position": 5,
            "config": 1
        },
        {
            "position": 5,
            "config": 2
        },
        {
            "position": 6,
            "config": 0
        },
        {
            "position": 6,
            "config": 5
        },
        {
            "position": 7,
            "config": 0
        },
        {
            "position": 7,
            "config": 1
        },
        {
            "position": 7,
            "config": 2
        },
        {
            "position": 7,
            "config": 3
        },
        {
            "position": 7,
            "config": 4
        },
        {
            "position": 7,
            "config": 5
        },
        {
            "position": 8,
            "config": 0
        },
        {
            "position": 8,
            "config": 1
        },
        {
            "position": 8,
            "config": 2
        },
        {
            "position": 8,
            "config": 3
        },
        {
            "position": 8,
            "config": 4
        },
        {
            "position": 8,
            "config": 5
        },
        {
            "position": 9,
            "config": 1
        },
        {
            "position": 9,
            "config": 2
        },
        {
            "position": 11,
            "config": 3
        },
        {
            "position": 11,
            "config": 4
        },
        {
            "position": 12,
            "config": 3
        },
        {
            "position": 12,
            "config": 4
        },
        {
            "position": 13,
            "config": 3
        },
        {
            "position": 13,
            "config": 4
        }
    ];
    estados[10][1] = [
        {
            "position": 1,
            "config": 0
        },
        {
            "position": 1,
            "config": 5
        },
        {
            "position": 2,
            "config": 1
        },
        {
            "position": 2,
            "config": 2
        },
        {
            "position": 3,
            "config": 0
        },
        {
            "position": 3,
            "config": 5
        },
        {
            "position": 4,
            "config": 0
        },
        {
            "position": 4,
            "config": 1
        },
        {
            "position": 4,
            "config": 2
        },
        {
            "position": 4,
            "config": 3
        },
        {
            "position": 4,
            "config": 4
        },
        {
            "position": 4,
            "config": 5
        },
        {
            "position": 5,
            "config": 1
        },
        {
            "position": 5,
            "config": 2
        },
        {
            "position": 6,
            "config": 0
        },
        {
            "position": 6,
            "config": 5
        },
        {
            "position": 7,
            "config": 0
        },
        {
            "position": 7,
            "config": 1
        },
        {
            "position": 7,
            "config": 2
        },
        {
            "position": 7,
            "config": 3
        },
        {
            "position": 7,
            "config": 4
        },
        {
            "position": 7,
            "config": 5
        },
        {
            "position": 8,
            "config": 0
        },
        {
            "position": 8,
            "config": 1
        },
        {
            "position": 8,
            "config": 2
        },
        {
            "position": 8,
            "config": 3
        },
        {
            "position": 8,
            "config": 4
        },
        {
            "position": 8,
            "config": 5
        },
        {
            "position": 9,
            "config": 1
        },
        {
            "position": 9,
            "config": 2
        },
        {
            "position": 11,
            "config": 3
        },
        {
            "position": 11,
            "config": 4
        },
        {
            "position": 12,
            "config": 3
        },
        {
            "position": 12,
            "config": 4
        },
        {
            "position": 13,
            "config": 3
        },
        {
            "position": 13,
            "config": 4
        }
    ]

    prueba = [
        [
            {
                "position": 0,
                "config": 0,
                "idFicha": 5
            },
            {
                "position": 3,
                "config": 0,
                "idFicha": 6
            },
            {
                "position": 5,
                "config": 5,
                "idFicha": 7
            },
            {
                "position": 13,
                "config": 4,
                "idFicha": 8
            },
            {
                "position": 11,
                "config": 1,
                "idFicha": 9
            },
            {
                "position": 7,
                "config": 5,
                "idFicha": 10
            }
        ],
        [
            {
                "position": 0,
                "config": 0,
                "idFicha": 5
            },
            {
                "position": 3,
                "config": 0,
                "idFicha": 6
            },
            {
                "position": 9,
                "config": 5,
                "idFicha": 7
            },
            {
                "position": 12,
                "config": 4,
                "idFicha": 8
            },
            {
                "position": 11,
                "config": 1,
                "idFicha": 9
            },
            {
                "position": 4,
                "config": 0,
                "idFicha": 10
            }
        ],
        [
            {
                "position": 0,
                "config": 0,
                "idFicha": 5
            },
            {
                "position": 3,
                "config": 0,
                "idFicha": 6
            },
            {
                "position": 11,
                "config": 1,
                "idFicha": 7
            },
            {
                "position": 5,
                "config": 1,
                "idFicha": 8
            },
            {
                "position": 12,
                "config": 2,
                "idFicha": 9
            },
            {
                "position": 13,
                "config": 4,
                "idFicha": 10
            }
        ]
    ]

}

function combinar() {
    console.time("Tiempo de ejecución");
    success = [];
    const level = 0;
    let intentos = 0, exitos = 0;
    const estadosList = set1.map(id => estados[id][level]);

    function combinarRecursivo(depth = 0, tempSuccess = []) {
        if (depth === set1.length) {
            clear(0);
            intentos++;

            let errorTest = false;
            for (let id = 0; id < set1.length; id++) {
                const { position, config } = tempSuccess[id];
                const idFicha = set1[id];
                errorTest = testFicha(position, config, level, idFicha, false);
                if (errorTest) break;
            }

            if (!errorTest) {
                exitos++;
                console.log("Éxitos:", exitos, ' / ', intentos / 1000);
                const formattedSuccess = tempSuccess.map((temp, index) => ({
                    position: temp.position,
                    config: temp.config,
                    idFicha: set1[index],
                }));
                success.push(formattedSuccess);
            }
            return;
        }
        for (const temp of estadosList[depth]) {
            tempSuccess[depth] = temp;
            combinarRecursivo(depth + 1, tempSuccess);
        }
    }

    combinarRecursivo();

    console.log("Total de intentos:", intentos);
    console.log("Total de éxitos:", exitos);
    console.timeEnd("Tiempo de ejecución");
    return success;

}

function combinar2() {
    console.time("Tiempo de ejecución");
    success = [];
    const level = 1;
    let intentos = 0, exitos = 0;
    const estadosList = set2.map(id => estados[id][level]);

    function combinarRecursivo(depth = 0, tempSuccess = []) {
        if (depth === set2.length) {
            clear(0);
            intentos++;

            let errorTest = false;
            for (let id = 0; id < set2.length; id++) {
                const { position, config } = tempSuccess[id];
                const idFicha = set2[id];
                errorTest = testFicha(position, config, level, idFicha, false);
                if (errorTest) break;
            }

            if (!errorTest) {
                exitos++;
                console.log("Éxitos:", exitos, ' / ', intentos / 1000);
                const formattedSuccess = tempSuccess.map((temp, index) => ({
                    position: temp.position,
                    config: temp.config,
                    idFicha: set2[index],
                }));
                successB.push(formattedSuccess);
            }
            return;
        }
        for (const temp of estadosList[depth]) {
            tempSuccess[depth] = temp;
            combinarRecursivo(depth + 1, tempSuccess);
        }
    }

    combinarRecursivo();

    console.log("Total de intentos:", intentos);
    console.log("Total de éxitos:", exitos);
    console.timeEnd("Tiempo de ejecución");
    return success;

}




function testFicha(position, config, level, idFicha, paint = true) {
    const boardLevel = boards[level][position];
    const boardBackup = boards[2][position];
    const ficha = fichas[idFicha];
    const rowB = boards[2][position][1];
    const colB = boards[2][position][0];

    const col = boards[level][position][0];
    const row = boards[level][position][1];



    ficha.setConfigPos(config, position);
    //ficha.setPosition(position);
    ficha.setLevel(level);

    const setPiezas = ficha.getPiezas(row);
    let base = true;

    for (const { px, py, brd } of setPiezas) {
        const targetRow = (brd === 2 ? rowB : row) + py;
        const targetCol = (brd === 2 ? colB : col) + px;
        const cell = mesa1[targetRow][targetCol];
        if (cell.buzy) return true;
        cell.buzy = true;
        if (paint) {
            cell.colord = ficha.color;
            cell.base = base;
            base = false;
        }
    }
    return false;
}



document.addEventListener("DOMContentLoaded", async (event) => {
    console.log("DOM fully loaded and parsed");
    await initArrays();
    mesa1 = [...loadTable(mesa1x, mesa1y)];
    drawMesa(mesa1);
    await crearFichas();
});

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    //console.log(event.key);
    switch (event.key) {
        case 't':
            testEstados();
            count.estado++;
            break;
        case 'Enter':
            count.ficha++;
            testMesa();
            break;
        case 'l':
            count.level++;
            testMesa();
            break;
        case 'Backspace':
        case 'Delete':
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            break;
        case 'ArrowDown':
            count.position++;
            testMesa();
            break;
        case 'ArrowUp':
            count.position += boards[1].length - 1;
            testMesa();
            break;
        case 'ArrowRight':
            count.config++;
            testMesa();
            break;
        case 'ArrowLeft':
            count.config += configs.length - 1;
            testMesa();
            break;
        case ' ':
            console.log('espacio', currentState);
            setStates.push(currentState);
            break;
        case 'x':
            testExito();
            count.exito++;
    }



});

async function crearFichas() {
    let ficha0 = crearFicha("red");
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza1');
    configPieza(ficha0, 'pieza2');
    configPieza(ficha0, 'piezaA');
    ficha0.setLevel(1);
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza1');
    configPieza(ficha0, 'pieza2');
    configPieza(ficha0, 'piezaA');
    ficha0 = crearFicha("green");
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza1');
    configPieza(ficha0, 'pieza4');
    configPieza(ficha0, 'piezaA');
    ficha0.setLevel(1);
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza3');
    configPieza(ficha0, 'pieza4');
    configPieza(ficha0, 'piezaA');
    ficha0 = crearFicha("blue");
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza3');
    configPieza(ficha0, 'pieza4');
    configPieza(ficha0, 'piezaA');
    ficha0.setLevel(1);
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza1');
    configPieza(ficha0, 'pieza4');
    configPieza(ficha0, 'piezaA');
    ficha0 = crearFicha("yellow");
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza1');
    configPieza(ficha0, 'pieza6');
    configPieza(ficha0, 'piezaA');
    ficha0.setLevel(1);
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza1');
    configPieza(ficha0, 'pieza6');
    configPieza(ficha0, 'piezaA');
    ficha0 = crearFicha("orange");
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza1');
    configPieza(ficha0, 'pieza6');
    configPieza(ficha0, 'piezaA');
    ficha0.setLevel(1);
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza1');
    configPieza(ficha0, 'pieza6');
    configPieza(ficha0, 'piezaA');
    ficha0 = crearFicha("purple");
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza1');
    configPieza(ficha0, 'pieza3');
    configPieza(ficha0, 'piezaA');
    ficha0.setLevel(1);
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza1');
    configPieza(ficha0, 'pieza3');
    configPieza(ficha0, 'piezaA');
    ficha0 = crearFicha("pink");
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza1');
    configPieza(ficha0, 'piezaA');
    configPieza(ficha0, 'piezaB');
    ficha0.setLevel(1);
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza1');
    configPieza(ficha0, 'piezaA');
    configPieza(ficha0, 'piezaB');
    ficha0 = crearFicha("brown");
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza1');
    configPieza(ficha0, 'piezaA');
    configPieza(ficha0, 'piezaG');
    ficha0.setLevel(1);
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza1');
    configPieza(ficha0, 'piezaA');
    configPieza(ficha0, 'piezaG');
    ficha0 = crearFicha("cyan");
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza1');
    configPieza(ficha0, 'piezaA');
    configPieza(ficha0, 'piezaC');
    ficha0.setLevel(1);
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza1');
    configPieza(ficha0, 'piezaA');
    configPieza(ficha0, 'piezaC');
    ficha0 = crearFicha("magenta");
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza1');
    configPieza(ficha0, 'piezaA');
    configPieza(ficha0, 'piezaF');
    ficha0.setLevel(1);
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza1');
    configPieza(ficha0, 'piezaA');
    configPieza(ficha0, 'piezaF');
    ficha0 = crearFicha("indigo");
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza1');
    configPieza(ficha0, 'pieza3');
    configPieza(ficha0, 'pieza7');
    configPieza(ficha0, 'piezaA');
    ficha0.setLevel(1);
    configPieza(ficha0, 'pieza0');
    configPieza(ficha0, 'pieza1');
    configPieza(ficha0, 'pieza3');
    configPieza(ficha0, 'pieza7');
    configPieza(ficha0, 'piezaA');
}

function crearFicha(color) {
    const nuevaFicha = new Ficha(color);
    fichas.push(nuevaFicha);
    return nuevaFicha;
}

function configPieza(obj, tipoPieza) {
    piezaAct = configuraciones[tipoPieza];
    piezaAct.forEach((configuration, index) => {
        obj.setConfigPos(index, 0);
        obj.addPieza(configuration.cx, configuration.cy, configuration.brd);
    })

}

class Ficha {
    constructor(color) {
        this.color = color;
        this.piezas = [];
        this.previous = [];
        this.config = 0;
        this.level = 0;
        this.cambio = false;
    }

    setLevel(level) {
        this.level = level;
    }

    setConfigPos(config, position) {
        this.cambio = false;
        if (config != this.config || position != this.position) this.cambio = true;
        this.config = config;
        this.position = position;
    }

    //setPosition(position) {
    //    this.position = position;
    //}

    addPieza(px, py, brd) {
        if (!this.piezas[this.level]) {
            this.piezas[this.level] = [];
        }
        if (!this.piezas[this.level][this.config]) {
            this.piezas[this.level][this.config] = [];
        }

        // Agregar la pieza
        this.piezas[this.level][this.config].push({ px, py, brd });
    }

    getPiezas(row) {
        // Si no hay cambio, devuelve el resultado previo directamente
        if (!this.cambio) {
            return this.previous;
        }

        // Calcula la posición ajustada solo cuando hay un cambio
        const isRowEven = row % 2 === 0; // Determina si la fila es par o impar
        const adjustedPosition = isRowEven ? this.config : this.config + 6;

        // Actualiza `this.previous` directamente con una referencia estática
        this.previous = this.piezas?.[this.level]?.[adjustedPosition] || [];

        return this.previous;
    }

    /*getPiezas(row) {
        if (cambio) {
            const isRowEven = row % 2 === 0; // Determina si la fila es par o impar
            const adjustedPosition = isRowEven ? this.config : this.config + 6;
            this.previous = this.piezas?.[this.level]?.[adjustedPosition]?.map(p => ({ ...p })) || [];
        };

        return this.previous;
    }*/

}

function clear(mode = 1) {
    if (mode == 0) {
        erase.forEach(par => {
            mesa1[par[1]][par[0]].buzy = false;
        })
    } else {
        mesa1.forEach(row => {
            row.forEach(col => {
                col.buzy = false;
            })
        })
    }

}

function testMesa() {
    const config = count.config % configs.length;
    const position = count.position % boards[1].length;
    const idFicha = count.ficha % fichas.length;
    const level = count.level % 2;
    config === 0 ? console.log("Ready, begin") : null;
    config === 5 ? console.log("Finish") : null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clear();
    setFicha(position, config, level, idFicha, mesa1);
    currentState = { position, config };
    drawMesa(mesa1)

}

function testExito() {
    clear();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    success[count.exito].forEach(pieza => {
        const level = 0;
        const { position, config, idFicha } = pieza;
        setFicha(position, config, level, idFicha, mesa1);
    })
    drawMesa(mesa1)

}

function testEstados() {



    const idFicha = count.ficha % fichas.length;
    const level = count.level % 2;
    const lengthEstados = estados[idFicha][level].length;
    const estado = count.estado % lengthEstados;
    const position = estados[idFicha][level][estado].position;
    const config = estados[idFicha][level][estado].config;


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clear();
    setFicha(position, config, level, idFicha, mesa1);
    drawMesa(mesa1)

}

function setFicha(position, config, level, idFicha, mesa) {

    const row = boards[level][position][1];
    const col = boards[level][position][0];
    const rowB = boards[2][position][1];
    const colB = boards[2][position][0];
    const ficha = fichas[idFicha];
    ficha.setConfigPos(config, position);
    //ficha.setPosition(position);
    ficha.setLevel(level);
    const color = ficha.color;
    const setPiezas = ficha.getPiezas(row);
    let ok = 0;
    let base = true;

    for (const { px, py, brd } of setPiezas) {
        //console.log(px, py, brd)
        const cell = mesa[brd === 2 ? rowB + py : row + py][brd === 2 ? colB + px : col + px];
        const ocupado = cell.buzy;
        const desborde = !cell.zone;

        if (desborde) {
            ok = 2;
        } else if (ok < 2 && ocupado) {
            ok = 1;
        }
        cell.buzy = true;
        cell.colord = color;
        cell.base = base;
        base = false;
    }

    return ok;
}

function drawMesa(mesaArr) {
    const ww = wCeldas, hh = hCeldas;

    const ratio2 = ratio * 0.92;
    for (let row = 0; row <= ww; row++) {
        for (let col = 0; col <= hh; col++) {
            const { xx, yy, zone, colord, buzy, base } = mesaArr[col][row];
            drawVoidCircle(xx, yy, ratio, zone ? 'black' : '#d6dbdf', 1);
            if (buzy) {
                drawCircle(xx, yy, ratio2, zone ? colord : '#d6dbdf');
                if (base) drawCircle(xx, yy, ratio * 0.3, '#ffffff');
            }
        }
    }

}
function loadTable(x, y) {

    const
        arr = [],
        ww = wCeldas,
        hh = hCeldas;
    ;
    for (let row = 0; row <= hh; row++) {
        let rowArray = []
        let xx = row % 2 === 0 ? x : x - ratio, yy = y;
        for (let col = 0; col <= ww; col++) {
            const zone = existsInBoard(boards[0], col, row) || existsInBoard(boards[1], col, row) || existsInBoard(boards[2], col, row);
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

function existsInBoard(board, row, col) {
    return board.some(([r, c]) => r === row && c === col);
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