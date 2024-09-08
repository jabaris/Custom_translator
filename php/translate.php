<?php
header('Content-Type: application/json');

// Параметры подключения к базе данных
$host = 'localhost';
$db = 'hnovsky_translator';
$user = 'root';
$pass = '';

// Соединение с базой данных
$connection = mysqli_connect($host, $user, $pass, $db);

// Проверка соединения
if (!$connection) {
    die(json_encode(['error' => 'Ошибка подключения к базе данных: ' . mysqli_connect_error()]));
}

// Получение входящих данных
$source_word = $_POST['word'];

// Запрос к базе данных
$query = "SELECT * FROM translations WHERE source_word = ?";
$stmt = mysqli_prepare($connection, $query);
mysqli_stmt_bind_param($stmt, 's', $source_word);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

// Формирование ответа
if ($row = mysqli_fetch_assoc($result)) {
    echo json_encode($row);
} else {
    echo json_encode(['target_word' => null, 'description' => null]);
}

// Закрытие соединения
mysqli_close($connection);
?>