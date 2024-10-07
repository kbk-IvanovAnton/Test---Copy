$(document).ready(function () {
    function printDiv(divId) {
        var printContents = document.getElementById(divId).innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }

    function initTablePrint() {
        // Задаем количество строк
        const numberOfRows = 20;

        // Получаем тело таблицы
        const tableBody = document.getElementById("orderFormTable").getElementsByTagName("tbody")[0];

        // Заполняем таблицу
        for (let i = 1; i <= numberOfRows; i++) {
            const newRow = document.createElement("tr");
            newRow.id = "row-" + i;

            const cell1 = document.createElement("td");
            cell1.textContent = i;
            cell1.id = "first-" + i;
            // cell1.style.borderBottomColor = "gainsboro";
            newRow.appendChild(cell1);

            const cell2 = document.createElement("td");
            // cell2.textContent = "Содержимое " + i;
            cell2.id = "second-" + i;
            // cell2.style.backgroundColor = "#ffa837b9"
            newRow.appendChild(cell2);

            const cell3 = document.createElement("td");
            // cell3.textContent = "Содержимое " + i;
            cell3.id = "third-" + i;
            // cell3.style.backgroundColor = "#ffa837b9"
            newRow.appendChild(cell3);

            const cell4 = document.createElement("td");
            // cell4.textContent = "Содержимое " + i;
            cell4.id = "fourth-" + i;
            // cell4.style.backgroundColor = "#ffa837b9"
            newRow.appendChild(cell4);

            const cell5 = document.createElement("td");
            // cell5.textContent = "Содержимое " + i;
            cell5.id = "fifth-" + i;
            // cell5.style.backgroundColor = "#ffa837b9"
            newRow.appendChild(cell5);

            const cell6 = document.createElement("td");
            // cell6.textContent = "Содержимое " + i;
            cell6.id = "sixth-" + i;
            newRow.appendChild(cell6);

            const cell7 = document.createElement("td");
            // cell7.textContent = "Содержимое " + i;
            cell7.id = "seventh-" + i;
            // cell7.style.backgroundColor = "#69ff61b9"
            newRow.appendChild(cell7);

            const cell8 = document.createElement("td");
            // cell8.textContent = "Содержимое " + i;
            cell8.id = "eighth-" + i;
            // cell8.style.backgroundColor = "#69ff61b9"
            newRow.appendChild(cell8);

            const cell9 = document.createElement("td");
            // cell9.textContent = "Содержимое " + i;
            cell9.id = "ninth-" + i;
            // cell9.style.backgroundColor = "#ffa837b9"
            newRow.appendChild(cell9);

            // Добавляем новую строку в тело таблицы
            tableBody.appendChild(newRow);
        }
    }

    function borderColorBtm() {

        // Задаем количество строк
        const numberOfRows = 20;

        for (let i = 1; i <= numberOfRows - 1; i++) {
            const cell1 = document.getElementById("first-" + i);
            const cell2 = document.getElementById("second-" + i);
            const cell3 = document.getElementById("third-" + i);
            const cell4 = document.getElementById("fourth-" + i);
            const cell5 = document.getElementById("fifth-" + i);
            const cell6 = document.getElementById("sixth-" + i);
            const cell7 = document.getElementById("seventh-" + i);
            const cell8 = document.getElementById("eighth-" + i);
            const cell9 = document.getElementById("ninth-" + i);

            cell1.style.borderBottomColor = "gainsboro";
            cell2.style.borderBottomColor = "gainsboro";
            cell3.style.borderBottomColor = "gainsboro";
            cell4.style.borderBottomColor = "gainsboro";
            cell5.style.borderBottomColor = "gainsboro";
            cell6.style.borderBottomColor = "gainsboro";
            cell7.style.borderBottomColor = "gainsboro";
            cell8.style.borderBottomColor = "gainsboro";
            cell9.style.borderBottomColor = "gainsboro";
        }
    }

    function subTotal1(className) {
        let cells = document.querySelectorAll(`.${className}`);
        let sum = 0;

        // Перебираем все выбранные элементы
        cells.forEach(cell => {
            let cellValue = cell.innerHTML;
            intValue = parseInt(cellValue.replace(/\D/g, ''));
            if (!isNaN(intValue)) {
                sum += intValue;
            }
        });

        return sum;
    }

    function subTotalA_BInsert(result) {
        let totalA = document.getElementById('totalA');
        let totalB = document.getElementById('totalB');
        totalA.textContent = '¥' + result;
        totalB.textContent = '¥' + result;
    }

    function cardPayment(paymentMethod) {
        let cellsPayment = document.querySelectorAll(`.${paymentMethod}`);
        let sum = 0;

        // Перебираем все выбранные элементы
        cellsPayment.forEach(cell => {
            let cellPaymentValue = cell.innerHTML;
            if (cellPaymentValue === "カード") {
                // console.log(cellPaymentValue);
                let cellPaymentValueId = cell.id;
                let cellPaymentValueIdNum = parseInt(cellPaymentValueId.replace(/[^0-9]/g, ''));
                let subTotalValue = document.getElementById('subtotal_id_' + cellPaymentValueIdNum);
                let subTotalValueInnerHTML = subTotalValue.innerHTML;
                let subTotalValueInt = parseInt(subTotalValueInnerHTML.replace(/\D/g, ''));
                sum += subTotalValueInt;
                // console.log(cellPaymentValueIdNum, subTotalValueInt);
            }
        });

        return sum;
    }

    function cashAndICPayment(paymentMethod) {
        let cellsPayment = document.querySelectorAll(`.${paymentMethod}`);
        let sum = 0;

        // Перебираем все выбранные элементы
        cellsPayment.forEach(cell => {
            let cellPaymentValue = cell.innerHTML;
            if (cellPaymentValue === "現金" || cellPaymentValue === "電子マネー") {
                // console.log(cellPaymentValue);
                let cellPaymentValueId = cell.id;
                let cellPaymentValueIdNum = parseInt(cellPaymentValueId.replace(/[^0-9]/g, ''));
                let subTotalValue = document.getElementById('subtotal_id_' + cellPaymentValueIdNum);
                let subTotalValueInnerHTML = subTotalValue.innerHTML;
                let subTotalValueInt = parseInt(subTotalValueInnerHTML.replace(/\D/g, ''));
                sum += subTotalValueInt;
                // console.log(cellPaymentValueIdNum, subTotalValueInt);
            }
        });

        return sum;
    }

    function invoicePayment(paymentMethod) {
        let cellsPayment = document.querySelectorAll(`.${paymentMethod}`);
        let sum = 0;

        // Перебираем все выбранные элементы
        cellsPayment.forEach(cell => {
            let cellPaymentValue = cell.innerHTML;
            if (cellPaymentValue === "請求書") {
                // console.log(cellPaymentValue);
                let cellPaymentValueId = cell.id;
                let cellPaymentValueIdNum = parseInt(cellPaymentValueId.replace(/[^0-9]/g, ''));
                let subTotalValue = document.getElementById('subtotal_id_' + cellPaymentValueIdNum);
                let subTotalValueInnerHTML = subTotalValue.innerHTML;
                let subTotalValueInt = parseInt(subTotalValueInnerHTML.replace(/\D/g, ''));
                sum += subTotalValueInt;
                // console.log(cellPaymentValueIdNum, subTotalValueInt);
            }
        });

        return sum;
    }

    function cardHotelCompensation(accountItem) {
        let cellsItem = document.querySelectorAll(`.${accountItem}`);
        let sum = 0;

        // Перебираем все выбранные элементы
        cellsItem.forEach(cell => {
            let cellItemValue = cell.innerHTML;
            if (cellItemValue === "ホテル代") {
                // console.log(cellPaymentValue);
                let cellItemValueId = cell.id;
                let cellItemValueIdNum = parseInt(cellItemValueId.replace(/[^0-9]/g, ''));
                let paymentValue = document.getElementById('payment_method_id_' + cellItemValueIdNum);
                let paymentValueInnerHTML = paymentValue.innerHTML;
                if (paymentValueInnerHTML === "カード") {
                    let subTotalValue = document.getElementById('subtotal_id_' + cellItemValueIdNum);
                    let subTotalValueInnerHTML = subTotalValue.innerHTML;
                    let subTotalValueInt = parseInt(subTotalValueInnerHTML.replace(/\D/g, ''));
                    sum += subTotalValueInt;
                }
            }
        });

        return sum;
    }

    function getRateValues() {
        let temporaryPayment = document.getElementById('temporaryPayment').innerHTML;
        let remainingPayment = document.getElementById('remainingPayment').innerHTML;
        let temporaryPaymentInt = parseInt(temporaryPayment.replace(/\D/g, ''));
        let remainingPaymentInt = parseInt(remainingPayment.replace(/\D/g, ''));

        return [temporaryPaymentInt, remainingPaymentInt];
    }

    function totalCalc() {
        let result = subTotal1('total');
        subTotalA_BInsert(result);
        let card = cardPayment('payment_method');
        document.getElementById('card').textContent = '¥' + card;
        let cashAndIC = cashAndICPayment('payment_method');
        document.getElementById('cashAndIC').textContent = '¥' + cashAndIC;
        document.getElementById('cashAndIC-1').textContent = '¥' + cashAndIC;
        let invoice = invoicePayment('payment_method');
        document.getElementById('invoice').textContent = '¥' + invoice;
        let travelTotal = card + cashAndIC + invoice + result;
        document.getElementById('travelTotal').textContent = '¥' + travelTotal;
        let hotelCompensation = cardHotelCompensation('account_item');
        document.getElementById('cardHotelComp').textContent = '¥' + hotelCompensation;
        document.getElementById('cardHotelComp2').textContent = '¥' + hotelCompensation;

        let [temporaryPaymentInt, remainingPaymentInt] = getRateValues();
        let calc1 = (result + cashAndIC) - (temporaryPaymentInt - remainingPaymentInt) - hotelCompensation;
        document.getElementById('calc1').textContent = '¥' + calc1;

        let paymentCalc = temporaryPaymentInt - remainingPaymentInt;
        document.getElementById('paymentCalc').textContent = '¥' + paymentCalc;
        let resultCalc = result + cashAndIC;
        document.getElementById('resultCalc').textContent = '¥' + resultCalc;
        let amountCalc = paymentCalc + hotelCompensation - resultCalc;
        document.getElementById('amountCalc').textContent = '¥' + amountCalc;
    }

    totalCalc();

    $('.btn-print').click(function () {
        printDiv('printableArea')
    })
})
