import { create } from 'zustand';
import type { User, OrgMembership } from '../types';

interface AppStore {
  // state
  currentUser: User | null;
  currentOrgId: string | null;
  currentMembership: OrgMembership | null;
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  // actions
  setCurrentUser: (user: User) => void;
  setCurrentOrgId: (orgId: string) => void;
  setCurrentMembership: (membership: OrgMembership) => void;
  setTheme: (val: 'light' | 'dark') => void;
  setSidebarCollapsed: (val: boolean) => void;
}

const initialState: Pick<
  AppStore,
  | 'currentUser'
  | 'currentOrgId'
  | 'currentMembership'
  | 'sidebarCollapsed'
  | 'theme'
> = {
  currentUser: null,
  currentOrgId: null,
  currentMembership: null,
  sidebarCollapsed: true,
  theme: 'light',
};

const useAppStore = create<AppStore>()((set) => ({
  ...initialState,
  setCurrentOrgId: (orgId: string) => set({ currentOrgId: orgId }),
  setCurrentUser: (user: User) => set({ currentUser: user }),
  setCurrentMembership: (orgMembership: OrgMembership) =>
    set({ currentMembership: orgMembership }),
  setSidebarCollapsed: (val: boolean) => set({ sidebarCollapsed: val }),
  setTheme: (val) => set({ theme: val }),
  resetStore: () => set(() => initialState),
}));

export default useAppStore;
