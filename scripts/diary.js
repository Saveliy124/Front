// Diary functionality
document.addEventListener('DOMContentLoaded', function() {
    const progressRecords = document.getElementById('progress-records');
    const recordForm = document.getElementById('recordForm');
    const saveRecordBtn = document.getElementById('saveRecord');
    
    // Initialize with sample data if localStorage is empty
    initializeSampleData();
    
    // Load records from localStorage
    loadRecords();
    
    // Save record event
    saveRecordBtn.addEventListener('click', function() {
        if (validateForm()) {
            saveRecord();
        }
    });
    
    // Form validation
    function validateForm() {
        const date = document.getElementById('recordDate');
        const topic = document.getElementById('recordTopic');
        
        let isValid = true;
        
        if (!date.value) {
            date.classList.add('is-invalid');
            isValid = false;
        } else {
            date.classList.remove('is-invalid');
        }
        
        if (!topic.value.trim()) {
            topic.classList.add('is-invalid');
            isValid = false;
        } else {
            topic.classList.remove('is-invalid');
        }
        
        return isValid;
    }
    
    // Save record to localStorage
    function saveRecord() {
        const date = document.getElementById('recordDate').value;
        const topic = document.getElementById('recordTopic').value;
        const status = document.querySelector('input[name="recordStatus"]:checked').value;
        
        const record = {
            id: Date.now(), // Unique ID based on timestamp
            date: formatDate(date),
            topic: topic,
            completed: status === 'completed'
        };
        
        // Get existing records
        const records = getRecords();
        records.push(record);
        
        // Save to localStorage
        localStorage.setItem('studyRecords', JSON.stringify(records));
        
        // Reload records
        loadRecords();
        
        // Close modal and reset form
        const modal = bootstrap.Modal.getInstance(document.getElementById('addRecordModal'));
        modal.hide();
        recordForm.reset();
    }
    
    // Load records from localStorage
    function loadRecords() {
        const records = getRecords();
        progressRecords.innerHTML = '';
        
        if (records.length === 0) {
            progressRecords.innerHTML = '<p class="text-muted text-center">Нет записей</p>';
            return;
        }
        
        // Sort records by date (newest first)
        records.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        records.forEach(record => {
            const recordElement = createRecordElement(record);
            progressRecords.appendChild(recordElement);
        });
    }
    
    // Create record HTML element
    function createRecordElement(record) {
        const recordDiv = document.createElement('div');
        recordDiv.className = 'record-item d-flex justify-content-between align-items-center border-bottom py-2';
        recordDiv.dataset.id = record.id;
        
        recordDiv.innerHTML = `
            <div class="flex-grow-1">
                <div class="d-flex align-items-center">
                    <span class="status-toggle me-3" style="cursor: pointer;">
                        ${record.completed ? 
                            '<i class="bi bi-check-circle text-success"></i>' : 
                            '<i class="bi bi-x-circle text-danger"></i>'
                        }
                    </span>
                    <div>
                        <strong>${record.date}</strong> - ${record.topic}
                    </div>
                </div>
            </div>
            <button class="btn btn-sm btn-outline-danger delete-record">
                <i class="bi bi-trash"></i>
            </button>
        `;
        
        // Add event listeners
        const statusToggle = recordDiv.querySelector('.status-toggle');
        const deleteBtn = recordDiv.querySelector('.delete-record');
        
        statusToggle.addEventListener('click', function() {
            toggleRecordStatus(record.id);
        });
        
        deleteBtn.addEventListener('click', function() {
            deleteRecord(record.id);
        });
        
        return recordDiv;
    }
    
    // Toggle record status
    function toggleRecordStatus(recordId) {
        const records = getRecords();
        const recordIndex = records.findIndex(record => record.id === recordId);
        
        if (recordIndex !== -1) {
            records[recordIndex].completed = !records[recordIndex].completed;
            localStorage.setItem('studyRecords', JSON.stringify(records));
            loadRecords();
        }
    }
    
    // Delete record
    function deleteRecord(recordId) {
        if (confirm('Вы уверены, что хотите удалить эту запись?')) {
            const records = getRecords();
            const filteredRecords = records.filter(record => record.id !== recordId);
            localStorage.setItem('studyRecords', JSON.stringify(filteredRecords));
            loadRecords();
        }
    }
    
    // Get records from localStorage
    function getRecords() {
        const records = localStorage.getItem('studyRecords');
        return records ? JSON.parse(records) : [];
    }
    
    // Format date from YYYY-MM-DD to DD MMM format
    function formatDate(dateString) {
        const date = new Date(dateString);
        const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        const day = date.getDate();
        const month = months[date.getMonth()];
        return `${day} ${month}`;
    }
    
    // Initialize with sample data
    function initializeSampleData() {
        const existingRecords = getRecords();
        
        if (existingRecords.length === 0) {
            const sampleRecords = [
                {
                    id: 1,
                    date: '15 дек',
                    topic: 'Верстка макета сайта',
                    completed: true
                },
                {
                    id: 2,
                    date: '10 дек',
                    topic: 'JavaScript основы',
                    completed: true
                },
                {
                    id: 3,
                    date: '05 дек',
                    topic: 'Работа с формами',
                    completed: false
                },
                {
                    id: 4,
                    date: '01 дек',
                    topic: 'Адаптивный дизайн',
                    completed: false
                }
            ];
            
            localStorage.setItem('studyRecords', JSON.stringify(sampleRecords));
        }
    }
});