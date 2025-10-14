// Contacts page functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    // Character counter for message
    messageTextarea.addEventListener('input', function() {
        const currentLength = this.value.length;
        charCount.textContent = currentLength;
        
        if (currentLength > 500) {
            this.value = this.value.substring(0, 500);
            charCount.textContent = 500;
        }
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show success message
            showSuccessMessage();
            // Reset form
            contactForm.reset();
            charCount.textContent = '0';
        }
    });
    
    // Form validation
    function validateForm() {
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        // Email validation
        if (!email.value || !isValidEmail(email.value)) {
            email.classList.add('is-invalid');
            isValid = false;
        } else {
            email.classList.remove('is-invalid');
        }
        
        // Message validation
        if (!message.value.trim()) {
            message.classList.add('is-invalid');
            isValid = false;
        } else {
            message.classList.remove('is-invalid');
        }
        
        return isValid;
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Success message
    function showSuccessMessage() {
        // Create alert element
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3';
        alertDiv.style.zIndex = '1050';
        alertDiv.innerHTML = `
            <i class="bi bi-check-circle-fill"></i>
            Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Add to page
        document.body.appendChild(alertDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
    
    // Initialize Yandex Map
    initYandexMap();
});

// Yandex Map initialization
function initYandexMap() {
    ymaps.ready(function() {
        const map = new ymaps.Map('map', {
            center: [55.670005, 37.479894], // RTU MIREA coordinates
            zoom: 16
        });
        
        // Add marker
        const marker = new ymaps.Placemark([55.670005, 37.479894], {
            hintContent: 'РТУ МИРЭА',
            balloonContent: 'Российский технологический университет<br>просп. Вернадского, 78, стр. 4'
        }, {
            preset: 'islands#icon',
            iconColor: '#0d6efd'
        });
        
        map.geoObjects.add(marker);
        
        // Add controls
        map.controls.remove('geolocationControl');
        map.controls.remove('searchControl');
        map.controls.remove('trafficControl');
        map.controls.remove('typeSelector');
        map.controls.remove('fullscreenControl');
        map.controls.remove('rulerControl');
    });
}