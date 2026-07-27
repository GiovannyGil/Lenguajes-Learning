import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121820', // fondo oscuro premium general
  },
  contentContainer: {
    padding: 24,
    paddingTop: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f8fafc', // blanco hueso para legibilidad
  },
  quincenaSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tabBtn: {
    flex: 1,
    marginHorizontal: 4,
  },
  activeTab: {
    borderColor: '#61dafb', // color acento cian
    borderWidth: 1.5,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#61dafb',
    marginBottom: 8,
  },
  surplusText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2ecc71',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f8fafc',
    marginVertical: 12,
  },
  expenseCard: {
    padding: 12,
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  expenseDesc: {
    fontSize: 15,
    fontWeight: '600',
    color: '#f8fafc',
  },
  expenseAmount: {
    fontSize: 15,
    fontWeight: '600',
    color: '#e74c3c',
  },
  subContainer: {
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#3b495c',
    marginVertical: 6,
  },
  subRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  subDesc: {
    fontSize: 13,
    color: '#8a95a5',
  },
  subVal: {
    fontSize: 13,
    color: '#8a95a5',
  },
  expenseActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginLeft: 8,
  },
  deleteBtn: {
    borderColor: '#e74c3c',
  },
  corteCard: {
    marginTop: 20,
    marginBottom: 40,
    borderColor: '#f39c12',
    borderWidth: 1,
  },
  corteHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#f39c12',
    marginBottom: 6,
  },
  corteText: {
    fontSize: 13,
    color: '#8a95a5',
    marginBottom: 12,
  },
});
