import { Tabs } from 'expo-router';
import {
  Home,
  Activity,
  HeartPulse,
  MessageCircle,
  Pill,
  Baby,
  Utensils,
<<<<<<< HEAD
  Settings,
=======
>>>>>>> 84817c9d126aa0ee4fcfd2aea41ef4b7f9235469
} from 'lucide-react-native';

export default function MotherTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
<<<<<<< HEAD
        tabBarActiveTintColor: '#10B981',
=======
        tabBarActiveTintColor: '#007AFF',
>>>>>>> 84817c9d126aa0ee4fcfd2aea41ef4b7f9235469
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="pregnancy"
        options={{
          title: 'Pregnancy',
          tabBarIcon: ({ color, size }) => <Baby size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="symptoms"
        options={{
          title: 'AI Chat',
          tabBarIcon: ({ color, size }) => <Activity size={size} color={color} />,
        }}
      />
      <Tabs.Screen
<<<<<<< HEAD
=======
        name="monitoring"
        options={{
          title: 'Vitals',
          tabBarIcon: ({ color, size }) => (
            <HeartPulse size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
>>>>>>> 84817c9d126aa0ee4fcfd2aea41ef4b7f9235469
        name="medications"
        options={{
          title: 'Meds',
          tabBarIcon: ({ color, size }) => <Pill size={size} color={color} />,
        }}
      />
      <Tabs.Screen
<<<<<<< HEAD
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
      <Tabs.Screen
=======
>>>>>>> 84817c9d126aa0ee4fcfd2aea41ef4b7f9235469
        name="nutrition"
        options={{
          title: 'Nutrition',
          tabBarIcon: ({ color, size }) => <Utensils size={size} color={color} />,
<<<<<<< HEAD
          href: null, // Hidden from tab bar but accessible via navigation
=======
>>>>>>> 84817c9d126aa0ee4fcfd2aea41ef4b7f9235469
        }}
      />
      <Tabs.Screen
        name="communication"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <MessageCircle size={size} color={color} />
          ),
          href: null, // Hidden from tab bar but accessible via navigation
        }}
      />
      <Tabs.Screen
        name="pharmacy"
        options={{
          title: 'Pharmacy',
          tabBarIcon: ({ color, size }) => <Pill size={size} color={color} />,
          href: null, // Hidden from tab bar but accessible via navigation
        }}
      />
    </Tabs>
  );
}
