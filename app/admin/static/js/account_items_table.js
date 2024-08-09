$(document).ready(function () {
    let table = $('#accountItemsTable').DataTable({
        "ordering": false,
        "paging": false,
        "info": false,
        "pageLength": -1,       // Показываем все строки
        "scrollY": '600px',     // Опционально: добавляем вертикальную прокрутку
        "scrollCollapse": true,
        "dom": 'lfrtip',

        columnDefs: [
            { width: '10%', targets: 0 },
            { width: '70%', targets: 1 },
            { width: '20%', targets: 2 },
        ],
        fixedColumns: true
    });
    $('#datatableSearch').html($('.dataTables_filter'));


    function updateMoveButtons() {
        let rows = $('#accountItemsTable tbody tr');
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
        let name = $row.find('.view-mode').text().trim();
        $row.find('.view-mode').html('<input type="text" class="form-control" value="' + name + '">');
        $('.btn-edit, .btn-delete, .btn-add').prop('disabled', true);
        $row.find('.btn-show-account-item').prop('disabled', false).show();
        $row.find('.btn-edit').hide();
        $row.find('.btn-delete').hide();
        $row.find('.edit-mode').show();

    });

    $('.btn-cancel').click(function () {
        let $row = $(this).closest('tr');
        let name = $row.find('input').val();
        $row.find('.view-mode').text(name);
        $row.find('.edit-mode').hide();
        $row.find('.btn-edit').show();
        $('.btn-edit, .btn-delete, .btn-add').prop('disabled', false).show();
        $('.btn-show-account-item').prop('disabled', true);
    });

    $('.btn-save').click(function () {
        let $row = $(this).closest('tr');
        let id = $row.data('id');
        let name = $row.find('input').val();
        let is_show_account_item = $row.find('.btn-show-account-item').hasClass('btn-success') ? 1 : 0;
        let order = $row.data('order');

        fetch('/admin_menu/edit_account_item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, name: name, is_show_account_item: is_show_account_item, order: order })
        })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    $row.find('.view-mode').text(name);
                    $row.find('.edit-mode').hide();
                    $row.find('.btn-edit').show();
                    $('.btn-edit, .btn-delete, .btn-add').prop('disabled', false).show();
                    $('.btn-show-account-item').prop('disabled', true);
                } else {
                    alert('Cant update ');
                }
            });
    });

    $('.btn-delete').click(function () {
        let $row = $(this).closest('tr');
        let account_item = $row.find('.account-item-cell').text().trim();
        accountItemToDelete = $row.data('id');

        $('#accountItemToDelete').text(account_item);
        $('#deleteConfirmationModal').modal('show');
    });

    $('#confirmDeleteBtn').click(function () {
        if (accountItemToDelete) {
            fetch('/admin_menu/delete_account_item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: accountItemToDelete })
            })
                .then(response => response.json())
                .then(response => {
                    if (response.success) {
                        $('tr[data-id="' + accountItemToDelete + '"]').remove();
                        $('#deleteConfirmationModal').modal('hide');
                    } else {
                        alert('Failed to delete the row.');
                    }
                });
        }
    });

    $('.btn-show-account-item').click(function () {
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
            '<td style="text-align: center">' +
            '<button class="btn btn-success btn-sm btn-save-new edit-mode"><i class="align-middle" data-feather="save"></i></button> ' +
            '<button class="btn btn-secondary btn-sm btn-cancel-new edit-mode"><i class="align-middle" data-feather="x"></i></button>' +
            '</td>' +
            '</tr>');

        $('#accountItemsTable tbody').append($newRow);
        feather.replace();
        $('.btn-edit, .btn-delete').prop('disabled', true);
    });

    $(document).on('click', '.btn-save-new', function () {
        let $row = $(this).closest('tr');
        let accountItemName = $row.find('input').val();

        fetch('/admin_menu/add_account_item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ accountItemName: accountItemName })
        })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    $row.attr('data-id', response.id);
                    $row.find('.view-mode').text(accountItemName);
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
        fetch('/admin_menu/update_account_items_order', {
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

