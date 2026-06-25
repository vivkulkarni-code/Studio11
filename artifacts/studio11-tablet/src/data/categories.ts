import type { CategoryName, Gender } from '../store/sessionStore';

export const categoryTaglines: Record<CategoryName, string> = {
  'HAIR STYLING': 'Cut. Colour. Command.',
  'HAIR TREATMENTS & SPAS': 'Restore. Strengthen. Shine.',
  'BODY TREATMENTS': 'Smooth. Refine. Reveal.',
  'SKIN CARE': 'Cleanse. Brighten. Glow.',
  'FACIALS': 'Glow Beyond Expectations.',
  'MANI PADI': 'Crafted to Perfection.',
  'SPAS & MASSAGE': 'Surrender to Serenity.',
  'MAKEUP': 'Art Meets Elegance.',
  'GROOMAL': 'Every Detail. Perfected.',
  'BRIDAL': 'The Ultimate Bridal Ritual.',
};

export const MALE_CATEGORIES: CategoryName[] = [
  'HAIR STYLING',
  'HAIR TREATMENTS & SPAS',
  'BODY TREATMENTS',
  'SKIN CARE',
  'FACIALS',
  'MANI PADI',
  'SPAS & MASSAGE',
  'MAKEUP',
  'GROOMAL',
];

export const FEMALE_CATEGORIES: CategoryName[] = [
  'HAIR STYLING',
  'HAIR TREATMENTS & SPAS',
  'BODY TREATMENTS',
  'SKIN CARE',
  'FACIALS',
  'MANI PADI',
  'SPAS & MASSAGE',
  'MAKEUP',
  'BRIDAL',
];

export function getCategoriesForGender(gender: Gender): CategoryName[] {
  return gender === 'MALE' ? MALE_CATEGORIES : FEMALE_CATEGORIES;
}
