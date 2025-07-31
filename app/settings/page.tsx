import { SettingsHeader } from "@/components/settings/settings-header"
import { SettingsTabs } from "@/components/settings/settings-tabs"

export default function SettingsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SettingsHeader />
      <div className="flex-1 p-6">
        <SettingsTabs />
      </div>
    </div>
  )
}
