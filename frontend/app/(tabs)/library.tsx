import React from 'react';
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

interface SavedItemProps {
  title: string;
  category: string;
  duration: string;
  icon: string;
}

const SavedItem = ({ title, category, duration, icon }: SavedItemProps) => (
  <TouchableOpacity style={styles.savedItem} activeOpacity={0.8}>
    <LinearGradient
      colors={['#1a4a6e', '#0d2137']}
      style={styles.savedItemIcon}
    >
      <MaterialCommunityIcons name={icon as any} size={28} color="#4fc3dc" />
    </LinearGradient>
    <View style={styles.savedItemContent}>
      <Text style={styles.savedItemCategory}>{category}</Text>
      <Text style={styles.savedItemTitle}>{title}</Text>
      <View style={styles.savedItemMeta}>
        <Ionicons name="time-outline" size={14} color="#a8c5db" />
        <Text style={styles.savedItemDuration}>{duration}</Text>
      </View>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#4fc3dc" />
  </TouchableOpacity>
);

export default function LibraryScreen() {
  const insets = useSafeAreaInsets();

  const savedItems = [
    {
      title: 'დილის მედიტაცია',
      category: 'მედიტაცია',
      duration: '10 წუთი',
      icon: 'meditation',
    },
    {
      title: 'ღამის რელაქსაცია',
      category: 'ძილი',
      duration: '15 წუთი',
      icon: 'sleep',
    },
    {
      title: 'სტრესის შემსუბუქება',
      category: 'სტრესი',
      duration: '5 წუთი',
      icon: 'head-lightbulb',
    },
    {
      title: 'ფოკუსირება',
      category: 'კონცენტრაცია',
      duration: '8 წუთი',
      icon: 'target',
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
          <Text style={styles.title}>ბიბლიოთეკა</Text>
          <Text style={styles.subtitle}>თქვენი შენახული სესიები</Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{savedItems.length}</Text>
              <Text style={styles.statLabel}>შენახული</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>38</Text>
              <Text style={styles.statLabel}>წუთი სულ</Text>
            </View>
          </View>

          {/* Saved Items */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>შენახული სესიები</Text>
            {savedItems.map((item, index) => (
              <SavedItem
                key={index}
                title={item.title}
                category={item.category}
                duration={item.duration}
                icon={item.icon}
              />
            ))}
          </View>

          {/* Empty State Info */}
          <View style={styles.infoCard}>
            <Ionicons name="bookmark" size={32} color="#4fc3dc" />
            <Text style={styles.infoText}>
              სესიის შენახვისთვის დააჭირეთ სანიშნეს ღილაკს
            </Text>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#a8c5db',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(26, 58, 92, 0.6)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 220, 0.2)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4fc3dc',
  },
  statLabel: {
    fontSize: 14,
    color: '#a8c5db',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(79, 195, 220, 0.3)',
    marginHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  savedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 58, 92, 0.6)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 220, 0.2)',
  },
  savedItemIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  savedItemContent: {
    flex: 1,
  },
  savedItemCategory: {
    fontSize: 11,
    color: '#4fc3dc',
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  savedItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginTop: 2,
  },
  savedItemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  savedItemDuration: {
    fontSize: 12,
    color: '#a8c5db',
  },
  infoCard: {
    backgroundColor: 'rgba(79, 195, 220, 0.1)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 220, 0.2)',
  },
  infoText: {
    fontSize: 14,
    color: '#a8c5db',
    textAlign: 'center',
    marginTop: 12,
  },
});
