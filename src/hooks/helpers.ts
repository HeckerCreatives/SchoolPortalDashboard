export  const formatDate = (date: string) => {
    const formattedDate = date.split('T');
    return formattedDate[0]
}

export const formatTimeRange = (timeRange: string) => {
    const [start, end] = timeRange.split(" - ");
  
    const formatTime = (time: string): string => {
      const [hour, minute] = time.split(":").map(Number);
      const date = new Date();
      date.setHours(hour, minute);
  
      // Format to 12-hour time with AM/PM
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    };
  
    return `${formatTime(start)} - ${formatTime(end)}`;
  }