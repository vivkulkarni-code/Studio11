import { create } from 'zustand';

export type Gender = 'MALE' | 'FEMALE';
export type AppScreen = 'intro' | 'focus' | 'main' | 'gallery' | 'products';
export type CategoryName =
  | 'HAIR STYLING'
  | 'HAIR TREATMENTS & SPAS'
  | 'BODY TREATMENTS'
  | 'SKIN CARE'
  | 'FACIALS'
  | 'MANI PADI'
  | 'SPAS & MASSAGE'
  | 'MAKEUP'
  | 'GROOMAL'
  | 'BRIDAL';

export type Focus = 'MALE' | 'FEMALE';

export interface ServiceVariant {
  label: string;
  price: number;
  duration: number;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  fullDescription?: string;
  benefits: string[];
  category: CategoryName;
  subCategory: string;
  gender: Gender;
  variants?: ServiceVariant[];
}

export interface CartItem {
  service: Service;
  selectedVariant?: ServiceVariant;
  quantity: number;
}

export interface ClientProfile {
  name: string;
  phone: string;
  birthday: string;
  anniversary: string;
  focus: Focus;
}

interface SessionState {
  appScreen: AppScreen;
  gender: Gender;
  activeCategory: CategoryName;
  activeSubCategory: string;
  cart: CartItem[];
  profile: ClientProfile;
  drawerService: Service | null;
  sessionDrawerOpen: boolean;
  profileDrawerOpen: boolean;
  decisionModalOpen: boolean;
  decisionModalService: Service | null;

  setAppScreen: (screen: AppScreen) => void;
  setGender: (gender: Gender) => void;
  setActiveCategory: (cat: CategoryName) => void;
  setActiveSubCategory: (sub: string) => void;
  addToCart: (service: Service, variant?: ServiceVariant) => void;
  removeFromCart: (serviceId: string) => void;
  clearCart: () => void;
  setDrawerService: (service: Service | null) => void;
  setSessionDrawerOpen: (open: boolean) => void;
  setProfileDrawerOpen: (open: boolean) => void;
  setDecisionModal: (open: boolean, service?: Service | null) => void;
  updateProfile: (profile: Partial<ClientProfile>) => void;
  getTotalPrice: () => number;
  getTotalDuration: () => number;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  appScreen: 'intro',
  gender: 'FEMALE',
  activeCategory: 'HAIR STYLING',
  activeSubCategory: '',
  cart: [],
  profile: {
    name: '',
    phone: '',
    birthday: '',
    anniversary: '',
    focus: 'FEMALE',
  },
  drawerService: null,
  sessionDrawerOpen: false,
  profileDrawerOpen: false,
  decisionModalOpen: false,
  decisionModalService: null,

  setAppScreen: (screen) => set({ appScreen: screen }),
  setGender: (gender) => set({ gender, activeSubCategory: '' }),
  setActiveCategory: (cat) => set({ activeCategory: cat, activeSubCategory: '' }),
  setActiveSubCategory: (sub) => set({ activeSubCategory: sub }),

  addToCart: (service, variant) => {
    const existing = get().cart.find(
      (i) => i.service.id === service.id && i.selectedVariant?.label === variant?.label
    );
    if (existing) {
      set({
        cart: get().cart.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ cart: [...get().cart, { service, selectedVariant: variant, quantity: 1 }] });
    }
  },

  removeFromCart: (serviceId) =>
    set({ cart: get().cart.filter((i) => i.service.id !== serviceId) }),

  clearCart: () => set({ cart: [] }),
  setDrawerService: (service) => set({ drawerService: service }),
  setSessionDrawerOpen: (open) => set({ sessionDrawerOpen: open }),
  setProfileDrawerOpen: (open) => set({ profileDrawerOpen: open }),
  setDecisionModal: (open, service = null) =>
    set({ decisionModalOpen: open, decisionModalService: service ?? null }),

  updateProfile: (profile) =>
    set({ profile: { ...get().profile, ...profile } }),

  getTotalPrice: () =>
    get().cart.reduce((sum, i) => {
      const price = i.selectedVariant?.price ?? i.service.price;
      return sum + price * i.quantity;
    }, 0),

  getTotalDuration: () =>
    get().cart.reduce((sum, i) => {
      const dur = i.selectedVariant?.duration ?? i.service.duration;
      return sum + dur * i.quantity;
    }, 0),
}));
