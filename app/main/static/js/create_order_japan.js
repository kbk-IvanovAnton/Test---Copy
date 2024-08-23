document.addEventListener('DOMContentLoaded', function () {
    let calendarEl = document.getElementById('calendar');
    let selectedEventType = 'Work'; // Значение по умолчанию

    // Обновляем выбранный тип события при изменении радио-кнопки
    document.querySelector('#eventTypeSelection').addEventListener('change', function (e) {
        if (e.target.name === "eventType") {
            selectedEventType = e.target.value;
        }
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
    let count = 0;
    let calendar = new FullCalendar.Calendar(calendarEl, {
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
                    count = 0;
                    info.event.setProp('title', 'Work');
                    info.event.setProp('backgroundColor', '#1E90FF');
                    info.event.setProp('borderColor', '#1E90FF');
                    break;
                case 'Sells':
                    count = 0;
                    info.event.setProp('title', 'Sells');
                    info.event.setProp('backgroundColor', '#2E8B57');
                    info.event.setProp('borderColor', '#2E8B57');
                    break;
                case 'Movement':
                    count = 0;
                    info.event.setProp('title', 'Movement');
                    info.event.setProp('backgroundColor', '#F0E68C');
                    info.event.setProp('borderColor', '#F0E68C');
                    break;
                case 'Exeption':
                    count = 0;
                    info.event.setProp('title', 'Exeption');
                    info.event.setProp('backgroundColor', '#CD5C5C');
                    info.event.setProp('borderColor', '#CD5C5C');
                    break;
                case 'Other':
                    count = 0;
                    info.event.setProp('title', 'Other');
                    info.event.setProp('backgroundColor', '#BA55D3');
                    info.event.setProp('borderColor', '#BA55D3');
                    break;
            }

            // info.event.render();
            info.view.calendar.unselect();

        },
        eventChange: function (info) {
            count += 1;
            if (count != 2) {
                return;
            }
            let allEvents = calendar.getEvents();
            let mainWorkCount = allEvents.filter(event => event.title === 'Work').length;
            // Обновление ячеек таблицы в зависимости от типа события
            switch (selectedEventType) {
                case 'Work':
                    let work1Events = allEvents.filter(event => event.title === 'Work');
                    let work1Count = work1Events.length;

                    let sells1Count = allEvents.filter(event => event.title === 'Sells').length;
                    let exception1Count = allEvents.filter(event => event.title === 'Exeption').length;

                    if (work1Events.some(event => event.title === 'Work')) {
                        if (targetDates.includes(info.event.startStr)) {
                            document.getElementById('SpecialAllowanceDays_A').innerHTML = --sellsTargetCount;
                            document.getElementById('SpecialAllowanceDays_B').innerHTML = ++workTargetCount;
                        }
                        document.getElementById('WorkingAwayDays_B').innerHTML = work1Count;
                        document.getElementById('WorkingAwayDays_A').innerHTML = sells1Count;
                        document.getElementById('ExeptionAllowanceDays').innerHTML = exception1Count;
                    }
                    break;
                case 'Sells':
                    let sells2Events = allEvents.filter(event => event.title === 'Sells');
                    let sells2Count = sells2Events.length;

                    let work2Count = allEvents.filter(event => event.title === 'Work').length;
                    let exception2Count = allEvents.filter(event => event.title === 'Exeption').length;

                    if (sells2Events.some(event => event.title === 'Sells')) {
                        if (targetDates.includes(info.event.startStr)) {
                            document.getElementById('SpecialAllowanceDays_A').innerHTML = ++sellsTargetCount;
                            document.getElementById('SpecialAllowanceDays_B').innerHTML = --workTargetCount;
                        }
                        document.getElementById('WorkingAwayDays_B').innerHTML = work2Count;
                        document.getElementById('WorkingAwayDays_A').innerHTML = sells2Count;
                        document.getElementById('ExeptionAllowanceDays').innerHTML = exception2Count;
                    }
                    break;
                case 'Movement':
                    let movement3Events = allEvents.filter(event => event.title === 'Movement');

                    let work3Count = allEvents.filter(event => event.title === 'Work').length;
                    let sells3Count = allEvents.filter(event => event.title === 'Sells').length;
                    let exception3Count = allEvents.filter(event => event.title === 'Exeption').length;

                    if (movement3Events.some(event => event.title === 'Movement')) {
                        document.getElementById('WorkingAwayDays_B').innerHTML = work3Count;
                        document.getElementById('WorkingAwayDays_A').innerHTML = sells3Count;
                        document.getElementById('ExeptionAllowanceDays').innerHTML = exception3Count;
                    }
                    break;
                case 'Exeption':
                    let exeption4Events = allEvents.filter(event => event.title === 'Exeption');
                    let exeption4Count = exeption4Events.length;

                    let work4Count = allEvents.filter(event => event.title === 'Work').length;
                    let sells4Count = allEvents.filter(event => event.title === 'Sells').length;

                    if (exeption4Events.some(event => event.title === 'Exeption')) {
                        document.getElementById('WorkingAwayDays_B').innerHTML = work4Count;
                        document.getElementById('WorkingAwayDays_A').innerHTML = sells4Count;
                        document.getElementById('ExeptionAllowanceDays').innerHTML = exeption4Count;
                    }
                    break;
                case 'Other':
                    let other5Events = allEvents.filter(event => event.title === 'Other');

                    let work5Count = allEvents.filter(event => event.title === 'Work').length;
                    let sells5Count = allEvents.filter(event => event.title === 'Sells').length;
                    let exeption5Count = allEvents.filter(event => event.title === 'Exeption').length;

                    if (other5Events.some(event => event.title === 'Other')) {
                        document.getElementById('WorkingAwayDays_B').innerHTML = work5Count;
                        document.getElementById('WorkingAwayDays_A').innerHTML = sells5Count;
                        document.getElementById('ExeptionAllowanceDays').innerHTML = exeption5Count;
                    }
                    break;
                default:
                    console.log('Неизвестный тип события:', selectedEventType);
                    break;
            }
            updateSprcialAllowance();
        }
    });
    calendar.render();

    let events = [];
    let targetDates = ["2024-08-13", "2024-08-14", "2024-08-15"];
    let workTargetCount = 0;
    let sellsTargetCount = 0;

    document.getElementById('add-event').addEventListener('click', function () {
        let startDateInput = document.getElementById('start-date');
        let endDateInput = document.getElementById('end-date');
        let addButton = document.getElementById('add-event');
        let removeButton = document.getElementById('remove-event');

        let startDate = new Date(startDateInput.value);
        let endDate = new Date(endDateInput.value);

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

        let diffDays = parseInt((endDate - startDate) / oneDay, 10);
        events = [];

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

                for (let i = 1; i < diffDays; i++) {
                    let workStartDate = new Date(startDate.getTime() + i * oneDay);
                    events.push({
                        title: 'Work',
                        start: workStartDate.toISOString().split('T')[0],
                        end: new Date(workStartDate.getTime() + oneDay).toISOString().split('T')[0], // Добавляем один день к начальной дате
                        // display: 'background',
                        color: '#1E90FF' // Синий цвет для дней работы
                    });
                    // console.log(workStartDate.toISOString().split('T')[0]);
                }
                for (const targetDateStr of targetDates) {
                    const targetDate = new Date(targetDateStr);
                    if (targetDate > startDate && targetDate < endDate) {
                        workTargetCount++;
                    }
                }
                document.getElementById('SpecialAllowanceDays_B').innerHTML = workTargetCount;
                document.getElementById('SpecialAllowanceDays_A').innerHTML = sellsTargetCount;
                console.log(workTargetCount);

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

    function updateSprcialAllowance() {
        let allWorkEvents = events.filter(event => event.title === 'Work').length;
        let work6Count = calendar.getEvents().filter(event => event.title === 'Work').length;
        let movement6Events = calendar.getEvents().filter(event => event.title === 'Movement');

        console.log(allWorkEvents);
        switch (selectedEventType) {
            case 'Movement':
                console.log(event => event.start)
                if (movement6Events.some(event => event.title === 'Movement' && event.start === '2024-08-13')) {
                    if (allWorkEvents > work6Count) {
                        document.getElementById('SpecialAllowanceDays_B').innerHTML = --workTargetCount;
                    }
                }
                console.log(work6Count);
                break;
        }
    }

    document.getElementById('remove-event').addEventListener('click', function () {
        let startDateInput = document.getElementById('start-date');
        let endDateInput = document.getElementById('end-date');
        let addButton = document.getElementById('add-event');
        let removeButton = document.getElementById('remove-event');

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
        document.getElementById('SpecialAllowanceDays_B').innerHTML = "";
        document.getElementById('SpecialAllowanceDays_A').innerHTML = "";
        document.getElementById('ExeptionAllowanceDays').innerHTML = "";
        workTargetCount = 0;
        sellsTargetCount = 0;

    });
});
