<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
=======
import React, { useState, useEffect, useCallback } from 'react';
>>>>>>> 84817c9d126aa0ee4fcfd2aea41ef4b7f9235469
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
<<<<<<< HEAD
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
=======
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
>>>>>>> 84817c9d126aa0ee4fcfd2aea41ef4b7f9235469
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
<<<<<<< HEAD
  Sparkles,
  Leaf,
  AlertCircle,
} from 'lucide-react-native';
import { useAuth } from '../../../context/AuthContext';

const { width } = Dimensions.get('window');

// Pregnancy week data with comprehensive information
const PREGNANCY_DATA: Record<number, {
  babySize: string;
  comparison: string;
=======
  Star,
} from 'lucide-react-native';
import { useAuth } from '../../../context/AuthContext';
import { Card } from '../../../components/Card';

// Pregnancy week data
const PREGNANCY_WEEKS_DATA: Record<number, {
  babySize: string;
  babySizeComparison: string;
>>>>>>> 84817c9d126aa0ee4fcfd2aea41ef4b7f9235469
  babyLength: string;
  babyWeight: string;
  developments: string[];
  motherChanges: string[];
  tips: string[];
<<<<<<< HEAD
  emoji: string;
}> = {
  8: {
    babySize: 'Raspberry',
    comparison: 'About the size of a raspberry',
    babyLength: '1.6 cm',
    babyWeight: '1 g',
    emoji: '🫐',
    developments: ['Arms and legs forming', 'Heart beating regularly', 'Brain developing rapidly'],
    motherChanges: ['Morning sickness common', 'Breast tenderness', 'Increased fatigue'],
    tips: ['Eat small, frequent meals', 'Get plenty of rest', 'Stay well hydrated'],
  },
  12: {
    babySize: 'Lime',
    comparison: 'About the size of a lime',
    babyLength: '5.4 cm',
    babyWeight: '14 g',
    emoji: '🍋',
    developments: ['Reflexes developing', 'Fingers and toes formed', 'Vocal cords forming'],
    motherChanges: ['Morning sickness may ease', 'Energy returning', 'Visible belly bump'],
    tips: ['Schedule first trimester screening', 'Continue prenatal vitamins', 'Start gentle exercise'],
  },
  16: {
    babySize: 'Avocado',
    comparison: 'About the size of an avocado',
    babyLength: '11.6 cm',
    babyWeight: '100 g',
    emoji: '🥑',
    developments: ['Can make facial expressions', 'Bones are hardening', 'Hearing is developing'],
    motherChanges: ['May feel first movements', 'Growing belly', 'Increased appetite'],
    tips: ['Start sleeping on your side', 'Consider maternity clothes', 'Stay active'],
  },
  20: {
    babySize: 'Banana',
    comparison: 'About the size of a banana',
    babyLength: '16.4 cm',
    babyWeight: '300 g',
    emoji: '🍌',
    developments: ['Vernix coating forming', 'Regular sleep cycles', 'Baby can swallow'],
    motherChanges: ['Halfway point!', 'Regular movements', 'Possible heartburn'],
    tips: ['Anatomy scan time', 'Start planning nursery', 'Track baby movements'],
  },
  24: {
    babySize: 'Corn',
    comparison: 'About the size of an ear of corn',
    babyLength: '30 cm',
    babyWeight: '600 g',
    emoji: '🌽',
    developments: ['Lungs are developing', 'Taste buds forming', 'Gaining more fat'],
    motherChanges: ['Back pain common', 'Swollen feet and ankles', 'Braxton Hicks possible'],
    tips: ['Watch for preterm labor signs', 'Take childbirth classes', 'Stay comfortable'],
  },
  28: {
    babySize: 'Eggplant',
    comparison: 'About the size of an eggplant',
    babyLength: '37.6 cm',
    babyWeight: '1 kg',
    emoji: '🍆',
    developments: ['Eyes can open', 'Brain growing rapidly', 'Baby can dream'],
    motherChanges: ['Third trimester begins', 'More frequent urination', 'Trouble sleeping'],
    tips: ['Start kick counts', 'Tour the birthing center', 'Prepare hospital bag'],
  },
  32: {
    babySize: 'Squash',
    comparison: 'About the size of a squash',
    babyLength: '42.4 cm',
    babyWeight: '1.7 kg',
    emoji: '🎃',
    developments: ['Practicing breathing', 'Toenails are formed', 'Head may engage soon'],
    motherChanges: ['Shortness of breath', 'Frequent bathroom trips', 'Nesting instinct'],
    tips: ['Pack hospital bag', 'Finalize birth plan', 'Rest when possible'],
  },
  36: {
    babySize: 'Papaya',
    comparison: 'About the size of a papaya',
    babyLength: '47.4 cm',
    babyWeight: '2.6 kg',
    emoji: '🥭',
    developments: ['Lungs nearly mature', 'Gaining weight rapidly', 'Less room to move'],
    motherChanges: ['Pelvic pressure', 'Difficulty sleeping', 'Cervix softening'],
    tips: ['Weekly appointments', 'Rest when you can', 'Know labor signs'],
  },
  40: {
    babySize: 'Watermelon',
    comparison: 'About the size of a small watermelon',
    babyLength: '51.2 cm',
    babyWeight: '3.4 kg',
    emoji: '🍉',
    developments: ['Fully developed', 'Ready for birth', 'Lungs are mature'],
    motherChanges: ['Due date!', 'Contractions may start', 'Cervix dilating'],
    tips: ['Know the signs of labor', 'Stay calm and ready', 'Rest and relax'],
=======
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
>>>>>>> 84817c9d126aa0ee4fcfd2aea41ef4b7f9235469
  },
};

