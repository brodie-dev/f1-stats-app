const pluralise = (num: number, unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second') => {
  const pluralisedUnit = num === 1 ? unit : `${unit}s`
  
  return `${num} ${pluralisedUnit} ago`
}

export const timeSince = (date: Date) => {
  const time = date.getTime()

  const seconds = Math.floor((new Date().getTime() - time) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }

  interval = seconds / 2592000;
  if (interval > 1) {
    return pluralise(Math.floor(interval), "month")
  }

  interval = seconds / 86400;
  if (interval > 1) {
    return pluralise(Math.floor(interval), "day")
  }

  interval = seconds / 3600;
  if (interval > 1) {
    return pluralise(Math.floor(interval), "hour")
  }

  interval = seconds / 60;
  if (interval > 1) {
    return pluralise(Math.floor(interval), "minute")
  }
  
  return pluralise(Math.floor(interval), "second")
}