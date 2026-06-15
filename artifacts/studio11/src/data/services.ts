import { Service, Gender, CategoryName } from '@/store/sessionStore';

export const maleServices: Service[] = [
  {
    id: 'male-cuts-0',
    name: 'Basic Hair Cut',
    price: 400,
    duration: 30,
    description: 'A precision cut tailored to your facial structure, finished with a blow-dry and style consultation.',
    benefits: ['Shampoo', 'Precision Cut', 'Blow Dry', 'Style Consultation'],
    category: 'CUTS',
    gender: 'MALE'
  },
  {
    id: 'male-cuts-1',
    name: 'Advanced Hair Cut',
    price: 600,
    duration: 45,
    description: 'Our master stylists craft your signature look with expert scissor technique and personalized styling.',
    benefits: ['Shampoo', 'Deep Conditioning', 'Precision Cut', 'Styling', 'Finish Spray'],
    category: 'CUTS',
    gender: 'MALE'
  },
  {
    id: 'male-cuts-2',
    name: 'Fade Cut',
    price: 500,
    duration: 40,
    description: 'A sharp, clean fade blended to perfection — from skin to scissor in one seamless gradient.',
    benefits: ['Shampoo', 'Fade Blend', 'Line Up', 'Finish'],
    category: 'CUTS',
    gender: 'MALE'
  },
  {
    id: 'male-cuts-3',
    name: 'Kids Cut',
    price: 250,
    duration: 20,
    description: 'A gentle, playful cut that keeps little ones comfortable and looking their best.',
    benefits: ['Gentle Shampoo', 'Style Cut', 'Blow Dry'],
    category: 'CUTS',
    gender: 'MALE'
  },
  {
    id: 'male-hair-spa-0',
    name: 'Basic Hair Spa',
    price: 900,
    duration: 60,
    description: 'A nourishing treatment that restores shine and softness, returning vitality to tired strands.',
    benefits: ['Cleansing Shampoo', 'Spa Mask', 'Scalp Massage', 'Blow Dry'],
    category: 'HAIR SPA',
    gender: 'MALE'
  },
  {
    id: 'male-hair-spa-1',
    name: 'Keratin Treatment',
    price: 3500,
    duration: 120,
    description: 'Banish frizz and unlock silky-smooth, manageable hair for up to 4 months.',
    benefits: ['Clarifying Wash', 'Keratin Application', 'Heat Sealing', 'Blow Out'],
    category: 'HAIR SPA',
    gender: 'MALE'
  },
  {
    id: 'male-hair-spa-2',
    name: 'Deep Conditioning',
    price: 1200,
    duration: 75,
    description: 'An intensive moisture surge that repairs damage and leaves hair irresistibly soft.',
    benefits: ['Hydrating Shampoo', 'Conditioning Mask', 'Steam Treatment', 'Blow Dry'],
    category: 'HAIR SPA',
    gender: 'MALE'
  },
  {
    id: 'male-hair-color-0',
    name: 'Global Color',
    price: 2500,
    duration: 120,
    description: 'Full-head color crafted for maximum vibrancy and fade-resistant longevity.',
    benefits: ['Color Consultation', 'Full Application', 'Processing', 'Toning', 'Blow Dry'],
    category: 'HAIR COLOR',
    gender: 'MALE'
  },
  {
    id: 'male-hair-color-1',
    name: 'Highlights',
    price: 3500,
    duration: 150,
    description: 'Sun-kissed dimension woven through your hair for a multi-tonal, editorial finish.',
    benefits: ['Consultation', 'Foil Highlights', 'Toning', 'Deep Condition', 'Blow Dry'],
    category: 'HAIR COLOR',
    gender: 'MALE'
  },
  {
    id: 'male-hair-color-2',
    name: 'Root Touch Up',
    price: 1500,
    duration: 60,
    description: 'Seamlessly refresh your roots for a flawless, grown-in look.',
    benefits: ['Root Application', 'Processing', 'Toning', 'Blow Dry'],
    category: 'HAIR COLOR',
    gender: 'MALE'
  },
  {
    id: 'male-beard-0',
    name: 'Beard Trim',
    price: 200,
    duration: 15,
    description: 'A clean, precise shape-up that defines your beard\'s natural silhouette.',
    benefits: ['Beard Wash', 'Precision Trim', 'Line Up'],
    category: 'BEARD',
    gender: 'MALE'
  },
  {
    id: 'male-beard-1',
    name: 'Beard Styling',
    price: 350,
    duration: 30,
    description: 'Expert sculpting to craft your ideal beard shape, finished with premium beard balm.',
    benefits: ['Beard Wash', 'Sculpting', 'Line Up', 'Beard Balm'],
    category: 'BEARD',
    gender: 'MALE'
  },
  {
    id: 'male-beard-2',
    name: 'Beard Color',
    price: 600,
    duration: 45,
    description: 'Natural-looking color applied to your beard for a fresh, youthful appearance.',
    benefits: ['Color Application', 'Processing', 'Conditioning', 'Style Finish'],
    category: 'BEARD',
    gender: 'MALE'
  },
  {
    id: 'male-facial-0',
    name: 'Basic Facial',
    price: 800,
    duration: 60,
    description: 'A deep cleanse and targeted treatment that clears, brightens and refreshes your complexion.',
    benefits: ['Double Cleanse', 'Exfoliation', 'Steam', 'Extraction', 'Mask', 'Moisturize'],
    category: 'FACIAL',
    gender: 'MALE'
  },
  {
    id: 'male-facial-1',
    name: 'Gold Facial',
    price: 1500,
    duration: 75,
    description: 'A luxurious gold-infused treatment that illuminates and firms for a radiant, glowing finish.',
    benefits: ['Gold Cleanse', 'Peel', 'Gold Serum', '24K Mask', 'Collagen Moisturizer'],
    category: 'FACIAL',
    gender: 'MALE'
  },
  {
    id: 'male-facial-2',
    name: 'Anti-Aging Facial',
    price: 2000,
    duration: 90,
    description: 'A targeted anti-aging protocol that visibly reduces fine lines and restores youthful firmness.',
    benefits: ['Deep Cleanse', 'Retinol Peel', 'Collagen Infusion', 'Firming Mask', 'SPF Finish'],
    category: 'FACIAL',
    gender: 'MALE'
  },
  {
    id: 'male-manicure-0',
    name: 'Basic Manicure',
    price: 400,
    duration: 40,
    description: 'A thorough hand treatment with nail shaping, cuticle care, and a polished finish.',
    benefits: ['Soak', 'Cuticle Care', 'Shape', 'Buff', 'Polish'],
    category: 'MANICURE',
    gender: 'MALE'
  },
  {
    id: 'male-manicure-1',
    name: 'Gel Manicure',
    price: 700,
    duration: 60,
    description: 'Long-lasting gel polish that delivers chip-free color for up to 3 weeks.',
    benefits: ['Prep', 'Cuticle Care', 'Shape', 'Gel Application', 'Cure', 'Gloss'],
    category: 'MANICURE',
    gender: 'MALE'
  },
  {
    id: 'male-pedicure-0',
    name: 'Basic Pedicure',
    price: 500,
    duration: 50,
    description: 'Revive tired feet with a soothing soak, thorough exfoliation and a smooth finish.',
    benefits: ['Foot Soak', 'Exfoliation', 'Cuticle Care', 'Shape', 'Massage', 'Polish'],
    category: 'PEDICURE',
    gender: 'MALE'
  },
  {
    id: 'male-pedicure-1',
    name: 'Spa Pedicure',
    price: 900,
    duration: 75,
    description: 'A full luxury foot ritual with mask, massage and long-lasting polish.',
    benefits: ['Aromatic Soak', 'Scrub', 'Mask', 'Extended Massage', 'Shape', 'Gel Polish'],
    category: 'PEDICURE',
    gender: 'MALE'
  },
  {
    id: 'male-packages-0',
    name: 'Hair + Beard',
    price: 900,
    duration: 75,
    description: 'The complete gentleman\'s grooming session — a precision cut paired with expert beard shaping.',
    benefits: ['Hair Cut', 'Shampoo', 'Beard Trim', 'Line Up', 'Style Finish'],
    category: 'PACKAGES',
    gender: 'MALE'
  },
  {
    id: 'male-packages-1',
    name: 'Complete Grooming',
    price: 2000,
    duration: 150,
    description: 'Our signature all-in-one package for the modern man who settles for nothing less.',
    benefits: ['Hair Cut', 'Hair Spa', 'Beard Styling', 'Basic Facial', 'Style Finish'],
    category: 'PACKAGES',
    gender: 'MALE'
  },
  {
    id: 'male-packages-2',
    name: 'Spa Day Package',
    price: 4500,
    duration: 240,
    description: 'A full day of indulgence — hair, skin, and hands treated to Studio11\'s finest.',
    benefits: ['Advanced Cut', 'Keratin Treatment', 'Gold Facial', 'Gel Manicure', 'Spa Pedicure'],
    category: 'PACKAGES',
    gender: 'MALE'
  }
];