export default function PregnancyScreen() {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
<<<<<<< HEAD
  const [currentWeek, setCurrentWeek] = useState(20);
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const estimatedDueDate = new Date();
    estimatedDueDate.setDate(estimatedDueDate.getDate() + (40 - currentWeek) * 7);
    setDueDate(estimatedDueDate);

    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
=======
  const [currentWeek, setCurrentWeek] = useState(20); // Default to week 20
  const [dueDate, setDueDate] = useState<Date | null>(null);

  // Calculate pregnancy week based on due date
  useEffect(() => {
    // In a real app, this would come from user profile or Supabase
    // For now, we'll use a placeholder
    const estimatedDueDate = new Date();
    estimatedDueDate.setDate(estimatedDueDate.getDate() + 140); // ~20 weeks from now
    setDueDate(estimatedDueDate);
>>>>>>> 84817c9d126aa0ee4fcfd2aea41ef4b7f9235469
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
<<<<<<< HEAD
=======
    // Refresh data
>>>>>>> 84817c9d126aa0ee4fcfd2aea41ef4b7f9235469
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const getWeekData = (week: number) => {
<<<<<<< HEAD
    const weeks = Object.keys(PREGNANCY_DATA).map(Number).sort((a, b) => a - b);
    let closest = weeks[0];
    for (const w of weeks) {
      if (w <= week) closest = w;
      else break;
    }
    return PREGNANCY_DATA[closest];
=======
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
>>>>>>> 84817c9d126aa0ee4fcfd2aea41ef4b7f9235469
  };

  const weekData = getWeekData(currentWeek);
  
<<<<<<< HEAD
  const getTrimester = (week: number): { name: string; color: string; bgColor: string } => {
    if (week <= 12) return { name: 'First Trimester', color: '#10B981', bgColor: '#ECFDF5' };
    if (week <= 27) return { name: 'Second Trimester', color: '#F59E0B', bgColor: '#FFFBEB' };
    return { name: 'Third Trimester', color: '#EC4899', bgColor: '#FCE7F3' };
  };

  const trimester = getTrimester(currentWeek);
  const daysRemaining = dueDate ? Math.max(0, Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : 0;
  const progress = Math.min(100, (currentWeek / 40) * 100);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#EC4899']} />
        }
      >
        {/* Header */}
        <LinearGradient
          colors={['#EC4899', '#F472B6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerDecor1} />
          <View style={styles.headerDecor2} />
          
          <Text style={styles.headerTitle}>Your Pregnancy</Text>
          <View style={[styles.trimesterBadge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Text style={styles.trimesterText}>{trimester.name}</Text>
          </View>
        </LinearGradient>

        <Animated.View 
          style={[
            styles.content,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
          ]}
        >
          {/* Week Progress Card */}
          <View style={styles.weekCard}>
            <View style={styles.weekHeader}>
              <View style={styles.weekCircle}>
                <Text style={styles.weekNumber}>{currentWeek}</Text>
                <Text style={styles.weekLabel}>weeks</Text>
              </View>
              <View style={styles.weekInfo}>
                <Text style={styles.weekTitle}>Week {currentWeek} of 40</Text>
                <View style={styles.dueInfo}>
                  <Calendar size={16} color="#6B7280" />
                  <Text style={styles.dueText}>
                    Due: {dueDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </Text>
                </View>
                <Text style={styles.daysLeft}>{daysRemaining} days to go!</Text>
              </View>
            </View>
            
            <View style={styles.progressSection}>
              <View style={styles.progressBar}>
                <LinearGradient
                  colors={['#EC4899', '#F472B6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.progressFill, { width: `${progress}%` }]}
                />
              </View>
              <View style={styles.progressLabels}>
                <Text style={styles.progressLabel}>Week 1</Text>
                <Text style={styles.progressLabel}>Week 40</Text>
              </View>
            </View>
          </View>

          {/* Baby Size Card */}
          <View style={styles.babySizeCard}>
            <View style={styles.babySizeHeader}>
              <Text style={styles.babySizeEmoji}>{weekData.emoji}</Text>
              <View style={styles.babySizeInfo}>
                <Text style={styles.babySizeTitle}>Baby is the size of a</Text>
                <Text style={styles.babySizeName}>{weekData.babySize}</Text>
              </View>
            </View>
            
            <View style={styles.measurements}>
              <View style={styles.measureItem}>
                <View style={[styles.measureIcon, { backgroundColor: '#DBEAFE' }]}>
                  <Ruler size={18} color="#3B82F6" />
                </View>
                <Text style={styles.measureValue}>{weekData.babyLength}</Text>
                <Text style={styles.measureLabel}>Length</Text>
              </View>
              <View style={styles.measureDivider} />
              <View style={styles.measureItem}>
                <View style={[styles.measureIcon, { backgroundColor: '#E0E7FF' }]}>
                  <Scale size={18} color="#10B981" />
                </View>
                <Text style={styles.measureValue}>{weekData.babyWeight}</Text>
                <Text style={styles.measureLabel}>Weight</Text>
              </View>
            </View>
          </View>

          {/* Development Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Baby size={22} color="#EC4899" />
              <Text style={styles.sectionTitle}>Baby's Development</Text>
            </View>
            <View style={styles.listCard}>
              {weekData.developments.map((item, index) => (
                <View key={index} style={styles.listItem}>
                  <View style={styles.bullet}>
                    <Sparkles size={14} color="#EC4899" />
                  </View>
                  <Text style={styles.listText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Mother's Changes Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Heart size={22} color="#EF4444" />
              <Text style={styles.sectionTitle}>Your Body Changes</Text>
            </View>
            <View style={styles.listCard}>
              {weekData.motherChanges.map((item, index) => (
                <View key={index} style={styles.listItem}>
                  <View style={[styles.bullet, { backgroundColor: '#FEE2E2' }]}>
                    <Heart size={14} color="#EF4444" />
                  </View>
                  <Text style={styles.listText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Tips Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Leaf size={22} color="#10B981" />
              <Text style={styles.sectionTitle}>Tips for This Week</Text>
            </View>
            <View style={[styles.listCard, { backgroundColor: '#ECFDF5', borderColor: '#D1FAE5' }]}>
              {weekData.tips.map((item, index) => (
                <View key={index} style={styles.listItem}>
                  <View style={[styles.bullet, { backgroundColor: '#D1FAE5' }]}>
                    <Leaf size={14} color="#10B981" />
                  </View>
                  <Text style={[styles.listText, { color: '#065F46' }]}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Week Navigation */}
          <View style={styles.weekNav}>
            <TouchableOpacity 
              style={[styles.weekNavBtn, currentWeek <= 1 && styles.weekNavBtnDisabled]}
              onPress={() => currentWeek > 1 && setCurrentWeek(currentWeek - 1)}
              disabled={currentWeek <= 1}
            >
              <Text style={styles.weekNavText}>← Previous Week</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.weekNavBtn, currentWeek >= 40 && styles.weekNavBtnDisabled]}
              onPress={() => currentWeek < 40 && setCurrentWeek(currentWeek + 1)}
              disabled={currentWeek >= 40}
            >
              <Text style={styles.weekNavText}>Next Week →</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
=======
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
>>>>>>> 84817c9d126aa0ee4fcfd2aea41ef4b7f9235469
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: '#F8FAFC',
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  headerDecor1: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  headerDecor2: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  trimesterBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  trimesterText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    marginTop: -24,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  weekCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    marginBottom: 20,
=======
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
>>>>>>> 84817c9d126aa0ee4fcfd2aea41ef4b7f9235469
  },
  weekHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
<<<<<<< HEAD
  weekCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FCE7F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  weekNumber: {
    fontSize: 32,
    fontWeight: '800',
=======
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
>>>>>>> 84817c9d126aa0ee4fcfd2aea41ef4b7f9235469
    color: '#EC4899',
  },
  weekLabel: {
    fontSize: 12,
<<<<<<< HEAD
    color: '#9CA3AF',
    marginTop: -4,
=======
    color: '#EC4899',
>>>>>>> 84817c9d126aa0ee4fcfd2aea41ef4b7f9235469
  },
  weekInfo: {
    flex: 1,
  },
  weekTitle: {
<<<<<<< HEAD
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  dueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  dueText: {
    fontSize: 14,
    color: '#6B7280',
  },
  daysLeft: {
    fontSize: 15,
    fontWeight: '600',
    color: '#EC4899',
  },
  progressSection: {
    marginTop: 4,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#FCE7F3',
    borderRadius: 5,
=======
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
>>>>>>> 84817c9d126aa0ee4fcfd2aea41ef4b7f9235469
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
<<<<<<< HEAD
    borderRadius: 5,
=======
    backgroundColor: '#EC4899',
    borderRadius: 4,
>>>>>>> 84817c9d126aa0ee4fcfd2aea41ef4b7f9235469
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
<<<<<<< HEAD
    marginTop: 8,
=======
    marginTop: 4,
>>>>>>> 84817c9d126aa0ee4fcfd2aea41ef4b7f9235469
  },
  progressLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
<<<<<<< HEAD
  babySizeCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  babySizeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  babySizeEmoji: {
    fontSize: 60,
    marginRight: 16,
  },
  babySizeInfo: {
    flex: 1,
  },
  babySizeTitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  babySizeName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  measurements: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  measureItem: {
    flex: 1,
    alignItems: 'center',
  },
  measureIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  measureValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  measureLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
  measureDivider: {
    width: 1,
    height: 50,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 20,
  },
  section: {
    marginBottom: 20,
=======
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
>>>>>>> 84817c9d126aa0ee4fcfd2aea41ef4b7f9235469
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
<<<<<<< HEAD
    marginBottom: 12,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  listCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  bullet: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FCE7F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
  },
  weekNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  weekNavBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  weekNavBtnDisabled: {
    opacity: 0.5,
  },
  weekNavText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
=======
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
>>>>>>> 84817c9d126aa0ee4fcfd2aea41ef4b7f9235469
});
