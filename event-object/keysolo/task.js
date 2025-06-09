class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timerElement = container.querySelector('.timer__value'); 

    this.reset();
    this.registerEvents();
  }

  reset() {
    this.clearTimer();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
    this.setNewWord();
  }

  registerEvents() {
    document.addEventListener('keydown', (event) => {
      const enteredChar  = event.key;
      const expectedChar = this.currentSymbol.textContent;

      if (enteredChar.toLowerCase() === expectedChar.toLowerCase()) {
        this.success();
      } else {
        this.fail();
      }
    });
  }

  success() {
    this.currentSymbol.classList.remove('symbol_current');
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol) {
      this.currentSymbol.classList.add('symbol_current');
      return; 
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
      return;
    }

    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 3) {
      alert('Вы проиграли!');
      this.reset();
      return;
    }
    this.setNewWord();
  }

  setNewWord() {
    this.clearTimer();              
    const word = this.getWord();
    this.renderWord(word);
    this.startTimer(word.length);   
  }

  renderWord(word) {
    const html = [...word]
      .map((s, i) =>
        `<span class="symbol ${i === 0 ? 'symbol_current' : ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;
    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }

  startTimer(seconds) {
    this.timeLeft = seconds;
    this.updateTimerDisplay();

    this.timerId = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();

      if (this.timeLeft <= 0) {
        this.clearTimer();
        this.fail();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    this.timerElement.textContent = this.timeLeft;
  }

  clearTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  getWord() {
    const words = [
      'bob','awesome','netology','hello','kitty',
      'rock','youtube','popcorn','cinema','love','javascript'
    ];
    return words[Math.floor(Math.random() * words.length)];
  }
}

new Game(document.getElementById('game'));
