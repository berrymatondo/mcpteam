/* import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getSession, getUser } from "@/lib/auth-server";
import { unauthorized } from "next/navigation";
import React from "react";

const AuthPage = async () => {
  const user = await getUser();
  const session = await getSession();

  console.log("Session:", session);
  console.log("User:", user);

  if (!user) {
    return unauthorized();
  }
  return (
    <Card>
      <CardHeader>User Profil</CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Name</span>
            <span>{user?.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Email</span>
            <span>{user?.email}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthPage;
 */



"use client"

import { useSession, signOut } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { User, Shield, LogOut, ArrowLeft, Mail, Calendar, Key } from "lucide-react"

type SessionUser = {
  id: string
  email: string
  emailVerified: boolean
  name: string
  createdAt: Date
  updatedAt: Date
  image?: string | null
  isAdmin?: boolean // Add this line
}

type SessionType = {
  user: SessionUser
  session: {
    id: string
    expiresAt: string | number | Date
    updatedAt: string | number | Date
    ipAddress?: string
  }
}

export default function ProfilePage() {
  const { data: session, isPending } = useSession() as { data: SessionType | null, isPending: boolean }
  const router = useRouter()

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in")
    }
  }, [session, isPending, router])

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  if (isPending) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    )
  }

  if (!session) {
    return null
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <main className="min-h-screen p-6 bg-black">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-white">Profile</h1>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={session.user.image || ""} alt={session.user.name} />
                    <AvatarFallback className="bg-gray-700 text-white text-xl">
                      {getInitials(session.user.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-white text-xl">{session.user.name}</CardTitle>
                <CardDescription className="text-gray-400">{session.user.email}</CardDescription>
                <div className="flex justify-center mt-3">
                  {session.user.isAdmin ? (
                    <Badge className="bg-red-600 hover:bg-red-700">
                      <Shield className="w-3 h-3 mr-1" />
                      Administrator
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                      <User className="w-3 h-3 mr-1" />
                      Standard User
                    </Badge>
                  )}
                </div>
              </CardHeader>
            </Card>

            {/* Admin Status Card */}
            <Card
              className={`mt-4 ${session.user.isAdmin ? "bg-red-900/20 border-red-500" : "bg-gray-900 border-gray-700"}`}
            >
              <CardHeader>
                <CardTitle
                  className={`flex items-center gap-2 ${session.user.isAdmin ? "text-red-400" : "text-white"}`}
                >
                  <Shield className="w-5 h-5" />
                  Access Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                {session.user.isAdmin ? (
                  <div className="space-y-2">
                    <p className="text-red-200 font-medium">Administrator Access</p>
                    <p className="text-red-300 text-sm">You have full administrative privileges including:</p>
                    <ul className="text-red-300 text-sm space-y-1 ml-4">
                      <li>• User management</li>
                      <li>• System configuration</li>
                      <li>• Advanced settings</li>
                      <li>• Analytics and reports</li>
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-white font-medium">Standard User Access</p>
                    <p className="text-gray-400 text-sm">
                      You have access to standard user features. Contact an administrator for elevated permissions.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Details */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Account Details
                </CardTitle>
                <CardDescription className="text-gray-400">Your personal account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <User className="w-4 h-4" />
                      Full Name
                    </div>
                    <p className="text-white font-medium">{session.user.name}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </div>
                    <p className="text-white font-medium">{session.user.email}</p>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      Account Created
                    </div>
                    <p className="text-white font-medium">
                      {new Date(session.user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Key className="w-4 h-4" />
                      Email Status
                    </div>
                    <Badge variant={session.user.emailVerified ? "default" : "destructive"}>
                      {session.user.emailVerified ? "Verified" : "Not Verified"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Session Information */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Current Session</CardTitle>
                <CardDescription className="text-gray-400">
                  Information about your current login session
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">Session ID</p>
                  <p className="text-white font-mono text-sm bg-gray-800 p-2 rounded break-all">{session.session.id}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm">Session Expires</p>
                    <p className="text-white">{new Date(session.session.expiresAt).toLocaleString()}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm">Last Updated</p>
                    <p className="text-white">{new Date(session.session.updatedAt).toLocaleString()}</p>
                  </div>
                </div>

                {session.session.ipAddress && (
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm">IP Address</p>
                    <p className="text-white font-mono">{session.session.ipAddress}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Admin Panel Access */}
            {session.user.isAdmin && (
              <Card className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-500">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Administrator Panel
                  </CardTitle>
                  <CardDescription className="text-red-300">Quick access to administrative functions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-red-200">
                    As an administrator, you have access to advanced system features and user management capabilities.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => router.push("/admin/users")}
                    >
                      Manage Users
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-400 hover:bg-red-900/20 bg-transparent"
                      onClick={() => router.push("/admin/settings")}
                    >
                      System Settings
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-400 hover:bg-red-900/20 bg-transparent"
                      onClick={() => router.push("/admin/analytics")}
                    >
                      Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
