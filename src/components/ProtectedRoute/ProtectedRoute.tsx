import { useAuth } from "@clerk/clerk-react";
import { ReactNode } from "react";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import { Helmet } from "react-helmet";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <SkeletonLoader />;
  }

  if (isSignedIn) {
    return children;
  }

  return (
    <>
      <Helmet><title>Sign In – Klimate</title></Helmet>
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-5xl">🌤️</p>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
          Welcome to Klimate
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-sm">
          Sign in to view live weather data, save favourite cities, and explore
          forecasts.
        </p>
      </div>
    </>
  );
}
