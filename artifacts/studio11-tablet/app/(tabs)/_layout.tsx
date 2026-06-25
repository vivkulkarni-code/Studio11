import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Studio11', tabBarStyle: styles.tabBar }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    display: 'none',
    height: 0,
    position: 'absolute',
    bottom: -100,
  },
});
