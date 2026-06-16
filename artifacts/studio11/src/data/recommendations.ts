import { CategoryName, Gender, Service } from '@/store/sessionStore';
import { maleServices, femaleServices } from '@/data/services';

export const recommendationMap: Record<CategoryName, CategoryName[]> = {
  'HAIR STYLING': ['HAIR TREATMENTS & SPAS', 'SPAS & MASSAGE', 'FACIALS'],
  'HAIR TREATMENTS & SPAS': ['HAIR STYLING', 'FACIALS', 'MANI PADI'],
  'BODY TREATMENTS': ['SKIN CARE', 'FACIALS', 'SPAS & MASSAGE'],
  'SKIN CARE': ['FACIALS', 'SPAS & MASSAGE', 'MANI PADI'],
  'FACIALS': ['SKIN CARE', 'SPAS & MASSAGE', 'MANI PADI'],
  'MANI PADI': ['SPAS & MASSAGE', 'FACIALS', 'BODY TREATMENTS'],
  'SPAS & MASSAGE': ['FACIALS', 'HAIR TREATMENTS & SPAS', 'MANI PADI'],
  'MAKEUP': ['HAIR STYLING', 'FACIALS', 'BRIDAL'],
  'GROOMAL': ['HAIR STYLING', 'SPAS & MASSAGE', 'FACIALS'],
  'BRIDAL': ['MAKEUP', 'HAIR STYLING', 'SPAS & MASSAGE'],
};

export function getRecommendations(
  addedService: Service,
  gender: Gender,
  sessionServiceIds: Set<string>
): Service[] {
  const allServices = gender === 'MALE' ? maleServices : femaleServices;
  const cats = recommendationMap[addedService.category] ?? [];
  const budget = addedService.price > 0 ? addedService.price * 1.5 : Infinity;

  const picks: Service[] = [];

  for (const cat of cats) {
    const candidates = allServices.filter(
      s =>
        s.category === cat &&
        s.price > 0 &&
        s.price <= budget &&
        !sessionServiceIds.has(s.id) &&
        s.id !== addedService.id
    );
    if (candidates.length === 0) continue;
    candidates.sort((a, b) => b.price - a.price);
    picks.push(candidates[0]);
  }

  return picks.slice(0, 3);
}
