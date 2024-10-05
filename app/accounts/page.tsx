import React from "react";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const AccountsPage = () => {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
};

export default AccountsPage;
