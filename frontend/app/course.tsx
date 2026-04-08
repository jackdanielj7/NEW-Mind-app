import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

interface LessonProps {
  number: number;
  title: string;
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
  onPress: () => void;
}

const Lesson = ({ number, title, duration, isCompleted, isLocked, onPress }: LessonProps) => (
  <TouchableOpacity
    style={[styles.lessonCard, isLocked && styles.lessonLocked]}
    activeOpacity={isLocked ? 1 : 0.8}
    onPress={!isLocked ? onPress : undefined}
  >
    <View style={[styles.lessonNumber, isCompleted && styles.lessonNumberCompleted]}>
      {isCompleted ? (
        <Ionicons name="checkmark" size={16} color="#fff" />
      ) : isLocked ? (
        <Ionicons name="lock-closed" size={14} color="#7a9bb8" />
      ) : (
        <Text style={styles.lessonNumberText}>{number}</Text>
      )}
    </View>
    <View style={styles.lessonContent}>
      <Text style={[styles.lessonTitle, isLocked && styles.lessonTitleLocked]}>{title}</Text>
      <View style={styles.lessonMeta}>
        <Ionicons name="time-outline" size={14} color={isLocked ? '#5a7a98' : '#a8c5db'} />
        <Text style={[styles.lessonDuration, isLocked && styles.lessonDurationLocked]}>
          {duration}
        </Text>
      </View>
    </View>
    {!isLocked && (
      <Ionicons name="play-circle" size={32} color="#4fc3dc" />
    )}
  </TouchableOpacity>
);

export default function CourseScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  const lessons = [
    { title: 'რა არის მაინდფულნესი?', duration: '5 წუთი', isCompleted: true },
    { title: 'პირველი მედიტაცია', duration: '10 წუთი', isCompleted: false },
    { title: 'სუნთქვის საფუძვლები', duration: '8 წუთი', isCompleted: false },
    { title: 'ყოველდღიური პრაქტიკა', duration: '7 წუთი', isCompleted: false },
    { title: 'აზრების დაკვირვება', duration: '12 წუთი', isCompleted: false },
    { title: 'კურსის დასრულება', duration: '5 წუთი', isCompleted: false },
  ];

  const completedCount = lessons.filter((l) => l.isCompleted).length;

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0a1628', '#0d2137', '#1a3a5c']} style={styles.gradient}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsSaved(!isSaved)} style={styles.saveButton}>
            <Ionicons
              name={isSaved ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color="#4fc3dc"
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Course Header */}
          <View style={styles.courseHeader}>
            <View style={styles.courseIconContainer}>
              <LinearGradient
                colors={['#1a5a7e', '#0d3a57']}
                style={styles.courseIcon}
              >
                <MaterialCommunityIcons name="meditation" size={48} color="#4fc3dc" />
              </LinearGradient>
            </View>
            <Text style={styles.courseCategory}>შესავალი კურსი</Text>
            <Text style={styles.courseTitle}>დაიწყეთ მაინდფულნესით</Text>
            <Text style={styles.courseDescription}>
              ისწავლეთ მედიტაციის საფუძვლები და დაიწყეთ თქვენი მოგზაურობა სიმშვიდისკენ
            </Text>
          </View>

          {/* Progress */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>პროგრესი</Text>
              <Text style={styles.progressValue}>
                {completedCount}/{lessons.length} გაკვეთილი
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(completedCount / lessons.length) * 100}%` },
                ]}
              />
            </View>
          </View>

          {/* Lessons List */}
          <View style={styles.lessonsSection}>
            <Text style={styles.lessonsTitle}>გაკვეთილები</Text>
            {lessons.map((lesson, index) => (
              <Lesson
                key={index}
                number={index + 1}
                title={lesson.title}
                duration={lesson.duration}
                isCompleted={lesson.isCompleted}
                isLocked={index > completedCount}
                onPress={() => router.push('/breathing')}
              />
            ))}
          </View>

          <View style={{ height: insets.bottom + 30 }} />
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1628',
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  courseHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  courseIconContainer: {
    marginBottom: 20,
  },
  courseIcon: {
    width: 100,
    height: 100,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseCategory: {
    fontSize: 12,
    color: '#4fc3dc',
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  courseDescription: {
    fontSize: 15,
    color: '#a8c5db',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  progressSection: {
    backgroundColor: 'rgba(26, 58, 92, 0.6)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 220, 0.2)',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  progressValue: {
    fontSize: 14,
    color: '#4fc3dc',
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(79, 195, 220, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4fc3dc',
    borderRadius: 4,
  },
  lessonsSection: {
    marginBottom: 20,
  },
  lessonsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 58, 92, 0.6)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 220, 0.2)',
  },
  lessonLocked: {
    backgroundColor: 'rgba(26, 58, 92, 0.3)',
    borderColor: 'rgba(79, 195, 220, 0.1)',
  },
  lessonNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(79, 195, 220, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  lessonNumberCompleted: {
    backgroundColor: '#4fc3dc',
  },
  lessonNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4fc3dc',
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  lessonTitleLocked: {
    color: '#7a9bb8',
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lessonDuration: {
    fontSize: 12,
    color: '#a8c5db',
  },
  lessonDurationLocked: {
    color: '#5a7a98',
  },
});
