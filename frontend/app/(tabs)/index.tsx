import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface CourseCardProps {
  category: string;
  title: string;
  progress: number;
  totalSteps: number;
  imageIcon: string;
  isFirst?: boolean;
  isLast?: boolean;
  onPress: () => void;
}

const CourseCard = ({
  category,
  title,
  progress,
  totalSteps,
  imageIcon,
  isFirst,
  isLast,
  onPress,
}: CourseCardProps) => {
  return (
    <View style={styles.courseContainer}>
      <View style={styles.timelineContainer}>
        {!isFirst && <View style={styles.timelineLineTop} />}
        <View style={[styles.timelineCircle, progress > 0 && styles.timelineCircleActive]}>
          {progress > 0 && <Ionicons name="checkmark" size={12} color="#fff" />}
        </View>
        {!isLast && <View style={styles.timelineLine} />}
      </View>
      <TouchableOpacity style={styles.courseCard} onPress={onPress} activeOpacity={0.8}>
        <View style={styles.courseContent}>
          <Text style={styles.courseCategory}>{category}</Text>
          <Text style={styles.courseTitle}>{title}</Text>
          <View style={styles.progressContainer}>
            {Array.from({ length: totalSteps }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  index < progress && styles.progressDotActive,
                ]}
              />
            ))}
          </View>
        </View>
        <View style={styles.courseImageContainer}>
          <LinearGradient
            colors={['#1a4a6e', '#0d2137']}
            style={styles.courseImagePlaceholder}
          >
            <MaterialCommunityIcons name={imageIcon as any} size={40} color="#4fc3dc" />
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function MeditateScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [greeting, setGreeting] = useState('');
  const [countdown, setCountdown] = useState({ hours: 12, minutes: 43, seconds: 54 });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('დილა მშვიდობისა');
    } else if (hour < 18) {
      setGreeting('შუადღე მშვიდობისა');
    } else {
      setGreeting('საღამო მშვიდობისა');
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const courses = [
    {
      category: 'შესავალი კურსი',
      title: 'დაიწყეთ მაინდფულნესით',
      progress: 1,
      totalSteps: 6,
      imageIcon: 'meditation',
    },
    {
      category: 'საფუძვლები',
      title: 'ჩაიძინეთ ძილის ამბავით',
      progress: 0,
      totalSteps: 5,
      imageIcon: 'sleep',
    },
    {
      category: 'საფუძვლები',
      title: 'გაზომეთ თქვენი სტრესის დონე',
      progress: 0,
      totalSteps: 4,
      imageIcon: 'head-lightbulb',
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0a1628', '#0d2137', '#1a3a5c']} style={styles.gradient}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.greetingText}>{greeting}, მომხმარებელი</Text>
            <Text style={styles.heroTitle}>დავიწყოთ თქვენი მოგზაურობა</Text>
          </View>

          {/* Special Offer Banner */}
          <TouchableOpacity style={styles.specialBanner} activeOpacity={0.9}>
            <View style={styles.bannerLeft}>
              <Ionicons name="gift-outline" size={24} color="#fff" />
            </View>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>სპეციალური შეთავაზება</Text>
              <Text style={styles.bannerSubtitle}>
                იწურება {String(countdown.hours).padStart(2, '0')}:
                {String(countdown.minutes).padStart(2, '0')}:
                {String(countdown.seconds).padStart(2, '0')}-ში
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </TouchableOpacity>

          {/* Breathing Quick Access */}
          <TouchableOpacity
            style={styles.breathingButton}
            onPress={() => router.push('/breathing')}
            activeOpacity={0.8}
          >
            <View style={styles.breathingIcon}>
              <MaterialCommunityIcons name="weather-windy" size={24} color="#4fc3dc" />
            </View>
            <View style={styles.breathingContent}>
              <Text style={styles.breathingTitle}>სუნთქვის სავარჯიშო</Text>
              <Text style={styles.breathingSubtitle}>2 წუთიანი რელაქსაცია</Text>
            </View>
            <Ionicons name="play-circle" size={32} color="#4fc3dc" />
          </TouchableOpacity>

          {/* Courses */}
          <View style={styles.coursesSection}>
            {courses.map((course, index) => (
              <CourseCard
                key={index}
                category={course.category}
                title={course.title}
                progress={course.progress}
                totalSteps={course.totalSteps}
                imageIcon={course.imageIcon}
                isFirst={index === 0}
                isLast={index === courses.length - 1}
                onPress={() => router.push('/course')}
              />
            ))}
          </View>

          <View style={{ height: 30 }} />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 24,
  },
  greetingText: {
    fontSize: 18,
    color: '#a8c5db',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4fc3dc',
  },
  specialBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 195, 220, 0.15)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 220, 0.3)',
  },
  bannerLeft: {
    marginRight: 12,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#a8c5db',
    marginTop: 2,
  },
  breathingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 58, 92, 0.6)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 220, 0.2)',
  },
  breathingIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(79, 195, 220, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  breathingContent: {
    flex: 1,
  },
  breathingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  breathingSubtitle: {
    fontSize: 13,
    color: '#a8c5db',
    marginTop: 2,
  },
  coursesSection: {
    marginTop: 8,
  },
  courseContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  timelineContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  timelineLineTop: {
    width: 2,
    height: 12,
    backgroundColor: 'rgba(79, 195, 220, 0.3)',
    borderStyle: 'dashed',
  },
  timelineCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(79, 195, 220, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  timelineCircleActive: {
    backgroundColor: '#4fc3dc',
    borderColor: '#4fc3dc',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(79, 195, 220, 0.3)',
    marginTop: 4,
    borderStyle: 'dashed',
  },
  courseCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(26, 58, 92, 0.6)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 220, 0.2)',
  },
  courseContent: {
    flex: 1,
    justifyContent: 'center',
  },
  courseCategory: {
    fontSize: 11,
    color: '#4fc3dc',
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  progressDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(79, 195, 220, 0.4)',
    backgroundColor: 'transparent',
  },
  progressDotActive: {
    backgroundColor: '#4fc3dc',
    borderColor: '#4fc3dc',
  },
  courseImageContainer: {
    marginLeft: 12,
  },
  courseImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
