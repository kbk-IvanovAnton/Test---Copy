document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var selectedEventType = 'Work'; // Значение по умолчанию

    // Обновляем выбранный тип события при изменении радио-кнопки
    document.querySelectorAll('#eventTypeSelection input[name="eventType"]').forEach(function (radio) {
        radio.addEventListener('change', function (e) {
            selectedEventType = e.target.value;
        });
    });
    const radioButtons = document.querySelectorAll('.btn-check');
    const formSelects = document.querySelectorAll('.location-select');

    // Функция для активации/деактивации форм
    function toggleForms(disabled) {
        formSelects.forEach(function (select) {
            select.disabled = disabled;
        });
    }

    toggleForms(true);

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: ''
        },
        selectable: true,
        events: [],
        eventClick: function (info) {
            switch (selectedEventType) {
                case 'Work':
                    info.event.setProp('title', 'Work');
                    info.event.setProp('backgroundColor', '#1E90FF');
                    info.event.setProp('borderColor', '#1E90FF');
                    break;
                case 'Sells':
                    info.event.setProp('title', 'Sells');
                    info.event.setProp('backgroundColor', '#2E8B57');
                    info.event.setProp('borderColor', '#2E8B57');
                    break;
                case 'Movement':
                    info.event.setProp('title', 'Movement');
                    info.event.setProp('backgroundColor', '#F0E68C');
                    info.event.setProp('borderColor', '#F0E68C');
                    break;
                case 'Exeption':
                    info.event.setProp('title', 'Exeption');
                    info.event.setProp('backgroundColor', '#CD5C5C');
                    info.event.setProp('borderColor', '#CD5C5C');
                    break;
                case 'Other':
                    info.event.setProp('title', 'Other');
                    info.event.setProp('backgroundColor', '#BA55D3');
                    info.event.setProp('borderColor', '#BA55D3');
                    break;
            }

            // info.event.render();
            info.view.calendar.unselect();

        },
        eventChange: function (info) {
            updateAllowanceTable(selectedEventType); // Обновляем таблицу на основе типа события
        }
    });
    calendar.render();

    var events = [];

    document.getElementById('add-event').addEventListener('click', function () {
        var startDateInput = document.getElementById('start-date');
        var endDateInput = document.getElementById('end-date');
        var addButton = document.getElementById('add-event');
        var removeButton = document.getElementById('remove-event');

        var startDate = new Date(startDateInput.value);
        var endDate = new Date(endDateInput.value);

        let valid = true;

        if (!startDateInput.value) {
            startDateInput.classList.add('is-invalid');
            valid = false;
            radioButtons.forEach(function (button) {
                button.disabled = true;
            });
            toggleForms(true);
        } else {
            startDateInput.classList.remove('is-invalid');
            radioButtons.forEach(function (button) {
                button.disabled = false;
            });
            toggleForms(false);
        }

        if (!endDateInput.value) {
            endDateInput.classList.add('is-invalid');
            valid = false;
            radioButtons.forEach(function (button) {
                button.disabled = true;
            });
            toggleForms(true);
        } else {
            endDateInput.classList.remove('is-invalid');
            radioButtons.forEach(function (button) {
                button.disabled = false;
            });
            toggleForms(false);
        }

        if (startDate && endDate) {
            if (startDate > endDate) {
                $('#dateErrorModal').modal('show');
                return; // Прекращаем выполнение функции
            }
        }

        startDateInput.disabled = true;
        endDateInput.disabled = true;
        addButton.disabled = true;
        removeButton.disabled = false;

        let oneDay = 24 * 60 * 60 * 1000;

        var diffDays = parseInt((endDate - startDate) / oneDay, 10);

        switch (diffDays) {
            case 0:
                events.push({
                    title: 'Movement',
                    start: startDate.toISOString().split('T')[0],
                    end: startDate.toISOString().split('T')[0],
                    // display: 'background',
                    color: '#F0E68C'
                });
                break;
            case 1:
                events.push({
                    title: 'Movement',
                    start: startDate.toISOString().split('T')[0],
                    end: startDate.toISOString().split('T')[0],
                    // display: 'background',
                    color: '#F0E68C'
                }, {
                    title: 'Movement',
                    start: endDate.toISOString().split('T')[0],
                    end: endDate.toISOString().split('T')[0],
                    // display: 'background',
                    color: '#F0E68C'
                });
                break;
            default:
                events.push({
                    title: 'Movement',
                    start: startDate.toISOString().split('T')[0],
                    end: startDate.toISOString().split('T')[0],
                    // display: 'background',
                    color: '#F0E68C'
                });

                for (var i = 1; i < diffDays; i++) {
                    var workStartDate = new Date(startDate.getTime() + i * oneDay);
                    events.push({
                        title: 'Work',
                        start: workStartDate.toISOString().split('T')[0],
                        end: new Date(workStartDate.getTime() + oneDay).toISOString().split('T')[0], // Добавляем один день к начальной дате
                        // display: 'background',
                        color: '#1E90FF' // Синий цвет для дней работы
                    });
                }

                events.push({
                    title: 'Movement',
                    start: endDate.toISOString().split('T')[0],
                    end: endDate.toISOString().split('T')[0],
                    // display: 'background',
                    color: '#F0E68C'
                });
                break;
        }
        calendar.addEventSource(events);

        // Скрипт заполнения таблицы allowance

        document.getElementById('AccomodationUnitPrice').innerHTML = 7000;
        document.getElementById('WorkingAwayUnitPrice_A').innerHTML = 2000;
        document.getElementById('WorkingAwayUnitPrice_B').innerHTML = 4000;
        document.getElementById('SpecialAllowanceUnitPrice_A').innerHTML = 2000;
        document.getElementById('SpecialAllowanceUnitPrice_B').innerHTML = 4000;

        let eventCount = events.length;
        document.getElementById('AccomodationDays').innerHTML = eventCount - 1;

        // Пример: подсчёт количества событий с заголовком 'Work'
        let workEvents = events.filter(event => event.title === 'Work');
        let workCount = workEvents.length;

        document.getElementById('WorkingAwayDays_B').innerHTML = workCount;
        console.log(`Количество событий 'Work': ${workCount}`);

        // Подсчёт количества событий с заголовком 'Sells'
        let sellsEvents = events.filter(event => event.title === 'Sells');
        let sellsCount = sellsEvents.length;

        document.getElementById('WorkingAwayDays_A').innerHTML = sellsCount;
        console.log(`Количество событий 'Sells': ${sellsCount}`);

    });

    function updateAllowanceTable(selectedEventType) {
        let allEvents = calendar.getEvents();
        // Обновление ячеек таблицы в зависимости от типа события
        switch (selectedEventType) {
            case 'Work':
                let work1Events = allEvents.filter(event => event.title === 'Work');
                let work1Count = work1Events.length;
                document.getElementById('WorkingAwayDays_B').innerHTML = work1Count;
                let sells1Events = allEvents.filter(event => event.title === 'Sells');
                let sells1Count = sells1Events.length;
                document.getElementById('WorkingAwayDays_A').innerHTML = sells1Count;
                break;
            case 'Sells':
                let sells2Events = allEvents.filter(event => event.title === 'Sells');
                let sells2Count = sells2Events.length;
                document.getElementById('WorkingAwayDays_A').innerHTML = sells2Count;
                let work2Events = allEvents.filter(event => event.title === 'Work');
                let work2Count = work2Events.length;
                document.getElementById('WorkingAwayDays_B').innerHTML = work2Count;
                break;
            case 'Movement':
                let work3Events = allEvents.filter(event => event.title === 'Work');
                let work3Count = work3Events.length;

                if (event => event.title === 'Work') {
                    document.getElementById('WorkingAwayDays_B').innerHTML = work3Count;
                }
                break;
            case 'Exeption':
                let work4Events = allEvents.filter(event => event.title === 'Work');
                let work4Count = work4Events.length;
                let sells4Events = allEvents.filter(event => event.title === 'Sells');
                let sells4Count = sells4Events.length;

                if (event => event.title === 'Work') {
                    document.getElementById('WorkingAwayDays_B').innerHTML = work4Count;
                }
                if (event => event.title === 'Sells') {
                    document.getElementById('WorkingAwayDays_A').innerHTML = sells4Count;
                }
                let exception4Events = allEvents.filter(event => event.title === 'Exeption');
                let exception4Count = exception4Events.length;
                document.getElementById('ExeptionAllowanceDays').innerHTML = exception4Count;
                break;
            case 'Other':
                let work5Events = allEvents.filter(event => event.title === 'Work');
                let work5Count = work5Events.length;
                let sells5Events = allEvents.filter(event => event.title === 'Sells');
                let sells5Count = sells5Events.length;
                let exception5Events = allEvents.filter(event => event.title === 'Exeption');
                let exception5Count = exception5Events.length;
                if (event => event.title === 'Work') {
                    document.getElementById('WorkingAwayDays_B').innerHTML = work5Count;
                }
                if (event => event.title === 'Sells') {
                    document.getElementById('WorkingAwayDays_A').innerHTML = sells5Count;
                }
                if (event => event.title === 'Exeption') {
                    document.getElementById('ExeptionAllowanceDays').innerHTML = exception5Count;
                }
                break;
            default:
                console.log('Неизвестный тип события:', selectedEventType);
        }
    }

    document.getElementById('remove-event').addEventListener('click', function () {
        var startDateInput = document.getElementById('start-date');
        var endDateInput = document.getElementById('end-date');
        var addButton = document.getElementById('add-event');
        var removeButton = document.getElementById('remove-event');

        radioButtons.forEach(function (button) {
            button.disabled = true;
        });
        // Проходим по всем радио-кнопкам и снимаем выделение с выбранной
        radioButtons.forEach(function (button) {
            if (button.checked) {
                button.checked = false;
            }
        });
        toggleForms(true);

        document.getElementById('start-date').value = '';
        document.getElementById('end-date').value = '';
        document.getElementById('start-date').classList.remove('is-invalid');
        document.getElementById('end-date').classList.remove('is-invalid');

        startDateInput.disabled = false;
        endDateInput.disabled = false;
        addButton.disabled = false;
        removeButton.disabled = true;

        calendar.removeAllEvents();

        document.getElementById('AccomodationUnitPrice').innerHTML = "";
        document.getElementById('AccomodationDays').innerHTML = "";
        document.getElementById('WorkingAwayUnitPrice_A').innerHTML = "";
        document.getElementById('WorkingAwayDays_A').innerHTML = "";
        document.getElementById('WorkingAwayUnitPrice_B').innerHTML = "";
        document.getElementById('WorkingAwayDays_B').innerHTML = "";
        document.getElementById('SpecialAllowanceUnitPrice_A').innerHTML = "";
        document.getElementById('SpecialAllowanceUnitPrice_B').innerHTML = "";

    });
});
