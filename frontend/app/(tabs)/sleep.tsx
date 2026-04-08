import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface SleepStoryCardProps {
  title: string;
  duration: string;
  icon: string;
  isFeatured?: boolean;
}

const SleepStoryCard = ({ title, duration, icon, isFeatured }: SleepStoryCardProps) => (
  <TouchableOpacity
    style={[styles.storyCard, isFeatured && styles.featuredCard]}
    activeOpacity={0.8}
  >
    <LinearGradient
      colors={isFeatured ? ['#1a5a7a', '#0d3a57'] : ['#1a4a6e', '#0d2137']}
      style={styles.storyGradient}
    >
      <View style={styles.storyIconContainer}>
        <MaterialCommunityIcons name={icon as any} size={32} color="#4fc3dc" />
      </View>
      <Text style={styles.storyTitle}>{title}</Text>
      <View style={styles.storyMeta}>
        <Ionicons name="time-outline" size={14} color="#a8c5db" />
        <Text style={styles.storyDuration}>{duration}</Text>
      </View>
      {isFeatured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>რჩეული</Text>
        </View>
      )}
    </LinearGradient>
  </TouchableOpacity>
);

export default function SleepScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const sleepStories = [
    { title: 'ტყის ხმები', duration: '30 წუთი', icon: 'pine-tree', isFeatured: true },
    { title: 'ზღვის ტალღები', duration: '45 წუთი', icon: 'waves' },
    { title: 'წვიმის ხმა', duration: '60 წუთი', icon: 'weather-rainy' },
    { title: 'ღამის ცა', duration: '25 წუთი', icon: 'weather-night' },
  ];

  const sleepSounds = [
    { title: 'თეთრი ხმაური', duration: 'უწყვეტი', icon: 'sine-wave' },
    { title: 'ბუხრის ხმა', duration: 'უწყვეტი', icon: 'fireplace' },
    { title: 'ფრინველები', duration: 'უწყვეტი', icon: 'bird' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0a1628', '#0d2137', '#0a1020']} style={styles.gradient}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Ionicons name="moon" size={28} color="#4fc3dc" />
              <Text style={styles.title}>ძილი</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>მოემზადეთ მყუდრო ღამისთვის</Text>

          {/* Sleep Timer */}
          <TouchableOpacity style={styles.sleepTimer} activeOpacity={0.8}>
            <View style={styles.timerIcon}>
              <Ionicons name="timer-outline" size={28} color="#4fc3dc" />
            </View>
            <View style={styles.timerContent}>
              <Text style={styles.timerTitle}>ძილის ტაიმერი</Text>
              <Text style={styles.timerSubtitle}>გამორთეთ აუდიო ავტომატურად</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#4fc3dc" />
          </TouchableOpacity>

          {/* Quick Breathing */}
          <TouchableOpacity
            style={styles.breathingCard}
            onPress={() => router.push('/breathing')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['rgba(79, 195, 220, 0.2)', 'rgba(79, 195, 220, 0.05)']}
              style={styles.breathingGradient}
            >
              <MaterialCommunityIcons name="weather-windy" size={40} color="#4fc3dc" />
              <Text style={styles.breathingTitle}>4-7-8 სუნთქვა</Text>
              <Text style={styles.breathingSubtitle}>ძილის მოსამზადებელი სავარჯიშო</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Sleep Stories */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>ძილის ამბები</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>ყველა</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storiesScroll}
            >
              {sleepStories.map((story, index) => (
                <SleepStoryCard
                  key={index}
                  title={story.title}
                  duration={story.duration}
                  icon={story.icon}
                  isFeatured={story.isFeatured}
                />
              ))}
            </ScrollView>
          </View>

          {/* Sleep Sounds */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>ძილის ხმები</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>ყველა</Text>
              </TouchableOpacity>
            </View>
            {sleepSounds.map((sound, index) => (
              <TouchableOpacity key={index} style={styles.soundItem} activeOpacity={0.8}>
                <LinearGradient
                  colors={['#1a4a6e', '#0d2137']}
                  style={styles.soundIcon}
                >
                  <MaterialCommunityIcons name={sound.icon as any} size={24} color="#4fc3dc" />
                </LinearGradient>
                <View style={styles.soundContent}>
                  <Text style={styles.soundTitle}>{sound.title}</Text>
                  <Text style={styles.soundDuration}>{sound.duration}</Text>
                </View>
                <Ionicons name="play-circle" size={36} color="#4fc3dc" />
              </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#a8c5db',
    marginBottom: 24,
  },
  sleepTimer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 58, 92, 0.6)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 220, 0.2)',
  },
  timerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(79, 195, 220, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  timerContent: {
    flex: 1,
  },
  timerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  timerSubtitle: {
    fontSize: 13,
    color: '#a8c5db',
    marginTop: 2,
  },
  breathingCard: {
    marginBottom: 24,
  },
  breathingGradient: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 220, 0.3)',
  },
  breathingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
  },
  breathingSubtitle: {
    fontSize: 14,
    color: '#a8c5db',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  seeAll: {
    fontSize: 14,
    color: '#4fc3dc',
    fontWeight: '600',
  },
  storiesScroll: {
    paddingRight: 20,
  },
  storyCard: {
    width: 150,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  featuredCard: {
    width: 170,
  },
  storyGradient: {
    padding: 16,
    height: 160,
    justifyContent: 'flex-end',
  },
  storyIconContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  storyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  storyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  storyDuration: {
    fontSize: 12,
    color: '#a8c5db',
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#4fc3dc',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  featuredText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0a1628',
  },
  soundItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 58, 92, 0.6)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 220, 0.2)',
  },
  soundIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  soundContent: {
    flex: 1,
  },
  soundTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  soundDuration: {
    fontSize: 12,
    color: '#a8c5db',
    marginTop: 2,
  },
});
