"use client";
//import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "../toggle";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/auth-client";

const Header = () => {
  //const user = useSession();
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };
  return (
    <div className="flex justify-between items-center">
      <Link href="/">MCP</Link>
      <div className="max-w-1/2 flex-1 flex items-center justify-between">
        <ul className="flex gap-4">
          <Link className="hover:text-yellow-400" href="/candidatures">
            Candidatures
          </Link>
          <Link href="/poles">Poles</Link>
        </ul>
        <div>
          <ModeToggle />
        </div>
        <div>
          <Button onClick={() => router.push("/auth/login")}>
            Se Connecter
          </Button>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
          <Button onClick={() => router.push("/auth/register")}>
            {"S'Inscrire"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
