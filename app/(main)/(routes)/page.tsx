import { ModeToggle } from "@/components/themes/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
        <UserButton />
        <ModeToggle />
    </div>
  );
}
