document.addEventListener('DOMContentLoaded', () => {
    const cookie = document.getElementById('cookie');
    const counterDisplay = document.getElementById('clicker__counter');


    let count = 0;
    let isShrunk = false;          
    let lastClickTime = null;     
    const baseSize = 200;          
    let currentSize = baseSize;     

   
    const speedDisplay = document.createElement('div');
    speedDisplay.id = 'clicker__speed';
    speedDisplay.className = 'clicker__speed';
    speedDisplay.textContent = 'Скорость клика: 0 кликов/сек';
    const statusContainer = cookie.parentElement.querySelector('.clicker__status');
    statusContainer.appendChild(speedDisplay);

    
    cookie.addEventListener('click', () => {
        count++;
        counterDisplay.textContent = count;

   
        if (isShrunk) {
            currentSize = currentSize / 0.9;  
        } else {
            currentSize = currentSize * 0.9;  
        }
        isShrunk = !isShrunk;

       
        cookie.style.width = `${currentSize.toFixed(0)}px`;
        cookie.style.height = `${currentSize.toFixed(0)}px`;

   
        const now = new Date();
        if (lastClickTime !== null) {
            const deltaSeconds = (now - lastClickTime) / 1000;     
            const cps = (1 / deltaSeconds).toFixed(2);               
            speedDisplay.textContent = `Скорость клика: ${cps} кликов/сек`;
        }
        lastClickTime = now;
    });
});
