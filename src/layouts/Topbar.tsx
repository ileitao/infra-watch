import useAppStore from '@/store/appStore';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import seed from '@/data/seed';

export default function Topbar() {
  const { currentOrgId, currentMembership } = useAppStore();

  const currentOrganization = seed.organizations.find(
    (o) => o.id === currentOrgId,
  );

  return (
    <div className="flex h-14 border-b bg-card justify-between">
      <div className="flex justify-start px-4 py-4">
        {currentOrganization && <div>{currentOrganization.name}</div>}
      </div>
      <div className="flex justify-end items-stretch px-4 py-4">
        {currentMembership && (
          <div className="px-4">
            <Badge>{currentMembership.role}</Badge>
          </div>
        )}
        <div className="px-4">
          <Bell size={16} />
        </div>
      </div>
    </div>
  );
}
