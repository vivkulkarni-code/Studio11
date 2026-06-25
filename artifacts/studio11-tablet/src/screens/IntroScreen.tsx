import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSessionStore } from '../store/sessionStore';
import { logoAsset } from '../mediaAssets';
import colors from '../../constants/colors';

const { width, height } = Dimensions.get('window');

export default function IntroScreen() {
  const setAppScreen = useSessionStore(s => s.setAppScreen);
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const promptOpacity = useRef(new Animated.Value(0)).current;
  const shimmerX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.spring(logoScale, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
      ]),
      Animated.delay(400),
      Animated.timing(taglineOpacity, { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.delay(600),
      Animated.timing(promptOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerX, { toValue: width * 2, duration: 2800, useNativeDriver: true }),
        Animated.timing(shimmerX, { toValue: -width, duration: 0, useNativeDriver: true }),
        Animated.delay(3500),
      ])
    ).start();
  }, []);

  return (
    <Pressable onPress={() => setAppScreen('focus')} style={styles.root}>
        <LinearGradient
          colors={['#000000', '#0B0B0F', '#0D0D14', '#0B0B0F']}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.particleField}>
          {Array.from({ length: 24 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.particle,
                {
                  left: `${Math.random() * 100}%` as unknown as number,
                  top: `${Math.random() * 100}%` as unknown as number,
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                  opacity: Math.random() * 0.5 + 0.1,
                  backgroundColor: i % 3 === 0 ? colors.gold : i % 3 === 1 ? colors.silver : '#ffffff',
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.center}>
          <Animated.View style={{ opacity: logoOpacity, transform: [{ scale: logoScale }] }}>
            <Image source={logoAsset} style={styles.logo} resizeMode="contain" />
          </Animated.View>

          <Animated.View style={{ opacity: taglineOpacity, marginTop: 32 }}>
            <Text style={styles.tagline}>Where Luxury Meets Excellence</Text>
            <View style={styles.dividerRow}>
              <View style={[styles.divider, { backgroundColor: colors.gold }]} />
              <View style={styles.diamond} />
              <View style={[styles.divider, { backgroundColor: colors.gold }]} />
            </View>
            <Text style={styles.subTagline}>SINCE 2010 · MANGALORE</Text>
          </Animated.View>

          <Animated.View style={{ opacity: promptOpacity, marginTop: 56 }}>
            <View style={styles.promptContainer}>
              <Animated.View
                style={[
                  styles.shimmer,
                  { transform: [{ translateX: shimmerX }] },
                ]}
              />
              <Text style={styles.promptText}>TOUCH TO BEGIN YOUR EXPERIENCE</Text>
            </View>
          </Animated.View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>STUDIO 11 · PREMIUM SALON</Text>
        </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
  },
  particleField: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    borderRadius: 99,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  logo: {
    width: width * 0.35,
    height: width * 0.2,
  },
  tagline: {
    fontFamily: 'BodoniModa_400Regular',
    fontSize: 22,
    color: colors.foreground,
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 20,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  divider: {
    width: 60,
    height: 1,
  },
  diamond: {
    width: 6,
    height: 6,
    backgroundColor: colors.gold,
    transform: [{ rotate: '45deg' }],
    marginHorizontal: 8,
  },
  subTagline: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 11,
    color: colors.muted,
    textAlign: 'center',
    letterSpacing: 4,
  },
  promptContainer: {
    overflow: 'hidden',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.3)',
    borderRadius: 2,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 80,
    backgroundColor: 'rgba(212,175,55,0.12)',
    transform: [{ skewX: '-20deg' }],
  },
  promptText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 11,
    color: colors.gold,
    letterSpacing: 3,
    textAlign: 'center',
  },
  footer: {
    paddingBottom: 28,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 10,
    color: 'rgba(255,255,255,0.2)',
    letterSpacing: 4,
  },
});
