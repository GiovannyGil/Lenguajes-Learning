import SQLite from 'react-native-sqlite-storage';

// Habilitar promesas en react-native-sqlite-storage
SQLite.enablePromise(true);

export interface Expense {
  id: number;
  desc: string;
  amount: number;
  isFixed?: boolean;
  subExpenses?: SubExpense[];
}

export interface SubExpense {
  id: number;
  desc: string;
  amount: number;
}

export interface SavingsMovement {
  id: number;
  type: 'income' | 'withdrawal' | 'auto_cut';
  desc: string;
  amount: number;
  date: string;
}

export interface RoutineExercise {
  n: string; // nombre del ejercicio
  s: string; // series x repes objetivo
  gif: string; // url gif
  completedSeries?: boolean[]; // progreso por serie
}

export interface DayRoutine {
  focus: string;
  ex: RoutineExercise[];
}

export interface BodyMeasure {
  id: number;
  fecha: string;
  peso_kg: number;
  porcentaje_grasa: number;
  brazo_cm: number;
  pierna_cm: number;
  muslo_cm: number;
  pantorrilla_cm: number;
  cintura_cm: number;
  cadera_cm: number;
  notas?: string;
}

export interface AppState {
  finance: {
    q1: { income: number; expenses: Expense[] };
    q2: { income: number; expenses: Expense[] };
    savings: { total: number; history: SavingsMovement[] };
    meta: { lastCutQ1: string | null; lastCutQ2: string | null };
  };
  fitness: {
    routines: { [key: string]: DayRoutine };
    history: { [fecha: string]: { completed: boolean; routineDay?: string; exercises: { [exName: string]: boolean[] } } };
    measures: BodyMeasure[];
  };
}

