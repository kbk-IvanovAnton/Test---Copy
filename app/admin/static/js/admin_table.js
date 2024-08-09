$(document).ready(function () {

    let userIdToDelete = null;

    $('#adminTable').DataTable({
        "ordering": false,
        "paging": false,
        "info": false,
        "pageLength": -1,       // Показываем все строки
        "scrollY": '600px',     // Опционально: добавляем вертикальную прокрутку
        "scrollCollapse": true,
        "dom": 'lfrtip',

        columnDefs: [
            { width: '10%', targets: 0 },
            { width: '30%', targets: 1 },
            { width: '30%', targets: 2 },
            { width: '15%', targets: 3 },
            { width: '15%', targets: 4 },
        ],
        fixedColumns: true
    });
    $('#datatableSearch').html($('.dataTables_filter'));


    $('.btn-edit').click(function () {
        let $row = $(this).closest('tr');
        $row.find('.view-mode').each(function () {
            let $cell = $(this);
            let text = $cell.text().trim();
            if ($cell.index() !== 3) { // Skip is_show column
                $cell.data('original-content', text);
                $cell.html('<input type="text" class="form-control" value="' + text + '">');
            }
        });
        $('.btn-edit, .btn-delete').prop('disabled', true);
        $row.find('.btn-edit').hide();
        $row.find('.edit-mode').show();
        $row.find('.btn-delete').hide();
        $row.find('.btn-show-users').prop('disabled', false);
    });

    $('.btn-cancel').click(function () {
        let $row = $(this).closest('tr');
        $row.find('.view-mode').each(function () {
            let $cell = $(this);
            if ($cell.index() !== 3) { // Skip is_show column
                $cell.html($cell.data('original-content'));
            }
        });
        $row.find('.edit-mode').hide();
        $row.find('.btn-edit').show();
        $('.btn-edit, .btn-delete').prop('disabled', false).show();
        $row.find('.btn-show-users').prop('disabled', true); // Disable the show button
    });

    $('.btn-save').click(function () {
        let $row = $(this).closest('tr');
        let id = $row.data('id');
        let name = $row.find('.view-mode:eq(0) input').val();
        let email = $row.find('.view-mode:eq(1) input').val();
        let is_show = $row.find('.btn-show-users').hasClass('btn-success') ? 1 : 0;

        fetch('/admin_menu/edit_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, name: name, email: email, is_show: is_show })
        })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    $row.find('.view-mode:eq(0)').html(name);
                    $row.find('.view-mode:eq(1)').html(email);
                    $row.find('.edit-mode').hide();
                    $('.btn-edit, .btn-delete').prop('disabled', false).show();
                    $row.find('.btn-show-users').prop('disabled', true);
                } else {
                    alert('Failed to update the user.');
                }
            });
    });
    $('.btn-show-users').click(function () {
        let $button = $(this);
        $button.toggleClass('btn-danger');
        $button.toggleClass('btn-success');
        $button.find(".fas").toggleClass('fa-eye-slash');
        $button.find(".fas").toggleClass('fa-eye');
    });

    $('.btn-delete').click(function () {
        let $row = $(this).closest('tr');
        let name = $row.find('.username-cell').text().trim();
        userIdToDelete = $row.data('id');

        $('#usernameToDelete').text(name);
        $('#deleteConfirmationModal').modal('show');
    });

    $('#confirmDeleteBtn').click(function () {
        if (userIdToDelete) {
            fetch('/admin_menu/delete_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: userIdToDelete })
            })
                .then(response => response.json())
                .then(response => {
                    if (response.success) {
                        $('tr[data-id="' + userIdToDelete + '"]').remove();
                        $('#deleteConfirmationModal').modal('hide');
                    } else {
                        alert('Failed to delete the user.');
                    }
                });
        }
    });
});
