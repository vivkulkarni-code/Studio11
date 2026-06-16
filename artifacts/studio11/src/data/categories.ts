import { CategoryName, Gender } from '@/store/sessionStore';
import { maleServices, femaleServices } from '@/data/services';

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

export const categoryGradients: Record<CategoryName, string> = {
  'HAIR STYLING': 'linear-gradient(135deg, #1a1a1a 0%, #2d2310 100%)',
  'HAIR TREATMENTS & SPAS': 'linear-gradient(135deg, #0f1a1f 0%, #0d2230 100%)',
  'BODY TREATMENTS': 'linear-gradient(135deg, #1a1410 0%, #2a1e10 100%)',
  'SKIN CARE': 'linear-gradient(135deg, #1a0f1f 0%, #2d102d 100%)',
  'FACIALS': 'linear-gradient(135deg, #1f0f14 0%, #2d1520 100%)',
  'MANI PADI': 'linear-gradient(135deg, #1a0d0d 0%, #2d1515 100%)',
  'SPAS & MASSAGE': 'linear-gradient(135deg, #0d1a0d 0%, #152d15 100%)',
  'MAKEUP': 'linear-gradient(135deg, #1a0d1a 0%, #2d1530 100%)',
  'GROOMAL': 'linear-gradient(135deg, #1a1508 0%, #2d2205 100%)',
  'BRIDAL': 'linear-gradient(135deg, #1a0f14 0%, #2d1522 100%)',
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

export function getSubCategories(gender: Gender, category: CategoryName): string[] {
  const services = gender === 'MALE' ? maleServices : femaleServices;
  const filtered = services.filter(s => s.category === category);
  const seen = new Set<string>();
  const result: string[] = [];
  for (const s of filtered) {
    if (!seen.has(s.subCategory)) {
      seen.add(s.subCategory);
      result.push(s.subCategory);
    }
  }
  return result;
}
