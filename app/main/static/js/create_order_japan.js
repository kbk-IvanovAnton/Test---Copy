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
    const formSelects = document.querySelectorAll('.location-select-trip , .location-select-return-trip');

    // Функция для активации/деактивации форм
    function toggleForms(disabled) {
        formSelects.forEach(function (select) {
            select.disabled = disabled;
        });
    }

    function updateMoveButtons() {
        let rows = $('#detailsTable tbody tr');
        rows.each(function (index) {
            let upButton = $(this).find('.move-up');
            let downButton = $(this).find('.move-down');

            if (index === 0) {
                upButton.prop('disabled', true).addClass('disabled');
            } else {
                upButton.prop('disabled', false).removeClass('disabled');
            }

            if (index === rows.length - 1) {
                downButton.prop('disabled', true).addClass('disabled');
            } else {
                downButton.prop('disabled', false).removeClass('disabled');
            }
        });
    }

    function swapRows(row1, row2) {
        let order1 = parseInt(row1.data('order'), 10);
        let order2 = parseInt(row2.data('order'), 10);

        // Меняем местами значения order
        row1.data('order', order2);
        row2.data('order', order1);

        // Меняем местами строки в DOM
        row2.insertBefore(row1);

        // Обновляем порядок на сервере
        // updateOrder(row1.data('id'), order2);
        // updateOrder(row2.data('id'), order1);

        updateMoveButtons();
    }

    // Обработчик для кнопки "вверх"
    $(document).on('click', '.move-up:not(.disabled)', function () {
        let currentRow = $(this).closest('tr');
        let previousRow = currentRow.prev();
        if (previousRow.length) {
            swapRows(previousRow, currentRow);
        }
    });

    // Обработчик для кнопки "вниз"
    $(document).on('click', '.move-down:not(.disabled)', function () {
        let currentRow = $(this).closest('tr');
        let nextRow = currentRow.next();
        if (nextRow.length) {
            swapRows(currentRow, nextRow);
        }
    });

    toggleForms(true);
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
                    if (info.event.title === 'Sells' && targetDates.includes(info.event.startStr)) {
                        document.getElementById('SpecialAllowanceDays_A').innerHTML = --sellsTargetCount;
                        document.getElementById('SpecialAllowanceDays_B').innerHTML = ++workTargetCount;
                    }
                    else if (info.event.title === 'Movement' && targetDates.includes(info.event.startSt)) {
                        document.getElementById('SpecialAllowanceDays_B').innerHTML = ++workTargetCount;
                    }
                    else if (info.event.title === 'Exeption' && targetDates.includes(info.event.startStr)) {
                        document.getElementById('SpecialAllowanceDays_B').innerHTML = ++workTargetCount;
                    }
                    info.event.setProp('title', 'Work');
                    info.event.setProp('backgroundColor', '#1E90FF');
                    info.event.setProp('borderColor', '#1E90FF');
                    document.getElementById('WorkingAwayDays_B').innerHTML = calendar.getEvents().filter(event => event.title === 'Work').length;
                    document.getElementById('WorkingAwayDays_A').innerHTML = calendar.getEvents().filter(event => event.title === 'Sells').length;
                    document.getElementById('ExeptionAllowanceDays').innerHTML = calendar.getEvents().filter(event => event.title === 'Exeption').length;
                    break;
                case 'Sells':
                    if (info.event.title === 'Work' && targetDates.includes(info.event.startStr)) {
                        document.getElementById('SpecialAllowanceDays_A').innerHTML = ++sellsTargetCount;
                        document.getElementById('SpecialAllowanceDays_B').innerHTML = --workTargetCount;
                    }
                    else if (info.event.title === 'Movement' && targetDates.includes(info.event.startStr)) {
                        document.getElementById('SpecialAllowanceDays_A').innerHTML = ++sellsTargetCount;
                    }
                    else if (info.event.title === 'Exeption' && targetDates.includes(info.event.startStr)) {
                        document.getElementById('SpecialAllowanceDays_A').innerHTML = ++sellsTargetCount;
                    }
                    info.event.setProp('title', 'Sells');
                    info.event.setProp('backgroundColor', '#2E8B57');
                    info.event.setProp('borderColor', '#2E8B57');
                    document.getElementById('WorkingAwayDays_B').innerHTML = calendar.getEvents().filter(event => event.title === 'Work').length;
                    document.getElementById('WorkingAwayDays_A').innerHTML = calendar.getEvents().filter(event => event.title === 'Sells').length;
                    document.getElementById('ExeptionAllowanceDays').innerHTML = calendar.getEvents().filter(event => event.title === 'Exeption').length;
                    break;
                case 'Movement':
                    if (info.event.title === 'Work' && targetDates.includes(info.event.startStr)) {
                        document.getElementById('SpecialAllowanceDays_B').innerHTML = --workTargetCount;
                    }
                    else if (info.event.title === 'Sells' && targetDates.includes(info.event.startStr)) {
                        document.getElementById('SpecialAllowanceDays_A').innerHTML = --sellsTargetCount;
                    }
                    info.event.setProp('title', 'Movement');
                    info.event.setProp('backgroundColor', '#F0E68C');
                    info.event.setProp('borderColor', '#F0E68C');
                    document.getElementById('WorkingAwayDays_B').innerHTML = calendar.getEvents().filter(event => event.title === 'Work').length;
                    document.getElementById('WorkingAwayDays_A').innerHTML = calendar.getEvents().filter(event => event.title === 'Sells').length;
                    document.getElementById('ExeptionAllowanceDays').innerHTML = calendar.getEvents().filter(event => event.title === 'Exeption').length;
                    break;
                case 'Exeption':
                    if (info.event.title === 'Work' && targetDates.includes(info.event.startStr)) {
                        document.getElementById('SpecialAllowanceDays_B').innerHTML = --workTargetCount;
                    }
                    else if (info.event.title === 'Sells' && targetDates.includes(info.event.startStr)) {
                        document.getElementById('SpecialAllowanceDays_A').innerHTML = --sellsTargetCount;
                    }
                    info.event.setProp('title', 'Exeption');
                    info.event.setProp('backgroundColor', '#CD5C5C');
                    info.event.setProp('borderColor', '#CD5C5C');
                    document.getElementById('WorkingAwayDays_B').innerHTML = calendar.getEvents().filter(event => event.title === 'Work').length;
                    document.getElementById('WorkingAwayDays_A').innerHTML = calendar.getEvents().filter(event => event.title === 'Sells').length;
                    document.getElementById('ExeptionAllowanceDays').innerHTML = calendar.getEvents().filter(event => event.title === 'Exeption').length;
                    break;
                case 'Other':
                    if (info.event.title === 'Work' && targetDates.includes(info.event.startStr)) {
                        document.getElementById('SpecialAllowanceDays_B').innerHTML = --workTargetCount;
                    }
                    else if (info.event.title === 'Sells' && targetDates.includes(info.event.startStr)) {
                        document.getElementById('SpecialAllowanceDays_A').innerHTML = --sellsTargetCount;
                    }
                    info.event.setProp('title', 'Other');
                    info.event.setProp('backgroundColor', '#BA55D3');
                    info.event.setProp('borderColor', '#BA55D3');
                    document.getElementById('WorkingAwayDays_B').innerHTML = calendar.getEvents().filter(event => event.title === 'Work').length;
                    document.getElementById('WorkingAwayDays_A').innerHTML = calendar.getEvents().filter(event => event.title === 'Sells').length;
                    document.getElementById('ExeptionAllowanceDays').innerHTML = calendar.getEvents().filter(event => event.title === 'Exeption').length;
                    break;
            }
            info.view.calendar.unselect();

            // let eventDates = [];

            // calendar.getEvents().forEach(function (event) {
            //     // Получаем даты начала и окончания события
            //     let start = event.start;
            //     let end = event.end;

            //     // Форматируем даты в строку формата YYYY-MM-DD
            //     let formattedStart = start.toISOString().split('T')[0];
            //     let formattedEnd = end.toISOString().split('T')[0];

            //     // Сохраняем форматированные даты в массив
            //     eventDates.push({ start: formattedStart, end: formattedEnd });
            // });

            // // Теперь eventDates содержит все даты всех событий
            // console.log(eventDates);
        },
    });

    calendar.render();

    let events = [];

    const currentYear = new Date().getFullYear();
    const pastYear = currentYear - 1;
    const futureYear = currentYear + 1;
    let targetDates = ["08-13", "08-14", "08-15", "12-30", "12-31", "01-01", "01-02", "01-03"];
    currentDates = targetDates.map(date => currentYear + "-" + date);
    pastDates = targetDates.map(date => pastYear + "-" + date);
    futureDates = targetDates.map(date => futureYear + "-" + date);
    targetDates = currentDates.concat(pastDates, futureDates);

    let workTargetCount = 0;
    let sellsTargetCount = 0;

    document.getElementById('rates-0-currency_id').value = '1';

    for (let i = 0; i < 20; i++) {
        document.getElementById('details-' + i + '-currency_id').value = '1';
    }

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
                    color: '#F0E68C'
                });
                document.getElementById('SpecialAllowanceDays_B').innerHTML = workTargetCount;
                document.getElementById('SpecialAllowanceDays_A').innerHTML = sellsTargetCount;
                document.getElementById('ExeptionAllowanceDays').innerHTML = 0;
                break;
            case 1:
                events.push({
                    title: 'Movement',
                    start: startDate.toISOString().split('T')[0],
                    end: startDate.toISOString().split('T')[0],
                    color: '#F0E68C'
                }, {
                    title: 'Movement',
                    start: endDate.toISOString().split('T')[0],
                    end: endDate.toISOString().split('T')[0],
                    color: '#F0E68C'
                });
                document.getElementById('SpecialAllowanceDays_B').innerHTML = workTargetCount;
                document.getElementById('SpecialAllowanceDays_A').innerHTML = sellsTargetCount;
                document.getElementById('ExeptionAllowanceDays').innerHTML = 0;
                break;
            default:
                events.push({
                    title: 'Movement',
                    start: startDate.toISOString().split('T')[0],
                    end: startDate.toISOString().split('T')[0],
                    color: '#F0E68C'
                });

                for (let i = 1; i < diffDays; i++) {
                    let workStartDate = new Date(startDate.getTime() + i * oneDay);
                    events.push({
                        title: 'Work',
                        start: workStartDate.toISOString().split('T')[0],
                        end: workStartDate.toISOString().split('T')[0],
                        color: '#1E90FF'
                    });
                }
                for (const targetDateStr of targetDates) {
                    const targetDate = new Date(targetDateStr);
                    if (targetDate > startDate && targetDate < endDate) {
                        workTargetCount++;
                    }
                }
                document.getElementById('SpecialAllowanceDays_B').innerHTML = workTargetCount;
                document.getElementById('SpecialAllowanceDays_A').innerHTML = sellsTargetCount;
                document.getElementById('ExeptionAllowanceDays').innerHTML = 0;

                events.push({
                    title: 'Movement',
                    start: endDate.toISOString().split('T')[0],
                    end: endDate.toISOString().split('T')[0],
                    color: '#F0E68C'
                });
                break;
        }

        calendar.addEventSource(events);

        calendar.gotoDate(startDate.toISOString().split('T')[0]);

        // Скрипт заполнения таблицы allowance
        document.getElementById('TripDays').innerHTML = 0;
        document.getElementById('TripUnitPrice').innerHTML = 0;
        document.getElementById('ReturnTripDays').innerHTML = 0;
        document.getElementById('ReturnTripUnitPrice').innerHTML = 0;

        fetch('/admin_menu/get_allowance_prices_japan', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log(data.result);
                    document.getElementById('AccomodationUnitPrice').innerHTML = Number(data.result[0].allowance).toLocaleString();
                    document.getElementById('AccomodationUnitPrice').dataset.value = data.result[0].allowance;
                    document.getElementById('WorkingAwayUnitPrice_A').innerHTML = Number(data.result[1].allowance).toLocaleString();
                    document.getElementById('WorkingAwayUnitPrice_B').innerHTML = Number(data.result[2].allowance).toLocaleString();
                    document.getElementById('SpecialAllowanceUnitPrice_A').innerHTML = Number(data.result[3].allowance).toLocaleString();
                    document.getElementById('SpecialAllowanceUnitPrice_B').innerHTML = Number(data.result[4].allowance).toLocaleString();
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

        let eventCount = events.length;
        document.getElementById('AccomodationDays').innerHTML = eventCount - 1;

        // Пример: подсчёт количества событий с заголовком 'Work'
        let workEvents = events.filter(event => event.title === 'Work');
        let workCount = workEvents.length;

        document.getElementById('WorkingAwayDays_B').innerHTML = workCount;

        // Подсчёт количества событий с заголовком 'Sells'
        let sellsEvents = events.filter(event => event.title === 'Sells');
        let sellsCount = sellsEvents.length;

        document.getElementById('WorkingAwayDays_A').innerHTML = sellsCount;

        let list = calendar.getEvents();
        console.log(list);

    });

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
        document.getElementById('TripDays').innerHTML = "";
        document.getElementById('ReturnTripDays').innerHTML = "";
        document.getElementById('TripUnitPrice').innerHTML = "";
        document.getElementById('ReturnTripUnitPrice').innerHTML = "";
        workTargetCount = 0;
        sellsTargetCount = 0;

        document.getElementById('location_id').value = '0'; // Trip/Return Trip select field to 'None'
        document.getElementById('location1_id').value = '0';

    });

    function naritaTrip() {

        for (let i = 0; i < 20; i++) {

            const currentContentElement = document.getElementById('details-' + i + '-content');
            const currentAccountItemElement = document.getElementById('details-' + i + '-account_item_id');
            const currentUnitPriceElement = document.getElementById('details-' + i + '-unit_price');
            const currentApplyingDateElement = document.getElementById('details-' + i + '-applying_date');

            // Проверяем, пустое ли текущее поле
            if (currentContentElement.value !== '' || currentAccountItemElement.value !== '0' || currentApplyingDateElement.value !== '') {
                continue; // Продолжаем цикл
            } else {
                currentContentElement.value = '市川 ⇔ 成田空港(片道)';
                currentAccountItemElement.value = '1';
                currentUnitPriceElement.value = Number('1170').toLocaleString();
                return; // Останавливаем выполнение, чтобы не продолжать цикл
            }
        }
    }

    document.getElementById('naritaButton').addEventListener('click', naritaTrip);

    document.getElementById('naritaButton').addEventListener('click', function () {
        subtotalCalc();
    });

    function hanedaTrip() {

        for (let i = 0; i < 20; i++) {

            const currentContentElement = document.getElementById('details-' + i + '-content');
            const currentAccountItemElement = document.getElementById('details-' + i + '-account_item_id');
            const currentUnitPriceElement = document.getElementById('details-' + i + '-unit_price');
            const currentApplyingDateElement = document.getElementById('details-' + i + '-applying_date');

            // Проверяем, пустое ли текущее поле
            if (currentContentElement.value !== '' || currentAccountItemElement.value !== '0' || currentApplyingDateElement.value !== '') {
                continue; // Продолжаем цикл
            } else {
                currentContentElement.value = '市川 ⇔ 羽田空港(片道)';
                currentAccountItemElement.value = '1';
                currentUnitPriceElement.value = Number('810').toLocaleString();
                return; // Останавливаем выполнение, чтобы не продолжать цикл
            }
        }
    }

    document.getElementById('hanedaButton').addEventListener('click', hanedaTrip);

    document.getElementById('hanedaButton').addEventListener('click', function () {
        subtotalCalc();
    });

    function subtotalCalc() {

        for (let i = 0; i < 20; i++) {

            const currentUnitPriceElement = document.getElementById('details-' + i + '-unit_price');
            const currentQuantityElement = document.getElementById('details-' + i + '-quantity');
            const currentSubtotalElement = document.getElementById('subtotal_id_' + i);

            currentUnitPriceElement.addEventListener('input', function () {
                // Убираем все нечисловые символы кроме точки
                let value = this.value.replace(/,/g, '').replace(/[^\d.]/g, '');

                // Если введено число с плавающей точкой, оставляем только одну точку
                const parts = value.split('.');
                if (parts.length > 2) {
                    value = parts[0] + '.' + parts.slice(1).join('');
                }

                // Преобразуем строку в число и форматируем с разделением на тысячи
                const formattedValue = Number(value).toLocaleString('en-US');

                // Обновляем значение в input
                this.value = formattedValue;
            })

            if (currentUnitPriceElement.value !== '' && currentQuantityElement.value !== '') {
                const subtotal = currentUnitPriceElement.value.replace(/,/g, '') * Number(currentQuantityElement.value);
                currentSubtotalElement.innerHTML = Number(subtotal).toLocaleString();
            } else {
                currentSubtotalElement.innerHTML = '';
            }
        }
    }

    document.getElementById('detailsTable').addEventListener('input', subtotalCalc);

    document.getElementById('AccomodationAllowanceCheck').addEventListener('click', function () {
        fetch('/admin_menu/get_allowance_prices_japan', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (document.getElementById('AccomodationAllowanceCheck').checked) {
                        document.getElementById('AccomodationUnitPrice').innerHTML = Number(data.result[0].allowance).toLocaleString();
                        document.getElementById('AccomodationDays').innerHTML = calendar.getEvents().length - 1;
                    } else {
                        document.getElementById('AccomodationUnitPrice').innerHTML = Number(data.result[0].allowance).toLocaleString();
                        document.getElementById('AccomodationDays').innerHTML = 0;
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    $(document).ready(function () {
        // Обработчик события change для элемента select с классом .location-select
        $('.location-select-trip').on('change', function () {
            let selectedTripValue = $(this).val();

            fetch('/admin_menu/get_allowance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: selectedTripValue })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        document.getElementById('TripUnitPrice').innerHTML = Number(data.allowance).toLocaleString();
                        document.getElementById('TripDays').innerHTML = 1;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })

        $('.location-select-return-trip').on('change', function () {
            let selectedReturnTripValue = $(this).val();

            fetch('/admin_menu/get_return_allowance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: selectedReturnTripValue })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        document.getElementById('ReturnTripUnitPrice').innerHTML = Number(data.allowance).toLocaleString();
                        document.getElementById('ReturnTripDays').innerHTML = 1;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })

        function allowanceLodgment() {
            let accomodationUnitPrice = document.querySelector('#AccomodationUnitPrice').dataset.value;
            let accomodationDays = $('#AccomodationDays').text();
            let accomodationAllowanceCheck = $('#AccomodationAllowanceCheck').is(':checked');
            let startDate = $('#start-date').val();
            let endDate = $('#end-date').val();

            // Создаем объекты Date на основе выбранных дат
            let formattedStartDate = new Date(startDate);
            let formattedEndDate = new Date(endDate);

            // Добавляем 1 день к начальной дате
            formattedStartDate.setDate(formattedStartDate.getDate() + 1);
            let accomodationStartDay = formattedStartDate.toISOString().split('T')[0];

            // Вычитаем 1 день из конечной даты
            formattedEndDate.setDate(formattedEndDate.getDate() - 1);
            let accomodationEndDay = formattedEndDate.toISOString().split('T')[0];

            // Создаем строку диапазона дат
            let accomodationSumDays;

            switch (parseInt(accomodationDays)) {
                case 0:
                    accomodationSumDays = "";
                    break;
                case 1:
                    accomodationSumDays = accomodationStartDay
                    break;
                default:
                    accomodationSumDays = accomodationStartDay + ' ～ ' + accomodationEndDay;
                    break;
            }

            fetch('/admin_menu/allowance_lodgment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    accomodationUnitPrice: accomodationUnitPrice,
                    accomodationDays: accomodationDays,
                    accomodationAllowanceCheck: accomodationAllowanceCheck,
                    accomodationSumDays: accomodationSumDays
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log('Success:', data);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

        $('#test').click(function () {
            allowanceLodgment();
        })
    });
});

