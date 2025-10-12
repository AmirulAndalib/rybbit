import { Pause, Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { Slider } from "../../../../components/ui/slider";
import { useTimelineSessions } from "../hooks/useTimelineSessions";
import { useTimelineStore } from "../timelineStore";
import { formatTimelineTime, generateTimeWindows, WINDOW_SIZE_OPTIONS } from "../timelineUtils";

export function TimelineScrubber() {
  const { currentTime, timeRange, windowSize, setCurrentTime, setManualWindowSize } = useTimelineStore();
  const { activeSessions, allSessions, isLoading } = useTimelineSessions();
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle window size change
  const handleWindowSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setManualWindowSize(newSize);
  };

  // Generate time windows for the slider
  const timeWindows = useMemo(() => {
    if (!timeRange) return [];
    return generateTimeWindows(timeRange.start, timeRange.end, windowSize);
  }, [timeRange, windowSize]);

  // Get current window index
  const currentIndex = useMemo(() => {
    if (!currentTime || timeWindows.length === 0) return 0;
    const index = timeWindows.findIndex(w => w.equals(currentTime));
    return index >= 0 ? index : 0;
  }, [currentTime, timeWindows]);

  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    const index = value[0];
    if (timeWindows[index]) {
      setCurrentTime(timeWindows[index]);
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || timeWindows.length === 0) return;

    const interval = setInterval(() => {
      const nextIndex = currentIndex + 1;
      if (nextIndex >= timeWindows.length) {
        // Loop back to start
        setCurrentTime(timeWindows[0]);
        setIsPlaying(false);
      } else {
        setCurrentTime(timeWindows[nextIndex]);
      }
    }, 500); // Update every 500ms

    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, timeWindows, setCurrentTime]);

  if (isLoading || !timeRange || timeWindows.length === 0) {
    return null;
  }

  return (
    <div className="w-[calc(100%-32px)] flex flex-col gap-1">
      <Slider
        value={[currentIndex]}
        max={timeWindows.length - 1}
        step={1}
        onValueChange={handleSliderChange}
        className="flex-1"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 w-full">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded hover:bg-neutral-800 transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-neutral-300" /> : <Play className="w-4 h-4 text-neutral-300" />}
          </button>
          <span className="text-xs text-neutral-400 min-w-[80px]">
            {currentTime ? formatTimelineTime(currentTime, windowSize) : ""}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Select value={windowSize.toString()} onValueChange={handleWindowSizeChange}>
            <SelectTrigger className="w-[130px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {WINDOW_SIZE_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="text-xs text-neutral-400 flex items-center gap-1 whitespace-nowrap">
            <span className="font-bold text-accent-400">
              {activeSessions.length} / {allSessions.length}
            </span>{" "}
            sessions
          </div>
        </div>
      </div>
    </div>
  );
}
