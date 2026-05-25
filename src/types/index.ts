export type Role = 'ADMIN' | 'MEMBER' | 'VIEWER';
export type AlertType = 'INFO' | 'WARNING' | 'ALERT';
export type Provider = 'AWS' | 'VERCEL' | 'RENDER'; // and more

export interface Organization {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrgMembership {
  id: string;
  orgId: string;
  userId: string;
  role: Role;
  joinedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  provider: Provider;
  orgId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SpendEntry {
  id: string;
  amount: number;
  date: string;
  billingPeriod: string;
  serviceId: string;
}

export interface Budget {
  id: string;
  amount: number;
  period: string;
  orgId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Alert {
  id: string;
  orgId: string;
  threshold: number;
  type: AlertType;
  notifiedTo: ReadonlyArray<string>;
  createdAt: string;
  updatedAt: string;
}
