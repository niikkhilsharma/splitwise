import { Button } from "@/components/ui/button";
import { ReceiptText } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <div className="p-4">
      <Button className="flex gap-2 rounded-3xl bg-green-700 p-6 text-lg font-semibold hover:bg-green-700/90">
        <ReceiptText />
        Add expense
      </Button>
    </div>
  );
}
