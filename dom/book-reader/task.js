document.addEventListener('DOMContentLoaded', () => {
  const book = document.getElementById('book');

  const sizeControls      = document.querySelectorAll('.book__control_font-size .font-size');
  const textColorControls = document.querySelectorAll('.book__control_color .color');
  const bgColorControls   = document.querySelectorAll('.book__control_background .color');

  
  function updateBookClasses() {
    const classes = ['book'];

 
    const activeSizeEl = document.querySelector('.book__control_font-size .font-size_active');
    const size = activeSizeEl && activeSizeEl.dataset.size;
    if (size === 'small') classes.push('book_fs-small');
    else if (size === 'big') classes.push('book_fs-big');
 

    const activeTextColorEl = document.querySelector('.book__control_color .color_active');
    const textColor = activeTextColorEl && activeTextColorEl.dataset.textColor;
    if (textColor) classes.push(`book_color-${textColor}`);


    const activeBgColorEl = document.querySelector('.book__control_background .color_active');
    const bgColor = activeBgColorEl && activeBgColorEl.dataset.bgColor;
    if (bgColor) classes.push(`book_bg-${bgColor}`);


    book.className = classes.join(' ');
  }


  function bindControls(controls, activeClass) {
    controls.forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        controls.forEach(c => c.classList.remove(activeClass));
        el.classList.add(activeClass);
        updateBookClasses();
      });
    });
  }

 
  bindControls(sizeControls,      'font-size_active');
  bindControls(textColorControls, 'color_active');
  bindControls(bgColorControls,   'color_active');
  
  
  updateBookClasses();
});

