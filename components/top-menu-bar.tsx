import { Diamond, Search, UserRoundPlus } from "lucide-react";
import React from "react";

const TopMenuBar = () => {
  return (
    <div className="flex justify-end gap-8 border-b-2 border-gray-300 p-4">
      <Search />
      <UserRoundPlus />
    </div>
  );
};

export default TopMenuBar;
