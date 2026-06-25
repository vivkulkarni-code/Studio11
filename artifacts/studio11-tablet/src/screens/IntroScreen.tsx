import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSessionStore } from '../store/sessionStore';
import { logoAsset } from '../mediaAssets';
import colors from '../../constants/colors';

const { width } = Dimensions.get('window');

export default function IntroScreen() {
  const setAppScreen = useSessionStore(s => s.setAppScreen);
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, { toValue: 1, duration: 1100, useNativeDriver: false }),
      Animated.timing(logoScale, { toValue: 1, duration: 900, useNativeDriver: false }),
    ]).start();

    const timer = setTimeout(() => {
      setAppScreen('focus');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#000000', '#0B0B0F', '#0D0D14', '#0B0B0F']}
        style={StyleSheet.absoluteFill}
      />

      {/* Subtle radial gold glow behind logo */}
      <View style={styles.glowContainer} pointerEvents="none">
        <View style={styles.glow} />
      </View>

      <View style={styles.center}>
        <Animated.View style={[styles.logoWrap, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
          <Image
            source={logoAsset}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        <Text style={styles.studioName}>STUDIO11</Text>

        <View style={styles.dividerLine} />

        <Text style={styles.tagline}>Luxury Salon Experience</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0B0B0F',
  },
  glowContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  glow: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(212,175,55,0.06)',
    marginTop: -80,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  logoWrap: {
    marginBottom: 20,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 32,
    elevation: 0,
  },
  logo: {
    width: width * 0.28,
    height: width * 0.16,
  },
  studioName: {
    fontFamily: 'BodoniModa_400Regular',
    fontSize: 42,
    color: '#ffffff',
    letterSpacing: 18,
    textAlign: 'center',
    marginLeft: 18,
    marginBottom: 14,
  },
  dividerLine: {
    width: 56,
    height: 1,
    backgroundColor: colors.gold,
    marginBottom: 14,
  },
  tagline: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 11,
    color: colors.gold,
    letterSpacing: 5,
    textAlign: 'center',
    textTransform: 'uppercase',
    opacity: 0.8,
  },
});
