import { formatDuration, formatDate, sanitizeText, PLACEHOLDER_IMAGE } from './utils.js';

const resultsGrid = document.getElementById('results-grid');
const statusMessage = document.getElementById('status-message');
const modal = document.getElementById('detail-modal');
const modalContent = document.getElementById('modal-content');

// Exibe mensagem de feedback (Carregamento, Erro ou Sem Resultados)
export function showStatus(message, type = 'info') {
  statusMessage.classList.remove('hidden', 'bg-blue-900/50', 'text-blue-200', 'bg-red-900/50', 'text-red-200', 'bg-yellow-900/50', 'text-yellow-200');
  
  if (type === 'loading') {
    statusMessage.classList.add('bg-blue-900/50', 'text-blue-200');
  } else if (type === 'error') {
    statusMessage.classList.add('bg-red-900/50', 'text-red-200');
  } else {
    statusMessage.classList.add('bg-yellow-900/50', 'text-yellow-200');
  }

  statusMessage.textContent = message;
}

export function hideStatus() {
  statusMessage.classList.add('hidden');
}

// Limpa a grelha de resultados
export function clearResults() {
  resultsGrid.innerHTML = '';
}

// Ordena a lista de faixas (RF04)
export function sortTracks(tracks, sortBy) {
  const sorted = [...tracks];
  if (sortBy === 'title') {
    sorted.sort((a, b) => (a.trackName || '').localeCompare(b.trackName || ''));
  } else if (sortBy === 'artist') {
    sorted.sort((a, b) => (a.artistName || '').localeCompare(b.artistName || ''));
  } else if (sortBy === 'date') {
    sorted.sort((a, b) => new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0));
  }
  return sorted;
}

// Renderiza a lista de resultados (RF02)
export function renderResults(tracks, onSelectTrack) {
  clearResults();

  tracks.forEach((track) => {
    const card = document.createElement('article');
    card.className = 'bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow card-hover flex flex-col justify-between p-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500';
    card.tabIndex = 0;

    const coverUrl = track.artworkUrl100 ? track.artworkUrl100.replace('100x100bb', '300x300bb') : PLACEHOLDER_IMAGE;

    card.innerHTML = `
      <img 
        src="${coverUrl}" 
        alt="Capa do álbum ${sanitizeText(track.collectionName)}" 
        class="w-full h-48 object-cover rounded-md mb-3 bg-gray-700"
        onerror="this.onerror=null; this.src='${PLACEHOLDER_IMAGE}';"
      />
      <div class="flex-grow space-y-1">
        <h3 class="font-bold text-lg text-white truncate" title="${sanitizeText(track.trackName)}">
          ${sanitizeText(track.trackName)}
        </h3>
        <p class="text-sm text-indigo-400 truncate">${sanitizeText(track.artistName)}</p>
        <p class="text-xs text-gray-400 truncate">${sanitizeText(track.collectionName)}</p>
      </div>
      <button class="mt-4 w-full text-xs font-semibold bg-gray-700 hover:bg-indigo-600 text-gray-200 py-2 rounded transition">
        Ver Detalhes
      </button>
    `;

    const handleSelect = () => onSelectTrack(track);
    card.addEventListener('click', handleSelect);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSelect();
      }
    });

    resultsGrid.appendChild(card);
  });
}

// Abre o modal de detalhamento (RF03)
export function openModal(track) {
  const coverUrl = track.artworkUrl100 ? track.artworkUrl100.replace('100x100bb', '600x600bb') : PLACEHOLDER_IMAGE;

  modalContent.innerHTML = `
    <div class="text-center space-y-3">
      <img 
        src="${coverUrl}" 
        alt="Capa do álbum de ${sanitizeText(track.trackName)}" 
        class="w-48 h-48 object-cover rounded-lg mx-auto border border-gray-600 bg-gray-700 shadow-md"
        onerror="this.onerror=null; this.src='${PLACEHOLDER_IMAGE}';"
      />
      <h2 id="modal-title" class="text-xl font-bold text-white">${sanitizeText(track.trackName)}</h2>
      <p class="text-md font-medium text-indigo-400">${sanitizeText(track.artistName)}</p>
    </div>

    <div class="border-t border-gray-700 pt-3 text-sm space-y-2 text-gray-300">
      <p><span class="font-semibold text-gray-400">Álbum:</span> ${sanitizeText(track.collectionName)}</p>
      <p><span class="font-semibold text-gray-400">Gênero:</span> ${sanitizeText(track.primaryGenreName)}</p>
      <p><span class="font-semibold text-gray-400">Data de Lançamento:</span> ${formatDate(track.releaseDate)}</p>
      <p><span class="font-semibold text-gray-400">Duração:</span> ${formatDuration(track.trackTimeMillis)}</p>
    </div>
  `;

  modal.classList.remove('hidden');
  document.getElementById('close-modal').focus();
}

export function closeModal() {
  modal.classList.add('hidden');
}