import { fetchTracks } from './api.js';
import { renderResults, showStatus, hideStatus, clearResults, openModal, closeModal, sortTracks } from './ui.js';

let currentTracks = [];

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const closeModalBtn = document.getElementById('close-modal');
const modal = document.getElementById('detail-modal');

async function handleSearch(event) {
  event.preventDefault();
  const query = searchInput.value.trim();

  if (!query) return;

  clearResults();
  showStatus('A carregar resultados...', 'loading');

  try {
    const results = await fetchTracks(query);
    currentTracks = results;

    if (currentTracks.length === 0) {
      showStatus('Nenhum resultado encontrado para a pesquisa.', 'warning');
      return;
    }

    hideStatus();
    applySortingAndRender();
  } catch (error) {
    showStatus('Ocorreu um erro ao procurar as músicas. Tente novamente mais tarde.', 'error');
  }
}

function applySortingAndRender() {
  if (currentTracks.length === 0) return;
  const sorted = sortTracks(currentTracks, sortSelect.value);
  renderResults(sorted, openModal);
}

searchForm.addEventListener('submit', handleSearch);
sortSelect.addEventListener('change', applySortingAndRender);

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});