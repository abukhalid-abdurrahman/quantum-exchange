import CountdownTimer from "@/components/CountdownTimer";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface SwapTimerProps {
  refetch: () => void;
}

export default function SwapTimer({ refetch }: SwapTimerProps) {
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    if (!timeLeft) {
      refetch();
      setTimeLeft(180);
    }
  }, [timeLeft]);

  return (
    <div className="">
      <Tooltip>
        <TooltipTrigger className="flex gap-2 items-center hover:opacity-80">
          <Clock size={19} />
          <div className="flex justify-end">
            <CountdownTimer
              withLetters={true}
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          Exchange rate is updated every 3 minutes
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
