import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

interface StatCardProps {
  value: string;
  label: string;
  icon: string;
}

const StatCard = ({ value, label, icon }: StatCardProps) => (
  <View style={styles.statCard}>
    <MaterialCommunityIcons name={icon as any} size={28} color="#4fc3dc" />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useAuth();

  const userStats = user?.stats || {};
  
  const stats = [
    { value: String(userStats.mindful_days || 0), label: 'მაინდფულ დღეები', icon: 'calendar-check' },
    { value: String(userStats.mindful_minutes || 0), label: 'მაინდფულ წუთები', icon: 'meditation' },
    { value: String(userStats.total_sessions || 0), label: 'სულ სესიები', icon: 'headphones' },
    { value: String(userStats.total_courses || 0), label: 'სულ კურსები', icon: 'school' },
  ];

  const handleLogout = () => {
    Alert.alert(
      'გასვლა',
      'ნამდვილად გსურთ გასვლა?',
      [
        { text: 'გაუქმება', style: 'cancel' },
        { 
          text: 'გასვლა', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/auth/login');
          }
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0a1628', '#0d2137', '#1a3a5c']} style={styles.gradient}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={['#3a6a8e', '#1a4a6e']}
                style={styles.avatar}
              >
                <Text style={styles.avatarText}>{user?.name?.charAt(0)?.toUpperCase() || 'მ'}</Text>
              </LinearGradient>
            </View>
            <Text style={styles.userName}>{user?.name || 'მომხმარებელი'}</Text>
            <Text style={styles.userEmail}>{user?.email || ''}</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>პროფილის რედაქტირება</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsContainer}>
            <View style={styles.statsRow}>
              {stats.slice(0, 2).map((stat, index) => (
                <StatCard key={index} value={stat.value} label={stat.label} icon={stat.icon} />
              ))}
            </View>
            <View style={styles.statsRow}>
              {stats.slice(2, 4).map((stat, index) => (
                <StatCard key={index} value={stat.value} label={stat.label} icon={stat.icon} />
              ))}
            </View>
            <TouchableOpacity style={styles.historyButton}>
              <Text style={styles.historyButtonText}>ისტორიული სტატისტიკა</Text>
            </TouchableOpacity>
          </View>

          {/* Streaks Section */}
          <View style={styles.streaksContainer}>
            <Text style={styles.streaksTitle}>ჩემი სერიები</Text>
            <Text style={styles.streaksSubtitle}>
              ნახეთ რამდენი დღე შეინარჩუნეთ მაინდფულნესის სერია
            </Text>
            <View style={styles.streaksRow}>
              <View style={styles.streakItem}>
                <MaterialCommunityIcons name="fire" size={32} color="#4fc3dc" />
                <Text style={styles.streakValue}>{userStats.current_streak || 0} დღე</Text>
                <Text style={styles.streakLabel}>მიმდინარე სერია</Text>
              </View>
              <View style={styles.streakItem}>
                <MaterialCommunityIcons name="trophy" size={32} color="#4fc3dc" />
                <Text style={styles.streakValue}>{userStats.longest_streak || 0} დღე</Text>
                <Text style={styles.streakLabel}>ყველაზე გრძელი</Text>
              </View>
            </View>
          </View>

          {/* Settings Menu */}
          <View style={styles.menuContainer}>
            {[
              { icon: 'bell-outline', label: 'შეტყობინებები' },
              { icon: 'cog-outline', label: 'პარამეტრები' },
              { icon: 'help-circle-outline', label: 'დახმარება' },
              { icon: 'information-outline', label: 'აპლიკაციის შესახებ' },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem} activeOpacity={0.8}>
                <MaterialCommunityIcons name={item.icon as any} size={24} color="#4fc3dc" />
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={20} color="#7a9bb8" />
              </TouchableOpacity>
            ))}
            
            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutItem} activeOpacity={0.8} onPress={handleLogout}>
              <MaterialCommunityIcons name="logout" size={24} color="#ff6b6b" />
              <Text style={styles.logoutLabel}>გასვლა</Text>
              <Ionicons name="chevron-forward" size={20} color="#ff6b6b" />
            </TouchableOpacity>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(79, 195, 220, 0.5)',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#a8c5db',
    marginBottom: 12,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  editButtonText: {
    fontSize: 14,
    color: '#4fc3dc',
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: 'rgba(26, 58, 92, 0.6)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 220, 0.2)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#a8c5db',
    marginTop: 4,
    textAlign: 'center',
  },
  historyButton: {
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(79, 195, 220, 0.2)',
  },
  historyButtonText: {
    fontSize: 14,
    color: '#4fc3dc',
    fontWeight: '600',
  },
  streaksContainer: {
    backgroundColor: 'rgba(26, 58, 92, 0.6)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 220, 0.2)',
  },
  streaksTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  streaksSubtitle: {
    fontSize: 13,
    color: '#a8c5db',
    marginBottom: 20,
  },
  streaksRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  streakItem: {
    alignItems: 'center',
  },
  streakValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  streakLabel: {
    fontSize: 13,
    color: '#a8c5db',
    marginTop: 4,
  },
  menuContainer: {
    backgroundColor: 'rgba(26, 58, 92, 0.6)',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 220, 0.2)',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(79, 195, 220, 0.1)',
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 107, 107, 0.2)',
  },
  logoutLabel: {
    flex: 1,
    fontSize: 16,
    color: '#ff6b6b',
    marginLeft: 12,
  },
});
