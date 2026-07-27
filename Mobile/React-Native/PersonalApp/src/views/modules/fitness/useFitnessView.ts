import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { getAppState, subscribeState, updateAppState, AppState, DayRoutine, RoutineExercise } from '../../../database/db';

/**
 * funcion : "useFitnessView"
 * parametros: ninguno
 * funcionalidad : gestionar el estado de la vista fitness (tab activa, rutina seleccionada, modal de ejercicio, racha y datos corporales)
 * retorna: variables de estado y controladores de interacción
 */
export const useFitnessView = () => {
  const [state, setState] = useState<AppState>(getAppState());
  // tab activa: 'Home' | 'Día 1' | 'Día 2' | 'Día 3' | 'Día 4'
  const [activeTab, setActiveTab] = useState<string>('Home');

  // estado para el modal de detalle del ejercicio (GIF amplio)
  const [selectedExercise, setSelectedExercise] = useState<RoutineExercise | null>(null);

  // estados para todos los campos oficiales de fit_medidas_corporales (Readme-App.md)
  const [showDataModal, setShowDataModal] = useState<boolean>(false);
  const [userGoal, setUserGoal] = useState<string>('Aumentar masa muscular');
  const [userWeight, setUserWeight] = useState<string>('');
  const [userHeight, setUserHeight] = useState<string>('');
  const [userFat, setUserFat] = useState<string>('');
  const [userBrazo, setUserBrazo] = useState<string>('');
  const [userPierna, setUserPierna] = useState<string>('');
  const [userMuslo, setUserMuslo] = useState<string>('');
  const [userPantorrilla, setUserPantorrilla] = useState<string>('');
  const [userCintura, setUserCintura] = useState<string>('');
  const [userCadera, setUserCadera] = useState<string>('');
  const [userNotas, setUserNotas] = useState<string>('');

  // suscribirse a los cambios del almacén de datos
  useEffect(() => {
    const unsubscribe = subscribeState(() => {
      setState({ ...getAppState() });
    });
    return () => unsubscribe();
  }, []);

  const tabs = ['Home', 'Día 1', 'Día 2', 'Día 3', 'Día 4'];
  const routine: DayRoutine = state.fitness.routines[activeTab] || { focus: 'Descanso Completo', ex: [] };

  // calcular días recientes (últimos 7 días) y racha actual desde la base de datos
  const today = new Date();
  const dayLetters = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  const recentDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today.getTime() - (6 - i) * 86400000);
    const dateStr = d.toISOString().split('T')[0];
    const isToday = i === 6;
    const isCompleted = !!state.fitness.history[dateStr]?.completed;
    return {
      dateStr,
      dayLetter: dayLetters[d.getDay()],
      dayNum: d.getDate(),
      isToday,
      isCompleted,
    };
  });

  // calcular racha de días consecutivos completados en la BD
  let calculatedStreak = 0;
  let checkDate = new Date(today);
  while (true) {
    const dStr = checkDate.toISOString().split('T')[0];
    if (state.fitness.history[dStr]?.completed) {
      calculatedStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }
  // calcular métricas antropométricas actuales del último registro de la BD
  const latestMeasure = state.fitness.measures[state.fitness.measures.length - 1] || {
    peso_kg: 78.5,
    porcentaje_grasa: 16.2,
    brazo_cm: 37,
    pierna_cm: 58,
    muslo_cm: 55,
    pantorrilla_cm: 38,
    cintura_cm: 84,
    cadera_cm: 98,
    notas: 'Inicial',
  };

  const weightNum = parseFloat(userWeight) || latestMeasure.peso_kg || 70;
  const heightNum = (parseFloat(userHeight) || 175) / 100;
  const calculatedIMC = (weightNum / (heightNum * heightNum)).toFixed(1);

  // alternar estado completado de un ejercicio individual (check único como ejercicios.html)
  const handleToggleExerciseCompleted = (exerciseName: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    updateAppState(s => {
      if (!s.fitness.history[todayStr]) {
        s.fitness.history[todayStr] = { completed: false, exercises: {} };
      }
      if (!s.fitness.history[todayStr].exercises[exerciseName]) {
        s.fitness.history[todayStr].exercises[exerciseName] = [false];
      }
      const currentVal = !!s.fitness.history[todayStr].exercises[exerciseName][0];
      s.fitness.history[todayStr].exercises[exerciseName][0] = !currentVal;
    });
  };

  // marcar la rutina del día activo como terminada y registrarla en el historial de la BD
  const handleCompleteTodayRoutine = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    updateAppState(s => {
      if (!s.fitness.history[todayStr]) {
        s.fitness.history[todayStr] = { completed: true, routineDay: activeTab, exercises: {} };
      } else {
        s.fitness.history[todayStr].completed = true;
        s.fitness.history[todayStr].routineDay = activeTab;
      }
    });
    Alert.alert('¡Excelente trabajo! 🎉', `Has completado y guardado en BD la rutina del ${activeTab}.`);
  };

  // guardar todas las medidas corporales en la base de datos local
  const handleSaveBodyData = () => {
    if (!userWeight) {
      Alert.alert('Incompleto', 'Por favor ingresa tu peso.');
      return;
    }
    updateAppState(s => {
      s.fitness.measures.push({
        id: Date.now(),
        fecha: new Date().toISOString().split('T')[0],
        peso_kg: parseFloat(userWeight),
        porcentaje_grasa: parseFloat(userFat) || latestMeasure.porcentaje_grasa || 15,
        brazo_cm: parseFloat(userBrazo) || latestMeasure.brazo_cm || 35,
        pierna_cm: parseFloat(userPierna) || latestMeasure.pierna_cm || 55,
        muslo_cm: parseFloat(userMuslo) || latestMeasure.muslo_cm || 50,
        pantorrilla_cm: parseFloat(userPantorrilla) || latestMeasure.pantorrilla_cm || 35,
        cintura_cm: parseFloat(userCintura) || latestMeasure.cintura_cm || 80,
        cadera_cm: parseFloat(userCadera) || latestMeasure.cadera_cm || 95,
        notas: userNotas || 'Nuevo registro',
      });
    });
    setShowDataModal(false);
    Alert.alert('Datos Guardados', 'Tu perfil de antropometría se ha guardado en la base de datos.');
  };

  return {
    state,
    activeTab,
    setActiveTab,
    tabs,
    routine,
    selectedExercise,
    setSelectedExercise,
    showDataModal,
    setShowDataModal,
    userGoal,
    setUserGoal,
    userWeight,
    setUserWeight,
    userHeight,
    setUserHeight,
    userFat,
    setUserFat,
    userBrazo,
    setUserBrazo,
    userPierna,
    setUserPierna,
    userMuslo,
    setUserMuslo,
    userPantorrilla,
    setUserPantorrilla,
    userCintura,
    setUserCintura,
    userCadera,
    setUserCadera,
    userNotas,
    setUserNotas,
    calculatedIMC,
    latestMeasure,
    recentDays,
    calculatedStreak,
    handleToggleExerciseCompleted,
    handleCompleteTodayRoutine,
    handleSaveBodyData,
  };
};
