import { create } from 'zustand';

export type Gender = 'MALE' | 'FEMALE';
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

export type BottomTab = 'menu' | 'ourwork' | 'products' | 'rewards';

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  benefits: string[];
  category: CategoryName;
  subCategory: string;
  gender: Gender;
}

export interface SessionItem {
  service: Service;
  quantity: number;
}

interface SessionStore {
  appScreen: 'intro' | 'gender' | 'main';
  gender: Gender;
  activeCategory: CategoryName;
  activeSubCategory: string;
  activeBottomTab: BottomTab;
  selectedService: Service | null;
  drawerOpen: boolean;
  sessionDrawerOpen: boolean;
  sessionItems: SessionItem[];
  showDecisionModal: boolean;
  lastAddedService: Service | null;
  setAppScreen: (screen: 'intro' | 'gender' | 'main') => void;
  setGender: (gender: Gender) => void;
  setActiveCategory: (cat: CategoryName) => void;
  setActiveSubCategory: (sub: string) => void;
  setActiveBottomTab: (tab: BottomTab) => void;
  selectService: (service: Service | null) => void;
  setDrawerOpen: (open: boolean) => void;
  setSessionDrawerOpen: (open: boolean) => void;
  addToSession: (service: Service) => void;
  removeFromSession: (serviceId: string) => void;
  setShowDecisionModal: (show: boolean) => void;
  totalPrice: () => number;
  totalDuration: () => number;
  itemCount: () => number;
}

export const useSessionStore = create<SessionStore>((set, get) => ({
  appScreen: 'intro',
  gender: 'MALE',
  activeCategory: 'HAIR STYLING',
  activeSubCategory: 'Cuts',
  activeBottomTab: 'menu',
  selectedService: null,
  drawerOpen: false,
  sessionDrawerOpen: false,
  sessionItems: [],
  showDecisionModal: false,
  lastAddedService: null,
  setAppScreen: (screen) => set({ appScreen: screen }),
  setGender: (gender) => set({ gender, activeCategory: 'HAIR STYLING', activeSubCategory: 'Cuts', selectedService: null, drawerOpen: false }),
  setActiveCategory: (activeCategory) => set({ activeCategory, activeSubCategory: '', selectedService: null, drawerOpen: false }),
  setActiveSubCategory: (activeSubCategory) => set({ activeSubCategory, selectedService: null, drawerOpen: false }),
  setActiveBottomTab: (activeBottomTab) => set({ activeBottomTab }),
  selectService: (selectedService) => set({ selectedService, drawerOpen: !!selectedService }),
  setDrawerOpen: (drawerOpen) => set({ drawerOpen, selectedService: drawerOpen ? get().selectedService : null }),
  setSessionDrawerOpen: (sessionDrawerOpen) => set({ sessionDrawerOpen }),
  addToSession: (service) => {
    const items = get().sessionItems;
    const existing = items.find(i => i.service.id === service.id);
    if (existing) return;
    set({ sessionItems: [...items, { service, quantity: 1 }], lastAddedService: service, showDecisionModal: true, drawerOpen: false, selectedService: null });
  },
  removeFromSession: (serviceId) => set({ sessionItems: get().sessionItems.filter(i => i.service.id !== serviceId) }),
  setShowDecisionModal: (showDecisionModal) => set({ showDecisionModal }),
  totalPrice: () => get().sessionItems.reduce((sum, i) => sum + i.service.price * i.quantity, 0),
  totalDuration: () => get().sessionItems.reduce((sum, i) => sum + i.service.duration * i.quantity, 0),
  itemCount: () => get().sessionItems.length,
}));
