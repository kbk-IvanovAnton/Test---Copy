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


    function exeptionUnitPriceFormat() {
        let exeptionAllowanceUnitPrice = document.getElementById('ExeptionAllowanceUnitPrice');

        exeptionAllowanceUnitPrice.addEventListener('input', function () {
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
    }

    exeptionUnitPriceFormat();

    for (let i = 0; i < 20; i++) {
        document.getElementById('details-' + i + '-currency_id').value = '1';
    }

    document.getElementById('add-event').addEventListener('click', function () {
        let startDateInput = document.getElementById('start-date');
        let endDateInput = document.getElementById('end-date');
        let addButton = document.getElementById('add-event');
        let removeButton = document.getElementById('remove-event');
        let allowanceCheckBox = document.getElementById('AccomodationAllowanceCheck');
        let allowanceExeptionInput = document.getElementById('ExeptionAllowanceUnitPrice');

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
        allowanceCheckBox.disabled = false;
        allowanceExeptionInput.disabled = false;


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
        document.getElementById('ExeptionAllowanceUnitPrice').value = 0;


        fetch('/admin_menu/get_allowance_prices_japan', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // console.log(data.result);
                    document.getElementById('AccomodationUnitPrice').innerHTML = Number(data.result[0].allowance).toLocaleString();
                    document.getElementById('AccomodationUnitPrice').dataset.lodgmentAllowance = data.result[0].allowance;
                    document.getElementById('WorkingAwayUnitPrice_A').innerHTML = Number(data.result[1].allowance).toLocaleString();
                    document.getElementById('WorkingAwayUnitPrice_A').dataset.workingAwayAllowanceA = data.result[1].allowance;
                    document.getElementById('WorkingAwayUnitPrice_B').innerHTML = Number(data.result[2].allowance).toLocaleString();
                    document.getElementById('WorkingAwayUnitPrice_B').dataset.workingAwayAllowanceB = data.result[2].allowance;
                    document.getElementById('SpecialAllowanceUnitPrice_A').innerHTML = Number(data.result[3].allowance).toLocaleString();
                    document.getElementById('SpecialAllowanceUnitPrice_A').dataset.specialAllowanceA = data.result[3].allowance;
                    document.getElementById('SpecialAllowanceUnitPrice_B').innerHTML = Number(data.result[4].allowance).toLocaleString();
                    document.getElementById('SpecialAllowanceUnitPrice_B').dataset.specialAllowanceB = data.result[4].allowance;
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

        // let list = calendar.getEvents();
        // console.log(list);

    });

    document.getElementById('remove-event').addEventListener('click', function () {
        let startDateInput = document.getElementById('start-date');
        let endDateInput = document.getElementById('end-date');
        let addButton = document.getElementById('add-event');
        let removeButton = document.getElementById('remove-event');
        let allowanceCheckBox = document.getElementById('AccomodationAllowanceCheck');
        let allowanceExeptionInput = document.getElementById('ExeptionAllowanceUnitPrice');

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
        allowanceCheckBox.disabled = true;
        allowanceExeptionInput.disabled = true;

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
        document.getElementById('ExeptionAllowanceUnitPrice').value = "";
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

    // document.getElementById('naritaButton').addEventListener('click', naritaTrip);

    document.getElementById('naritaButton').addEventListener('click', function () {
        naritaTrip();
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

    // document.getElementById('hanedaButton').addEventListener('click', hanedaTrip);

    document.getElementById('hanedaButton').addEventListener('click', function () {
        hanedaTrip();
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

            if (selectedTripValue === "0") {
                document.getElementById('TripDays').innerHTML = 0;
                document.getElementById('TripUnitPrice').innerHTML = 0;
            }

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
                        // document.getElementById('TripUnitPrice').dataset.tripUnitPrice = data.allowance;
                        document.getElementById('TripDays').innerHTML = 1;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })

        $('.location-select-return-trip').on('change', function () {
            let selectedReturnTripValue = $(this).val();

            if (selectedReturnTripValue === "0") {
                document.getElementById('ReturnTripDays').innerHTML = 0;
                document.getElementById('ReturnTripUnitPrice').innerHTML = 0;
            }

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
                        // document.getElementById('ReturnTripUnitPrice').dataset.returnTripUnitPrice = data.allowance;
                        document.getElementById('ReturnTripDays').innerHTML = 1;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })

        // Функция для проверки, идут ли даты последовательно (разница 1 день)
        function isConsecutive(date1, date2) {
            const oneDay = 24 * 60 * 60 * 1000; // Миллисекунды в одном дне
            return (date2 - date1) === oneDay;
        }

        // Функция форматирования последовательности дат
        function formatDateSequence(dates) {
            // Преобразуем строки дат в объекты Date
            dates = dates.map(dateStr => new Date(dateStr));

            // Сортируем даты
            dates.sort((a, b) => a - b);

            let result = [];
            let rangeStart = dates[0];
            let previous = dates[0];

            for (let i = 1; i < dates.length; i++) {
                if (!isConsecutive(previous, dates[i])) {
                    // Если диапазон (минимум две даты), записываем его в формате 'start - end'
                    if (rangeStart.getTime() !== previous.getTime()) {
                        result.push(`${formatDate(rangeStart)} -- ${formatDate(previous)}`);
                    } else {
                        result.push(`${formatDate(rangeStart)}`);
                    }
                    rangeStart = dates[i]; // Начинаем новый диапазон
                }
                previous = dates[i];
            }

            // Добавляем последний диапазон или дату
            if (rangeStart.getTime() !== previous.getTime()) {
                result.push(`${formatDate(rangeStart)} -- ${formatDate(previous)}`);
            } else {
                result.push(`${formatDate(rangeStart)}`);
            }

            return result.join(', ');
        }

        // Функция форматирования даты в строку (гггг-мм-дд)
        function formatDate(date) {
            let year = date.getFullYear();
            let month = String(date.getMonth() + 1).padStart(2, '0'); // Добавляем ведущий 0
            let day = String(date.getDate()).padStart(2, '0'); // Добавляем ведущий 0
            return `${year}/${month}/${day}`;
        }

        function allowanceLodgment() {
            let accomodationUnitPrice = document.querySelector('#AccomodationUnitPrice').dataset.lodgmentAllowance;
            let accomodationDays = $('#AccomodationDays').text();
            let accomodationAllowanceCheck = $('#AccomodationAllowanceCheck').is(':checked');
            let startDate = $('#start-date').val();
            let endDate = $('#end-date').val();

            // Создаем объекты Date на основе выбранных дат
            let formattedStartDate = new Date(startDate);
            let formattedEndDate = new Date(endDate);

            // Добавляем 1 день к начальной дате
            formattedStartDate.setDate(formattedStartDate.getDate() + 1);
            let accomodationStartDay = formattedStartDate.toISOString().split('T')[0].replace(/-/g, '/');

            // Вычитаем 1 день из конечной даты
            formattedEndDate.setDate(formattedEndDate.getDate() - 1);
            let accomodationEndDay = formattedEndDate.toISOString().split('T')[0].replace(/-/g, '/');

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
                    accomodationSumDays = accomodationStartDay + ' -- ' + accomodationEndDay;
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

        function allowanceWork() {
            let workingAwayDays_B = $('#WorkingAwayDays_B').text();
            let workingAwayDays_B_Int = parseInt(workingAwayDays_B);
            let workingAwayDays_A = $('#WorkingAwayDays_A').text();
            let workingAwayDays_A_Int = parseInt(workingAwayDays_A);
            let workingAwayUnitPrice_A = document.querySelector('#WorkingAwayUnitPrice_A').dataset.workingAwayAllowanceA;
            let workingAwayUnitPrice_A_Int = parseInt(workingAwayUnitPrice_A);
            let workingAwayUnitPrice_B = document.querySelector('#WorkingAwayUnitPrice_B').dataset.workingAwayAllowanceB;
            let workingAwayUnitPrice_B_Int = parseInt(workingAwayUnitPrice_B);

            let unitPrice = [];
            let days = [];
            let eventWorkDates = [];
            let eventSellsDates = [];

            // let formattedWorkDaysList = [];
            // let formattedSellsDaysList = [];

            unitPrice.push({ "A": workingAwayUnitPrice_A_Int });
            unitPrice.push({ "B": workingAwayUnitPrice_B_Int });
            days.push({ "A": workingAwayDays_A_Int });
            days.push({ "B": workingAwayDays_B_Int });

            // console.log(unitPrice, days);

            calendar.getEvents().forEach(function (event) {
                // Получаем даты начала и окончания события

                if (event.title === 'Work') {
                    let startWork = new Date(event.start);
                    startWork.setDate(startWork.getDate() + 1);
                    let formattedStartWork = startWork.toISOString().split('T')[0];

                    eventWorkDates.push(formattedStartWork);
                    // formattedWorkDaysList.push(formattedStartWork);

                }
            });

            // Извлекаем даты из eventWorkDates и преобразуем их в объекты Date
            let datesWork = eventWorkDates.map(item => new Date(item));

            // Находим самую раннюю и самую позднюю дату
            let earliestWorkDate = new Date(Math.min(...datesWork));

            let formatWorkDate = (date) => date.toISOString().split('T')[0].replace(/-/g, '/');

            let sumWorkDates;
            // let formattedWorkDates;

            switch (parseInt(workingAwayDays_B)) {
                case 0:
                    eventWorkDates = [];
                    eventWorkDates.push({ "B": "" });
                    break;
                case 1:
                    sumWorkDates = formatWorkDate(earliestWorkDate);
                    eventWorkDates = [];
                    eventWorkDates.push({ "B": sumWorkDates });
                    break;
                default:
                    sumWorkDates = formatDateSequence(eventWorkDates);
                    eventWorkDates = [];
                    eventWorkDates.push({ "B": sumWorkDates });
                    break;
            }

            console.log(eventWorkDates);

            calendar.getEvents().forEach(function (event) {
                // Получаем даты начала и окончания события

                if (event.title === 'Sells') {
                    let startSells = new Date(event.start);
                    startSells.setDate(startSells.getDate() + 1);
                    let formattedStartSells = startSells.toISOString().split('T')[0];

                    eventSellsDates.push(formattedStartSells);
                    // formattedSellsDaysList.push(formattedStartSells);
                }
            });

            let datesSells = eventSellsDates.map(item => new Date(item));

            // Находим самую раннюю и самую позднюю дату
            let earliestSellsDate = new Date(Math.min(...datesSells));

            let formatSellsDate = (date) => date.toISOString().split('T')[0].replace(/-/g, '/');

            let sumSellsDates;
            // let formattedSellsDates;

            switch (parseInt(workingAwayDays_A)) {
                case 0:
                    eventSellsDates = [];
                    eventSellsDates.push({ "A": "" });
                    break;
                case 1:
                    sumSellsDates = formatSellsDate(earliestSellsDate);
                    eventSellsDates = [];
                    eventSellsDates.push({ "A": sumSellsDates });
                    break;
                default:
                    sumSellsDates = formatDateSequence(eventSellsDates);
                    eventSellsDates = [];
                    eventSellsDates.push({ "A": sumSellsDates });
                    break;
            }

            console.log(eventSellsDates);

            let eventDates = [{ ...eventSellsDates[0], ...eventWorkDates[0] }];

            fetch('/admin_menu/allowance_work', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    eventDates: eventDates,
                    unitPrice: unitPrice,
                    days: days
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

        function allowanceSpecial() {
            let specialAllowanceDays_B = $('#SpecialAllowanceDays_B').text();
            let specialAllowanceDays_B_Int = parseInt(specialAllowanceDays_B);
            let specialAllowanceDays_A = $('#SpecialAllowanceDays_A').text();
            let specialAllowanceDays_A_Int = parseInt(specialAllowanceDays_A);
            let specialAllowanceUnitPrice_A = document.querySelector('#SpecialAllowanceUnitPrice_A').dataset.specialAllowanceA;
            let specialAllowanceUnitPrice_A_Int = parseInt(specialAllowanceUnitPrice_A);
            let specialAllowanceUnitPrice_B = document.querySelector('#SpecialAllowanceUnitPrice_B').dataset.specialAllowanceB;
            let specialAllowanceUnitPrice_B_Int = parseInt(specialAllowanceUnitPrice_B);

            let unitPrice = [];
            let days = [];
            let eventWorkDates = [];
            let eventSellsDates = [];

            // let formattedWorkDaysList = [];
            // let formattedSellsDaysList = [];

            unitPrice.push({ "A": specialAllowanceUnitPrice_A_Int });
            unitPrice.push({ "B": specialAllowanceUnitPrice_B_Int });
            days.push({ "A": specialAllowanceDays_A_Int });
            days.push({ "B": specialAllowanceDays_B_Int });

            // console.log(unitPrice, days);

            calendar.getEvents().forEach(function (event) {
                // Получаем даты начала и окончания события

                if (event.title === 'Work') {
                    let startWork = new Date(event.start);
                    startWork.setDate(startWork.getDate() + 1);
                    let formattedStartWork = startWork.toISOString().split('T')[0];

                    if (targetDates.includes(formattedStartWork)) {
                        eventWorkDates.push(formattedStartWork);
                        // formattedWorkDaysList.push(formattedStartWork);
                    }
                }
            });

            // Извлекаем даты из eventWorkDates и преобразуем их в объекты Date
            let datesWork = eventWorkDates.map(item => new Date(item.B));

            // Находим самую раннюю и самую позднюю дату
            let earliestWorkDate = new Date(Math.min(...datesWork));

            let formatWorkDate = (date) => date.toISOString().split('T')[0].replace(/-/g, '/');

            let sumWorkDates;
            // let formattedWorkDates;

            switch (parseInt(specialAllowanceDays_B)) {
                case 0:
                    eventWorkDates = [];
                    eventWorkDates.push({ "B": "" });
                    break;
                case 1:
                    sumWorkDates = formatWorkDate(earliestWorkDate);
                    eventWorkDates = [];
                    eventWorkDates.push({ "B": sumWorkDates });
                    break;
                default:
                    sumWorkDates = formatDateSequence(formattedWorkDaysList);
                    eventWorkDates = [];
                    eventWorkDates.push({ "B": sumWorkDates });
                    break;
            }

            console.log(eventWorkDates);

            calendar.getEvents().forEach(function (event) {
                // Получаем даты начала и окончания события

                if (event.title === 'Sells') {
                    let startSells = new Date(event.start);
                    startSells.setDate(startSells.getDate() + 1);
                    let formattedStartSells = startSells.toISOString().split('T')[0];

                    if (targetDates.includes(formattedStartSells)) {
                        eventSellsDates.push(formattedStartSells);
                        // formattedSellsDaysList.push(formattedStartSells);
                    }
                }
            });

            let datesSells = eventSellsDates.map(item => new Date(item.A));

            // Находим самую раннюю и самую позднюю дату
            let earliestSellsDate = new Date(Math.min(...datesSells));

            let formatSellsDate = (date) => date.toISOString().split('T')[0].replace(/-/g, '/');

            let sumSellsDates;
            // let formattedSellsDates;

            switch (parseInt(specialAllowanceDays_A)) {
                case 0:
                    eventSellsDates = [];
                    eventSellsDates.push({ "A": "" });
                    break;
                case 1:
                    sumSellsDates = formatSellsDate(earliestSellsDate);
                    eventSellsDates = [];
                    eventSellsDates.push({ "A": sumSellsDates });
                    break;
                default:
                    sumSellsDates = formatDateSequence(formattedSellsDaysList);
                    eventSellsDates = [];
                    eventSellsDates.push({ "A": sumSellsDates });
                    break;
            }

            console.log(eventSellsDates);

            let eventDates = [{ ...eventSellsDates[0], ...eventWorkDates[0] }];

            // console.log(eventDates);

            fetch('/admin_menu/allowance_special', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    eventDates: eventDates,
                    unitPrice: unitPrice,
                    days: days
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

        function allowanceSpecialCase() {
            let exeptionAllowanceDays = document.getElementById('ExeptionAllowanceDays').innerText;
            let exeptionAllowanceDays_Int = parseInt(exeptionAllowanceDays);
            let exeptionAllowanceUnitPrice = document.getElementById('ExeptionAllowanceUnitPrice').value;
            let exeptionAllowanceUnitPrice_Int = parseInt(exeptionAllowanceUnitPrice.replace(/,/g, ''), 10);

            let eventExeptionDates = [];
            let eventExeptionDatesStr;

            calendar.getEvents().forEach(function (event) {
                // Получаем даты начала и окончания события

                if (event.title === 'Exeption') {
                    let startExeption = new Date(event.start);
                    startExeption.setDate(startExeption.getDate() + 1);
                    let formattedStartExeption = startExeption.toISOString().split('T')[0];

                    eventExeptionDates.push(formattedStartExeption);
                    eventExeptionDatesStr = formatDateSequence(eventExeptionDates);
                } else {
                    eventExeptionDatesStr = "";
                }
            });

            console.log(eventExeptionDatesStr);

            fetch('/admin_menu/allowance_special_case', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    eventExeptionDates: eventExeptionDatesStr,
                    exeptionAllowanceUnitPrice_Int: exeptionAllowanceUnitPrice_Int,
                    exeptionAllowanceDays_Int: exeptionAllowanceDays_Int
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

        function allowanceMove() {
            let tripDays = document.getElementById('TripDays').innerText;
            let tripDays_Int = parseInt(tripDays);
            let tripUnitPrice = document.getElementById('TripUnitPrice').innerText;
            let tripUnitPrice_Int = parseInt(tripUnitPrice.replace(/,/g, ''), 10);
            let tripID = document.querySelector('.location-select-trip').value;
            let tripID_Int = parseInt(tripID);

            let returnTripDays = document.getElementById('ReturnTripDays').innerText;
            let returnTripDays_Int = parseInt(returnTripDays);
            let returnTripUnitPrice = document.getElementById('ReturnTripUnitPrice').innerText;
            let returnTripUnitPrice_Int = parseInt(returnTripUnitPrice.replace(/,/g, ''), 10);
            let returnTripID = document.querySelector('.location-select-return-trip').value;
            let returnTripID_Int = parseInt(returnTripID);

            // console.log(tripDays_Int, tripUnitPrice_Int, tripID_Int, returnTripDays, returnTripUnitPrice_Int, returnTripID_Int);

            let moveEvents = [];
            let moveIDs = [];
            let movePrices = [];
            let moveDays = [];

            let earliestDate;
            let oldestDate;

            calendar.getEvents().forEach(function (event) {

                if (event.title === 'Movement') {

                    moveEvents.push(event.startStr);

                    let datesMove = moveEvents.map(item => new Date(item));

                    earliestDate = new Date(Math.min(...datesMove));
                    oldestDate = new Date(Math.max(...datesMove));

                    earliestDate = earliestDate.toISOString().split('T')[0].replace(/-/g, '/');
                    oldestDate = oldestDate.toISOString().split('T')[0].replace(/-/g, '/');

                }
            });

            if (oldestDate === earliestDate) {
                oldestDate = $('#end-date').val();
                oldestDate = oldestDate.replace(/-/g, '/');
            }

            if (moveEvents.length === 0) {
                earliestDate = $('#start-date').val();
                earliestDate = earliestDate.replace(/-/g, '/');
                oldestDate = $('#end-date').val();
                oldestDate = oldestDate.replace(/-/g, '/');
            }

            moveEvents = [];

            moveEvents.push({ "1": earliestDate, "2": oldestDate });
            moveDays.push({ "1": tripDays_Int, "2": returnTripDays_Int });
            moveIDs.push({ "1": tripID_Int, "2": returnTripID_Int });
            movePrices.push({ "1": tripUnitPrice_Int, "2": returnTripUnitPrice_Int });

            // console.log(moveEvents);
            // console.log(moveDays);
            // console.log(moveIDs);
            // console.log(movePrices);

            fetch('/admin_menu/allowance_move', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    moveEvents: moveEvents,
                    moveDays: moveDays,
                    moveIDs: moveIDs,
                    movePrices: movePrices
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

        function allowances() {

            let moveEvents = [];

            let earliestDate;
            let oldestDate;

            calendar.getEvents().forEach(function (event) {

                if (event.title === 'Movement') {

                    moveEvents.push(event.startStr);

                    let datesMove = moveEvents.map(item => new Date(item));

                    earliestDate = new Date(Math.min(...datesMove));
                    oldestDate = new Date(Math.max(...datesMove));

                    earliestDate = earliestDate.toISOString().split('T')[0];
                    oldestDate = oldestDate.toISOString().split('T')[0];

                }
            });

            if (oldestDate === earliestDate) {
                oldestDate = $('#end-date').val();
            }

            if (moveEvents.length === 0) {
                earliestDate = $('#start-date').val();
                oldestDate = $('#end-date').val();
            }

            console.log(earliestDate, oldestDate);

            fetch('/admin_menu/allowances', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    earliestDate: earliestDate,
                    oldestDate: oldestDate,
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

        $('.btn-submit').click(function () {

        })

        $('#test').click(function () {
            allowanceLodgment();
            allowanceWork();
            allowanceSpecial();
            allowanceSpecialCase();
            allowanceMove();
            setTimeout(allowances, 500);
            // allowances();
        })
    });
});

