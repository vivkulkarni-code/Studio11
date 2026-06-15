import { CategoryName } from '@/store/sessionStore';

export const categoryTaglines: Record<CategoryName, string> = {
  'CUTS': 'Precision. Style. Personality.',
  'HAIR SPA': 'Restore. Nourish. Revive.',
  'HAIR COLOR': 'Bold. Vibrant. Beautiful.',
  'BEARD': 'Sharp. Defined. Refined.',
  'FACIAL': 'Glow Beyond Expectations.',
  'MAKEUP': 'Art Meets Elegance.',
  'MANICURE': 'Crafted to Perfection.',
  'PEDICURE': 'Step Into Luxury.',
  'PACKAGES': 'The Complete Experience.'
};

export const categoryGradients: Record<CategoryName, string> = {
  'CUTS': 'linear-gradient(135deg, #1a1a1a 0%, #2d2310 100%)',
  'HAIR SPA': 'linear-gradient(135deg, #0f1a1f 0%, #0d2230 100%)',
  'HAIR COLOR': 'linear-gradient(135deg, #1a0f1f 0%, #2d102d 100%)',
  'BEARD': 'linear-gradient(135deg, #1a1a14 0%, #252015 100%)',
  'FACIAL': 'linear-gradient(135deg, #1f0f14 0%, #2d1520 100%)',
  'MAKEUP': 'linear-gradient(135deg, #1a0d1a 0%, #2d1530 100%)',
  'MANICURE': 'linear-gradient(135deg, #1a0d0d 0%, #2d1515 100%)',
  'PEDICURE': 'linear-gradient(135deg, #0d1a0d 0%, #152d15 100%)',
  'PACKAGES': 'linear-gradient(135deg, #1a1508 0%, #2d2205 100%)'
};

export const MALE_CATEGORIES: CategoryName[] = ['CUTS', 'HAIR SPA', 'HAIR COLOR', 'BEARD', 'FACIAL', 'MANICURE', 'PEDICURE', 'PACKAGES'];
export const FEMALE_CATEGORIES: CategoryName[] = ['CUTS', 'HAIR SPA', 'HAIR COLOR', 'FACIAL', 'MAKEUP', 'MANICURE', 'PEDICURE', 'PACKAGES'];
export const KIDS_CATEGORIES: CategoryName[] = ['CUTS', 'HAIR SPA', 'HAIR COLOR', 'MANICURE', 'PEDICURE', 'PACKAGES'];