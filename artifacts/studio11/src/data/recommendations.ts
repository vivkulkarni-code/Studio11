import { CategoryName } from '@/store/sessionStore';

export const recommendationMap: Record<CategoryName, CategoryName[]> = {
  'CUTS': ['HAIR SPA', 'BEARD', 'HAIR COLOR'],
  'HAIR SPA': ['CUTS', 'FACIAL'],
  'HAIR COLOR': ['HAIR SPA', 'CUTS'],
  'BEARD': ['CUTS', 'FACIAL'],
  'FACIAL': ['HAIR SPA', 'MANICURE'],
  'MAKEUP': ['FACIAL', 'HAIR COLOR'],
  'MANICURE': ['PEDICURE', 'FACIAL'],
  'PEDICURE': ['MANICURE', 'FACIAL'],
  'PACKAGES': ['CUTS', 'FACIAL'],
};