import {
  LayoutDashboard,
  Server,
  Wallet,
  Bell,
  Users,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Link, useRouterState } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import useAppStore from '@/store/appStore';
import seed from '@/data/seed';

const NAV_LINKS = [
  { label: 'Overview', icon: LayoutDashboard, href: '/' },
  { label: 'Services', icon: Server, href: '/services' },
  { label: 'Budgets', icon: Wallet, href: '/budgets' },
  { label: 'Alerts', icon: Bell, href: '/alerts' },
  { label: 'Members', icon: Users, href: '/members' },
];

export default function Sidebar() {
  const {
    currentUser,
    currentOrgId,
    sidebarCollapsed,
    setSidebarCollapsed,
    setCurrentOrgId,
    setCurrentMembership,
  } = useAppStore();

  // orgs the current user belongs to
  const userOrgs = seed.memberships
    .filter((m) => m.userId === currentUser?.id)
    .map((m) => seed.organizations.find((o) => o.id === m.orgId)!)
    .filter(Boolean);

  const handleOrgSwitch = (orgId: string) => {
    const membership = seed.memberships.find(
      (m) => m.userId === currentUser?.id && m.orgId === orgId,
    );
    if (membership) {
      setCurrentOrgId(orgId);
      setCurrentMembership(membership);
    }
  };

  // turn "John Doe" into -> "JD"
  const initials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className={cn(
        'flex flex-col h-screen bg-card border-r transition-all duration-200 shrink-0',
        sidebarCollapsed ? 'w-14' : 'w-56',
      )}
    >
      {/* Logo + collapse toggle */}
      <div className="flex items-center justify-between h-14 px-3 border-b">
        {!sidebarCollapsed && (
          <span className="font-semibold text-sm tracking-tight">
            Infra Watch
          </span>
        )}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="ml-auto p-1.5 rounded-md hover:bg-accent text-muted-foreground"
        >
          {sidebarCollapsed ? (
            <ChevronRight size={16} />
          ) : (
            <ChevronLeft size={16} />
          )}
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {NAV_LINKS.map(({ label, icon: Icon, href }) => {
          return (
            <Link
              to={href}
              className={cn(
                'flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors',
                pathname === href
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )}
            >
              <Icon size={16} className="shrink-0" />
              {!sidebarCollapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* Org switcher */}
      <div className="px-2 py-3 space-y-0.5">
        {!sidebarCollapsed && (
          <p className="px-2 pb-1 text-xs text-muted-foreground uppercase tracking-wider">
            Organization
          </p>
        )}
        {userOrgs.map((org) => (
          <button
            key={org.id}
            onClick={() => handleOrgSwitch(org.id)}
            className={cn(
              'w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors',
              org.id === currentOrgId
                ? 'bg-accent text-accent-foreground font-medium'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            )}
          >
            <Avatar className="h-5 w-5 shrink-0">
              <AvatarFallback className="text-[10px]">
                {initials(org.name)}
              </AvatarFallback>
            </Avatar>
            {!sidebarCollapsed && (
              <span className="truncate text-left">{org.name}</span>
            )}
          </button>
        ))}
      </div>

      <Separator />

      {/* Current user */}
      <div className="px-2 py-3">
        <div
          className={cn(
            'flex items-center gap-3 px-2 py-2 rounded-md',
            sidebarCollapsed && 'justify-center',
          )}
        >
          <Avatar className="h-7 w-7 shrink-0">
            <AvatarFallback className="text-xs">
              {currentUser ? initials(currentUser.name) : '?'}
            </AvatarFallback>
          </Avatar>
          {!sidebarCollapsed && currentUser && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium truncate">
                {currentUser.name}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {currentUser.email}
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
