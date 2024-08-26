$(document).ready(function () {
    let table = $('#allowancePricesJapanTable').DataTable({
        "ordering": false,
        "paging": false,
        "info": false,
        "pageLength": -1,       // Показываем все строки
        "scrollY": '600px',     // Опционально: добавляем вертикальную прокрутку
        "scrollCollapse": true,
        "dom": 'lfrtip',

        columnDefs: [
            { width: '50%', targets: 0 },
            { width: '10%', targets: 1 },
            { width: '20%', targets: 2 },
            { width: '20%', targets: 3 },
        ],
        fixedColumns: true,
        searching: false,
    });

    $('.btn-edit').click(function () {
        let $row = $(this).closest('tr');
        let name = $row.find('.view-mode').text().trim();
        $row.find('.view-mode').html('<input type="text" class="form-control" value="' + name + '">');
        $('.btn-edit, .btn-delete, .btn-add').prop('disabled', true);
        $row.find('.btn-show-allowance-price-japan').prop('disabled', false).show();
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
        $('.btn-show-allowance-price-japan').prop('disabled', true);
    });

    $('.btn-save').click(function () {
        let $row = $(this).closest('tr');
        let id = $row.data('id');
        let name = $row.find('.view-mode:eq(0) input').val();
        let allowance = $row.find('.view-mode:eq(1) input').val();
        let note = $row.find('.view-mode:eq(2) input').val();
        let is_show_allowance_price_japan = $row.find('.btn-show-allowance-price-japan').hasClass('btn-success') ? 1 : 0;

        fetch('/admin_menu/edit_allowance_price_japan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, name: name, allowance: allowance, note: note, is_show_allowance_price_japan: is_show_allowance_price_japan })
        })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    $row.find('.view-mode:eq(0)').text(name);
                    $row.find('.view-mode:eq(1)').text(allowance);
                    $row.find('.view-mode:eq(2)').text(note);
                    $row.find('.edit-mode').hide();
                    $row.find('.btn-edit').show();
                    $('.btn-edit, .btn-delete, .btn-add').prop('disabled', false).show();
                    $('.btn-show-allowance-price-japan').prop('disabled', true);
                } else {
                    alert('Cant update ');
                }
            });
    });

    $('.btn-delete').click(function () {
        let $row = $(this).closest('tr');
        let allowance_price_japan = $row.find('.allowance-price-japan-cell').text().trim();
        allowancePriceJapanToDelete = $row.data('id');

        $('#allowancePriceJapanToDelete').text(allowance_price_japan);
        $('#deleteConfirmationModal').modal('show');
    });

    $('#confirmDeleteBtn').click(function () {
        if (allowancePriceJapanToDelete) {
            fetch('/admin_menu/delete_allowance_price_japan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: allowancePriceJapanToDelete })
            })
                .then(response => response.json())
                .then(response => {
                    if (response.success) {
                        $('tr[data-id="' + allowancePriceWorldToDelete + '"]').remove();
                        $('#deleteConfirmationModalJapan').modal('hide');
                    } else {
                        alert('Failed to delete the row.');
                    }
                });
        }
    });

    $('.btn-show-allowance-price-japan').click(function () {
        let $button = $(this);
        $button.toggleClass('btn-danger');
        $button.toggleClass('btn-success');
        $button.find(".fas").toggleClass('fa-eye-slash');
        $button.find(".fas").toggleClass('fa-eye');
    });

    $('#btn-add-japan').click(function () {
        let $newRow = $('<tr data-id="new">' +
            '<td class="view-mode"><input type="text" class="form-control" placeholder="New line"></td>' +
            '<td class="view-mode"><input type="text" class="form-control" placeholder="New line"></td>' +
            '<td class="view-mode"><input type="text" class="form-control" placeholder="New line"></td>' +
            '<td style="text-align: center">' +
            '<button class="btn btn-success btn-sm btn-save-new edit-mode"><i class="align-middle" data-feather="save"></i></button> ' +
            '<button class="btn btn-secondary btn-sm btn-cancel-new edit-mode"><i class="align-middle" data-feather="x"></i></button>' +
            '</td>' +
            '</tr>');

        $('#allowancePricesJapanTable tbody').append($newRow);
        feather.replace();
        $('.btn-edit, .btn-delete').prop('disabled', true);
    });

    $(document).on('click', '.btn-save-new', function () {
        let $row = $(this).closest('tr');
        let name = $row.find('.view-mode:eq(0) input').val();
        let allowance = $row.find('.view-mode:eq(1) input').val();
        let note = $row.find('.view-mode:eq(2) input').val();

        fetch('/admin_menu/add_allowance_price_japan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, allowance: allowance, note: note })
        })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    $row.attr('data-id', response.id);
                    $row.find('.view-mode:eq(0)').text(name);
                    $row.find('.view-mode:eq(1)').text(allowance);
                    $row.find('.view-mode:eq(2)').text(note);
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
});

