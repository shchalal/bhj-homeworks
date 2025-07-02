// JavaScript
(function() {
  function removeTooltip() {
    const existing = document.querySelector('.tooltip');
    if (existing) existing.remove();
  }


  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.has-tooltip');
    if (!btn) {
      removeTooltip();
      return;
    }

    e.preventDefault();

   
    const old = document.querySelector('.tooltip_active');
    if (old && old._source === btn) {
      removeTooltip();
      return;
    }

    removeTooltip();

   
    const text = btn.getAttribute('title');
    btn.removeAttribute('title');

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip tooltip_active';
    tooltip.textContent = text;

    tooltip._source = btn;

    document.body.appendChild(tooltip);

    const pos = btn.dataset.position || 'top';
    const btnRect = btn.getBoundingClientRect();
    const tipRect = tooltip.getBoundingClientRect();
    let top, left;

    switch (pos) {
      case 'top':
        top  = btnRect.top - tipRect.height - 5;
        left = btnRect.left + (btnRect.width - tipRect.width) / 2;
        break;
      case 'bottom':
        top  = btnRect.bottom + 5;
        left = btnRect.left + (btnRect.width - tipRect.width) / 2;
        break;
      case 'left':
        top  = btnRect.top + (btnRect.height - tipRect.height) / 2;
        left = btnRect.left - tipRect.width - 5;
        break;
      case 'right':
        top  = btnRect.top + (btnRect.height - tipRect.height) / 2;
        left = btnRect.right + 5;
        break;
      default:
        top  = btnRect.top - tipRect.height - 5;
        left = btnRect.left;
    }


    tooltip.style.top  = `${top + window.scrollY}px`;
    tooltip.style.left = `${left + window.scrollX}px`;
  });
})();
