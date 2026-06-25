import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useSessionStore } from '../store/sessionStore';
import type { Gender } from '../store/sessionStore';
import { logoAsset } from '../mediaAssets';
import colors from '../../constants/colors';

const { width } = Dimensions.get('window');

export default function FocusScreen() {
  const { setAppScreen, updateProfile, profile, setGender } = useSessionStore();
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [birthday, setBirthday] = useState(profile.birthday);
  const [anniversary, setAnniversary] = useState(profile.anniversary);
  const [focus, setFocus] = useState<Gender>(profile.focus);
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideUp, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleContinue = () => {
    updateProfile({ name: name.trim(), phone: phone.trim(), birthday: birthday.trim(), anniversary: anniversary.trim(), focus });
    setGender(focus);
    setAppScreen('main');
  };

  const handleSkip = () => {
    setGender(focus);
    setAppScreen('main');
  };

  const accentColor = focus === 'FEMALE' ? colors.gold : colors.silver;
  const accentDim = focus === 'FEMALE' ? colors.goldDim : colors.silverDim;

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <LinearGradient colors={['#000000', '#0B0B0F', '#0D0D14']} style={StyleSheet.absoluteFill} />

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Animated.View style={{ opacity: fadeIn, transform: [{ translateY: slideUp }] }}>
          <View style={styles.logoRow}>
            <Image source={logoAsset} style={styles.logo} resizeMode="contain" />
          </View>

          <Text style={styles.heading}>Your Personal Focus</Text>
          <Text style={styles.sub}>Help us personalise your experience</Text>

          <View style={styles.genderRow}>
            {(['FEMALE', 'MALE'] as Gender[]).map(g => {
              const isActive = focus === g;
              const gc = g === 'FEMALE' ? colors.gold : colors.silver;
              const gcDim = g === 'FEMALE' ? colors.goldDim : colors.silverDim;
              return (
                <TouchableOpacity
                  key={g}
                  onPress={() => setFocus(g)}
                  style={[
                    styles.genderBtn,
                    { borderColor: isActive ? gc : colors.border, backgroundColor: isActive ? gcDim : 'transparent' },
                  ]}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.genderBtnText, { color: isActive ? gc : colors.muted }]}>
                    {g === 'FEMALE' ? '♀  FEMALE' : '♂  MALE'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <BlurView intensity={20} tint="dark" style={[styles.card, { borderColor: `${accentColor}30` }]}>
            <View style={styles.cardInner}>
              <Field label="Name" value={name} onChangeText={setName} accent={accentColor} placeholder="Your name" />
              <Field label="Phone" value={phone} onChangeText={setPhone} accent={accentColor} placeholder="Your phone number" keyboardType="phone-pad" />
              <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Field label="Birthday" value={birthday} onChangeText={setBirthday} accent={accentColor} placeholder="DD/MM" />
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Field label="Anniversary" value={anniversary} onChangeText={setAnniversary} accent={accentColor} placeholder="DD/MM" />
                </View>
              </View>
            </View>
          </BlurView>

          <View style={[styles.nudge, { borderColor: `${accentColor}40`, backgroundColor: `${accentColor}08` }]}>
            <Text style={[styles.nudgeText, { color: accentColor }]}>
              🎁  Share your details and unlock 30% off on your first visit
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.continueBtn, { backgroundColor: accentColor }]}
            onPress={handleContinue}
            activeOpacity={0.85}
          >
            <Text style={styles.continueBtnText}>EXPLORE SERVICES</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSkip} activeOpacity={0.7} style={styles.skipBtn}>
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({
  label,
  value,
  onChangeText,
  accent,
  placeholder,
  keyboardType = 'default',
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  accent: string;
  placeholder: string;
  keyboardType?: 'default' | 'phone-pad';
}) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={fieldStyles.wrapper}>
      <Text style={[fieldStyles.label, { color: accent }]}>{label}</Text>
      <TextInput
        style={[
          fieldStyles.input,
          focused && { borderColor: accent },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.25)"
        keyboardType={keyboardType}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        selectionColor={accent}
      />
    </View>
  );
}

const fieldStyles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 11,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: colors.foreground,
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 15,
  },
});

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  scroll: { paddingHorizontal: 28, paddingTop: 40, paddingBottom: 60 },
  logoRow: { alignItems: 'center', marginBottom: 32 },
  logo: { width: width * 0.28, height: width * 0.14 },
  heading: {
    fontFamily: 'BodoniModa_400Regular',
    fontSize: 30,
    color: colors.foreground,
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 8,
  },
  sub: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: colors.muted,
    textAlign: 'center',
    marginBottom: 28,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    justifyContent: 'center',
  },
  genderBtn: {
    flex: 1,
    maxWidth: 180,
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: colors.radius,
    alignItems: 'center',
  },
  genderBtnText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 13,
    letterSpacing: 2,
  },
  card: {
    borderRadius: colors.radius,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 16,
  },
  cardInner: { padding: 20 },
  row: { flexDirection: 'row' },
  nudge: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 14,
    marginBottom: 24,
  },
  nudgeText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
  continueBtn: {
    borderRadius: colors.radius,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 14,
  },
  continueBtnText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 13,
    letterSpacing: 2.5,
    color: '#000000',
    fontWeight: '600',
  },
  skipBtn: { alignItems: 'center', paddingVertical: 10 },
  skipText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 13,
    color: colors.muted,
    textDecorationLine: 'underline',
  },
});
