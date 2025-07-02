(function() {
      const form   = document.getElementById('uploadForm');
      const input  = document.getElementById('fileInput');
      const meter  = document.getElementById('progress');
      const status = document.getElementById('status');

      form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!input.files.length) {
          status.textContent = 'Пожалуйста, выберите файл.';
          return;
        }

        const file = input.files[0];
        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();

        
        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');


        xhr.upload.addEventListener('progress', function(e) {
          if (e.lengthComputable) {
           
            meter.value = e.loaded / e.total;
            status.textContent = 
              `Загружено ${Math.round((e.loaded / e.total) * 100)}%`;
          }
        });  

        xhr.addEventListener('load', function() {
          if (xhr.status >= 200 && xhr.status < 300) {
            status.textContent = 'Загрузка завершена успешно.';
          } else {
            status.textContent = 
              `Ошибка при загрузке: ${xhr.status} ${xhr.statusText}`;
          }
        });

       
        xhr.addEventListener('error', function() {
          status.textContent = 'Сетевая ошибка при загрузке.';
        });

    
        xhr.send(formData);
      });
    })();