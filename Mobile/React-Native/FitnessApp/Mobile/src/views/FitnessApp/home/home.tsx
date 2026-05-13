import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import MetricBox from '../components/MetricBox';
import Timeline from '../components/Timeline';
import ExerciseCard from '../components/ExerciseCard';
import BottomNav from '../components/BottomNav';
import ExerciseModal from '../components/ExerciseModal';
import DataModal from '../components/DataModal';

// Constants & Types
import { ROUTINES, Exercise } from '../constants/routines';

const { width } = Dimensions.get('window');

const THEME = {
  primary: '#4ADE80',
  secondary: '#22C55E',
  background: '#F9FAFB',
  card: '#FFFFFF',
  text: '#111827',
  textLight: '#6B7280',
  border: '#E5E7EB',
};

interface UserData {
  goal: string;
  weight: string;
  height: string;
  fat: string;
  water: string;
  muscle: string;
  visceral: string;
  freeFatMass: string;
  bmr: string;
  imc: string;
}

const FitnessApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('HOME');
  const [userData, setUserData] = useState<UserData>({
    goal: 'Aumentar masa muscular',
    weight: '75',
    height: '178',
    fat: '15',
    water: '58',
    muscle: '42',
    visceral: '5',
    freeFatMass: '63',
    bmr: '1850',
    imc: '23.7'
  });
  const [completedExercises, setCompletedExercises] = useState<Record<string, string[]>>({});
  const [selectedEx, setSelectedEx] = useState<Exercise | null>(null);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);

  const currentDayRoutine = useMemo(() => {
    if (currentView === 'HOME') return null;
    return ROUTINES[currentView] || null;
  }, [currentView]);

  const toggleExercise = (day: string, exerciseName: string) => {
    setCompletedExercises(prev => {
      const dayCompleted = prev[day] || [];
      if (dayCompleted.includes(exerciseName)) {
        return { ...prev, [day]: dayCompleted.filter(e => e !== exerciseName) };
      } else {
        return { ...prev, [day]: [...dayCompleted, exerciseName] };
      }
    });
  };

  const handleSaveData = (newData: UserData) => {
    const weight = parseFloat(newData.weight);
    const height = parseFloat(newData.height) / 100;
    const imc = (weight > 0 && height > 0) ? (weight / (height * height)).toFixed(1) : '0.0';
    setUserData({ ...newData, imc });
  };

  const getIMCColor = (imcValue: string) => {
    const val = parseFloat(imcValue);
    if (val < 18.5) return '#fbbf24'; // Yellow
    if (val < 24.9) return THEME.primary; // Green
    if (val < 29.9) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };

  const renderHome = () => (
    <ScrollView 
      style={styles.scrollContent} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollPadding}
    >
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionSubtitle}>Tu progreso hoy</Text>
        <Text style={styles.sectionTitle}>Resumen Corporal</Text>
      </View>

      <View style={styles.mainCard}>
        <View style={styles.cardInfo}>
          <Text style={styles.cardLabel}>Meta Principal</Text>
          <Text style={styles.cardValue}>{userData.goal}</Text>
        </View>
        <View style={styles.cardIcon}>
          <View style={styles.iconPulse} />
        </View>
      </View>

      <View style={styles.grid}>
        <MetricBox label="Peso" value={userData.weight} unit=" kg" />
        <MetricBox label="IMC" value={userData.imc} color={getIMCColor(userData.imc)} />
        <MetricBox label="Grasa" value={userData.fat} unit="%" />
        <MetricBox label="Agua" value={userData.water} unit="%" />
        <MetricBox label="Músculo" value={userData.muscle} unit="%" />
        <MetricBox label="Visceral" value={userData.visceral} />
        <MetricBox label="M. sin Grasa" value={userData.freeFatMass} unit=" kg" />
        <MetricBox label="Metabolismo" value={userData.bmr} unit=" kcal" />
      </View>

      <TouchableOpacity style={styles.updateBtn} onPress={() => setIsDataModalOpen(true)}>
        <Text style={styles.updateBtnText}>Editar Perfil Fitness</Text>
      </TouchableOpacity>

      <Timeline streak={3} />
      
      <View style={{ height: 120 }} />
    </ScrollView>
  );

  const renderRoutine = () => {
    if (!currentDayRoutine) return null;
    const completed = completedExercises[currentView] || [];
    const progress = (completed.length / currentDayRoutine.ex.length) || 0;

    return (
      <ScrollView 
        style={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollPadding}
      >
        <View style={styles.routineHeader}>
          <View>
            <Text style={styles.routineSubtitle}>Entrenamiento</Text>
            <Text style={styles.routineTitle}>{currentView}</Text>
          </View>
          <View style={styles.focusTag}>
            <Text style={styles.focusTagText}>{currentDayRoutine.focus}</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressTextRow}>
            <Text style={styles.progressLabel}>Progreso de la sesión</Text>
            <Text style={styles.progressPercentage}>{Math.round(progress * 100)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${progress * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressCount}>
            {completed.length} de {currentDayRoutine.ex.length} ejercicios realizados
          </Text>
        </View>

        {currentDayRoutine.ex.map((ex, idx) => (
          <ExerciseCard
            key={idx}
            exercise={ex}
            isDone={completed.includes(ex.n)}
            onPress={() => setSelectedEx(ex)}
            onToggle={() => toggleExercise(currentView, ex.n)}
          />
        ))}

        <TouchableOpacity 
          style={[
            styles.finishBtn, 
            completed.length === currentDayRoutine.ex.length ? styles.finishBtnActive : styles.finishBtnDisabled
          ]}
          disabled={completed.length !== currentDayRoutine.ex.length}
        >
          <Text style={[
            styles.finishBtnText,
            completed.length !== currentDayRoutine.ex.length && { color: '#9CA3AF' }
          ]}>
            Finalizar Sesión
          </Text>
        </TouchableOpacity>

        <View style={{ height: 120 }} />
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.appHeader}>
          <View>
            <Text style={styles.brandTitle}>MeloFit</Text>
            <Text style={styles.brandTagline}>Be better every day</Text>
          </View>
          <View style={styles.avatarBorder}>
            <View style={styles.avatarInner} />
          </View>
        </View>

        {currentView === 'HOME' ? renderHome() : renderRoutine()}
      </SafeAreaView>

      <BottomNav currentView={currentView} onSelect={setCurrentView} />

      <ExerciseModal exercise={selectedEx} onClose={() => setSelectedEx(null)} />
      
      <DataModal 
        visible={isDataModalOpen} 
        data={userData} 
        onClose={() => setIsDataModalOpen(false)} 
        onSave={handleSaveData} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  safeArea: {
    flex: 1,
  },
  appHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111827',
    letterSpacing: -0.5,
  },
  brandTagline: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  avatarBorder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#4ADE80',
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInner: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },
  scrollContent: {
    flex: 1,
  },
  scrollPadding: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    marginBottom: 24,
  },
  sectionSubtitle: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionTitle: {
    color: '#111827',
    fontSize: 28,
    fontWeight: '800',
  },
  mainCard: {
    backgroundColor: '#4ADE80',
    borderRadius: 30,
    padding: 28,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#4ADE80',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  cardInfo: {
    flex: 1,
  },
  cardLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
  },
  cardIcon: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPulse: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  updateBtn: {
    backgroundColor: '#fff',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  updateBtnText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
  },
  routineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 28,
  },
  routineSubtitle: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  routineTitle: {
    color: '#111827',
    fontSize: 34,
    fontWeight: '900',
  },
  focusTag: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  focusTagText: {
    color: '#166534',
    fontSize: 13,
    fontWeight: '700',
  },
  progressContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressLabel: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
  },
  progressPercentage: {
    color: '#4ADE80',
    fontSize: 18,
    fontWeight: '800',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 5,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ADE80',
    borderRadius: 5,
  },
  progressCount: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '600',
  },
  finishBtn: {
    height: 64,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  finishBtnActive: {
    backgroundColor: '#22C55E',
    shadowColor: '#22C55E',
  },
  finishBtnDisabled: {
    backgroundColor: '#E5E7EB',
    shadowOpacity: 0,
    elevation: 0,
  },
  finishBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
});

export default FitnessApp;



