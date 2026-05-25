import type { Organization, User, OrgMembership, Service, SpendEntry, Budget, Alert } from '../types';

interface SeedData {
  organizations: Organization[];
  users: User[];
  memberships: OrgMembership[];
  services: Service[];
  spendEntries: SpendEntry[];
  budgets: Budget[];
  alerts: Alert[];
}

const seed: SeedData = {
  organizations: [
    {
      id: 'org_acme',
      name: 'Acme Systems',
      createdAt: '2022-03-10',
      updatedAt: '2024-11-01',
    },
    {
      id: 'org_nova',
      name: 'Nova Labs',
      createdAt: '2023-01-15',
      updatedAt: '2025-02-20',
    },
    {
      id: 'org_drift',
      name: 'Drift',
      createdAt: '2024-06-01',
      updatedAt: '2025-04-10',
    },
  ],

  users: [
    // Acme Systems — enterprise (4 home users + 1 shared)
    {
      id: 'user_alice',
      name: 'Alice Chen',
      email: 'alice@acmesystems.io',
      createdAt: '2022-03-12',
      updatedAt: '2024-10-05',
    },
    {
      id: 'user_bob',
      name: 'Bob Martinez',
      email: 'bob@acmesystems.io',
      createdAt: '2022-04-01',
      updatedAt: '2024-08-14',
    },
    {
      id: 'user_carol',
      name: 'Carol Kim',
      email: 'carol@acmesystems.io',
      createdAt: '2022-07-19',
      updatedAt: '2024-09-22',
    },
    {
      id: 'user_dan',
      name: 'Dan Osei',
      email: 'dan@acmesystems.io',
      createdAt: '2023-02-28',
      updatedAt: '2024-11-01',
    },

    // Nova Labs — mid-size (4 home users + 1 shared)
    {
      id: 'user_eve',
      name: 'Eve Patel',
      email: 'eve@novalabs.dev',
      createdAt: '2023-01-16',
      updatedAt: '2025-01-30',
    },
    {
      id: 'user_frank',
      name: 'Frank Liu',
      email: 'frank@novalabs.dev',
      createdAt: '2023-03-05',
      updatedAt: '2024-12-10',
    },
    {
      id: 'user_grace',
      name: 'Grace Torres',
      email: 'grace@novalabs.dev',
      createdAt: '2023-06-22',
      updatedAt: '2025-02-18',
    },
    {
      id: 'user_henry',
      name: 'Henry Walsh',
      email: 'henry@novalabs.dev',
      createdAt: '2023-09-11',
      updatedAt: '2025-02-20',
    },

    // Drift — startup (2 users only)
    {
      id: 'user_ivan',
      name: 'Ivan Novak',
      email: 'ivan@driftapp.io',
      createdAt: '2024-06-01',
      updatedAt: '2025-04-10',
    },
    {
      id: 'user_julia',
      name: 'Julia Reyes',
      email: 'julia@driftapp.io',
      createdAt: '2024-06-15',
      updatedAt: '2025-03-28',
    },
  ],

  memberships: [
    // Acme Systems (alice admin, bob/carol/dan members, henry shared from Nova as viewer)
    {
      id: 'mem_alice_acme',
      orgId: 'org_acme',
      userId: 'user_alice',
      role: 'ADMIN',
      joinedAt: '2022-03-12',
    },
    {
      id: 'mem_bob_acme',
      orgId: 'org_acme',
      userId: 'user_bob',
      role: 'MEMBER',
      joinedAt: '2022-04-01',
    },
    {
      id: 'mem_carol_acme',
      orgId: 'org_acme',
      userId: 'user_carol',
      role: 'MEMBER',
      joinedAt: '2022-07-19',
    },
    {
      id: 'mem_dan_acme',
      orgId: 'org_acme',
      userId: 'user_dan',
      role: 'MEMBER',
      joinedAt: '2023-02-28',
    },
    {
      id: 'mem_henry_acme',
      orgId: 'org_acme',
      userId: 'user_henry',
      role: 'VIEWER',
      joinedAt: '2024-01-10',
    }, // shared

    // Nova Labs (eve admin, frank/grace/henry members, alice shared from Acme as viewer)
    {
      id: 'mem_eve_nova',
      orgId: 'org_nova',
      userId: 'user_eve',
      role: 'ADMIN',
      joinedAt: '2023-01-16',
    },
    {
      id: 'mem_frank_nova',
      orgId: 'org_nova',
      userId: 'user_frank',
      role: 'MEMBER',
      joinedAt: '2023-03-05',
    },
    {
      id: 'mem_grace_nova',
      orgId: 'org_nova',
      userId: 'user_grace',
      role: 'MEMBER',
      joinedAt: '2023-06-22',
    },
    {
      id: 'mem_henry_nova',
      orgId: 'org_nova',
      userId: 'user_henry',
      role: 'MEMBER',
      joinedAt: '2023-09-11',
    },
    {
      id: 'mem_alice_nova',
      orgId: 'org_nova',
      userId: 'user_alice',
      role: 'VIEWER',
      joinedAt: '2024-03-05',
    }, // shared

    // Drift (ivan admin, julia member)
    {
      id: 'mem_ivan_drift',
      orgId: 'org_drift',
      userId: 'user_ivan',
      role: 'ADMIN',
      joinedAt: '2024-06-01',
    },
    {
      id: 'mem_julia_drift',
      orgId: 'org_drift',
      userId: 'user_julia',
      role: 'MEMBER',
      joinedAt: '2024-06-15',
    },
  ],

  services: [
    // Acme Systems — 5 services
    { id: 'svc_acme_infra',   name: 'AWS Production Infra', provider: 'AWS',    orgId: 'org_acme', createdAt: '2022-03-15', updatedAt: '2025-04-01' },
    { id: 'svc_acme_data',    name: 'AWS Data Pipeline',    provider: 'AWS',    orgId: 'org_acme', createdAt: '2022-06-10', updatedAt: '2025-04-01' },
    { id: 'svc_acme_cdn',     name: 'AWS CloudFront',       provider: 'AWS',    orgId: 'org_acme', createdAt: '2022-09-01', updatedAt: '2025-04-01' },
    { id: 'svc_acme_web',     name: 'Vercel Web App',       provider: 'VERCEL', orgId: 'org_acme', createdAt: '2023-01-20', updatedAt: '2025-04-01' },
    { id: 'svc_acme_staging', name: 'Render Staging',       provider: 'RENDER', orgId: 'org_acme', createdAt: '2023-04-05', updatedAt: '2025-04-01' },

    // Nova Labs — 4 services
    { id: 'svc_nova_api',     name: 'AWS API Backend',      provider: 'AWS',    orgId: 'org_nova', createdAt: '2023-02-01', updatedAt: '2025-04-01' },
    { id: 'svc_nova_storage', name: 'AWS S3 Storage',       provider: 'AWS',    orgId: 'org_nova', createdAt: '2023-02-01', updatedAt: '2025-04-01' },
    { id: 'svc_nova_web',     name: 'Vercel Frontend',      provider: 'VERCEL', orgId: 'org_nova', createdAt: '2023-03-10', updatedAt: '2025-04-01' },
    { id: 'svc_nova_workers', name: 'Render Workers',       provider: 'RENDER', orgId: 'org_nova', createdAt: '2023-05-18', updatedAt: '2025-04-01' },

    // Drift — 3 services
    { id: 'svc_drift_web',    name: 'Vercel App',           provider: 'VERCEL', orgId: 'org_drift', createdAt: '2024-06-05', updatedAt: '2025-04-01' },
    { id: 'svc_drift_api',    name: 'Render API',           provider: 'RENDER', orgId: 'org_drift', createdAt: '2024-06-05', updatedAt: '2025-04-01' },
    { id: 'svc_drift_aws',    name: 'AWS Storage',          provider: 'AWS',    orgId: 'org_drift', createdAt: '2024-07-01', updatedAt: '2025-04-01' },
  ],

  // 6 months: Nov 2024 → Apr 2025
  // Stories: acme_infra trending up, acme_web spikes Jan, nova_api trending up,
  //          nova_workers spikes Jan, drift_web growing fast, drift_aws spikes Mar
  spendEntries: [
    // svc_acme_infra — trending up
    { id: 'se_acme_infra_1', serviceId: 'svc_acme_infra', billingPeriod: '2024-11', date: '2024-11-01', amount: 4200 },
    { id: 'se_acme_infra_2', serviceId: 'svc_acme_infra', billingPeriod: '2024-12', date: '2024-12-01', amount: 4500 },
    { id: 'se_acme_infra_3', serviceId: 'svc_acme_infra', billingPeriod: '2025-01', date: '2025-01-01', amount: 4850 },
    { id: 'se_acme_infra_4', serviceId: 'svc_acme_infra', billingPeriod: '2025-02', date: '2025-02-01', amount: 5100 },
    { id: 'se_acme_infra_5', serviceId: 'svc_acme_infra', billingPeriod: '2025-03', date: '2025-03-01', amount: 5500 },
    { id: 'se_acme_infra_6', serviceId: 'svc_acme_infra', billingPeriod: '2025-04', date: '2025-04-01', amount: 5900 },

    // svc_acme_data — flat
    { id: 'se_acme_data_1', serviceId: 'svc_acme_data', billingPeriod: '2024-11', date: '2024-11-01', amount: 1180 },
    { id: 'se_acme_data_2', serviceId: 'svc_acme_data', billingPeriod: '2024-12', date: '2024-12-01', amount: 1220 },
    { id: 'se_acme_data_3', serviceId: 'svc_acme_data', billingPeriod: '2025-01', date: '2025-01-01', amount: 1200 },
    { id: 'se_acme_data_4', serviceId: 'svc_acme_data', billingPeriod: '2025-02', date: '2025-02-01', amount: 1190 },
    { id: 'se_acme_data_5', serviceId: 'svc_acme_data', billingPeriod: '2025-03', date: '2025-03-01', amount: 1210 },
    { id: 'se_acme_data_6', serviceId: 'svc_acme_data', billingPeriod: '2025-04', date: '2025-04-01', amount: 1200 },

    // svc_acme_cdn — trending up slightly
    { id: 'se_acme_cdn_1', serviceId: 'svc_acme_cdn', billingPeriod: '2024-11', date: '2024-11-01', amount: 610 },
    { id: 'se_acme_cdn_2', serviceId: 'svc_acme_cdn', billingPeriod: '2024-12', date: '2024-12-01', amount: 635 },
    { id: 'se_acme_cdn_3', serviceId: 'svc_acme_cdn', billingPeriod: '2025-01', date: '2025-01-01', amount: 660 },
    { id: 'se_acme_cdn_4', serviceId: 'svc_acme_cdn', billingPeriod: '2025-02', date: '2025-02-01', amount: 690 },
    { id: 'se_acme_cdn_5', serviceId: 'svc_acme_cdn', billingPeriod: '2025-03', date: '2025-03-01', amount: 720 },
    { id: 'se_acme_cdn_6', serviceId: 'svc_acme_cdn', billingPeriod: '2025-04', date: '2025-04-01', amount: 755 },

    // svc_acme_web — spike in Jan (product launch)
    { id: 'se_acme_web_1', serviceId: 'svc_acme_web', billingPeriod: '2024-11', date: '2024-11-01', amount: 320 },
    { id: 'se_acme_web_2', serviceId: 'svc_acme_web', billingPeriod: '2024-12', date: '2024-12-01', amount: 340 },
    { id: 'se_acme_web_3', serviceId: 'svc_acme_web', billingPeriod: '2025-01', date: '2025-01-01', amount: 1050 },
    { id: 'se_acme_web_4', serviceId: 'svc_acme_web', billingPeriod: '2025-02', date: '2025-02-01', amount: 365 },
    { id: 'se_acme_web_5', serviceId: 'svc_acme_web', billingPeriod: '2025-03', date: '2025-03-01', amount: 380 },
    { id: 'se_acme_web_6', serviceId: 'svc_acme_web', billingPeriod: '2025-04', date: '2025-04-01', amount: 390 },

    // svc_acme_staging — flat
    { id: 'se_acme_stg_1', serviceId: 'svc_acme_staging', billingPeriod: '2024-11', date: '2024-11-01', amount: 280 },
    { id: 'se_acme_stg_2', serviceId: 'svc_acme_staging', billingPeriod: '2024-12', date: '2024-12-01', amount: 285 },
    { id: 'se_acme_stg_3', serviceId: 'svc_acme_staging', billingPeriod: '2025-01', date: '2025-01-01', amount: 275 },
    { id: 'se_acme_stg_4', serviceId: 'svc_acme_staging', billingPeriod: '2025-02', date: '2025-02-01', amount: 290 },
    { id: 'se_acme_stg_5', serviceId: 'svc_acme_staging', billingPeriod: '2025-03', date: '2025-03-01', amount: 280 },
    { id: 'se_acme_stg_6', serviceId: 'svc_acme_staging', billingPeriod: '2025-04', date: '2025-04-01', amount: 285 },

    // svc_nova_api — trending up
    { id: 'se_nova_api_1', serviceId: 'svc_nova_api', billingPeriod: '2024-11', date: '2024-11-01', amount: 1800 },
    { id: 'se_nova_api_2', serviceId: 'svc_nova_api', billingPeriod: '2024-12', date: '2024-12-01', amount: 1950 },
    { id: 'se_nova_api_3', serviceId: 'svc_nova_api', billingPeriod: '2025-01', date: '2025-01-01', amount: 2100 },
    { id: 'se_nova_api_4', serviceId: 'svc_nova_api', billingPeriod: '2025-02', date: '2025-02-01', amount: 2300 },
    { id: 'se_nova_api_5', serviceId: 'svc_nova_api', billingPeriod: '2025-03', date: '2025-03-01', amount: 2500 },
    { id: 'se_nova_api_6', serviceId: 'svc_nova_api', billingPeriod: '2025-04', date: '2025-04-01', amount: 2700 },

    // svc_nova_storage — gradual increase
    { id: 'se_nova_sto_1', serviceId: 'svc_nova_storage', billingPeriod: '2024-11', date: '2024-11-01', amount: 95  },
    { id: 'se_nova_sto_2', serviceId: 'svc_nova_storage', billingPeriod: '2024-12', date: '2024-12-01', amount: 110 },
    { id: 'se_nova_sto_3', serviceId: 'svc_nova_storage', billingPeriod: '2025-01', date: '2025-01-01', amount: 128 },
    { id: 'se_nova_sto_4', serviceId: 'svc_nova_storage', billingPeriod: '2025-02', date: '2025-02-01', amount: 145 },
    { id: 'se_nova_sto_5', serviceId: 'svc_nova_storage', billingPeriod: '2025-03', date: '2025-03-01', amount: 162 },
    { id: 'se_nova_sto_6', serviceId: 'svc_nova_storage', billingPeriod: '2025-04', date: '2025-04-01', amount: 180 },

    // svc_nova_web — flat
    { id: 'se_nova_web_1', serviceId: 'svc_nova_web', billingPeriod: '2024-11', date: '2024-11-01', amount: 175 },
    { id: 'se_nova_web_2', serviceId: 'svc_nova_web', billingPeriod: '2024-12', date: '2024-12-01', amount: 180 },
    { id: 'se_nova_web_3', serviceId: 'svc_nova_web', billingPeriod: '2025-01', date: '2025-01-01', amount: 178 },
    { id: 'se_nova_web_4', serviceId: 'svc_nova_web', billingPeriod: '2025-02', date: '2025-02-01', amount: 182 },
    { id: 'se_nova_web_5', serviceId: 'svc_nova_web', billingPeriod: '2025-03', date: '2025-03-01', amount: 176 },
    { id: 'se_nova_web_6', serviceId: 'svc_nova_web', billingPeriod: '2025-04', date: '2025-04-01', amount: 180 },

    // svc_nova_workers — spike in Jan (batch job gone wrong)
    { id: 'se_nova_wrk_1', serviceId: 'svc_nova_workers', billingPeriod: '2024-11', date: '2024-11-01', amount: 420  },
    { id: 'se_nova_wrk_2', serviceId: 'svc_nova_workers', billingPeriod: '2024-12', date: '2024-12-01', amount: 445  },
    { id: 'se_nova_wrk_3', serviceId: 'svc_nova_workers', billingPeriod: '2025-01', date: '2025-01-01', amount: 1380 },
    { id: 'se_nova_wrk_4', serviceId: 'svc_nova_workers', billingPeriod: '2025-02', date: '2025-02-01', amount: 460  },
    { id: 'se_nova_wrk_5', serviceId: 'svc_nova_workers', billingPeriod: '2025-03', date: '2025-03-01', amount: 470  },
    { id: 'se_nova_wrk_6', serviceId: 'svc_nova_workers', billingPeriod: '2025-04', date: '2025-04-01', amount: 480  },

    // svc_drift_web — growing fast (startup traction)
    { id: 'se_drift_web_1', serviceId: 'svc_drift_web', billingPeriod: '2024-11', date: '2024-11-01', amount: 120 },
    { id: 'se_drift_web_2', serviceId: 'svc_drift_web', billingPeriod: '2024-12', date: '2024-12-01', amount: 155 },
    { id: 'se_drift_web_3', serviceId: 'svc_drift_web', billingPeriod: '2025-01', date: '2025-01-01', amount: 200 },
    { id: 'se_drift_web_4', serviceId: 'svc_drift_web', billingPeriod: '2025-02', date: '2025-02-01', amount: 255 },
    { id: 'se_drift_web_5', serviceId: 'svc_drift_web', billingPeriod: '2025-03', date: '2025-03-01', amount: 315 },
    { id: 'se_drift_web_6', serviceId: 'svc_drift_web', billingPeriod: '2025-04', date: '2025-04-01', amount: 385 },

    // svc_drift_api — flat
    { id: 'se_drift_api_1', serviceId: 'svc_drift_api', billingPeriod: '2024-11', date: '2024-11-01', amount: 85 },
    { id: 'se_drift_api_2', serviceId: 'svc_drift_api', billingPeriod: '2024-12', date: '2024-12-01', amount: 88 },
    { id: 'se_drift_api_3', serviceId: 'svc_drift_api', billingPeriod: '2025-01', date: '2025-01-01', amount: 86 },
    { id: 'se_drift_api_4', serviceId: 'svc_drift_api', billingPeriod: '2025-02', date: '2025-02-01', amount: 90 },
    { id: 'se_drift_api_5', serviceId: 'svc_drift_api', billingPeriod: '2025-03', date: '2025-03-01', amount: 87 },
    { id: 'se_drift_api_6', serviceId: 'svc_drift_api', billingPeriod: '2025-04', date: '2025-04-01', amount: 88 },

    // svc_drift_aws — flat with spike in Mar (accidental data transfer)
    { id: 'se_drift_aws_1', serviceId: 'svc_drift_aws', billingPeriod: '2024-11', date: '2024-11-01', amount: 45  },
    { id: 'se_drift_aws_2', serviceId: 'svc_drift_aws', billingPeriod: '2024-12', date: '2024-12-01', amount: 48  },
    { id: 'se_drift_aws_3', serviceId: 'svc_drift_aws', billingPeriod: '2025-01', date: '2025-01-01', amount: 52  },
    { id: 'se_drift_aws_4', serviceId: 'svc_drift_aws', billingPeriod: '2025-02', date: '2025-02-01', amount: 50  },
    { id: 'se_drift_aws_5', serviceId: 'svc_drift_aws', billingPeriod: '2025-03', date: '2025-03-01', amount: 220 },
    { id: 'se_drift_aws_6', serviceId: 'svc_drift_aws', billingPeriod: '2025-04', date: '2025-04-01', amount: 55  },
  ],

  budgets: [
    { id: 'bud_acme',  orgId: 'org_acme',  amount: 15000, period: '2025-04', createdAt: '2022-03-15', updatedAt: '2025-04-01' },
    { id: 'bud_nova',  orgId: 'org_nova',  amount: 6000,  period: '2025-04', createdAt: '2023-01-20', updatedAt: '2025-04-01' },
    { id: 'bud_drift', orgId: 'org_drift', amount: 1000,  period: '2025-04', createdAt: '2024-06-05', updatedAt: '2025-04-01' },
  ],

  alerts: [
    // Acme — 3 alerts (65% / 85% / 100% of $15,000)
    { id: 'alr_acme_info', orgId: 'org_acme', threshold: 65,  type: 'INFO',    notifiedTo: ['user_alice'],                          createdAt: '2023-01-01', updatedAt: '2025-04-01' },
    { id: 'alr_acme_warn', orgId: 'org_acme', threshold: 85,  type: 'WARNING', notifiedTo: ['user_alice', 'user_bob'],               createdAt: '2023-01-01', updatedAt: '2025-04-01' },
    { id: 'alr_acme_crit', orgId: 'org_acme', threshold: 100, type: 'ALERT',   notifiedTo: ['user_alice', 'user_bob', 'user_carol'], createdAt: '2023-01-01', updatedAt: '2025-04-01' },

    // Nova — 3 alerts (65% / 85% / 100% of $6,000)
    { id: 'alr_nova_info', orgId: 'org_nova', threshold: 65,  type: 'INFO',    notifiedTo: ['user_eve'],                createdAt: '2023-02-01', updatedAt: '2025-04-01' },
    { id: 'alr_nova_warn', orgId: 'org_nova', threshold: 85,  type: 'WARNING', notifiedTo: ['user_eve', 'user_frank'],   createdAt: '2023-02-01', updatedAt: '2025-04-01' },
    { id: 'alr_nova_crit', orgId: 'org_nova', threshold: 100, type: 'ALERT',   notifiedTo: ['user_eve'],                createdAt: '2023-02-01', updatedAt: '2025-04-01' },

    // Drift — 2 alerts (70% / 100% of $1,000)
    { id: 'alr_drift_info', orgId: 'org_drift', threshold: 70,  type: 'INFO',  notifiedTo: ['user_ivan', 'user_julia'], createdAt: '2024-06-05', updatedAt: '2025-04-01' },
    { id: 'alr_drift_crit', orgId: 'org_drift', threshold: 100, type: 'ALERT', notifiedTo: ['user_ivan'],               createdAt: '2024-06-05', updatedAt: '2025-04-01' },
  ],
};

export default seed;
