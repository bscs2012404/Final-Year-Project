
export default function timeAgo(isoString) {
    const currentDate = new Date();
    const targetDate = new Date(isoString);
    const timeDifferenceInSeconds = Math.floor((currentDate - targetDate) / 1000);
  
    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };
  
    for (const [unit, seconds] of Object.entries(intervals)) {
      const interval = Math.floor(timeDifferenceInSeconds / seconds);
      if (interval >= 1) {
        return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
      }
    }
  
    return 'Just now';
  }