const routines = {
    "Día 1": {
        focus: "Push (Pecho + Hombro + Tríceps)",
        ex: [
            {
                n: "Press Banca",
                s: "4 x 5-8",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif",
            },
            {
                n: "Press Inclinado Mancuernas",
                s: "3 x 8-10",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif",
            },
            {
                n: "Press Militar",
                s: "3 x 6-10",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Shoulder-Press.gif",
            },
            {
                n: "Peck Deck Fly",
                s: "3 x 12-15",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pec-Deck-Fly.gif",
            },
            {
                n: "Elevaciones Laterales",
                s: "4 x 12-15",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif",
            },
            {
                n: "Pushdown Cuerda",
                s: "3 x 10-12",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif",
            },
            {
                n: "Extensión Tríceps Sobre Cabeza",
                s: "3 x 10-12",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/04/Cable-Rope-Overhead-Triceps-Extension.gif",
            },
            {
                n: "Elevación de Piernas",
                s: "3 x 15-20",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Captains-Chair-Leg-Raise.gif",
            },
        ],
    },

    "Día 2": {
        focus: "Pull (Espalda + Bíceps)",
        ex: [
            {
                n: "Dominadas o Jalón al Pecho",
                s: "4 x 6-10",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif",
            },
            {
                n: "Remo Convergente",
                s: "4 x 8-10",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Row-Machine.gif",
            },
            {
                n: "Remo con Mancuerna",
                s: "3 x 10-12",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif",
            },
            {
                n: "Face Pull",
                s: "3 x 15-20",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif",
            },
            {
                n: "Curl Inclinado Mancuernas",
                s: "3 x 10-12",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif",
            },
            {
                n: "Curl Martillo",
                s: "3 x 10-12",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif",
            },
            {
                n: "Encogimientos con Mancuernas",
                s: "3 x 12-15",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/04/Dumbbell-Shrug.gif",
            },
        ],
    },

    "Día 3": {
        focus: "Legs (Pierna Completa)",
        ex: [
            {
                n: "Sentadilla Hack",
                s: "4 x 6-8",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2024/10/smith-machine-squat.gif",
            },
            {
                n: "Peso Muerto Rumano",
                s: "4 x 8-10",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Romanian-Deadlift.gif",
            },
            {
                n: "Prensa 45°",
                s: "3 x 10-12",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif",
            },
            {
                n: "Prensa Pantorrilla",
                s: "4 x 15-20",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Leg-Press-Calf-Raise.gif",
            },
            {
                n: "Hip Thrust",
                s: "3 x 8-10",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2022/09/Smith-Machine-Hip-Thrust.gif",
            },
            {
                n: "Extensión de Cuádriceps",
                s: "3 x 12-15",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif",
            },
            {
                n: "Curl Femoral Sentado",
                s: "3 x 10-12",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/08/Seated-Leg-Curl.gif",
            },
        ],
    },

    "Día 4": {
        focus: "Upper Complementario (Push + Pull)",
        ex: [
            {
                n: "Press Inclinado Barra",
                s: "3 x 8-10",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Barbell-Bench-Press.gif",
            },
            {
                n: "Dominadas o Jalón al Pecho",
                s: "3 x 8-10",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif",
            },
            {
                n: "Remo Convergente",
                s: "3 x 10-12",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Row-Machine.gif",
            },
            {
                n: "Press Militar Mancuernas",
                s: "3 x 10-12",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif",
            },
            {
                n: "Elevaciones Laterales",
                s: "3 x 15",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif",
            },
            {
                n: "Curl Barra EZ",
                s: "3 x 10-12",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Z-Bar-Curl.gif",
            },
            {
                n: "Fondos en Paralelas",
                s: "3 x 8-12",
                gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Triceps-Dips.gif",
            },
        ],
    },
};
