# Music Explorer
 
Catálogo de músicas para pesquisar por título ou artista, ver os resultados em uma listagem e consultar os detalhes de cada faixa. Usa dados reais da iTunes Search API.
 
## Integrantes
 
* Fernando Levy
* Arthur Gabriel
## Principais funcionalidades
 
* Pesquisa de músicas por título ou artista
* Listagem dos resultados com título, artista, álbum e capa
* Detalhes da música selecionada: título, artista, álbum, capa, gênero, data de lançamento e duração
* Ordenação dos resultados por título, artista ou data de lançamento
## API utilizada
 
iTunes Search API: https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/
 
## Tecnologias
 
HTML5 semântico, Tailwind CSS (via CDN), CSS puro, JavaScript (ES modules) e `fetch`.
 
## Como executar

O projeto usa módulos JavaScript, então não funciona abrindo o `index.html` com duplo clique. É preciso um servidor local, e também de internet (Tailwind e API são carregados da web).

1. Clone o repositório: `git clone https://github.com/Fernando-levy25/music-catalog.git`
2. Abra a pasta no VS Code e instale a extensão **Live Server**.
3. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.