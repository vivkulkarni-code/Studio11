import {
  BodoniModa_400Regular,
  BodoniModa_700Bold,
  useFonts as useBodoniModa,
} from '@expo-google-fonts/bodoni-moda';
import {
  PlusJakartaSans_300Light,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  useFonts as usePlusJakarta,
} from '@expo-google-fonts/plus-jakarta-sans';
import {
  Montserrat_300Light,
  Montserrat_400Regular,
  useFonts as useMontserrat,
} from '@expo-google-fonts/montserrat';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [bodoniLoaded, bodoniError] = useBodoniModa({ BodoniModa_400Regular, BodoniModa_700Bold });
  const [jakartaLoaded, jakartaError] = usePlusJakarta({
    PlusJakartaSans_300Light,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });
  const [montserratLoaded, montserratError] = useMontserrat({ Montserrat_300Light, Montserrat_400Regular });

  const loaded = bodoniLoaded && jakartaLoaded && montserratLoaded;
  const error = bodoniError || jakartaError || montserratError;

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
