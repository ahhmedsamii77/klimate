import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

export default function ErrorWeatherData({
  error,
  getCoords,
}: {
  error: string;
  getCoords: () => void;
}) {
  return (
    <Alert className="bg-background/60" variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Unable to access your location</AlertTitle>
      <AlertDescription className="space-y-3 mt-1">
        <p className="text-sm">{error}</p>
        <Button
          onClick={getCoords}
          className="cursor-pointer bg-background/60!"
          variant="outline"
          size="sm"
        >
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  );
}
