import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Activity, UserRound, Users } from "lucide-react";
import { auth } from "@/auth";

const BottomMenuBar = async () => {
  const session = await auth();

  return (
    <div className="flex items-center justify-between rounded-md border-t px-4 py-1">
      <Link
        href={"/group"}
        className="flex flex-col items-center justify-center"
      >
        <Users className="aspect-square h-5 w-5" />
        <p>Group</p>
      </Link>
      <Link
        href={"/friends"}
        className="flex flex-col items-center justify-center"
      >
        <UserRound className="aspect-square h-5 w-5" />
        <p>Friends</p>
      </Link>
      <Link
        href={"/activity"}
        className="flex flex-col items-center justify-center"
      >
        <Activity className="aspect-square h-5 w-5" />
        <p>Activity</p>
      </Link>
      <Link
        href={"/accounts"}
        className="flex flex-col items-center justify-center"
      >
        <Avatar className="h-6 w-6">
          <AvatarImage src={session?.user?.image as string} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>Account</p>
      </Link>
    </div>
  );
};

export default BottomMenuBar;
