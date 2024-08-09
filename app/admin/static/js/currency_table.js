$(document).ready(function () {
    $('#currencyTable').DataTable({
        "ordering": false,
        "paging": false,
        "info": false,
        "pageLength": -1,       // Показываем все строки
        "scrollY": '600px',     // Опционально: добавляем вертикальную прокрутку
        "scrollCollapse": true,

        columnDefs: [
            { width: '10%', targets: 0 },
            { width: '20%', targets: 1 },
            { width: '10%', targets: 2 },
            { width: '10%', targets: 3 },
            { width: '10%', targets: 4 },
            { width: '10%', targets: 5 },
            { width: '20%', targets: 6 },
        ],
        fixedColumns: true
    });
    $('#datatableSearch').html($('.dataTables_filter'));


    function updateMoveButtons() {
        let rows = $('#currencyTable tbody tr');
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


    $('.btn-edit').click(function () {
        let $row = $(this).closest('tr');
        $row.find('.view-mode').each(function () {
            let $cell = $(this);
            let text = $cell.text().trim();
            if ($cell.index() !== 6) { // Skip is_show column
                $cell.data('original-content', text);
                $cell.html('<input type="text" class="form-control" value="' + text + '">');
            }
        });
        $('.btn-edit, .btn-delete, .btn-add').prop('disabled', true);
        $row.find('.btn-show-world, .btn-show-japan').prop('disabled', false).show();
        $row.find('.btn-edit').hide();
        $row.find('.btn-delete').hide();
        $row.find('.edit-mode').show();

    });

    $('.btn-cancel').click(function () {
        let $row = $(this).closest('tr');
        let currencyName = $row.find('.view-mode:eq(0) input').val();
        let currencyPrefix = $row.find('.view-mode:eq(1) input').val();
        let currencySuffix = $row.find('.view-mode:eq(2) input').val();
        let currencyCode = $row.find('.view-mode:eq(3) input').val();
        let currencyDigit = $row.find('.view-mode:eq(4) input').val();
        $row.find('.view-mode:eq(0)').text(currencyName);
        $row.find('.view-mode:eq(1)').text(currencyPrefix);
        $row.find('.view-mode:eq(2)').text(currencySuffix);
        $row.find('.view-mode:eq(3)').text(currencyCode);
        $row.find('.view-mode:eq(4)').text(currencyDigit);
        $row.find('.edit-mode').hide();
        $row.find('.btn-edit').show();
        $('.btn-edit, .btn-delete, .btn-add').prop('disabled', false).show();
        $('.btn-show-world, .btn-show-japan').prop('disabled', true);
    });

    $('.btn-save').click(function () {
        let $row = $(this).closest('tr');
        let id = $row.data('id');
        let currencyName = $row.find('.view-mode:eq(0) input').val();
        let currencyPrefix = $row.find('.view-mode:eq(1) input').val();
        let currencySuffix = $row.find('.view-mode:eq(2) input').val();
        let currencyCode = $row.find('.view-mode:eq(3) input').val();
        let currencyDigit = $row.find('.view-mode:eq(4) input').val();
        let currencyButtonWorld = $row.find('.btn-show-world').hasClass('btn-success') ? 1 : 0;
        let currencyButtonJapan = $row.find('.btn-show-japan').hasClass('btn-success') ? 1 : 0;

        fetch('/admin_menu/edit_currency', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                currencyName: currencyName,
                currencyPrefix: currencyPrefix,
                currencySuffix: currencySuffix,
                currencyCode: currencyCode,
                currencyDigit: currencyDigit,
                currencyButtonWorld: currencyButtonWorld,
                currencyButtonJapan: currencyButtonJapan
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    $row.find('.view-mode:eq(0)').text(currencyName);
                    $row.find('.view-mode:eq(1)').text(currencyPrefix);
                    $row.find('.view-mode:eq(2)').text(currencySuffix);
                    $row.find('.view-mode:eq(3)').text(currencyCode);
                    $row.find('.view-mode:eq(4)').text(currencyDigit);
                    $row.find('.edit-mode').hide();
                    $row.find('.btn-edit').show();
                    $('.btn-edit, .btn-delete, .btn-add').prop('disabled', false).show();
                    $('.btn-show-world, .btn-show-japan').prop('disabled', true);
                } else {
                    alert('Cant update ');
                }
            });
    });

    $('.btn-delete').click(function () {
        let $row = $(this).closest('tr');
        let currency = $row.find('.currency-cell').text().trim();
        currencyToDelete = $row.data('id');

        $('#currencyToDelete').text(currency);
        $('#deleteConfirmationModal').modal('show');
    });

    $('#confirmDeleteBtn').click(function () {
        if (currencyToDelete) {
            fetch('/admin_menu/delete_currency', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: currencyToDelete })
            })
                .then(response => response.json())
                .then(response => {
                    if (response.success) {
                        $('tr[data-id="' + currencyToDelete + '"]').remove();
                        $('#deleteConfirmationModal').modal('hide');
                    } else {
                        alert('Failed to delete the row.');
                    }
                });
        }
    });

    $('.btn-show-world').click(function () {
        let $button = $(this);

        $button.toggleClass('btn-danger');
        $button.toggleClass('btn-success');
        $button.find(".fas").toggleClass('fa-eye-slash');
        $button.find(".fas").toggleClass('fa-eye');
    });

    $('.btn-show-japan').click(function () {
        let $button = $(this);

        $button.toggleClass('btn-danger');
        $button.toggleClass('btn-success');
        $button.find(".fas").toggleClass('fa-eye-slash');
        $button.find(".fas").toggleClass('fa-eye');
    });

    $('#btn-add').click(function () {
        let $newRow = $('<tr data-id="new">' +
            '<td></td>' +
            '<td class="view-mode"><input type="text" class="form-control" placeholder="New line"></td>' +
            '<td class="view-mode"><input type="text" class="form-control" placeholder="New line"></td>' +
            '<td class="view-mode"><input type="text" class="form-control" placeholder="New line"></td>' +
            '<td class="view-mode"><input type="text" class="form-control" placeholder="New line"></td>' +
            '<td class="view-mode"><input type="text" class="form-control" placeholder="New line"></td>' +
            '<td style="text-align: center">' +
            '<button class="btn btn-success btn-sm btn-save-new edit-mode"><i class="align-middle" data-feather="save"></i></button> ' +
            '<button class="btn btn-secondary btn-sm btn-cancel-new edit-mode"><i class="align-middle" data-feather="x"></i></button>' +
            '</td>' +
            '</tr>');

        $('#currencyTable tbody').append($newRow);
        feather.replace();
        $('.btn-edit, .btn-delete').prop('disabled', true);
    });

    $(document).on('click', '.btn-save-new', function () {
        let $row = $(this).closest('tr');
        let currencyName = $row.find('.view-mode:eq(0) input').val();
        let currencyPrefix = $row.find('.view-mode:eq(1) input').val();
        let currencySuffix = $row.find('.view-mode:eq(2) input').val();
        let currencyCode = $row.find('.view-mode:eq(3) input').val();
        let currencyDigit = $row.find('.view-mode:eq(4) input').val();

        fetch('/admin_menu/add_currency', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                currencyName: currencyName,
                currencyPrefix: currencyPrefix,
                currencySuffix: currencySuffix,
                currencyCode: currencyCode,
                currencyDigit: currencyDigit
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    $row.attr('data-id', response.id);
                    $row.find('.view-mode:eq(0)').text(currencyName);
                    $row.find('.view-mode:eq(1)').text(currencyPrefix);
                    $row.find('.view-mode:eq(2)').text(currencySuffix);
                    $row.find('.view-mode:eq(3)').text(currencyCode);
                    $row.find('.view-mode:eq(4)').text(currencyDigit);
                    $row.find('.edit-mode').hide();
                    $row.find('.btn-edit').show();
                    $('.btn-edit, .btn-delete').prop('disabled', false).show();
                    location.reload();
                } else {
                    alert('Cant add the row');
                }
            });
    });

    $(document).on('click', '.btn-cancel-new', function () {
        let $row = $(this).closest('tr');
        $row.remove();
        $('.btn-edit, .btn-delete').prop('disabled', false).show();
    });

    updateMoveButtons();

    function swapRows(row1, row2) {
        let order1 = parseInt(row1.data('order'), 10);
        let order2 = parseInt(row2.data('order'), 10);

        // Меняем местами значения order
        row1.data('order', order2);
        row2.data('order', order1);

        // Меняем местами строки в DOM
        row2.insertBefore(row1);

        // Обновляем порядок на сервере
        updateOrder(row1.data('id'), order2);
        updateOrder(row2.data('id'), order1);

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


    function updateOrder(id, newOrder) {
        fetch('/admin_menu/update_currency_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id, newOrder: newOrder })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Order updated successfully');
                    // ;location.reload()
                } else {
                    console.error('Failed to update order:', data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});
