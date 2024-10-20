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
import type { Contact } from "@/utils/types";
import { Input } from "./ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Check,
  ReceiptIndianRupee,
  SendToBack,
  SquareMenu,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import { SplitType } from "@/utils/types";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  amount: z
    .string()
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value), {
      message: "Amount must be a valid number", // Ensure the value is a valid number
    })
    .refine((value) => value >= 1, {
      message: "Min amount must be ₹1", // Ensure the number is at least 1
    }),
});

const SearchPage = ({
  children,
  filteredContacts,
  className,
}: {
  children: React.ReactNode;
  filteredContacts: Contact[];
  className: string;
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const [show, setShow] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [splitId, setSplitId] = useState<number>(0);
  const [showSplitTypeScreen, setShowSplitTypeScreen] = useState<boolean>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
      amount: 0,
    },
  });

  function getAllSplits(value?: number): SplitType[] {
    const { amount } = form.getValues();

    // Remove leading zeros using a regular expression
    const parsedAmount = amount.toString().replace(/^0+/, "");
    const newAmount = parsedAmount ? parseFloat(parsedAmount) : 0; // Use 0 if the string is empty

    const allSplits = [
      {
        splitTypeId: 0,
        description: "You paid, split equally",
        message: `${selectedContact?.names[0].displayName} owes you ₹${newAmount} `,
      },
      {
        splitTypeId: 1,
        description: "You are owed the full amount",
        message: `${selectedContact?.names[0].displayName} owes you ₹${newAmount} `,
      },
      {
        splitTypeId: 2,
        description: `${selectedContact?.names[0].displayName} paid, split equally`,
        message: `You owe ${selectedContact?.names[0].displayName} ₹${newAmount}`,
      },
      {
        splitTypeId: 3,
        description: `${selectedContact?.names[0].displayName} is owed the full amount`,
        message: `You owe ${selectedContact?.names[0].displayName} ₹${newAmount}`,
      },
    ];

    if (value) {
      return [allSplits[value]];
    } else {
      return allSplits;
    }
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    router.push("/");
    toast({
      title: "Expense added successfully 💰",
    });
  }

  return (
    <div className={className}>
      {show && (
        <div
          className={
            "absolute top-0 z-50 max-h-screen min-h-screen w-full overflow-hidden bg-white"
          }
        >
          <div>
            <div className="flex items-center justify-between gap-4 p-3 px-4">
              <div className="flex items-center gap-4">
                <ArrowLeftIcon
                  className="h-6 w-6 hover:cursor-pointer"
                  onClick={() => {
                    setShow((prev) => !prev);
                    setSelectedContact(null);
                    setShowSplitTypeScreen(false);
                  }}
                />
                <h3 className="text-lg">Add expense</h3>
              </div>
              <Check onClick={form.handleSubmit(onSubmit)} />
            </div>
            <Separator />
          </div>
          {showSplitTypeScreen && selectedContact ? (
            <div className="bg-white">
              <div className="flex items-center justify-start gap-4 bg-gray-400 p-4">
                <ArrowLeftIcon className="h-6 w-6" />
                <h3 className="-ml-8 w-full text-center">
                  How was this expense split?
                </h3>
              </div>
              <div>
                {getAllSplits().map((value, indx) => (
                  <>
                    <div
                      className="p-4"
                      onClick={() => {
                        setSplitId(indx);
                        setShowSplitTypeScreen(false);
                      }}
                    >
                      <div className="flex items-center justify-start gap-4">
                        <SendToBack />
                        <span>
                          <h4>{value.description}</h4>
                          <h5 className={cn(indx >= 2 && "text-red-500")}>
                            {value.message}
                          </h5>
                        </span>
                      </div>
                    </div>
                    <Separator />
                  </>
                ))}
              </div>
            </div>
          ) : (
            <Command className="rounded-lg">
              <div className="flex items-center border-b px-4 py-3">
                <h3 className="text-nowrap">With you and:</h3>
                {!selectedContact ? (
                  <CommandInput
                    icon={false}
                    placeholder="Type a command or search..."
                    className="py-6"
                    cmdkInputWrapperClassName="border-none flex-auto"
                    disabled={selectedContact ? true : false}
                  />
                ) : (
                  <span className="mx-2 rounded-full border px-2">
                    {selectedContact && selectedContact.names[0].displayName}
                  </span>
                )}
              </div>
              {selectedContact ? (
                <div className="mt-16 flex h-2/3 w-full items-center justify-center">
                  <div className="w-2/3">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description:</FormLabel>
                              <div className="flex items-center gap-4">
                                <FormControl>
                                  <Input
                                    icon={<SquareMenu />}
                                    placeholder="Enter a description"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="amount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Amount:</FormLabel>
                              <div className="flex items-center gap-4">
                                <FormControl>
                                  <Input
                                    icon={<ReceiptIndianRupee />}
                                    placeholder="0.00"
                                    type="number"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          variant={"outline"}
                          onClick={() => setShowSplitTypeScreen(true)}
                          className="w-full"
                        >
                          {getAllSplits(splitId)[0].description}
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>
              ) : (
                <CommandList className="max-h-[88vh]">
                  <CommandEmpty>Loading Please wait...</CommandEmpty>
                  <CommandGroup>
                    {filteredContacts.map((value, indx) => (
                      <CommandItem key={indx}>
                        <div
                          className="flex items-center gap-2"
                          onClick={() => {
                            console.log(filteredContacts[indx]);
                            setSelectedContact(filteredContacts[indx]);
                          }}
                        >
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
                              {value?.phoneNumbers &&
                              value?.phoneNumbers[0]?.value
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
              )}
            </Command>
          )}
        </div>
      )}

      <div onClick={() => setShow(true)}>{children}</div>
    </div>
  );
};

export default SearchPage;
