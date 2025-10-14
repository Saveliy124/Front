// Функция скачивания резюме
document.addEventListener('DOMContentLoaded', function() {
    const downloadResumeBtn = document.getElementById('downloadResume');
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function() {
            // Создаем временную ссылку для скачивания
            const link = document.createElement('a');
            link.href = 'assets/resume.pdf';
            link.download = 'resume.pdf'; // Имя файла при скачивании
            
            // Добавляем ссылку в DOM, кликаем и удаляем
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});


// Основной скрипт
document.addEventListener('DOMContentLoaded', function() {
    // Можно добавить общую логику здесь
    console.log('Страница проектов загружена');
});