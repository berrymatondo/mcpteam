import { PermissionsHeader } from "@/components/permissions/permissions-header"
import { RolesTable } from "@/components/permissions/roles-table"
import { PermissionsMatrix } from "@/components/permissions/permissions-matrix"

export default function PermissionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PermissionsHeader />
      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <RolesTable />
          <PermissionsMatrix />
        </div>
      </div>
    </div>
  )
}
