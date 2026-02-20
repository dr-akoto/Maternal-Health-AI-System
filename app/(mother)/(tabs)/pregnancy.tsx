import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Baby,
  Calendar,
  Heart,
  Activity,
  Scale,
  Ruler,
  Info,
  ChevronRight,
  Clock,
  Star,
} from 'lucide-react-native';
import { useAuth } from '../../../context/AuthContext';
import { Card } from '../../../components/Card';

// Pregnancy week data
const PREGNANCY_WEEKS_DATA: Record<number, {
  babySize: string;
  babySizeComparison: string;
  babyLength: string;
  babyWeight: string;
  developments: string[];
  motherChanges: string[];
  tips: string[];
}> = {
  1: {
    babySize: 'Microscopic',
    babySizeComparison: 'Smaller than a grain of salt',
    babyLength: '< 0.1 mm',
    babyWeight: '< 1 mg',
    developments: ['Fertilization occurs', 'Cell division begins', 'Genetic blueprint established'],
    motherChanges: ['You may not know you\'re pregnant yet', 'Hormonal changes begin'],
    tips: ['Start taking prenatal vitamins', 'Avoid alcohol and smoking'],
  },
  8: {
    babySize: 'Raspberry',
    babySizeComparison: 'About the size of a raspberry',
    babyLength: '1.6 cm',
    babyWeight: '1 g',
    developments: ['Arms and legs forming', 'Heart beating regularly', 'Brain developing rapidly'],
    motherChanges: ['Morning sickness common', 'Breast tenderness', 'Fatigue'],
    tips: ['Eat small, frequent meals', 'Get plenty of rest', 'Stay hydrated'],
  },
  12: {
    babySize: 'Lime',
    babySizeComparison: 'About the size of a lime',
    babyLength: '5.4 cm',
    babyWeight: '14 g',
    developments: ['Reflexes developing', 'Fingers and toes formed', 'Vocal cords forming'],
    motherChanges: ['Morning sickness may ease', 'Energy returning', 'Visible belly bump'],
    tips: ['Schedule first trimester screening', 'Continue prenatal vitamins'],
  },
  16: {
    babySize: 'Avocado',
    babySizeComparison: 'About the size of an avocado',
    babyLength: '11.6 cm',
    babyWeight: '100 g',
    developments: ['Can make facial expressions', 'Bones hardening', 'Hearing developing'],
    motherChanges: ['May feel first movements', 'Growing belly', 'Increased appetite'],
    tips: ['Start sleeping on your side', 'Consider maternity clothes'],
  },
  20: {
    babySize: 'Banana',
    babySizeComparison: 'About the size of a banana',
    babyLength: '16.4 cm',
    babyWeight: '300 g',
    developments: ['Vernix coating forming', 'Regular sleep cycles', 'Can swallow'],
    motherChanges: ['Halfway point!', 'Feeling regular movements', 'Possible heartburn'],
    tips: ['Anatomy scan time', 'Start planning nursery'],
  },
  24: {
    babySize: 'Ear of corn',
    babySizeComparison: 'About the size of an ear of corn',
    babyLength: '30 cm',
    babyWeight: '600 g',
    developments: ['Lungs developing', 'Taste buds forming', 'Gaining fat'],
    motherChanges: ['Back pain common', 'Swollen feet', 'Braxton Hicks possible'],
    tips: ['Watch for signs of preterm labor', 'Take childbirth classes'],
  },
  28: {
    babySize: 'Eggplant',
    babySizeComparison: 'About the size of an eggplant',
    babyLength: '37.6 cm',
    babyWeight: '1 kg',
    developments: ['Eyes can open', 'Brain growing rapidly', 'Can dream'],
    motherChanges: ['Third trimester begins', 'More frequent urination', 'Trouble sleeping'],
    tips: ['Start kick counts', 'Tour the birthing center'],
  },
  32: {
    babySize: 'Squash',
    babySizeComparison: 'About the size of a squash',
    babyLength: '42.4 cm',
    babyWeight: '1.7 kg',
    developments: ['Practicing breathing', 'Toenails formed', 'Head may engage'],
    motherChanges: ['Shortness of breath', 'Frequent bathroom trips', 'Nesting instinct'],
    tips: ['Pack hospital bag', 'Finalize birth plan'],
  },
  36: {
    babySize: 'Papaya',
    babySizeComparison: 'About the size of a papaya',
    babyLength: '47.4 cm',
    babyWeight: '2.6 kg',
    developments: ['Lungs nearly mature', 'Gaining weight rapidly', 'Less room to move'],
    motherChanges: ['Pelvic pressure', 'Difficulty sleeping', 'Cervix softening'],
    tips: ['Weekly appointments', 'Rest when you can'],
  },
  40: {
    babySize: 'Watermelon',
    babySizeComparison: 'About the size of a small watermelon',
    babyLength: '51.2 cm',
    babyWeight: '3.4 kg',
    developments: ['Fully developed', 'Ready for birth', 'Lungs mature'],
    motherChanges: ['Due date!', 'Contractions may start', 'Cervix dilating'],
    tips: ['Know the signs of labor', 'Stay calm and ready'],
  },
};