// inicializar el catálogo de rutinas con los ejercicios por defecto
const initialRoutines: { [key: string]: DayRoutine } = {
  'Día 1': {
    focus: 'Push (Pecho + Hombro + Tríceps)',
    ex: [
      { n: 'Press Banca', s: '4 x 5-8', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif' },
      { n: 'Press Inclinado Mancuernas', s: '3 x 8-10', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif' },
      { n: 'Press Militar', s: '3 x 6-10', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Shoulder-Press.gif' },
      { n: 'Peck Deck Fly', s: '3 x 12-15', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pec-Deck-Fly.gif' },
      { n: 'Elevaciones Laterales', s: '4 x 12-15', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif' },
      { n: 'Pushdown Cuerda', s: '3 x 10-12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif' },
      { n: 'Extensión Tríceps Sobre Cabeza', s: '3 x 10-12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/04/Cable-Rope-Overhead-Triceps-Extension.gif' },
      { n: 'Elevación de Piernas', s: '3 x 15-20', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Captains-Chair-Leg-Raise.gif' },
    ],
  },
  'Día 2': {
    focus: 'Pull (Espalda + Bíceps)',
    ex: [
      { n: 'Dominadas o Jalón al Pecho', s: '4 x 6-10', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif' },
      { n: 'Remo Convergente', s: '4 x 8-10', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Row-Machine.gif' },
      { n: 'Remo con Mancuerna', s: '3 x 10-12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif' },
      { n: 'Face Pull', s: '3 x 15-20', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif' },
      { n: 'Curl Inclinado Mancuernas', s: '3 x 10-12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif' },
      { n: 'Curl Martillo', s: '3 x 10-12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif' },
      { n: 'Encogimientos con Mancuernas', s: '3 x 12-15', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/04/Dumbbell-Shrug.gif' },
    ],
  },
  'Día 3': {
    focus: 'Legs (Pierna Completa)',
    ex: [
      { n: 'Sentadilla Hack', s: '4 x 6-8', gif: 'https://fitnessprogramer.com/wp-content/uploads/2024/10/smith-machine-squat.gif' },
      { n: 'Peso Muerto Rumano', s: '4 x 8-10', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Romanian-Deadlift.gif' },
      { n: 'Prensa 45°', s: '3 x 10-12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif' },
      { n: 'Prensa Pantorrilla', s: '4 x 15-20', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Leg-Press-Calf-Raise.gif' },
      { n: 'Hip Thrust', s: '3 x 8-10', gif: 'https://fitnessprogramer.com/wp-content/uploads/2022/09/Smith-Machine-Hip-Thrust.gif' },
      { n: 'Extensión de Cuádriceps', s: '3 x 12-15', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif' },
      { n: 'Curl Femoral Sentado', s: '3 x 10-12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/08/Seated-Leg-Curl.gif' },
    ],
  },
  'Día 4': {
    focus: 'Upper Complementario (Push + Pull)',
    ex: [
      { n: 'Press Inclinado Barra', s: '3 x 8-10', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Barbell-Bench-Press.gif' },
      { n: 'Dominadas o Jalón al Pecho', s: '3 x 8-10', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif' },
      { n: 'Remo Convergente', s: '3 x 10-12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Row-Machine.gif' },
      { n: 'Press Militar Mancuernas', s: '3 x 10-12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif' },
      { n: 'Elevaciones Laterales', s: '3 x 15', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif' },
      { n: 'Curl Barra EZ', s: '3 x 10-12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Z-Bar-Curl.gif' },
      { n: 'Fondos en Paralelas', s: '3 x 8-12', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Triceps-Dips.gif' },
    ],
  },
};

const defaultState: AppState = {
  finance: {
    q1: { income: 2500000, expenses: [] },
    q2: { income: 2500000, expenses: [] },
    savings: { total: 500000, history: [] },
    meta: { lastCutQ1: null, lastCutQ2: null },
  },
  fitness: {
    routines: initialRoutines,
    history: {},
    measures: [
      {
        id: 1,
        fecha: '2026-07-15',
        peso_kg: 78.5,
        porcentaje_grasa: 16.2,
        brazo_cm: 37,
        pierna_cm: 58,
        muslo_cm: 55,
        pantorrilla_cm: 38,
        cintura_cm: 84,
        cadera_cm: 98,
        notas: 'Registro inicial',
      },
    ],
  },
};

let currentAppState: AppState = { ...defaultState };
let db: SQLite.SQLiteDatabase | null = null;

const listeners = new Set<() => void>();

/**
 * funcion : "initSQLiteDB"
 * parametros: ninguno
 * funcionalidad : inicializar la base de datos SQLite física (.sql / .db) en el dispositivo y cargar o crear tablas según Readme-App.md
 * retorna: Promise<void>
 */
export const initSQLiteDB = async () => {
  try {
    db = await SQLite.openDatabase({ name: 'PersonalApp.db', location: 'default' });

    // Habilitar llaves foráneas y ejecutar DDL oficial de Readme-App.md
    await db.executeSql('PRAGMA foreign_keys = ON;');

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS app_state_store (
        id INTEGER PRIMARY KEY,
        state_json TEXT NOT NULL
      );
    `);

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS fit_medidas_corporales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha DATE NOT NULL UNIQUE,
        peso_kg REAL,
        porcentaje_grasa REAL,
        brazo_cm REAL,
        pierna_cm REAL,
        muslo_cm REAL,
        pantorrilla_cm REAL,
        cintura_cm REAL,
        cadera_cm REAL,
        notas TEXT,
        fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Intentar leer el estado guardado en el archivo SQLite local
    const [results] = await db.executeSql('SELECT state_json FROM app_state_store WHERE id = 1;');
    if (results.rows.length > 0) {
      const savedState = JSON.parse(results.rows.item(0).state_json);
      currentAppState = savedState;
    } else {
      // Guardar el estado inicial en SQLite por primera vez
      await db.executeSql('INSERT OR REPLACE INTO app_state_store (id, state_json) VALUES (1, ?);', [
        JSON.stringify(defaultState),
      ]);
    }

    checkAndRunAutoCuts();
    notifyListeners();
  } catch {
    // Si falla la inicialización nativa en Web/Simulador, continuar con la memoria persistida
  }
};

/**
 * funcion : "saveStateToSQLite"
 * parametros: ninguno
 * funcionalidad : persistir la base de datos reactiva en el archivo físico SQLite del dispositivo
 * retorna: Promise<void>
 */
const saveStateToSQLite = async () => {
  if (!db) return;
  try {
    await db.executeSql('INSERT OR REPLACE INTO app_state_store (id, state_json) VALUES (1, ?);', [
      JSON.stringify(currentAppState),
    ]);
  } catch {
    // ignorar errores silenciosos
  }
};

// inicializar SQLite de inmediato
initSQLiteDB();

/**
 * funcion : "notifyListeners"
 * parametros: ninguno
 * funcionalidad : notificar a todos los listeners suscritos sobre un cambio de estado
 * retorna: no retorna nada
 */
const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

/**
 * funcion : "getAppState"
 * parametros: ninguno
 * funcionalidad : obtener el estado actual de la aplicación
 * retorna: AppState
 */
export const getAppState = (): AppState => {
  return currentAppState;
};

/**
 * funcion : "subscribeState"
 * parametros: listener (función callback)
 * funcionalidad : suscribirse a los cambios de estado de la aplicación
 * retorna: función para desuscribirse
 */
export const subscribeState = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/**
 * funcion : "checkAndRunAutoCuts"
 * parametros: ninguno
 * funcionalidad : revisar las fechas del mes y aplicar los cortes de ahorro automático al pasar las quincenas (Día 15 y Día 30)
 * retorna: no retorna nada
 */
export const checkAndRunAutoCuts = () => {
  const now = new Date();
  const day = now.getDate();
  const currentMonthYear = `${now.getFullYear()}-${now.getMonth() + 1}`;

  // procesar corte automático de la primera quincena (Día 15)
  if (day >= 15 && currentAppState.finance.meta.lastCutQ1 !== currentMonthYear) {
    const totalExpQ1 = currentAppState.finance.q1.expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const surplusQ1 = currentAppState.finance.q1.income - totalExpQ1;
    if (surplusQ1 > 0) {
      currentAppState.finance.savings.total += surplusQ1;
      currentAppState.finance.savings.history.unshift({
        id: Date.now(),
        type: 'auto_cut',
        desc: 'Corte Automático Q1 - Sobrante transferido a Ahorros',
        amount: surplusQ1,
        date: now.toLocaleDateString(),
      });
      // reiniciar lista de gastos de la primera quincena para el nuevo periodo
      currentAppState.finance.q1.expenses = [];
    }
    currentAppState.finance.meta.lastCutQ1 = currentMonthYear;
    saveStateToSQLite();
    notifyListeners();
  }

  // procesar corte automático de la segunda quincena (Día 30/31)
  if ((day >= 30 || day === 1) && currentAppState.finance.meta.lastCutQ2 !== currentMonthYear) {
    const totalExpQ2 = currentAppState.finance.q2.expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const surplusQ2 = currentAppState.finance.q2.income - totalExpQ2;
    if (surplusQ2 > 0) {
      currentAppState.finance.savings.total += surplusQ2;
      currentAppState.finance.savings.history.unshift({
        id: Date.now(),
        type: 'auto_cut',
        desc: 'Corte Automático Q2 - Sobrante transferido a Ahorros',
        amount: surplusQ2,
        date: now.toLocaleDateString(),
      });
      // reiniciar lista de gastos de la segunda quincena para el nuevo periodo
      currentAppState.finance.q2.expenses = [];
    }
    currentAppState.finance.meta.lastCutQ2 = currentMonthYear;
    saveStateToSQLite();
    notifyListeners();
  }
};

/**
 * funcion : "updateAppState"
 * parametros: updater (función callback que muta el estado)
 * funcionalidad : mutar el estado, guardar en SQLite física en disco y disparar notificaciones a las vistas
 * retorna: no retorna nada
 */
export const updateAppState = (updater: (state: AppState) => void) => {
  updater(currentAppState);
  saveStateToSQLite();
  notifyListeners();
};
