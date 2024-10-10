"use client";

import React, { useState } from "react";
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
import { Contact } from "@/utils/types";

const SearchPage = ({
  children,
  filteredContacts,
  className,
}: {
  children: React.ReactNode;
  filteredContacts: Contact[];
  className: string;
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<Contact>();

  return (
    <div className={className}>
      {show && (
        <div className={"absolute top-0 z-50 h-full w-full"}>
          <Command className="h-full rounded-lg border bg-white shadow-md">
            <CommandInput
              placeholder="Type a command or search..."
              className="py-6"
              icon={
                <ArrowLeftIcon
                  className="hover:cursor-pointer"
                  onClick={() => setShow((prev) => !prev)}
                />
              }
            />
            <CommandList className="max-h-full">
              <CommandEmpty>Loading Please wait...</CommandEmpty>
              <CommandGroup>
                {filteredContacts.map((value, indx) => (
                  <CommandItem key={indx}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage
                          src={(value?.photos?.[0].url as string) || ""}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <p>
                          {value?.names
                            ? value?.names[0].displayName
                            : "Not-Provided"}
                        </p>
                        <p>
                          {value?.phoneNumbers && value?.phoneNumbers[0]?.value
                            ? value?.phoneNumbers[0]?.canonicalForm
                              ? value?.phoneNumbers[0]?.canonicalForm
                              : value?.phoneNumbers[0]?.value
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
