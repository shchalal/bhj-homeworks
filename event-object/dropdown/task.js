
document.addEventListener('DOMContentLoaded', () => {
 
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const valueEl = dropdown.querySelector('.dropdown__value');
    const listEl  = dropdown.querySelector('.dropdown__list');

    
    valueEl.addEventListener('click', () => {
      listEl.classList.toggle('dropdown__list_active');
    });


    dropdown.addEventListener('click', event => {
      const item = event.target.closest('.dropdown__item');
      if (!item) return;

  
      event.preventDefault();

  
      const link = item.querySelector('.dropdown__link');
      valueEl.textContent = link.textContent.trim();

      listEl.classList.remove('dropdown__list_active');
    });
  });
});
