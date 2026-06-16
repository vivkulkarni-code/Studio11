import { useSessionStore } from '@/store/sessionStore';

export interface AccentColors {
  accent: string;
  accentMuted: string;
  accentBorder: string;
  accentGlow: string;
  accentText: string;
}

export function useAccentColor(): AccentColors {
  const gender = useSessionStore(s => s.gender);
  if (gender === 'MALE') {
    return {
      accent: '#C0C0C0',
      accentMuted: 'rgba(192,192,192,0.12)',
      accentBorder: 'rgba(192,192,192,0.25)',
      accentGlow: '0 0 20px rgba(192,192,192,0.18)',
      accentText: '#C0C0C0',
    };
  }
  return {
    accent: '#D4AF37',
    accentMuted: 'rgba(212,175,55,0.12)',
    accentBorder: 'rgba(212,175,55,0.25)',
    accentGlow: '0 0 20px rgba(212,175,55,0.25)',
    accentText: '#D4AF37',
  };
}
