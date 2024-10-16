import { Search, UserRoundPlus } from "lucide-react";

const TopMenuBar = () => {
  return (
    <div className="flex justify-end gap-8 p-4">
      <Search />
      <UserRoundPlus />
    </div>
  );
};

export default TopMenuBar;
