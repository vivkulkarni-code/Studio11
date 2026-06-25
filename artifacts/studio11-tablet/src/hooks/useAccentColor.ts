import colors from '../../constants/colors';
import { useSessionStore } from '../store/sessionStore';

export function useAccentColor() {
  const gender = useSessionStore(s => s.gender);
  return gender === 'FEMALE' ? colors.gold : colors.silver;
}

export function useAccentDim() {
  const gender = useSessionStore(s => s.gender);
  return gender === 'FEMALE' ? colors.goldDim : colors.silverDim;
}
