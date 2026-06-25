---
name: Studio11 tablet navigation pattern
description: State-machine navigation via Zustand instead of expo-router screen transitions
---

Navigation uses Zustand `appScreen` state: `'intro' | 'focus' | 'main' | 'gallery' | 'products'`.
The router in `app/(tabs)/index.tsx` renders the correct screen component based on state.
No expo-router `router.push()` or `<Link>` used between main screens.

**Why:** Single-page tablet kiosk UX with smooth cross-screen control (e.g. ProfileDrawer accessible from any screen). expo-router transitions felt too app-like for a luxury lookbook kiosk.

**How to apply:** Use `useSessionStore().setAppScreen('main')` to navigate. Do NOT add new expo-router routes for main screen transitions.
