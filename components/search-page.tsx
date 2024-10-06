"use client";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

interface Contact {
  photos?: { url: string }[]; // Assuming each contact has an array of photos with a `url` property
  names: { displayName: string }[]; // Assuming each contact has an array of names with a `displayName` property
  phoneNumbers?: { canonicalForm: string }[]; // Assuming each contact may have phone numbers
}

const SearchPage = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    async function getContacts() {
      const response = await fetch("/api/contacts");
      const data = await response.json();
      const userContacts = data.response.connections;
      setContacts(userContacts);
    }
    if (show === true) {
      getContacts();
    }
  }, [show]);

  return (
    <div className={className}>
      {show && (
        <div className={"absolute top-0 z-50 h-full w-full"}>
          <Command className="h-full rounded-lg border bg-white shadow-md">
            <CommandInput
              placeholder="Type a command or search..."
              className="py-6"
              icon={<ArrowLeftIcon onClick={() => setShow(false)} />}
            />
            <CommandList className="max-h-full">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {contacts.map((value, indx) => (
                  <CommandItem key={indx}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage
                          src={(value?.photos?.[0].url as string) || ""}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <p>{value?.names[0].displayName}</p>
                        <p>
                          {value.phoneNumbers
                            ? value?.phoneNumbers[0]?.canonicalForm
                            : "no"}
                        </p>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
      <div onClick={() => setShow(true)}>{children}</div>
    </div>
  );
};

export default SearchPage;
