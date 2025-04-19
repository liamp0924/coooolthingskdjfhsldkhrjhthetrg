
  const starButtons = document.querySelectorAll('.star-btn');

  starButtons.forEach(btn => {
    const card = btn.closest('.game-card');
    const game = {
      name: card.dataset.game,
      link: card.dataset.link
    };

    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    // Show filled star if favorited
    if (favorites.find(g => g.name === game.name)) {
      btn.textContent = '⭐️';
    }

    btn.addEventListener('click', () => {
      favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

      const isFavorited = favorites.find(g => g.name === game.name);
      if (isFavorited) {
        favorites = favorites.filter(g => g.name !== game.name);
        btn.textContent = '⭐';
      } else {
        favorites.push(game);
        btn.textContent = '⭐️';
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
    });
  });
