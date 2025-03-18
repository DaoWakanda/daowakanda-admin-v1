export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp);

  // Format the date
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();

  // Format the time
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12 || 12; // Convert to 12-hour format

  return `${day} ${month} ${year}, ${hours}.${minutes} ${period}`;
}