(() => {
  const getHole = i => document.getElementById(`hole${i}`);

  const deadElem = document.getElementById('dead'),
        lostElem = document.getElementById('lost');
  let dead = 0, lost = 0;

  for (let i = 1; i <= 9; i++) {
    getHole(i).onclick = () => {
      const hole = getHole(i);

      if (hole.classList.contains('hole_has-mole')) {
        deadElem.textContent = ++dead;
        if (dead === 10) {
          alert('Вы выиграли!');
          dead = 0; lost = 0;
          deadElem.textContent = dead; lostElem.textContent = lost;
        }
      } else {
        lostElem.textContent = ++lost;
        if (lost === 5) {
          alert('Вы проиграли!');
          dead = 0; lost = 0;
          deadElem.textContent = dead; lostElem.textContent = lost;
        }
      }
    };
  }
})();