import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

interface TimelineProps {
  streak: number;
}

const Timeline: React.FC<TimelineProps> = ({ streak }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Línea de Actividad</Text>
        <View style={styles.streakBadge}>
          <Text style={styles.streakText}>🔥 Racha: {streak}</Text>
        </View>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.timelineContainer}>
        {DAYS.map((day, i) => {
          const isToday = i === 2; // Mocking today as Wednesday
          const isDone = i < 3;
          return (
            <View key={i} style={styles.timelineItem}>
              <View style={[
                styles.timelineDot, 
                isDone && styles.timelineDotActive,
                isToday && styles.todayDot
              ]} />
              <Text style={[
                styles.timelineDay, 
                isToday && styles.todayText,
                isDone && !isToday && { color: '#fff' }
              ]}>
                {isToday ? 'HOY' : day}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  streakBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  streakText: {
    color: '#D97706',
    fontSize: 13,
    fontWeight: '800',
  },
  timelineContainer: {
    paddingBottom: 5,
  },
  timelineItem: {
    alignItems: 'center',
    marginRight: 24,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#F3F4F6',
    backgroundColor: '#F9FAFB',
    marginBottom: 8,
  },
  timelineDotActive: {
    borderColor: '#4ADE80',
    backgroundColor: '#4ADE80',
  },
  todayDot: {
    borderColor: '#111827',
    borderWidth: 2,
  },
  timelineDay: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '700',
  },

  todayText: {
    color: '#4ADE80',
    fontWeight: '900',
  },
});


export default Timeline;
