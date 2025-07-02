document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const itemsContainer = document.getElementById('items');
  const STORAGE_KEY = 'exchangeCourses';

  
  function renderCourses(valute) {
    itemsContainer.innerHTML = '';
    Object.values(valute).forEach(item => {
      const itemWrapper = document.createElement('div');
      itemWrapper.className = 'item';

      const codeEl = document.createElement('div');
      codeEl.className = 'item__code';
      codeEl.textContent = item.CharCode;
      itemWrapper.appendChild(codeEl);

      const valueEl = document.createElement('div');
      valueEl.className = 'item__value';
      itemWrapper.appendChild(valueEl);

      const currencyEl = document.createElement('div');
      currencyEl.className = 'item__currency';
      currencyEl.textContent = 'руб.';
      itemWrapper.appendChild(currencyEl);

      itemsContainer.appendChild(itemWrapper);
    });
  }

  
  const cached = localStorage.getItem(STORAGE_KEY);
  if (cached) {
    try {
      renderCourses(JSON.parse(cached));
    } catch (e) {
      console.warn('Ошибка при парсинге кэша', e);
    }
  }

 
  fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.status}`);
      }
      return response.json();
    })
    .then(json => {
      cons
      localStorage.setItem(STORAGE_KEY, JSON.stringify(valute));
      renderCourses(valute);
    })
    .catch(err => {
      console.error('Не удалось загрузить курсы валют:', err);
    })
    .finally(() => {
      loader.classList.remove('loader_active');
    });
});
