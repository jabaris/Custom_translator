let translater = () => {
    // Получаем значение из текстового поля
    var sourceWord = document.getElementById('sourceWord').value;

    // Выполняем AJAX-запрос
    $.ajax({
        url: 'php/translate.php',
        type: 'POST',
        data: { word: sourceWord },
        dataType: 'json',
        success: function(data) {
            // Обновляем поля на странице
            document.getElementById('translatedWord').value = data.target_word || 'Перевод не найден';
            document.getElementById('description').textContent = data.description || '';
        },
        error: function(xhr, status, error) {
            console.error('Ошибка: ', error);
        }
    });
}

let speak = () => {
    var translatedText = document.getElementById('sourceWord').value;
    if (!translatedText) {
        alert('Нет переведенного слова для озвучивания.');
        return;
    }

    // Попытка воспроизведения в нескольких форматах
    var audioFormats = ['m4a', 'mp3', 'ogg']; // Указываем все поддерживаемые форматы
    var audioPlayed = false;

    audioFormats.forEach(function(format) {
        if (!audioPlayed) {
            var audioFileName = translatedText.toLowerCase().replace(/\s+/g, '_') + '.' + format;
            var audioFilePath = 'audio/' + audioFileName;

            var audio = new Audio(audioFilePath);
            audio.onerror = function() {
                console.warn('Аудиофайл не найден: ' + audioFilePath);
            };
            audio.oncanplaythrough = () => {
                if (!audioPlayed) {
                    audioPlayed = true;
                    audio.play();
                }
            };
            audio.load();
        }
    });
}