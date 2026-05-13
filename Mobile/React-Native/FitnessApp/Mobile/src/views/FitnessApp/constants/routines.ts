export interface Exercise {
  n: string;
  s: string;
  gif: string;
  desc?: string;
}

export interface Routine {
  focus: string;
  ex: Exercise[];
}

export const ROUTINES: Record<string, Routine> = {
  'LUN': { focus: 'Superior (Empuje)', ex: [
    {n: 'Press Pecho Máquina', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Lever-Chest-Press.gif'},
    {n: 'Jalón Polea Alta', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif'},
    {n: 'Press Hombro Máquina', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/04/Lever-Shoulder-Press.gif'},
    {n: 'Bíceps Polea (Barra)', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/cable-curl.gif'},
    {n: 'Tríceps Polea (Cuerda)', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif'},
    {n: 'Peck Deck Fly', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pec-Deck-Fly.gif'},
    {n: 'Remo Sentado Máquina', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Row-Machine.gif'},
    {n: 'Elevación Piernas', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Captains-Chair-Leg-Raise.gif'}
  ]},
  'MAR': { focus: 'Pierna (Cuádriceps)', ex: [
    {n: 'Prensa 45°', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif'},
    {n: 'Extensión Cuádriceps', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif'},
    {n: 'Curl Femoral Sentado', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/08/Seated-Leg-Curl.gif'},
    {n: 'Hip Thrust', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2022/09/Smith-Machine-Hip-Thrust.gif'},
    {n: 'Prensa Pantorrilla', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Leg-Press-Calf-Raise.gif'},
    {n: 'Abducción Máquina', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/HiP-ABDUCTION-MACHINE.gif'},
    {n: 'Aducción Polea', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Cable-Hip-Adduction.gif'},
    {n: 'Sentadilla Hack', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2024/10/smith-machine-squat.gif'}
  ]},
  'MIE': { focus: 'Cuerpo Completo', ex: [
    {n: 'Prensa (Piernas)', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/08/Lever-Horizontal-Leg-Press.gif'},
    {n: 'Hip Thrust', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2022/09/Smith-Machine-Hip-Thrust.gif'},
    {n: 'Press Pecho', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Lever-Chest-Press.gif'},
    {n: 'Remo Sentado', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif'},
    {n: 'Elev. Laterales', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/07/one-arm-Cable-Lateral-Raise.gif'},
    {n: 'Curl Bíceps', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif'},
    {n: 'Tríceps Polea', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif'},
    {n: 'Elevación Piernas', s: '3 x 20', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Captains-Chair-Leg-Raise.gif'}
  ]},
  'JUE': { focus: 'Superior (Tracción)', ex: [
    {n: 'Remo Convergente', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Row-Machine.gif'},
    {n: 'Jalón Neutro Máquina', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif'},
    {n: 'Face Pulls Polea', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif'},
    {n: 'Predicador Máquina', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/04/Lever-Preacher-Curl.gif'},
    {n: 'Fondos Asistidos', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Assisted-Chest-Dip.gif'},
    {n: 'Press Hombro Máquina', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/04/Lever-Shoulder-Press.gif'},
    {n: 'Pull Over Polea', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Cable-Straight-Arm-Pulldown.gif'},
    {n: 'Plancha Abdominal', s: '3 x 1 min', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/plank.gif'}
  ]},
  'VIE': { focus: 'Pierna (Posterior)', ex: [
    {n: 'Curl Femoral Sentado', s: '3 x 12', gif: 'https://via.placeholder.com/200/4ADE80/FFFFFF?text=Curl+Femoral'},

    {n: 'Peso Muerto Barra', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Deadlift.gif'},
    {n: 'Abducción Máquina', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/HiP-ABDUCTION-MACHINE.gif'},
    {n: 'Prensa Unilateral', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif'},
    {n: 'Hiperextensiones', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/hyperextension.gif'},
    {n: 'Costurero Pantorrilla', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Leg-Press-Calf-Raise.gif'},
    {n: 'Sentadilla Libre', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2024/10/smith-machine-squat.gif'},
    {n: 'Hip Thrust', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2022/09/Smith-Machine-Hip-Thrust.gif'}
  ]},
  'SAB': { focus: 'Brazos y Detalles', ex: [
    {n: 'Curl Biceps Alterno', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif'},
    {n: 'Tríceps Copa Manc.', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Triceps-Extension.gif'},
    {n: 'Curl Predicador Máquina', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/04/Lever-Preacher-Curl.gif'},
    {n: 'Tríceps Polea Cuerda', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif'},
    {n: 'Vuelos Laterales', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif'},
    {n: 'Face Pulls', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif'},
    {n: 'Encogimiento Hombros', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/04/Dumbbell-Shrug.gif'},
    {n: 'Rueda Abdominal', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Ab-Wheel-Rollout.gif'}
  ]},
  'DOM': { focus: 'Full Body (Máquinas)', ex: [
    {n: 'Prensa 45°', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif'},
    {n: 'Curl Femoral Sentado', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/08/Seated-Leg-Curl.gif'},
    {n: 'Press Pecho Máquina', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Lever-Chest-Press.gif'},
    {n: 'Jalón Polea Alta', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif'},
    {n: 'Press Hombro Máquina', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/04/Lever-Shoulder-Press.gif'},
    {n: 'Bíceps Polea Barra', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/cable-curl.gif'},
    {n: 'Tríceps Polea Cuerda', s: '3 x 12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif'},
    {n: 'Elevación Piernas', s: '4 x 20', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Captains-Chair-Leg-Raise.gif'}
  ]}
};
