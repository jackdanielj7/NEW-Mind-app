import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface QuickLinkProps {
  title: string;
  icon: string;
  color: string;
}

const QuickLink = ({ title, icon, color }: QuickLinkProps) => (
  <TouchableOpacity style={styles.quickLink} activeOpacity={0.8}>
    <LinearGradient
      colors={[color, '#0d2137']}
      style={styles.quickLinkGradient}
    >
      <MaterialCommunityIcons name={icon as any} size={28} color="#fff" />
      <Text style={styles.quickLinkTitle}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

interface RecommendationCardProps {
  title: string;
  subtitle: string;
  icon: string;
  isNew?: boolean;
  isPremium?: boolean;
}

const RecommendationCard = ({ title, subtitle, icon, isNew, isPremium }: RecommendationCardProps) => (
  <TouchableOpacity style={styles.recommendationCard} activeOpacity={0.8}>
    <LinearGradient
      colors={['#1a4a6e', '#0d2137']}
      style={styles.recommendationGradient}
    >
      {isNew && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>ახალი</Text>
        </View>
      )}
      {isPremium && (
        <View style={styles.premiumBadge}>
          <Ionicons name="lock-closed" size={14} color="#fff" />
        </View>
      )}
      <MaterialCommunityIcons name={icon as any} size={40} color="#4fc3dc" style={styles.recommendationIcon} />
      <Text style={styles.recommendationTitle}>{title}</Text>
      <Text style={styles.recommendationSubtitle}>{subtitle}</Text>
      <View style={styles.recommendationArrow}>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const quickLinks = [
    { title: 'ძილის ამბები', icon: 'weather-night', color: '#2a4a6e' },
    { title: 'სამუშაოსთვის', icon: 'briefcase', color: '#3a5a7e' },
    { title: 'ხმები', icon: 'music-note', color: '#4a6a8e' },
  ];

  const recommendations = [
    {
      title: 'სტრესის ტესტი',
      subtitle: '10 მარტივი კითხვა',
      icon: 'head-question',
      isNew: false,
      isPremium: false,
    },
    {
      title: 'სუნთქვის რელაქსაცია',
      subtitle: '2 წუთი',
      icon: 'weather-windy',
      isNew: false,
      isPremium: false,
    },
  ];

  const newContent = [
    {
      title: 'შინაგანი ჰარმონია',
      subtitle: 'ახალი კურსი',
      icon: 'yin-yang',
      isNew: true,
      isPremium: true,
    },
    {
      title: 'სტრესის აღდგენა',
      subtitle: '7 დღიანი პროგრამა',
      icon: 'heart-pulse',
      isNew: true,
      isPremium: false,
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
          <Text style={styles.title}>აღმოაჩინე</Text>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#a8c5db" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="სათაური, ტრენერი ან თემა"
              placeholderTextColor="#7a9bb8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.filterButton}>
              <Feather name="sliders" size={18} color="#a8c5db" />
            </TouchableOpacity>
          </View>

          {/* Quick Links */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>სწრაფი ბმულები</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickLinksScroll}
            >
              {quickLinks.map((link, index) => (
                <QuickLink key={index} title={link.title} icon={link.icon} color={link.color} />
              ))}
            </ScrollView>
          </View>

          {/* Our Recommendations */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>ჩვენი რეკომენდაციები</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>ყველა</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.recommendationsRow}>
              {recommendations.map((item, index) => (
                <RecommendationCard
                  key={index}
                  title={item.title}
                  subtitle={item.subtitle}
                  icon={item.icon}
                  isNew={item.isNew}
                  isPremium={item.isPremium}
                />
              ))}
            </View>
          </View>

          {/* New & Noteworthy */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>ახალი და გამორჩეული</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>ყველა</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.recommendationsRow}>
              {newContent.map((item, index) => (
                <RecommendationCard
                  key={index}
                  title={item.title}
                  subtitle={item.subtitle}
                  icon={item.icon}
                  isNew={item.isNew}
                  isPremium={item.isPremium}
                />
              ))}
            </View>
          </View>

          {/* Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>კატეგორიები</Text>
            <View style={styles.categoriesGrid}>
              {[
                { name: 'მედიტაცია', icon: 'meditation' },
                { name: 'ძილი', icon: 'sleep' },
                { name: 'სტრესი', icon: 'head-lightbulb' },
                { name: 'კონცენტრაცია', icon: 'target' },
                { name: 'შფოთვა', icon: 'emoticon-sad' },
                { name: 'თვითშეფასება', icon: 'account-heart' },
              ].map((category, index) => (
                <TouchableOpacity key={index} style={styles.categoryItem} activeOpacity={0.8}>
                  <MaterialCommunityIcons name={category.icon as any} size={24} color="#4fc3dc" />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
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
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 58, 92, 0.8)',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 220, 0.2)',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontSize: 16,
  },
  filterButton: {
    padding: 8,
  },
  section: {
    marginBottom: 28,
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
    marginBottom: 16,
  },
  seeAll: {
    fontSize: 14,
    color: '#4fc3dc',
    fontWeight: '600',
  },
  quickLinksScroll: {
    paddingRight: 20,
  },
  quickLink: {
    width: 130,
    height: 100,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  quickLinkGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  quickLinkTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  recommendationsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recommendationCard: {
    width: (width - 52) / 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  recommendationGradient: {
    padding: 16,
    height: 150,
    justifyContent: 'flex-end',
  },
  recommendationIcon: {
    marginBottom: 12,
  },
  recommendationTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  recommendationSubtitle: {
    fontSize: 12,
    color: '#a8c5db',
    marginTop: 2,
  },
  recommendationArrow: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(79, 195, 220, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#4fc3dc',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0a1628',
  },
  premiumBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: (width - 52) / 3,
    backgroundColor: 'rgba(26, 58, 92, 0.6)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 220, 0.2)',
  },
  categoryName: {
    fontSize: 12,
    color: '#fff',
    marginTop: 8,
    fontWeight: '500',
    textAlign: 'center',
  },
});
