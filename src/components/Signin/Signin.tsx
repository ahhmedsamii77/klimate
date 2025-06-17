import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "../ui/button";
import { dark } from '@clerk/themes'
import { useTheme } from "@/Context/theme-provider";
export default function Signin() {
  const { theme } = useTheme();
  const isDark = theme == 'dark';
  return (
    <div>
      <SignedOut>
        <SignInButton appearance={{
          baseTheme: isDark ? dark : undefined
        }} mode="modal">
          <Button className="cursor-pointer" variant={'default'}>
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton appearance={{
          baseTheme: isDark ? dark : undefined
        }} />
      </SignedIn>
    </div>
  )
}
