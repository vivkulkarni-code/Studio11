import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSessionStore } from '../store/sessionStore';
import type { Focus } from '../store/sessionStore';
import colors from '../../constants/colors';

const { width } = Dimensions.get('window');

export default function FocusScreen() {
  const { setAppScreen, updateProfile, profile, setGender } = useSessionStore();
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [birthday, setBirthday] = useState(profile.birthday);
  const [anniversary, setAnniversary] = useState(profile.anniversary);
  const [focus, setFocus] = useState<Focus>(profile.focus);

  const slideY = useRef(new Animated.Value(600)).current;
  const bgOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(bgOpacity, { toValue: 1, duration: 400, useNativeDriver: false }),
      Animated.spring(slideY, { toValue: 0, tension: 220, friction: 28, useNativeDriver: false }),
    ]).start();
  }, []);

  const handleContinue = () => {
    updateProfile({ name: name.trim(), phone: phone.trim(), birthday: birthday.trim(), anniversary: anniversary.trim(), focus });
    setGender(focus === 'MALE' ? 'MALE' : 'FEMALE');
    setAppScreen('main');
  };

  const handleSkip = () => {
    setGender(focus === 'MALE' ? 'MALE' : 'FEMALE');
    setAppScreen('main');
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: '#0B0B0F', opacity: bgOpacity }]} />
      <View style={styles.topGlow} />

      <Animated.View style={[styles.sheet, { transform: [{ translateY: slideY }] }]}>
        {/* Handle */}
        <View style={styles.handle} />

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Text style={styles.welcomeLabel}>WELCOME</Text>
          <Text style={styles.heading}>A more personal Studio11</Text>
          <Text style={styles.sub}>
            Tell us a little about you to save favourites, speed up booking, and unlock tailored recommendations.
          </Text>

          {/* Name */}
          <InputField
            label="NAME"
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            keyboardType="default"
          />

          {/* Phone */}
          <InputField
            label="PHONE"
            value={phone}
            onChangeText={setPhone}
            placeholder="+91  ..."
            keyboardType="phone-pad"
          />

          {/* Birthday & Anniversary row */}
          <View style={styles.twoCol}>
            <View style={styles.colLeft}>
              <Text style={styles.fieldLabel}>🎁  BIRTHDAY</Text>
              <TextInput
                style={styles.input}
                value={birthday}
                onChangeText={setBirthday}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="rgba(255,255,255,0.25)"
                keyboardType="numbers-and-punctuation"
              />
            </View>
            <View style={styles.colRight}>
              <Text style={styles.fieldLabel}>📅  ANNIVERSARY</Text>
              <TextInput
                style={styles.input}
                value={anniversary}
                onChangeText={setAnniversary}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="rgba(255,255,255,0.25)"
                keyboardType="numbers-and-punctuation"
              />
            </View>
          </View>

          {/* 30% off nudge */}
          <View style={styles.nudge}>
            <Text style={styles.nudgeText}>
              🎁  Add your birthday &amp; anniversary to receive{' '}
              <Text style={styles.nudgeBold}>30% off</Text> on those special days!
            </Text>
          </View>

          {/* Preferred Focus */}
          <Text style={styles.focusLabel}>PREFERRED FOCUS</Text>
          <View style={styles.focusRow}>
            {(['MALE', 'FEMALE'] as Focus[]).map(f => {
              const isActive = focus === f;
              const isMale = f === 'MALE';
              const activeColor = isMale ? colors.silver : colors.gold;
              return (
                <TouchableOpacity
                  key={f}
                  onPress={() => setFocus(f)}
                  activeOpacity={0.8}
                  style={[
                    styles.focusBtn,
                    {
                      backgroundColor: isActive
                        ? `${activeColor}20`
                        : 'rgba(255,255,255,0.04)',
                      borderColor: isActive ? `${activeColor}50` : 'rgba(255,255,255,0.14)',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.focusBtnText,
                      { color: isActive ? activeColor : 'rgba(255,255,255,0.55)' },
                    ]}
                  >
                    {f}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Skip / Continue */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.skipBtn} onPress={handleSkip} activeOpacity={0.75}>
              <Text style={styles.skipText}>SKIP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.continueBtn} onPress={handleContinue} activeOpacity={0.85}>
              <Text style={styles.continueText}>CONTINUE</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  keyboardType?: 'default' | 'phone-pad';
}) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          focused && { borderColor: 'rgba(212,175,55,0.4)' },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.25)"
        keyboardType={keyboardType}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        selectionColor={colors.gold}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0B0B0F',
    justifyContent: 'flex-end',
  },
  topGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: 'transparent',
    opacity: 0.06,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 120,
    elevation: 0,
  },
  sheet: {
    width: '100%',
    maxHeight: '92%',
    backgroundColor: '#141418',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -20 },
    shadowOpacity: 0.5,
    shadowRadius: 60,
    elevation: 24,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 40,
  },
  welcomeLabel: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 11,
    color: colors.gold,
    letterSpacing: 4,
    marginBottom: 8,
  },
  heading: {
    fontFamily: 'BodoniModa_400Regular',
    fontSize: 28,
    color: colors.foreground,
    marginBottom: 8,
    lineHeight: 36,
  },
  sub: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 20,
    marginBottom: 24,
  },
  fieldWrapper: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 2,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: colors.foreground,
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 15,
  },
  twoCol: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  colLeft: {
    flex: 1,
  },
  colRight: {
    flex: 1,
  },
  nudge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212,175,55,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.18)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  nudgeText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: 'rgba(212,175,55,0.85)',
    lineHeight: 18,
    flex: 1,
  },
  nudgeBold: {
    fontWeight: '700',
    color: colors.gold,
  },
  focusLabel: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 2,
    marginBottom: 12,
  },
  focusRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  focusBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  focusBtnText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 13,
    letterSpacing: 2.5,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  skipBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
  },
  skipText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    letterSpacing: 2.5,
    color: 'rgba(255,255,255,0.6)',
  },
  continueBtn: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.6)',
    backgroundColor: 'rgba(212,175,55,0.65)',
    alignItems: 'center',
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 20,
    elevation: 8,
  },
  continueText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    letterSpacing: 2.5,
    fontWeight: '700',
    color: '#0B0B0F',
  },
});
