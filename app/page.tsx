import React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";
import { MoveRight } from "lucide-react";

export default async function Home() {
  return (
    <div className="h-full p-4">
      <h3 className="text-center text-2xl font-semibold text-gray-600">
        Welcome to SplitWise!
      </h3>
      <div className="flex h-full items-center justify-center">
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/friends" });
          }}
        >
          <Button className="gap-2 bg-green-700 py-6 text-lg hover:bg-green-700/90">
            Continue With Google
            <MoveRight />
          </Button>
        </form>
      </div>
    </div>
  );
}
