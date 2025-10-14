// Данные проектов
const projectsData = {
    1: {
        title: "Личный сайт",
        description: "Полнофункциональный личный сайт с портфолио, блогом и системой обратной связи. Реализована адаптивная верстка и современный дизайн.",
        technologies: "HTML5, CSS3, JavaScript",
        image: "../images/project1.jpg",
        liveDemo: "https://example.com/project1",
        sourceCode: "https://github.com/username/project1",
        date: "Январь 2024"
    },
    2: {
        title: "Todo-приложение",
        description: "Интерактивное приложение для управления задачами с возможностью добавления, редактирования, удаления и фильтрации задач. Локальное хранение данных.",
        technologies: "JavaScript, LocalStorage, CSS3",
        image: "../images/project2.jpg",
        liveDemo: "https://example.com/project2",
        sourceCode: "https://github.com/username/project2",
        date: "Февраль 2024"
    },
    3: {
        title: "Интернет-магазин",
        description: "Электронная коммерция платформа с каталогом товаров, корзиной покупок и системой оформления заказов. Интеграция с платежной системой.",
        technologies: "React, Node.js, MongoDB, Express",
        image: "../images/project3.jpg",
        liveDemo: "https://example.com/project3",
        sourceCode: "https://github.com/username/project3",
        date: "Март 2024"
    },
    4: {
        title: "Портфолио",
        description: "Современное портфолио с анимациями, фильтрацией проектов и адаптивным дизайном. Оптимизировано для SEO и быстрой загрузки.",
        technologies: "HTML5, CSS3, JavaScript, Bootstrap",
        image: "../images/project4.jpg",
        liveDemo: "https://example.com/project4",
        sourceCode: "https://github.com/username/project4",
        date: "Апрель 2024"
    }
};

// Обработчик модального окна
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.getElementById('projectModal');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project-id');
            const projectData = projectsData[projectId];
            
            if (projectData) {
                // Заполняем модальное окно данными
                document.getElementById('modal-project-title').textContent = projectData.title;
                document.getElementById('modal-project-description').textContent = projectData.description;
                document.getElementById('modal-project-technologies').textContent = projectData.technologies;
                document.getElementById('modal-project-date').textContent = projectData.date;
                
                // Устанавливаем изображение
                const projectImage = document.getElementById('modal-project-image');
                projectImage.src = projectData.image;
                projectImage.alt = projectData.title;
                
                // Устанавливаем ссылки
                document.getElementById('modal-project-live').href = projectData.liveDemo;
                document.getElementById('modal-project-source').href = projectData.sourceCode;
            }
        });
    });
});