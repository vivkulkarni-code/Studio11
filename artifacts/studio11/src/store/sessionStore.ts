import { create } from 'zustand';

export type Gender = 'MALE' | 'FEMALE' | 'KIDS';
export type CategoryName = 'CUTS' | 'HAIR SPA' | 'HAIR COLOR' | 'BEARD' | 'FACIAL' | 'MAKEUP' | 'MANICURE' | 'PEDICURE' | 'PACKAGES';

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // minutes
  description: string;
  benefits: string[];
  category: CategoryName;
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
  selectedService: Service | null;
  drawerOpen: boolean;
  sessionDrawerOpen: boolean;
  sessionItems: SessionItem[];
  showDecisionModal: boolean;
  lastAddedService: Service | null;
  setAppScreen: (screen: 'intro' | 'gender' | 'main') => void;
  setGender: (gender: Gender) => void;
  setActiveCategory: (cat: CategoryName) => void;
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
  activeCategory: 'CUTS',
  selectedService: null,
  drawerOpen: false,
  sessionDrawerOpen: false,
  sessionItems: [],
  showDecisionModal: false,
  lastAddedService: null,
  setAppScreen: (screen) => set({ appScreen: screen }),
  setGender: (gender) => set({ gender, activeCategory: 'CUTS', selectedService: null, drawerOpen: false }),
  setActiveCategory: (activeCategory) => set({ activeCategory, selectedService: null, drawerOpen: false }),
  selectService: (selectedService) => set({ selectedService, drawerOpen: !!selectedService }),
  setDrawerOpen: (drawerOpen) => set({ drawerOpen, selectedService: drawerOpen ? get().selectedService : null }),
  setSessionDrawerOpen: (sessionDrawerOpen) => set({ sessionDrawerOpen }),
  addToSession: (service) => {
    const items = get().sessionItems;
    const existing = items.find(i => i.service.id === service.id);
    if (existing) return; // no duplicates
    set({ sessionItems: [...items, { service, quantity: 1 }], lastAddedService: service, showDecisionModal: true, drawerOpen: false, selectedService: null });
  },
  removeFromSession: (serviceId) => set({ sessionItems: get().sessionItems.filter(i => i.service.id !== serviceId) }),
  setShowDecisionModal: (showDecisionModal) => set({ showDecisionModal }),
  totalPrice: () => get().sessionItems.reduce((sum, i) => sum + i.service.price * i.quantity, 0),
  totalDuration: () => get().sessionItems.reduce((sum, i) => sum + i.service.duration * i.quantity, 0),
  itemCount: () => get().sessionItems.length,
}));