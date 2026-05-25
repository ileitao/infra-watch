import useAppStore from '../store/appStore';
import seed from '../data/seed';

export const bootstrapApp = () => {
  const { setCurrentUser, setCurrentOrgId, setCurrentMembership } =
    useAppStore.getState();

  // simulate "alice is logged in, viewing acme"
  const user = seed.users.find((u) => u.id === 'user_alice')!;
  const membership = seed.memberships.find(
    (m) => m.userId === 'user_alice' && m.orgId === 'org_acme',
  )!;

  setCurrentUser(user);
  setCurrentOrgId('org_acme');
  setCurrentMembership(membership);
};
