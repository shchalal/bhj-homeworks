document.addEventListener('DOMContentLoaded', () => {
  const rotators = document.querySelectorAll('.rotator');

  rotators.forEach(rotator => {
    const cases = rotator.querySelectorAll('.rotator__case');
    let currentIndex = Array.from(cases).findIndex(el =>
      el.classList.contains('rotator__case_active')
    );
    if (currentIndex === -1) currentIndex = 0;

  
    const initCase = cases[currentIndex];
    const initColor = initCase.dataset.color;
    if (initColor) rotator.style.color = initColor;

    function rotate() {
      cases[currentIndex].classList.remove('rotator__case_active');

    
      currentIndex = (currentIndex + 1) % cases.length;
      const nextEl = cases[currentIndex];

 
      const color = nextEl.dataset.color;
      if (color) rotator.style.color = color;

     
      nextEl.classList.add('rotator__case_active');

      
      const speed = parseInt(nextEl.dataset.speed, 10) || 1000;
      setTimeout(rotate, speed);
    }


    const startSpeed = parseInt(initCase.dataset.speed, 10) || 1000;
    setTimeout(rotate, startSpeed);
  });
});
