import { Link } from "react-router-dom";
import Logo from '@/assets/logo.png';
import LogoDark from '@/assets/logo2.png';
import { useTheme } from "@/Context/theme-provider";
import SearchButtton from "@/components/SearchButtton/SearchButtton";
import ToggleTheme from "@/components/ToggleTheme/ToggleTheme";
import Signin from "@/components/Signin/Signin";

export default function Navbar() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="h-16 flex items-center justify-between container mx-auto px-4 sm:px-6 xl:px-25">
        <Link to="/" aria-label="Klimate home">
          <img className="w-10 h-10 sm:w-12 sm:h-12" src={isDark ? Logo : LogoDark} alt="Klimate" />
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <SearchButtton />
          <ToggleTheme />
          <Signin />
        </div>
      </div>
    </nav>
  );
}
