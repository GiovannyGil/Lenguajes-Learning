import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const DAYS = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];

interface BottomNavProps {
  currentView: string;
  onSelect: (view: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onSelect }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 20 }]}>
      <TouchableOpacity 
        style={[styles.navItem, currentView === 'HOME' && styles.navItemActive]}
        onPress={() => onSelect('HOME')}
      >
        <View style={[styles.iconCircle, currentView === 'HOME' && styles.iconCircleActive]}>
          <Icon name="home" size={24} color={currentView === 'HOME' ? '#fff' : '#a0a0a0'} />
        </View>
        <Text style={[styles.navText, currentView === 'HOME' && styles.navTextActive]}>INICIO</Text>
      </TouchableOpacity>

      <View style={styles.daysContainer}>
        {DAYS.map((day) => (
          <TouchableOpacity 
            key={day}
            style={[styles.dayItem, currentView === day && styles.dayItemActive]}
            onPress={() => onSelect(day)}
          >
            <Text style={[styles.dayText, currentView === day && styles.dayTextActive]}>
              {day[0]}
            </Text>
            <View style={[styles.activeIndicator, currentView === day && { backgroundColor: '#3d5afe' }]} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    position: 'absolute',
    bottom: 0,
    width: width,
    alignItems: 'center',
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
  },
  navItemActive: {
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconCircleActive: {
    backgroundColor: '#4ADE80',
  },
  navText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#9CA3AF',
  },
  navTextActive: {
    color: '#4ADE80',
  },
  daysContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 8,
  },
  dayItem: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    minWidth: 38,
  },
  dayItemActive: {
  },
  dayText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9CA3AF',
  },

  dayTextActive: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '900',
  },
  activeIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 4,
    backgroundColor: 'transparent',
  },
});


export default BottomNav;
