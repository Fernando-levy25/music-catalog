export function formatDuration(ms) {
  if (!ms || isNaN(ms)) return 'Não informada';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} min`;
}