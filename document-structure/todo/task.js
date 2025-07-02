
  document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('task');
    const tasksList = document.getElementById('tasks-title');

   
    const saved = JSON.parse(localStorage.getItem('tasks') || '[]');
    saved.forEach(createTask);


    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && input.value.trim()) {
        createTask(input.value.trim());
        input.value = '';
        save();
      }
    });

    function createTask(text) {
      const li = document.createElement('li');
      li.className = 'task';

      const title = document.createElement('div');
      title.className = 'task__title';
      title.textContent = text;

      const remove = document.createElement('a');
      remove.href = '#';
      remove.className = 'task__remove';
      remove.textContent = '×';
      remove.addEventListener('click', ev => {
        ev.preventDefault();
        tasksList.removeChild(li);
        save();
      });

      li.append(title, remove);
      tasksList.append(li);
    }

    function save() {
      const arr = Array.from(tasksList.querySelectorAll('.task__title'))
        .map(el => el.textContent);
      localStorage.setItem('tasks', JSON.stringify(arr));
    }
  });



