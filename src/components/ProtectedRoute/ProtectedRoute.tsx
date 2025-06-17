import { useAuth } from "@clerk/clerk-react"
import { ReactNode } from "react";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) {
    return <SkeletonLoader />;
  }
  if (isSignedIn) {
    return children;
  }
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h1 className="text-7xl">Please Sign in to continue.</h1>
    </div>
  )
}
