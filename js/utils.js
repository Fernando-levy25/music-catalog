export function formatDuration(ms) {
  if (!ms || isNaN(ms)) return 'Não informada';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} min`;
}

export function formatDate(dateString) {
  if (!dateString) return 'Data desconhecida';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Data desconhecida';
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

export function sanitizeText(text) {
  if (text === null || text === undefined || text === '' || Number.isNaN(text)) {
    return 'Não informado';
  }
  return text;
}

export const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300x300/374151/9CA3AF?text=Sem+Capa';