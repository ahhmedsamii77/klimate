import { Link } from "react-router-dom";
import Logo from '@/assets/logo.png';
import LogoDark from '@/assets/logo2.png';
import { useTheme } from "@/Context/theme-provider";
import SearchButtton from "@/components/SearchButtton/SearchButtton";
import ToggleTheme from "@/components/ToggleTheme/ToggleTheme";
import Signin from "@/components/Signin/Signin";
export default function Navbar() {
  const { theme } = useTheme();
  const isDark = theme == 'dark';
  return (
    <nav className="sticky top-0 z-50 w-full border bg-background/60">
      <div className=" h-20  flex items-center justify-between container mx-auto py-8 px-6 md:px-2  xl:px-25">
        <Link to='/'>
          <img className="w-14 h-14" src={isDark ? Logo : LogoDark} alt="Klimate" />
        </Link>
        <div className="flex items-center gap-8">
          <SearchButtton />
          <ToggleTheme />
          <Signin />
        </div>
      </div>
    </nav>
  )
}
