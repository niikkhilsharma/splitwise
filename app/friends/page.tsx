"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { Contact } from "@/utils/types";

const SearchPage = dynamic(() => import("@/components/search-page"), {
  loading: () => <p className="mt-8 text-center">Loading....</p>,
});

const FriendsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    image: string;
  }>();

  useEffect(() => {
    async function getAllContacts() {
      const res = await fetch("/api/contacts/get");
      const contacts = await res.json();
      setContacts(contacts.response.connections);
      setUser(contacts.user);
      console.log(contacts);
    }
    getAllContacts();
  }, []);

  return (
    <div className="p-4">
      <h3 className="truncate text-lg font-semibold">
        Welcome to the Splitwise, {user && user.name.split(" ")[0]}
      </h3>
      <div className="mx-auto mt-8 flex max-w-64 flex-col items-center justify-center space-y-4">
        <div className="aspect-square rounded-full bg-gray-200">
          <Image
            src={"/assets/images/friends.png"}
            width={200}
            height={200}
            alt="Friends Image"
            className="aspect-square h-full w-full"
            loading="lazy"
          />
        </div>
        <p className="text-center tracking-wide text-gray-600">
          As you use Splitwise, friends and group mates will show here
        </p>
      </div>

      {contacts && (
        <SearchPage
          className="mx-auto mt-4 flex h-full items-center justify-center"
          filteredContacts={contacts}
        >
          <Button
            className="flex items-center justify-center gap-2 border-green-800 py-6 text-lg text-green-800"
            variant={"outline"}
          >
            <UserRoundPlus className="h-5 w-5" />
            Add more friends
          </Button>
        </SearchPage>
      )}
    </div>
  );
};

export default FriendsPage;
