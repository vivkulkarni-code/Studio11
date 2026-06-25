import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSessionStore } from '../../src/store/sessionStore';
import IntroScreen from '../../src/screens/IntroScreen';
import FocusScreen from '../../src/screens/FocusScreen';
import MainScreen from '../../src/screens/MainScreen';
import GalleryScreen from '../../src/screens/GalleryScreen';
import ProductsScreen from '../../src/screens/ProductsScreen';
import colors from '../../constants/colors';

export default function AppRoot() {
  const appScreen = useSessionStore(s => s.appScreen);

  return (
    <View style={styles.root}>
      {appScreen === 'intro' && <IntroScreen />}
      {appScreen === 'focus' && <FocusScreen />}
      {appScreen === 'main' && <MainScreen />}
      {appScreen === 'gallery' && <GalleryScreen />}
      {appScreen === 'products' && <ProductsScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
