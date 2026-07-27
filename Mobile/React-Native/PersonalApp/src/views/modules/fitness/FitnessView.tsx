import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { NeuCard } from '../../../components/NeuCard';
import { NeuButton } from '../../../components/NeuButton';
import { NeuInput } from '../../../components/NeuInput';
import { useFitnessView } from './useFitnessView';
import { styles } from './style';

interface FitnessViewProps {
  onBack: () => void;
}

/**
 * funcion : "FitnessView"
 * parametros: onBack (función para volver a la Home principal)
 * funcionalidad : renderizar el módulo de fitness con tabla completa de antropometría fit_medidas_corporales (Readme-App.md)
 * retorna: elemento JSX.Element
 */
export const FitnessView: React.FC<FitnessViewProps> = ({ onBack }) => {
  const {
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
  } = useFitnessView();

  const todayStr = new Date().toISOString().split('T')[0];
  const todayHistory = state.fitness.history[todayStr] || { completed: false, exercises: {} };

  // verificar si todos los ejercicios de la rutina actual tienen su check activo
  const allCompleted = routine.ex.length > 0 && routine.ex.every(item => !!todayHistory.exercises[item.n]?.[0]);

  return (
    <View style={styles.mainWrapper}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerRow}>
          <NeuButton title="Volver" onPress={onBack} style={styles.backBtn} />
          <Text style={styles.title}>MeloFit Tracker</Text>
        </View>

        {/* PESTAÑA 1: VISTA HOME (RESUMEN FIT_MEDIDAS_CORPORALES) */}
        {activeTab === 'Home' && (
          <View style={styles.homeTabContainer}>
            {/* Tarjeta de Resumen Antropométrico Oficial (fit_medidas_corporales) */}
            <View style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <Text style={styles.metricTitle}>Resumen Antropométrico</Text>

                <TouchableOpacity style={styles.editTag} onPress={() => setShowDataModal(true)}>
                  <Text style={styles.editTagText}>⚙️</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.imcBox}>
                <Text style={styles.imcVal}>{calculatedIMC}</Text>
                <Text style={styles.imcLabel}>Índice de Masa Corporal (IMC)</Text>
              </View>

              {/* Grid completo de fit_medidas_corporales según Readme-App.md */}
              <View style={styles.metricGrid}>
                <View style={styles.metricBox}>
                  <Text style={styles.metricBoxLabel}>Peso</Text>
                  <Text style={styles.metricBoxVal}>{latestMeasure.peso_kg} kg</Text>
                </View>

                <View style={styles.metricBox}>
                  <Text style={styles.metricBoxLabel}>Grasa</Text>
                  <Text style={styles.metricBoxVal}>{latestMeasure.porcentaje_grasa}%</Text>
                </View>

                <View style={styles.metricBox}>
                  <Text style={styles.metricBoxLabel}>Brazo</Text>
                  <Text style={styles.metricBoxVal}>{latestMeasure.brazo_cm} cm</Text>
                </View>

                <View style={styles.metricBox}>
                  <Text style={styles.metricBoxLabel}>Pierna</Text>
                  <Text style={styles.metricBoxVal}>{latestMeasure.pierna_cm} cm</Text>
                </View>

                <View style={styles.metricBox}>
                  <Text style={styles.metricBoxLabel}>Muslo</Text>
                  <Text style={styles.metricBoxVal}>{latestMeasure.muslo_cm} cm</Text>
                </View>

                <View style={styles.metricBox}>
                  <Text style={styles.metricBoxLabel}>Pantorrilla</Text>
                  <Text style={styles.metricBoxVal}>{latestMeasure.pantorrilla_cm} cm</Text>
                </View>

                <View style={styles.metricBox}>
                  <Text style={styles.metricBoxLabel}>Cintura</Text>
                  <Text style={styles.metricBoxVal}>{latestMeasure.cintura_cm} cm</Text>
                </View>

                <View style={styles.metricBox}>
                  <Text style={styles.metricBoxLabel}>Cadera</Text>
                  <Text style={styles.metricBoxVal}>{latestMeasure.cadera_cm} cm</Text>
                </View>
              </View>
            </View>

            {/* Tarjeta de Línea de Actividad y Racha Calcada de ejercicios.html */}
            <View style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <Text style={styles.metricTitle}>Línea de Actividad</Text>

                <View style={styles.streakTag}>
                  <Text style={styles.streakText}>🔥 Racha: {calculatedStreak}</Text>
                </View>
              </View>

              <View style={styles.timelineContainer}>
                {/* Línea horizontal continua de fondo */}
                <View style={styles.timelineLine} />

                {recentDays.map((item, idx) => (
                  <View key={idx} style={styles.timelineDotWrapper}>
                    <View style={[styles.timelineDot, item.isCompleted && styles.timelineDotActive]} />
                    <Text style={[styles.timelineDate, item.isToday && styles.timelineDateToday]}>
                      {item.isToday ? 'HOY' : item.dayLetter}
                    </Text>
                    {!item.isToday && <Text style={styles.timelineDayNum}>{item.dayNum}</Text>}
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* PESTAÑAS DÍAS (DÍA 1 A DÍA 4): RUTINA Y EJERCICIOS */}
        {activeTab !== 'Home' && (
          <View>
            <NeuCard style={styles.focusCard}>
              <Text style={styles.focusValue}>{routine.focus}</Text>
            </NeuCard>

            {routine.ex.length === 0 ? (
              <NeuCard style={styles.emptyCard}>
                <Text style={styles.emptyText}>Día de recuperación. ¡Buen descanso!</Text>
              </NeuCard>
            ) : (
              routine.ex.map((item, idx) => {
                const isChecked = !!todayHistory.exercises[item.n]?.[0];
                const fallbackImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.n)}&background=1e1e1e&color=3d5afe&size=80&bold=true`;

                return (
                  <TouchableOpacity key={idx} onPress={() => setSelectedExercise(item)}>
                    <View style={styles.exerciseCardRow}>
                      <Image
                        source={{
                          uri: item.gif || fallbackImg,
                          headers: {
                            Referer: '',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                          },
                        }}
                        style={styles.thumbGif}
                        resizeMode="cover"
                      />

                      <View style={styles.exerciseInfoCol}>
                        <Text style={styles.exerciseTitle}>{item.n}</Text>
                        <Text style={styles.exerciseSub}>🕒 {item.s}</Text>
                      </View>

                      {/* Área de Check único (Estilo ejercicios.html) */}
                      <TouchableOpacity
                        style={styles.checkArea}
                        onPress={() => handleToggleExerciseCompleted(item.n)}
                      >
                        <View style={[styles.checkCircle, isChecked && styles.checkCircleDone]}>
                          {isChecked && <Text style={styles.checkMarkText}>✓</Text>}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}

            {/* Botón Terminar Rutina de Hoy */}
            {routine.ex.length > 0 && (
              <TouchableOpacity
                disabled={!allCompleted}
                style={[styles.completeRoutineBtn, !allCompleted && styles.completeRoutineBtnDisabled]}
                onPress={handleCompleteTodayRoutine}
              >
                <Text style={styles.completeRoutineBtnText}>
                  {allCompleted ? '✔️ Completar Rutina de Hoy' : 'Realiza todos los ejercicios'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      {/* BOTTOM NAVIGATION BAR FIJO (Estilo ejercicios.html) */}
      <View style={styles.bottomNav}>
        {tabs.map(t => (
          <TouchableOpacity
            key={t}
            style={[styles.bottomNavItem, activeTab === t && styles.bottomNavItemActive]}
            onPress={() => setActiveTab(t)}
          >
            <Text style={[styles.bottomNavText, activeTab === t && styles.bottomNavTextActive]}>
              {t === 'Home' ? '🏠 Home' : t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* MODAL DE DETALLE DE EJERCICIO Y DEMOSTRACIÓN GIF */}
      {selectedExercise && (
        <Modal transparent animationType="fade" visible={true} onRequestClose={() => setSelectedExercise(null)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedExercise.n}</Text>

              <Image
                source={{
                  uri: selectedExercise.gif,
                  headers: {
                    Referer: '',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                  },
                }}
                style={styles.modalGif}
                resizeMode="contain"
              />

              <Text style={styles.modalSeriesText}>🕒 Series sugeridas: {selectedExercise.s}</Text>

              <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedExercise(null)}>
                <Text style={styles.closeBtnText}>Entendido</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* MODAL COMPLETO DE fit_medidas_corporales SEGÚN README-APP.MD */}
      {showDataModal && (
        <Modal transparent animationType="slide" visible={true} onRequestClose={() => setShowDataModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Registrar Antropometría</Text>

              <ScrollView style={styles.modalFormScroll}>
                <NeuInput
                  placeholder="Objetivo General"
                  value={userGoal}
                  onChangeText={setUserGoal}
                />
                <NeuInput
                  placeholder="Peso (peso_kg)"
                  keyboardType="numeric"
                  value={userWeight}
                  onChangeText={setUserWeight}
                />
                <NeuInput
                  placeholder="Altura (cm) para IMC"
                  keyboardType="numeric"
                  value={userHeight}
                  onChangeText={setUserHeight}
                />
                <NeuInput
                  placeholder="% Grasa (porcentaje_grasa)"
                  keyboardType="numeric"
                  value={userFat}
                  onChangeText={setUserFat}
                />
                <NeuInput
                  placeholder="Brazo (brazo_cm)"
                  keyboardType="numeric"
                  value={userBrazo}
                  onChangeText={setUserBrazo}
                />
                <NeuInput
                  placeholder="Pierna (pierna_cm)"
                  keyboardType="numeric"
                  value={userPierna}
                  onChangeText={setUserPierna}
                />
                <NeuInput
                  placeholder="Muslo (muslo_cm)"
                  keyboardType="numeric"
                  value={userMuslo}
                  onChangeText={setUserMuslo}
                />
                <NeuInput
                  placeholder="Pantorrilla (pantorrilla_cm)"
                  keyboardType="numeric"
                  value={userPantorrilla}
                  onChangeText={setUserPantorrilla}
                />
                <NeuInput
                  placeholder="Cintura (cintura_cm)"
                  keyboardType="numeric"
                  value={userCintura}
                  onChangeText={setUserCintura}
                />
                <NeuInput
                  placeholder="Cadera (cadera_cm)"
                  keyboardType="numeric"
                  value={userCadera}
                  onChangeText={setUserCadera}
                />
                <NeuInput
                  placeholder="Notas adicionales"
                  value={userNotas}
                  onChangeText={setUserNotas}
                />
              </ScrollView>

              <TouchableOpacity style={[styles.closeBtn, styles.saveBtnWithMargin]} onPress={handleSaveBodyData}>
                <Text style={styles.closeBtnText}>Guardar en BD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};
