function translater() {
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