import { useState, useEffect } from 'react';
import { getAppState, subscribeState, checkAndRunAutoCuts, AppState } from '../../database/db';

/**
 * funcion : "useHomeView"
 * parametros: ninguno
 * funcionalidad : encapsular el estado local, la inicialización de los cortes y la suscripción de datos para HomeView
 * retorna: objeto con el estado actual, saldo total y rutina de hoy
 */
export const useHomeView = () => {
  const [state, setState] = useState<AppState>(getAppState());

  // suscribirse a los cambios del estado global al montar
  useEffect(() => {
    checkAndRunAutoCuts();
    const unsubscribe = subscribeState(() => {
      setState({ ...getAppState() });
    });
    return () => unsubscribe();
  }, []);

  const totalExpQ1 = state.finance.q1.expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpQ2 = state.finance.q2.expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalBalance = state.finance.q1.income - totalExpQ1 + state.finance.q2.income - totalExpQ2;

  const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  const todayName = days[new Date().getDay()];
  const todayRoutine = state.fitness.routines[todayName] || { focus: 'Descanso completo', ex: [] };

  return {
    state,
    totalBalance,
    todayName,
    todayRoutine,
  };
};
