const POLL_URL = 'https://students.netoservices.ru/nestjs-backend/poll';

 
  async function loadPoll() {
    try {
      const res = await fetch(POLL_URL);
      if (!res.ok) throw new Error(`Ошибка ${res.status}`);
      const { id, data } = await res.json();
      
      document.getElementById('poll__title').textContent = data.title;
      
      const answersContainer = document.getElementById('poll__answers');
      answersContainer.innerHTML = ''; 
      data.answers.forEach((text, index) => {
        const btn = document.createElement('button');
        btn.className = 'poll__answer';
        btn.textContent = text;
        btn.addEventListener('click', () => onAnswerClick(id, index));
        answersContainer.appendChild(btn);
      });
    } catch (err) {
      document.getElementById('poll__title').textContent = 'Не удалось загрузить опрос';
      console.error(err);
    }
  }


  async function onAnswerClick(pollId, answerIndex) {
    document.querySelectorAll('.poll__answer').forEach(btn => btn.disabled = true);

    alert('Спасибо, ваш голос засчитан!');

  
    const body = new URLSearchParams({ vote: pollId, answer: answerIndex });
    try {
      const res = await fetch(POLL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });
      if (!res.ok) throw new Error(`Ошибка ${res.status}`);
      const resultData = await res.json();
      showResults(resultData.stat);
    } catch (err) {
      console.error('Ошибка при отправке голоса:', err);
    }
  }

 
  function showResults(stat) {
    const totalVotes = stat.reduce((sum, item) => sum + item.votes, 0);
    const resultsContainer = document.getElementById('poll__results');
    resultsContainer.innerHTML = '<h4>Результаты:</h4>';

    stat.forEach(item => {
      const percent = totalVotes > 0
        ? ((item.votes / totalVotes) * 100).toFixed(1)
        : 0;
      const div = document.createElement('div');
      div.className = 'result-item';
      div.textContent = `${item.answer}: ${item.votes} голосов (${percent} %)`;
      resultsContainer.appendChild(div);
    });
  }


  document.addEventListener('DOMContentLoaded', loadPoll);