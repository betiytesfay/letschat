import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from "@expo/vector-icons";
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="allChat"
      screenOptions={{

        headerShown: false,
        tabBarButton: HapticTab,

        tabBarStyle: {

          borderTopWidth: 0,

        },
        tabBarActiveTintColor: "#8B5CF6",
        tabBarInactiveTintColor: "gray",
      }}>
      <Tabs.Screen
        name="allChat"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: 'New',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          )
        }}
      />


    </Tabs>
  );
}