export default function PregnancyScreen() {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(20); // Default to week 20
  const [dueDate, setDueDate] = useState<Date | null>(null);

  // Calculate pregnancy week based on due date
  useEffect(() => {
    // In a real app, this would come from user profile or Supabase
    // For now, we'll use a placeholder
    const estimatedDueDate = new Date();
    estimatedDueDate.setDate(estimatedDueDate.getDate() + 140); // ~20 weeks from now
    setDueDate(estimatedDueDate);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Refresh data
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const getWeekData = (week: number) => {
    // Find the closest week in our data
    const availableWeeks = Object.keys(PREGNANCY_WEEKS_DATA).map(Number).sort((a, b) => a - b);
    let closestWeek = availableWeeks[0];
    
    for (const w of availableWeeks) {
      if (w <= week) {
        closestWeek = w;
      } else {
        break;
      }
    }
    
    return PREGNANCY_WEEKS_DATA[closestWeek];
  };

  const weekData = getWeekData(currentWeek);
  
  const getTrimester = (week: number): string => {
    if (week <= 12) return 'First Trimester';
    if (week <= 27) return 'Second Trimester';
    return 'Third Trimester';
  };

  const getDaysRemaining = (): number => {
    if (!dueDate) return 0;
    const today = new Date();
    const diff = dueDate.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const getProgress = (): number => {
    return Math.min(100, (currentWeek / 40) * 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Pregnancy</Text>
          <Text style={styles.subtitle}>{getTrimester(currentWeek)}</Text>
        </View>

        {/* Week Card */}
        <Card style={styles.weekCard}>
          <View style={styles.weekHeader}>
            <View style={styles.weekBadge}>
              <Text style={styles.weekNumber}>{currentWeek}</Text>
              <Text style={styles.weekLabel}>weeks</Text>
            </View>
            <View style={styles.weekInfo}>
              <Text style={styles.weekTitle}>Week {currentWeek}</Text>
              <Text style={styles.trimesterText}>{getTrimester(currentWeek)}</Text>
            </View>
          </View>
          
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${getProgress()}%` }]} />
            </View>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>Week 1</Text>
              <Text style={styles.progressLabel}>Week 40</Text>
            </View>
          </View>
          
          {/* Due Date Countdown */}
          <View style={styles.countdownContainer}>
            <Clock size={20} color="#EC4899" />
            <Text style={styles.countdownText}>
              {getDaysRemaining()} days until due date
            </Text>
          </View>
        </Card>

        {/* Baby Size Card */}
        <Card style={styles.babySizeCard}>
          <View style={styles.sectionHeader}>
            <Baby size={24} color="#EC4899" />
            <Text style={styles.sectionTitle}>Your Baby This Week</Text>
          </View>
          
          <View style={styles.babySizeContent}>
            <View style={styles.babySizeIcon}>
              <Text style={styles.babySizeEmoji}>👶</Text>
            </View>
            <View style={styles.babySizeInfo}>
              <Text style={styles.babySizeName}>{weekData.babySize}</Text>
              <Text style={styles.babySizeComparison}>{weekData.babySizeComparison}</Text>
            </View>
          </View>
          
          <View style={styles.measurementsContainer}>
            <View style={styles.measurement}>
              <Ruler size={18} color="#6B7280" />
              <Text style={styles.measurementLabel}>Length</Text>
              <Text style={styles.measurementValue}>{weekData.babyLength}</Text>
            </View>
            <View style={styles.measurementDivider} />
            <View style={styles.measurement}>
              <Scale size={18} color="#6B7280" />
              <Text style={styles.measurementLabel}>Weight</Text>
              <Text style={styles.measurementValue}>{weekData.babyWeight}</Text>
            </View>
          </View>
        </Card>

        {/* Baby Development */}
        <Card style={styles.developmentCard}>
          <View style={styles.sectionHeader}>
            <Activity size={24} color="#10B981" />
            <Text style={styles.sectionTitle}>Baby's Development</Text>
          </View>
          
          {weekData.developments.map((development, index) => (
            <View key={index} style={styles.developmentItem}>
              <View style={styles.developmentBullet}>
                <Star size={12} color="#10B981" />
              </View>
              <Text style={styles.developmentText}>{development}</Text>
            </View>
          ))}
        </Card>

        {/* Mother Changes */}
        <Card style={styles.developmentCard}>
          <View style={styles.sectionHeader}>
            <Heart size={24} color="#EC4899" />
            <Text style={styles.sectionTitle}>Your Body This Week</Text>
          </View>
          
          {weekData.motherChanges.map((change, index) => (
            <View key={index} style={styles.developmentItem}>
              <View style={[styles.developmentBullet, styles.motherBullet]}>
                <Star size={12} color="#EC4899" />
              </View>
              <Text style={styles.developmentText}>{change}</Text>
            </View>
          ))}
        </Card>

        {/* Tips */}
        <Card style={styles.tipsCard}>
          <View style={styles.sectionHeader}>
            <Info size={24} color="#F59E0B" />
            <Text style={styles.sectionTitle}>Tips for This Week</Text>
          </View>
          
          {weekData.tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.tipNumber}>{index + 1}</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </Card>

        {/* Week Navigation */}
        <View style={styles.weekNavigation}>
          <Text style={styles.weekNavTitle}>Browse Weeks</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 8, 12, 16, 20, 24, 28, 32, 36, 40].map((week) => (
              <TouchableOpacity
                key={week}
                style={[
                  styles.weekNavItem,
                  currentWeek === week && styles.weekNavItemActive,
                ]}
                onPress={() => setCurrentWeek(week)}
              >
                <Text
                  style={[
                    styles.weekNavText,
                    currentWeek === week && styles.weekNavTextActive,
                  ]}
                >
                  Week {week}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#EC4899',
    marginTop: 4,
    fontWeight: '500',
  },
  weekCard: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#fff',
  },
  weekHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  weekBadge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FCE7F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  weekNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#EC4899',
  },
  weekLabel: {
    fontSize: 12,
    color: '#EC4899',
  },
  weekInfo: {
    flex: 1,
  },
  weekTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  trimesterText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#EC4899',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCE7F3',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  countdownText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#EC4899',
  },
  babySizeCard: {
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  babySizeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  babySizeIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FCE7F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  babySizeEmoji: {
    fontSize: 40,
  },
  babySizeInfo: {
    flex: 1,
  },
  babySizeName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  babySizeComparison: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  measurementsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  measurement: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  measurementDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  measurementLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  measurementValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  developmentCard: {
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
  },
  developmentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  developmentBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  motherBullet: {
    backgroundColor: '#FCE7F3',
  },
  developmentText: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  tipsCard: {
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 13,
    fontWeight: '600',
    color: '#92400E',
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  weekNavigation: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  weekNavTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  weekNavItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 10,
  },
  weekNavItemActive: {
    backgroundColor: '#EC4899',
  },
  weekNavText: {
    fontSize: 14,
    color: '#6B7280',
  },
  weekNavTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  bottomPadding: {
    height: 40,
  },
});
