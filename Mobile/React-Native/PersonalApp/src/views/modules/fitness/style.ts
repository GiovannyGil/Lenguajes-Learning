import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#050505',
  },
  homeTabContainer: {
    marginBottom: 100,
  },
  container: {
    flex: 1,
    backgroundColor: '#050505', // fondo oscuro similar a ejercicios.html
  },
  contentContainer: {
    padding: 16,
    paddingTop: 40,
    paddingBottom: 120,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  daySelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabCard: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  activeTabCard: {
    borderColor: '#3d5afe',
    borderWidth: 1.5,
    backgroundColor: 'rgba(61, 90, 254, 0.15)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a0a0a0',
  },
  activeTabText: {
    color: '#3d5afe',
    fontWeight: '700',
  },

  // Estilos de la vista Home (Métricas & Línea de tiempo)
  metricCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  editTag: {
    backgroundColor: 'rgba(61, 90, 254, 0.15)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  editTagText: {
    color: '#3d5afe',
    fontSize: 12,
    fontWeight: '700',
  },
  imcBox: {
    alignItems: 'center',
    marginVertical: 12,
  },
  imcVal: {
    fontSize: 38,
    fontWeight: '900',
    color: '#3d5afe',
  },
  imcLabel: {
    fontSize: 14,
    color: '#a0a0a0',
    marginTop: 4,
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 14,
  },
  metricBox: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 12,
    padding: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  metricBoxLabel: {
    fontSize: 13,
    color: '#a0a0a0',
    fontWeight: '600',
  },
  metricBoxVal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3d5afe',
  },

  // Streak & Timeline (Estilo exacto ejercicios.html)
  streakTag: {
    backgroundColor: 'rgba(255, 152, 0, 0.15)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  streakText: {
    color: '#ff9800',
    fontSize: 13,
    fontWeight: '800',
  },
  timelineContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  timelineLine: {
    position: 'absolute',
    top: 22,
    left: 24,
    right: 24,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 4,
    zIndex: 1,
  },
  timelineDotWrapper: {
    alignItems: 'center',
    zIndex: 3,
    width: 42,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#18181b',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 6,
  },
  timelineDotActive: {
    borderColor: '#3d5afe',
    backgroundColor: '#3d5afe',
    shadowColor: '#3d5afe',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 8,
  },
  timelineDate: {
    fontSize: 11,
    color: '#a0a0a0',
    fontWeight: '700',
  },
  timelineDateToday: {
    color: '#3d5afe',
    fontWeight: '800',
  },
  timelineDayNum: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.35)',
    marginTop: 2,
  },

  // Rutinas por día
  focusCard: {
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  focusLabel: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  focusValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3d5afe',
  },
  exerciseCardRow: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    marginBottom: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  thumbGif: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#1e1e1e',
    marginRight: 12,
  },
  exerciseInfoCol: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  exerciseSub: {
    fontSize: 13,
    color: '#a0a0a0',
  },
  // Check Circle Único (Estilo ejercicios.html)
  checkArea: {
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleDone: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  checkMarkText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Botón Terminar Rutina
  completeRoutineBtn: {
    backgroundColor: '#4caf50',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 16,
    marginBottom: 80,
  },
  completeRoutineBtnDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    opacity: 0.5,
  },
  completeRoutineBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },

  // Bottom Navigation Bar Fijo (Estilo ejercicios.html mejorado)
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 95,
    backgroundColor: '#0c0e12',
    borderTopWidth: 1.5,
    borderTopColor: 'rgba(255, 255, 255, 0.12)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingBottom: 28,
    elevation: 25,
    zIndex: 999,
  },
  bottomNavItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  bottomNavItemActive: {
    backgroundColor: 'rgba(61, 90, 254, 0.15)',
    borderBottomWidth: 3,
    borderBottomColor: '#3d5afe',
  },
  bottomNavIconText: {
    fontSize: 16,
    marginBottom: 2,
  },
  bottomNavText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8a95a5',
  },
  bottomNavTextActive: {
    color: '#3d5afe',
    fontWeight: '800',
  },

  // Modal estilos
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 999,
  },
  modalContent: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#18181b',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },
  modalGif: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#1e1e1e',
    marginBottom: 12,
  },
  modalSeriesText: {
    fontSize: 14,
    color: '#3d5afe',
    fontWeight: '700',
    marginBottom: 16,
  },
  closeBtn: {
    backgroundColor: '#3d5afe',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  modalFormScroll: {
    maxHeight: 350,
  },
  saveBtnWithMargin: {
    marginTop: 12,
  },
});
