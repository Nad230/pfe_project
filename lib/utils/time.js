export function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const pad = (num) => num.toString().padStart(2, '0');
  
  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
}
