import 'dotenv/config';
import { prisma } from '../src/db';

async function main() {
  // clear existing data in correct order (respect FK constraints)
  await prisma.alert.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.spendEntry.deleteMany();
  await prisma.service.deleteMany();
  await prisma.orgMembership.deleteMany();
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();

  // organizations
  const acme = await prisma.organization.create({
    data: { name: 'Acme Systems' },
  });
  const nova = await prisma.organization.create({
    data: { name: 'Nova Labs' },
  });
  const drift = await prisma.organization.create({
    data: { name: 'Drift' },
  });

  console.log('Organizations created');

  // users
  const alice = await prisma.user.create({
    data: { name: 'Alice Chen', email: 'alice@acmesystems.io' },
  });
  const bob = await prisma.user.create({
    data: { name: 'Bob Martinez', email: 'bob@acmesystems.io' },
  });
  const carol = await prisma.user.create({
    data: { name: 'Carol Kim', email: 'carol@acmesystems.io' },
  });
  const dan = await prisma.user.create({
    data: { name: 'Dan Osei', email: 'dan@acmesystems.io' },
  });
  const eve = await prisma.user.create({
    data: { name: 'Eve Patel', email: 'eve@novalabs.dev' },
  });
  const frank = await prisma.user.create({
    data: { name: 'Frank Liu', email: 'frank@novalabs.dev' },
  });
  const grace = await prisma.user.create({
    data: { name: 'Grace Torres', email: 'grace@novalabs.dev' },
  });
  const henry = await prisma.user.create({
    data: { name: 'Henry Walsh', email: 'henry@novalabs.dev' },
  });
  const ivan = await prisma.user.create({
    data: { name: 'Ivan Novak', email: 'ivan@driftapp.io' },
  });
  const julia = await prisma.user.create({
    data: { name: 'Julia Reyes', email: 'julia@driftapp.io' },
  });

  console.log('Users created');

  // memberships
  await prisma.orgMembership.createMany({
    data: [
      { orgId: acme.id, userId: alice.id, role: 'ADMIN' },
      { orgId: acme.id, userId: bob.id, role: 'MEMBER' },
      { orgId: acme.id, userId: carol.id, role: 'MEMBER' },
      { orgId: acme.id, userId: dan.id, role: 'MEMBER' },
      { orgId: acme.id, userId: henry.id, role: 'VIEWER' },
      { orgId: nova.id, userId: eve.id, role: 'ADMIN' },
      { orgId: nova.id, userId: frank.id, role: 'MEMBER' },
      { orgId: nova.id, userId: grace.id, role: 'MEMBER' },
      { orgId: nova.id, userId: henry.id, role: 'MEMBER' },
      { orgId: nova.id, userId: alice.id, role: 'VIEWER' },
      { orgId: drift.id, userId: ivan.id, role: 'ADMIN' },
      { orgId: drift.id, userId: julia.id, role: 'MEMBER' },
    ],
  });

  console.log('Memberships created');

  // services
  const acmeInfra = await prisma.service.create({
    data: {
      name: 'AWS Production Infra',
      provider: 'AWS',
      orgId: acme.id,
    },
  });

  const acmeData = await prisma.service.create({
    data: {
      name: 'AWS Data Pipeline',
      provider: 'AWS',
      orgId: acme.id,
    },
  });

  const acmeCdn = await prisma.service.create({
    data: {
      name: 'AWS CloudFront',
      provider: 'AWS',
      orgId: acme.id,
    },
  });

  const acmeWeb = await prisma.service.create({
    data: {
      name: 'Vercel Web App',
      provider: 'VERCEL',
      orgId: acme.id,
    },
  });

  const acmeStaging = await prisma.service.create({
    data: {
      name: 'Render Staging',
      provider: 'RENDER',
      orgId: acme.id,
    },
  });

  const novaApi = await prisma.service.create({
    data: {
      name: 'AWS API Backend',
      provider: 'AWS',
      orgId: nova.id,
    },
  });

  const novaStorage = await prisma.service.create({
    data: {
      name: 'AWS S3 Storage',
      provider: 'AWS',
      orgId: nova.id,
    },
  });

  const novaWeb = await prisma.service.create({
    data: {
      name: 'Vercel Frontend',
      provider: 'VERCEL',
      orgId: nova.id,
    },
  });

  const novaWorkers = await prisma.service.create({
    data: {
      name: 'Render Workers',
      provider: 'RENDER',
      orgId: nova.id,
    },
  });

  const driftWeb = await prisma.service.create({
    data: {
      name: 'Vercel App',
      provider: 'VERCEL',
      orgId: drift.id,
    },
  });

  const driftApi = await prisma.service.create({
    data: {
      name: 'Render API',
      provider: 'RENDER',
      orgId: drift.id,
    },
  });

  const driftAws = await prisma.service.create({
    data: {
      name: 'AWS Storage',
      provider: 'AWS',
      orgId: drift.id,
    },
  });

  console.log('Services created');

  await prisma.spendEntry.createMany({
    data: [
      {
        serviceId: acmeInfra.id,
        amount: 4200,
        date: '2024-11-01',
        billingPeriod: '2024-11',
      },
      {
        serviceId: acmeInfra.id,
        amount: 4500,
        date: '2024-12-01',
        billingPeriod: '2024-12',
      },
      {
        serviceId: acmeInfra.id,
        amount: 4850,
        date: '2025-01-01',
        billingPeriod: '2025-01',
      },
      {
        serviceId: acmeInfra.id,
        amount: 5100,
        date: '2025-02-01',
        billingPeriod: '2025-02',
      },
      {
        serviceId: acmeInfra.id,
        amount: 5500,
        date: '2025-03-01',
        billingPeriod: '2025-03',
      },
      {
        serviceId: acmeInfra.id,
        amount: 5900,
        date: '2025-04-01',
        billingPeriod: '2025-04',
      },
      // acmeData
      {
        serviceId: acmeData.id,
        amount: 1180,
        date: '2024-11-01',
        billingPeriod: '2024-11',
      },
      {
        serviceId: acmeData.id,
        amount: 1220,
        date: '2024-12-01',
        billingPeriod: '2024-12',
      },
      {
        serviceId: acmeData.id,
        amount: 1200,
        date: '2025-01-01',
        billingPeriod: '2025-01',
      },
      {
        serviceId: acmeData.id,
        amount: 1190,
        date: '2025-02-01',
        billingPeriod: '2025-02',
      },
      {
        serviceId: acmeData.id,
        amount: 1210,
        date: '2025-03-01',
        billingPeriod: '2025-03',
      },
      {
        serviceId: acmeData.id,
        amount: 1200,
        date: '2025-04-01',
        billingPeriod: '2025-04',
      },
      // acmeCdn
      {
        serviceId: acmeCdn.id,
        amount: 610,
        date: '2024-11-01',
        billingPeriod: '2024-11',
      },
      {
        serviceId: acmeCdn.id,
        amount: 635,
        date: '2024-12-01',
        billingPeriod: '2024-12',
      },
      {
        serviceId: acmeCdn.id,
        amount: 660,
        date: '2025-01-01',
        billingPeriod: '2025-01',
      },
      {
        serviceId: acmeCdn.id,
        amount: 690,
        billingPeriod: '2025-02',
        date: '2025-02-01',
      },
      {
        serviceId: acmeCdn.id,
        amount: 720,
        date: '2025-03-01',
        billingPeriod: '2025-03',
      },
      {
        serviceId: acmeCdn.id,
        amount: 755,
        date: '2025-04-01',
        billingPeriod: '2025-04',
      },
      // acmeWeb
      {
        serviceId: acmeWeb.id,
        amount: 320,
        date: '2024-11-01',
        billingPeriod: '2024-11',
      },
      {
        serviceId: acmeWeb.id,
        amount: 340,
        date: '2024-12-01',
        billingPeriod: '2024-12',
      },
      {
        serviceId: acmeWeb.id,
        amount: 1050,
        date: '2025-01-01',
        billingPeriod: '2025-01',
      },
      {
        serviceId: acmeWeb.id,
        amount: 365,
        date: '2025-02-01',
        billingPeriod: '2025-02',
      },
      {
        serviceId: acmeWeb.id,
        amount: 380,
        date: '2025-03-01',
        billingPeriod: '2025-03',
      },
      {
        serviceId: acmeWeb.id,
        amount: 390,
        date: '2025-04-01',
        billingPeriod: '2025-04',
      },
      // acmeStaging
      {
        serviceId: acmeStaging.id,
        amount: 280,
        date: '2024-11-01',
        billingPeriod: '2024-11',
      },
      {
        serviceId: acmeStaging.id,
        amount: 285,
        date: '2024-12-01',
        billingPeriod: '2024-12',
      },
      {
        serviceId: acmeStaging.id,
        amount: 275,
        date: '2025-01-01',
        billingPeriod: '2025-01',
      },
      {
        serviceId: acmeStaging.id,
        amount: 290,
        date: '2025-02-01',
        billingPeriod: '2025-02',
      },
      {
        serviceId: acmeStaging.id,
        amount: 280,
        date: '2025-03-01',
        billingPeriod: '2025-03',
      },
      {
        serviceId: acmeStaging.id,
        amount: 285,
        date: '2025-04-01',
        billingPeriod: '2025-04',
      },
      // novaApi
      {
        serviceId: novaApi.id,
        amount: 1800,
        date: '2024-11-01',
        billingPeriod: '2024-11',
      },
      {
        serviceId: novaApi.id,
        amount: 1950,
        date: '2024-12-01',
        billingPeriod: '2024-12',
      },
      {
        serviceId: novaApi.id,
        amount: 2100,
        date: '2025-01-01',
        billingPeriod: '2025-01',
      },
      {
        serviceId: novaApi.id,
        amount: 2300,
        date: '2025-02-01',
        billingPeriod: '2025-02',
      },
      {
        serviceId: novaApi.id,
        amount: 2500,
        date: '2025-03-01',
        billingPeriod: '2025-03',
      },
      {
        serviceId: novaApi.id,
        amount: 2700,
        date: '2025-04-01',
        billingPeriod: '2025-04',
      },
      // novaStorage
      {
        serviceId: novaStorage.id,
        amount: 95,
        date: '2024-11-01',
        billingPeriod: '2024-11',
      },
      {
        serviceId: novaStorage.id,
        amount: 110,
        date: '2024-12-01',
        billingPeriod: '2024-12',
      },
      {
        serviceId: novaStorage.id,
        amount: 128,
        date: '2025-01-01',
        billingPeriod: '2025-01',
      },
      {
        serviceId: novaStorage.id,
        amount: 145,
        date: '2025-02-01',
        billingPeriod: '2025-02',
      },
      {
        serviceId: novaStorage.id,
        amount: 162,
        date: '2025-03-01',
        billingPeriod: '2025-03',
      },
      {
        serviceId: novaStorage.id,
        amount: 180,
        date: '2025-04-01',
        billingPeriod: '2025-04',
      },
      // novaWorkers
      {
        serviceId: novaWeb.id,
        amount: 175,
        date: '2024-11-01',
        billingPeriod: '2024-11',
      },
      {
        serviceId: novaWeb.id,
        amount: 180,
        date: '2024-12-01',
        billingPeriod: '2024-12',
      },
      {
        serviceId: novaWeb.id,
        amount: 178,
        date: '2025-01-01',
        billingPeriod: '2025-01',
      },
      {
        serviceId: novaWeb.id,
        amount: 182,
        date: '2025-02-01',
        billingPeriod: '2025-02',
      },
      {
        serviceId: novaWeb.id,
        amount: 176,
        date: '2025-03-01',
        billingPeriod: '2025-03',
      },
      {
        serviceId: novaWeb.id,
        amount: 180,
        date: '2025-04-01',
        billingPeriod: '2025-04',
      },
      // novaWorkers
      {
        serviceId: novaWorkers.id,
        amount: 420,
        date: '2024-11-01',
        billingPeriod: '2024-11',
      },
      {
        serviceId: novaWorkers.id,
        amount: 445,
        date: '2024-12-01',
        billingPeriod: '2024-12',
      },
      {
        serviceId: novaWorkers.id,
        amount: 1380,
        date: '2025-01-01',
        billingPeriod: '2025-01',
      },
      {
        serviceId: novaWorkers.id,
        amount: 460,
        date: '2025-02-01',
        billingPeriod: '2025-02',
      },
      {
        serviceId: novaWorkers.id,
        amount: 470,
        date: '2025-03-01',
        billingPeriod: '2025-03',
      },
      {
        serviceId: novaWorkers.id,
        amount: 480,
        date: '2025-04-01',
        billingPeriod: '2025-04',
      },
      // driftWeb
      {
        serviceId: driftWeb.id,
        amount: 120,
        date: '2024-11-01',
        billingPeriod: '2024-11',
      },
      {
        serviceId: driftWeb.id,
        amount: 155,
        date: '2024-12-01',
        billingPeriod: '2024-12',
      },
      {
        serviceId: driftWeb.id,
        amount: 200,
        date: '2025-01-01',
        billingPeriod: '2025-01',
      },
      {
        serviceId: driftWeb.id,
        amount: 255,
        date: '2025-02-01',
        billingPeriod: '2025-02',
      },
      {
        serviceId: driftWeb.id,
        amount: 315,
        date: '2025-03-01',
        billingPeriod: '2025-03',
      },
      {
        serviceId: driftWeb.id,
        amount: 385,
        date: '2025-04-01',
        billingPeriod: '2025-04',
      },
      // driftApi
      {
        serviceId: driftApi.id,
        amount: 85,
        date: '2024-11-01',
        billingPeriod: '2024-11',
      },
      {
        serviceId: driftApi.id,
        amount: 88,
        date: '2024-12-01',
        billingPeriod: '2024-12',
      },
      {
        serviceId: driftApi.id,
        amount: 86,
        date: '2025-01-01',
        billingPeriod: '2025-01',
      },
      {
        serviceId: driftApi.id,
        amount: 90,
        date: '2025-02-01',
        billingPeriod: '2025-02',
      },
      {
        serviceId: driftApi.id,
        amount: 87,
        date: '2025-03-01',
        billingPeriod: '2025-03',
      },
      {
        serviceId: driftApi.id,
        amount: 88,
        date: '2025-04-01',
        billingPeriod: '2025-04',
      },
      // driftAws
      {
        serviceId: driftAws.id,
        amount: 45,
        date: '2024-11-01',
        billingPeriod: '2024-11',
      },
      {
        serviceId: driftAws.id,
        amount: 48,
        date: '2024-12-01',
        billingPeriod: '2024-12',
      },
      {
        serviceId: driftAws.id,
        amount: 52,
        date: '2025-01-01',
        billingPeriod: '2025-01',
      },
      {
        serviceId: driftAws.id,
        amount: 50,
        date: '2025-02-01',
        billingPeriod: '2025-02',
      },
      {
        serviceId: driftAws.id,
        amount: 220,
        date: '2025-03-01',
        billingPeriod: '2025-03',
      },
      {
        serviceId: driftAws.id,
        amount: 55,
        date: '2025-04-01',
        billingPeriod: '2025-04',
      },
    ],
  });

  // alerts
  await prisma.alert.create({
    data: {
      orgId: acme.id,
      threshold: 65,
      type: 'INFO',
      notifiedTo: [alice.id],
    },
  });
  await prisma.alert.create({
    data: {
      orgId: acme.id,
      threshold: 85,
      type: 'WARNING',
      notifiedTo: [alice.id, bob.id],
    },
  });
  await prisma.alert.create({
    data: {
      orgId: acme.id,
      threshold: 100,
      type: 'ALERT',
      notifiedTo: [alice.id, bob.id, carol.id],
    },
  });
  await prisma.alert.create({
    data: {
      orgId: nova.id,
      threshold: 65,
      type: 'INFO',
      notifiedTo: [eve.id],
    },
  });
  await prisma.alert.create({
    data: {
      orgId: nova.id,
      threshold: 85,
      type: 'WARNING',
      notifiedTo: [eve.id, frank.id],
    },
  });
  await prisma.alert.create({
    data: {
      orgId: nova.id,
      threshold: 100,
      type: 'ALERT',
      notifiedTo: [eve.id],
    },
  });
  await prisma.alert.create({
    data: {
      orgId: drift.id,
      threshold: 70,
      type: 'INFO',
      notifiedTo: [ivan.id, julia.id],
    },
  });
  await prisma.alert.create({
    data: {
      orgId: drift.id,
      threshold: 100,
      type: 'ALERT',
      notifiedTo: [ivan.id],
    },
  });

  // budget
  await prisma.budget.create({
    data: {
      orgId: acme.id,
      amount: 8000,
      period: '2025-04',
    },
  });
  await prisma.budget.create({
    data: {
      orgId: nova.id,
      amount: 6000,
      period: '2025-04',
    },
  });
  await prisma.budget.create({
    data: {
      orgId: drift.id,
      amount: 1000,
      period: '2025-04',
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
