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


    initTablePrint();
    borderColorBtm();


    $('.btn-print').click(function () {
        printDiv('printableArea')
    })
})
