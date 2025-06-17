import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "@/Context/theme-provider";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const isDark = theme == 'dark';
  function handleToggleTheme() {
    if (isDark) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }
  return (
    <Button className={`cursor-pointer ${isDark ? 'rotate-180' : 'rotate-0'} transition duration-500`} onClick={handleToggleTheme} variant={'link'}>
      {isDark && <Sun className="w-6! h-6! text-yellow-500" />}
      {!isDark && <Moon className="w-6! h-6! text-blue-500" />}
    </Button>
  )
}
