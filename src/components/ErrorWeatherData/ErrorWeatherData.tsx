import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

export default function ErrorWeatherData({ error, getCoords }: { error: string, getCoords: () => void }) {
  return (
    <Alert className="bg-background/60" variant="destructive">
      <AlertTriangle />
      <AlertTitle>Unable to acces your location.</AlertTitle>
      <AlertDescription>
        <p className="mb-2">{error}</p>
        <Button onClick={getCoords} className="cursor-pointer bg-background/60!" variant={'outline'}>retry</Button>
      </AlertDescription>
    </Alert>
  )
}
