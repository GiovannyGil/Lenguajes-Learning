import React from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import { NeuCard } from '../../../components/NeuCard';
import { NeuButton } from '../../../components/NeuButton';
import { NeuInput } from '../../../components/NeuInput';
import { NeuProgressBar } from '../../../components/NeuProgressBar';
import { updateAppState } from '../../../database/db';
import { useFinanzasView } from './useFinanzasView';
import { styles } from './style';

interface FinanzasViewProps {
  onBack: () => void;
}

/**
 * funcion : "FinanzasView"
 * parametros: onBack (función para volver a la Home)
 * funcionalidad : renderizar la vista de gestión financiera usando el hook de lógica y el archivo de estilos
 * retorna: elemento JSX.Element
 */
export const FinanzasView: React.FC<FinanzasViewProps> = ({ onBack }) => {
  const {
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
  } = useFinanzasView();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.headerRow}>
        <NeuButton title="Volver" onPress={onBack} style={styles.backBtn} />
        <Text style={styles.title}>Finanzas Premium</Text>
      </View>

      <View style={styles.quincenaSelector}>
        <NeuButton
          title="1ra Quincena (Día 15)"
          onPress={() => setActiveQuincena('q1')}
          style={[styles.tabBtn, activeQuincena === 'q1' && styles.activeTab]}
        />
        <NeuButton
          title="2da Quincena (Día 30)"
          onPress={() => setActiveQuincena('q2')}
          style={[styles.tabBtn, activeQuincena === 'q2' && styles.activeTab]}
        />
      </View>

      <NeuCard>
        <Text style={styles.sectionHeader}>Ingreso Estimado</Text>
        <NeuInput
          keyboardType="numeric"
          value={currentData.income.toString()}
          onChangeText={val => {
            updateAppState(s => {
              s.finance[activeQuincena].income = parseFloat(val) || 0;
            });
          }}
        />
        <Text style={styles.surplusText}>
          Sobrante Quincena: ${leftover.toLocaleString()}
        </Text>
        <NeuProgressBar progress={currentData.income > 0 ? totalExp / currentData.income : 0} color="#e74c3c" label="Proporción Gasto / Ingreso" />
      </NeuCard>

      <NeuCard>
        <Text style={styles.sectionHeader}>Registrar Nuevo Gasto</Text>
        <NeuInput
          placeholder="Descripción (ej. Supermercado)"
          value={newExpenseDesc}
          onChangeText={setNewExpenseDesc}
        />
        <NeuInput
          placeholder="Monto ($)"
          keyboardType="numeric"
          value={newExpenseAmount}
          onChangeText={setNewExpenseAmount}
        />
        <NeuButton title="Agregar Gasto" onPress={handleAddExpense} />
      </NeuCard>

      <Text style={styles.sectionTitle}>Lista de Gastos</Text>
      {currentData.expenses.map(exp => (
        <NeuCard key={exp.id} style={styles.expenseCard}>
          <View style={styles.expenseHeader}>
            <Text style={styles.expenseDesc}>{exp.desc}</Text>
            <Text style={styles.expenseAmount}>${exp.amount.toLocaleString()}</Text>
          </View>

          {exp.subExpenses && exp.subExpenses.length > 0 && (
            <View style={styles.subContainer}>
              {exp.subExpenses.map(sub => (
                <View key={sub.id} style={styles.subRow}>
                  <Text style={styles.subDesc}>• {sub.desc}</Text>
                  <Text style={styles.subVal}>${sub.amount.toLocaleString()}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.expenseActions}>
            <NeuButton
              title="+ Subgasto"
              onPress={() => {
                Alert.prompt(
                  'Nuevo Subgasto',
                  'Ingresa descripción y monto separados por coma (ej. Helado, 5000)',
                  text => {
                    const parts = text.split(',');
                    if (parts.length === 2) {
                      handleAddSubExpense(exp.id, parts[0].trim(), parseFloat(parts[1].trim()) || 0);
                    }
                  }
                );
              }}
              style={styles.actionBtn}
            />
            <NeuButton
              title="Eliminar"
              onPress={() => handleDeleteExpense(exp.id)}
              style={[styles.actionBtn, styles.deleteBtn]}
            />
          </View>
        </NeuCard>
      ))}
    </ScrollView>
  );
};
