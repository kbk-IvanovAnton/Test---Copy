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
            { width: '30%', targets: 2 },
            { width: '10%', targets: 3 },
        ],
        fixedColumns: true,
        searching: false,
    });

    $('.btn-edit-japan').click(function () {
        let $row = $(this).closest('tr');
        $row.find('.view-mode-japan').each(function () {
            let $cell = $(this);
            let text = $cell.text().trim();
            if ($cell.index() !== 3 && $cell.index() !== 0) {
                let unformattedText = text.replace(/,/g, '');
                $cell.data('original-content', text);
                $cell.html('<input type="text" class="form-control" value="' + unformattedText + '">');
            }
        });
        $('.btn-edit-japan').prop('disabled', true);
        $row.find('.btn-edit-japan').hide();
        $row.find('.edit-mode-japan').show();

    });

    $('.btn-cancel-japan').click(function () {
        let $row = $(this).closest('tr');
        let allowance = $row.find('.view-mode-japan:eq(1) input').val();
        let note = $row.find('.view-mode-japan:eq(2) input').val();

        let formattedAllowance = Number(allowance).toLocaleString();

        $row.find('.view-mode-japan:eq(1)').text(formattedAllowance);
        $row.find('.view-mode-japan:eq(2)').text(note);
        $row.find('.edit-mode-japan').hide();
        $row.find('.btn-edit-japan').show();
        $('.btn-edit-japan').prop('disabled', false).show();
    });

    $('.btn-save-japan').click(function () {
        let $row = $(this).closest('tr');
        let id = $row.data('id');
        let allowance = $row.find('.view-mode-japan:eq(1) input').val();
        let note = $row.find('.view-mode-japan:eq(2) input').val();

        fetch('/admin_menu/edit_price_japan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, allowance: allowance, note: note })
        })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    $row.find('.view-mode-japan:eq(1)').text(Number(allowance).toLocaleString());
                    $row.find('.view-mode-japan:eq(2)').text(note);
                    $row.find('.edit-mode-japan').hide();
                    $row.find('.btn-edit-japan').show();
                    $('.btn-edit-japan').prop('disabled', false).show();
                } else {
                    alert('Cant update ');
                }
            });
    });
});