export const femaleServices: Service[] = [
  {
    id: 'female-cuts-0',
    name: 'Basic Cut',
    price: 500,
    duration: 45,
    description: 'A clean, expert cut that honors your hair\'s natural texture and movement.',
    benefits: ['Shampoo', 'Precision Cut', 'Blow Dry'],
    category: 'CUTS',
    gender: 'FEMALE'
  },
  {
    id: 'female-cuts-1',
    name: 'Blowdry Cut',
    price: 800,
    duration: 60,
    description: 'A styled cut with a professional blowout for a salon-fresh finish that lasts.',
    benefits: ['Shampoo', 'Conditioning', 'Cut', 'Blowout', 'Style Finish'],
    category: 'CUTS',
    gender: 'FEMALE'
  },
  {
    id: 'female-cuts-2',
    name: 'Premium Cut',
    price: 1200,
    duration: 75,
    description: 'An elevated cut experience with our senior stylists — tailored, perfected, and unforgettable.',
    benefits: ['Deep Conditioning Wash', 'Consultation', 'Precision Cut', 'Blowout', 'Serum Finish'],
    category: 'CUTS',
    gender: 'FEMALE'
  },
  {
    id: 'female-hair-spa-0',
    name: 'Classic Spa',
    price: 1200,
    duration: 75,
    description: 'A restorative ritual that deeply nourishes, detangles and brings back your hair\'s natural radiance.',
    benefits: ['Hydrating Shampoo', 'Spa Mask', 'Scalp Massage', 'Blow Dry', 'Serum'],
    category: 'HAIR SPA',
    gender: 'FEMALE'
  },
  {
    id: 'female-hair-spa-1',
    name: 'Keratin Smoothing',
    price: 5000,
    duration: 150,
    description: 'Transform frizzy, unruly hair into sleek, smooth silk — results last up to 5 months.',
    benefits: ['Clarifying Wash', 'Keratin Application', 'Heat Sealing', 'Blowout', 'Finish'],
    category: 'HAIR SPA',
    gender: 'FEMALE'
  },
  {
    id: 'female-hair-spa-2',
    name: 'Protein Treatment',
    price: 2000,
    duration: 90,
    description: 'Rebuild and strengthen damaged hair from the inside out with our intensive protein therapy.',
    benefits: ['Protein Shampoo', 'Protein Mask', 'Steam', 'Blow Dry'],
    category: 'HAIR SPA',
    gender: 'FEMALE'
  },
  {
    id: 'female-hair-color-0',
    name: 'Global Color',
    price: 3500,
    duration: 150,
    description: 'Full-head color with our premium Italian formulas for vibrant, long-lasting results.',
    benefits: ['Consultation', 'Full Application', 'Processing', 'Toning', 'Deep Condition', 'Blowout'],
    category: 'HAIR COLOR',
    gender: 'FEMALE'
  },
  {
    id: 'female-hair-color-1',
    name: 'Balayage',
    price: 6000,
    duration: 180,
    description: 'Hand-painted highlights that create a naturally sun-kissed effect unique to you.',
    benefits: ['Consultation', 'Balayage Application', 'Processing', 'Toning', 'Treatment', 'Blowout'],
    category: 'HAIR COLOR',
    gender: 'FEMALE'
  },
  {
    id: 'female-hair-color-2',
    name: 'Highlights',
    price: 4500,
    duration: 160,
    description: 'Foil highlights placed for maximum dimension and a luminous, editorial finish.',
    benefits: ['Consultation', 'Foil Application', 'Processing', 'Gloss', 'Deep Condition', 'Blowout'],
    category: 'HAIR COLOR',
    gender: 'FEMALE'
  },
  {
    id: 'female-facial-0',
    name: 'Classic Facial',
    price: 1000,
    duration: 60,
    description: 'A thorough cleansing facial that purifies, balances and leaves skin noticeably clearer.',
    benefits: ['Double Cleanse', 'Exfoliation', 'Steam', 'Extraction', 'Mask', 'Moisturizer'],
    category: 'FACIAL',
    gender: 'FEMALE'
  },
  {
    id: 'female-facial-1',
    name: 'Brightening Facial',
    price: 1800,
    duration: 75,
    description: 'A vitamin-C rich treatment that fades dullness and delivers an immediate luminous glow.',
    benefits: ['Cleanse', 'Enzyme Peel', 'Vitamin C Serum', 'Brightening Mask', 'SPF'],
    category: 'FACIAL',
    gender: 'FEMALE'
  },
  {
    id: 'female-facial-2',
    name: 'Hydration Facial',
    price: 2200,
    duration: 90,
    description: 'An ultra-hydrating treatment that plumps, firms and restores a dewy, lit-from-within complexion.',
    benefits: ['Micellar Cleanse', 'Hyaluronic Peel', 'Cryo Globes', 'Hydra Mask', 'Rich Moisturizer'],
    category: 'FACIAL',
    gender: 'FEMALE'
  },
  {
    id: 'female-makeup-0',
    name: 'Day Makeup',
    price: 2500,
    duration: 60,
    description: 'A polished, natural-finish look perfect for events, shoots or a special day out.',
    benefits: ['Skin Prep', 'Foundation', 'Contouring', 'Eye Look', 'Lip Finish'],
    category: 'MAKEUP',
    gender: 'FEMALE'
  },
  {
    id: 'female-makeup-1',
    name: 'Party Makeup',
    price: 4000,
    duration: 90,
    description: 'A glamorous, camera-ready look that keeps you luminous all night long.',
    benefits: ['Skin Prep', 'HD Foundation', 'Contour', 'Dramatic Eye', 'Lashes', 'Lip'],
    category: 'MAKEUP',
    gender: 'FEMALE'
  },
  {
    id: 'female-makeup-2',
    name: 'Bridal Makeup',
    price: 12000,
    duration: 180,
    description: 'Our signature bridal artistry — flawless, long-lasting and tailored to your vision for the most important day.',
    benefits: ['Trial Consultation', 'Skin Prep', 'Airbrush Foundation', 'Bridal Eye', 'Lashes', 'Setting Spray', 'Touch Up Kit'],
    category: 'MAKEUP',
    gender: 'FEMALE'
  },
  {
    id: 'female-manicure-0',
    name: 'Classic Manicure',
    price: 500,
    duration: 45,
    description: 'Beautiful nails crafted with precision — shaped, buffed and finished to perfection.',
    benefits: ['Soak', 'Cuticle Care', 'Shape', 'Buff', 'Polish'],
    category: 'MANICURE',
    gender: 'FEMALE'
  },
  {
    id: 'female-manicure-1',
    name: 'Gel Extensions',
    price: 1500,
    duration: 90,
    description: 'Long, flawless gel extensions that add instant length and elegance to your hands.',
    benefits: ['Prep', 'Extension Application', 'Shaping', 'Gel Overlay', 'Cure', 'Art'],
    category: 'MANICURE',
    gender: 'FEMALE'
  },
  {
    id: 'female-manicure-2',
    name: 'Nail Art',
    price: 200,
    duration: 30,
    description: 'Custom nail art designed to your mood — from minimalist to maximalist.',
    benefits: ['Design Consultation', 'Base', 'Art Application', 'Top Coat'],
    category: 'MANICURE',
    gender: 'FEMALE'
  },
  {
    id: 'female-pedicure-0',
    name: 'Classic Pedicure',
    price: 600,
    duration: 50,
    description: 'A thorough pedicure that smooths, shapes and leaves feet feeling renewed.',
    benefits: ['Soak', 'Scrub', 'Cuticle Care', 'Shape', 'Massage', 'Polish'],
    category: 'PEDICURE',
    gender: 'FEMALE'
  },
  {
    id: 'female-pedicure-1',
    name: 'Luxury Pedicure',
    price: 1200,
    duration: 80,
    description: 'A multi-step foot ritual with premium masks and an extended massage for total bliss.',
    benefits: ['Aromatic Soak', 'Salt Scrub', 'Paraffin Mask', 'Extended Massage', 'Shape', 'Gel Polish'],
    category: 'PEDICURE',
    gender: 'FEMALE'
  },
  {
    id: 'female-packages-0',
    name: 'Hair + Makeup',
    price: 6500,
    duration: 240,
    description: 'The complete occasion package — a beautiful blowout paired with flawless makeup.',
    benefits: ['Blowdry Cut', 'Styling', 'Party Makeup', 'Lashes'],
    category: 'PACKAGES',
    gender: 'FEMALE'
  },
  {
    id: 'female-packages-1',
    name: 'Bridal Package',
    price: 18000,
    duration: 360,
    description: 'Studio11\'s full bridal experience — from hair to face, every detail perfected.',
    benefits: ['Premium Cut', 'Keratin', 'Balayage', 'Bridal Makeup', 'Manicure', 'Pedicure'],
    category: 'PACKAGES',
    gender: 'FEMALE'
  },
  {
    id: 'female-packages-2',
    name: 'Spa Day',
    price: 5000,
    duration: 240,
    description: 'A full day surrender to luxury — skin, hair and nails all attended to.',
    benefits: ['Classic Spa', 'Brightening Facial', 'Classic Manicure', 'Luxury Pedicure'],
    category: 'PACKAGES',
    gender: 'FEMALE'
  }
];

