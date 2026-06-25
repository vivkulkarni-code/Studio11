import type { CategoryName, Gender } from '../store/sessionStore';

export interface CategoryConfig {
  name: CategoryName;
  icon: string;
  shortName: string;
  genders: Gender[];
}

export const allCategories: CategoryConfig[] = [
  { name: 'HAIR STYLING', icon: '✂️', shortName: 'Hair Styling', genders: ['MALE', 'FEMALE'] },
  { name: 'HAIR TREATMENTS & SPAS', icon: '🌿', shortName: 'Hair Treats', genders: ['MALE', 'FEMALE'] },
  { name: 'BODY TREATMENTS', icon: '🌸', shortName: 'Body Treats', genders: ['MALE', 'FEMALE'] },
  { name: 'SKIN CARE', icon: '✨', shortName: 'Skin Care', genders: ['MALE', 'FEMALE'] },
  { name: 'FACIALS', icon: '💆', shortName: 'Facials', genders: ['MALE', 'FEMALE'] },
  { name: 'NAIL CARE', icon: '💅', shortName: 'Nail Care', genders: ['MALE', 'FEMALE'] },
  { name: 'MAKE UP', icon: '💄', shortName: 'Make Up', genders: ['MALE', 'FEMALE'] },
  { name: 'BRIDAL & GROMAL', icon: '👑', shortName: 'Bridal', genders: ['MALE', 'FEMALE'] },
  { name: 'MASSAGES & BODY SPA', icon: '🕊️', shortName: 'Massage', genders: ['MALE', 'FEMALE'] },
];

export function getCategoriesForGender(gender: Gender): CategoryConfig[] {
  return allCategories.filter(c => c.genders.includes(gender));
}
