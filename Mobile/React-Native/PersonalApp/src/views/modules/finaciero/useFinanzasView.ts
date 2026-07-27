import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { getAppState, subscribeState, updateAppState, AppState } from '../../../database/db';

/**
 * funcion : "useFinanzasView"
 * parametros: ninguno
 * funcionalidad : encapsular el estado y lógica financiera (agregar gastos, subgastos y simulación de cortes) para la vista
 * retorna: datos de la quincena activa, saldo estimado, funciones de manejo y estado
 */
export const useFinanzasView = () => {
  const [state, setState] = useState<AppState>(getAppState());
  const [activeQuincena, setActiveQuincena] = useState<'q1' | 'q2'>('q1');
  const [newExpenseDesc, setNewExpenseDesc] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');

  // registrar suscripción al estado de base de datos local
  useEffect(() => {
    const unsubscribe = subscribeState(() => {
      setState({ ...getAppState() });
    });
    return () => unsubscribe();
  }, []);

  const currentData = state.finance[activeQuincena];
  const totalExp = currentData.expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const leftover = currentData.income - totalExp;

  // agregar nuevo gasto principal
  const handleAddExpense = () => {
    if (!newExpenseDesc || !newExpenseAmount) {
      Alert.alert('Error', 'Por favor ingresa la descripción y el monto del gasto.');
      return;
    }
    updateAppState(s => {
      s.finance[activeQuincena].expenses.push({
        id: Date.now(),
        desc: newExpenseDesc,
        amount: parseFloat(newExpenseAmount),
        subExpenses: [],
      });
    });
    setNewExpenseDesc('');
    setNewExpenseAmount('');
  };

  // eliminar un gasto existente
  const handleDeleteExpense = (id: number) => {
    updateAppState(s => {
      s.finance[activeQuincena].expenses = s.finance[activeQuincena].expenses.filter(e => e.id !== id);
    });
  };

  // agregar un desglose de subgasto
  const handleAddSubExpense = (expenseId: number, subDesc: string, subAmount: number) => {
    updateAppState(s => {
      const exp = s.finance[activeQuincena].expenses.find(e => e.id === expenseId);
      if (exp) {
        if (!exp.subExpenses) exp.subExpenses = [];
        exp.subExpenses.push({
          id: Date.now(),
          desc: subDesc,
          amount: subAmount,
        });
        exp.amount += subAmount;
      }
    });
  };

  // simular corte de periodo
  const handleSimulateCut = () => {
    updateAppState(s => {
      if (leftover > 0) {
        s.finance.savings.total += leftover;
        s.finance.savings.history.unshift({
          id: Date.now(),
          type: 'auto_cut',
          desc: `Corte Forzado ${activeQuincena.toUpperCase()}`,
          amount: leftover,
          date: new Date().toLocaleDateString(),
        });
        Alert.alert('Corte Exitoso', `Se han transferido $${leftover.toLocaleString()} al Fondo de Ahorro.`);
      } else {
        Alert.alert('Información', 'No hay sobrante para transferir en esta quincena.');
      }
    });
  };

  return {
    state,
    activeQuincena,
    setActiveQuincena,
    newExpenseDesc,
    setNewExpenseDesc,
    newExpenseAmount,
    setNewExpenseAmount,
    currentData,
    totalExp,
    leftover,
    handleAddExpense,
    handleDeleteExpense,
    handleAddSubExpense,
    handleSimulateCut,
  };
};
