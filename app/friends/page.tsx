import React from "react";
import { auth } from "@/auth";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import SearchPage from "@/components/search-page";

const FriendsPage = async () => {
  const session = await auth();

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold">
        Welcome to the Splitwise, {session?.user.name?.split(" ")[0]}!
      </h3>
      <div className="mx-auto mt-8 flex max-w-64 flex-col items-center justify-center space-y-4">
        <div className="aspect-square rounded-full bg-gray-200">
          <Image
            src={"/assets/images/friends.svg"}
            width={200}
            height={200}
            alt="Friends Image"
            className="aspect-square h-full w-full"
          />
        </div>
        <p className="text-center tracking-wide text-gray-600">
          As you use Splitwise, friends and group mates will show here
        </p>
      </div>

      <SearchPage className="mx-auto mt-4 flex h-full items-center justify-center">
        <Button
          className="flex items-center justify-center gap-2 border-green-800 py-6 text-lg text-green-800"
          variant={"outline"}
        >
          <UserRoundPlus className="h-5 w-5" />
          Add more friends
        </Button>
      </SearchPage>
    </div>
  );
};

export default FriendsPage;
