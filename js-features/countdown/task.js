document.addEventListener('DOMContentLoaded', function() {
  const timerEl = document.getElementById('timer');
  let totalSeconds = parseInt(timerEl.textContent, 10);


  function pad2(number) {
    return number < 10 ? '0' + number : String(number);
  }


  const intervalId = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(intervalId);
      alert('Вы победили в конкурсе!');

      
      const link = document.createElement('a');
      link.href = 'https://metr2.pro/catalog/spetspredlozheniya/'; 
      link.download = '';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return;
    }

    
    totalSeconds--;

    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    
    timerEl.textContent = `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
  }, 1000);
});