export const kidsServices: Service[] = [
  {
    id: 'kids-cuts-0',
    name: 'Basic Cut',
    price: 250,
    duration: 20,
    description: 'A gentle, fun cut that keeps little ones comfortable and looking adorable.',
    benefits: ['Gentle Wash', 'Style Cut', 'Blow Dry'],
    category: 'CUTS',
    gender: 'KIDS'
  },
  {
    id: 'kids-cuts-1',
    name: 'Style Cut',
    price: 350,
    duration: 30,
    description: 'A little-person-sized style cut with extra care and patience.',
    benefits: ['Gentle Wash', 'Consultation', 'Style Cut', 'Finish'],
    category: 'CUTS',
    gender: 'KIDS'
  },
  {
    id: 'kids-hair-spa-0',
    name: 'Basic Spa',
    price: 600,
    duration: 45,
    description: 'A mild, nurturing spa treatment safe for children\'s delicate hair.',
    benefits: ['Gentle Shampoo', 'Kids Mask', 'Scalp Massage', 'Soft Blow Dry'],
    category: 'HAIR SPA',
    gender: 'KIDS'
  },
  {
    id: 'kids-hair-color-0',
    name: 'Fun Highlights',
    price: 1500,
    duration: 60,
    description: 'Kid-safe, vibrant highlights for a fun, expressive look they\'ll love.',
    benefits: ['Consultation', 'Safe Color Application', 'Processing', 'Blow Dry'],
    category: 'HAIR COLOR',
    gender: 'KIDS'
  },
  {
    id: 'kids-manicure-0',
    name: 'Basic Manicure',
    price: 300,
    duration: 30,
    description: 'A fun, careful manicure with non-toxic polish for little hands.',
    benefits: ['Soak', 'Shape', 'Safe Polish'],
    category: 'MANICURE',
    gender: 'KIDS'
  },
  {
    id: 'kids-pedicure-0',
    name: 'Basic Pedicure',
    price: 350,
    duration: 30,
    description: 'A gentle pedicure experience for happy little feet.',
    benefits: ['Foot Soak', 'Shape', 'Safe Polish'],
    category: 'PEDICURE',
    gender: 'KIDS'
  },
  {
    id: 'kids-packages-0',
    name: 'Hair + Spa',
    price: 800,
    duration: 60,
    description: 'A complete kids\' grooming treat — a fresh cut followed by a nurturing spa.',
    benefits: ['Style Cut', 'Kids Hair Spa', 'Blow Dry'],
    category: 'PACKAGES',
    gender: 'KIDS'
  }
];

export const getServicesByGenderAndCategory = (gender: Gender, category: CategoryName): Service[] => {
  let list: Service[] = [];
  if (gender === 'MALE') list = maleServices;
  else if (gender === 'FEMALE') list = femaleServices;
  else if (gender === 'KIDS') list = kidsServices;

  return list.filter(s => s.category === category);
};