import React from "react";
import { signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  BellIcon,
  Gem,
  Lock,
  LogOut,
  Mail,
  MessageCircleQuestion,
  QrCode,
  Star,
} from "lucide-react";

const AccountsPage = async () => {
  const session = await auth();
  return (
    <div className="py-4">
      <h3 className="mb-4 px-4 text-2xl">Account</h3>
      <div className="flex items-center gap-4 px-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={session?.user?.image as string} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg">{session?.user?.name}</h3>
          <h4>{session?.user?.email}</h4>
        </div>
      </div>
      <Separator className="mb-6 mt-4 w-full" />
      <div className="space-y-6 px-4">
        <div className="space-y-4">
          <div className="flex items-center gap-6">
            <QrCode />
            <p className="text-lg">Scan Code</p>
          </div>
          <div className="flex items-center gap-6">
            <Gem />
            <p className="text-lg">Splitwise Pro</p>
          </div>
        </div>
        <p>Preferences</p>
        <div className="space-y-4">
          <div className="flex items-center gap-6">
            <Mail />
            <p className="text-lg">Email Settings</p>
          </div>
          <div className="flex items-center gap-6">
            <BellIcon />
            <p className="text-lg">
              Device and push notification <br /> settings
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Lock />
            <p className="text-lg">Security</p>
          </div>
        </div>
        <p>Feedback</p>
        <div className="space-y-4">
          <div className="flex items-center gap-6">
            <Star />
            <p className="text-lg">Rate Splitwise</p>
          </div>
          <div className="flex items-center gap-6">
            <MessageCircleQuestion />
            <p className="text-lg">Contact Splitwise support</p>
          </div>
        </div>
      </div>
      <Separator className="mb-8 mt-4" />
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <div className="flex items-center gap-6">
          <Button type="submit" variant={"ghost"} className="text-lg">
            <LogOut className="mr-6" />
            Log Out
            {/* <p className="text-lg">Log Out</p> */}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountsPage;
