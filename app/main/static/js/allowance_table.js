$(document).ready(function () {
    $('#allowanceTable').DataTable({
        "ordering": false,
        "paging": false,
        "info": false,
        "pageLength": -1,       // Показываем все строки
        "scrollY": '600px',     // Опционально: добавляем вертикальную прокрутку
        "scrollCollapse": true,
        "dom": 'lfrtip',
        "searching": false,

        columnDefs: [
            { width: '25%', targets: 0 },
            { width: '25%', targets: 1 },
            { width: '25%', targets: 2 },
            { width: '25%', targets: 3 },
        ],
        fixedColumns: true,

    });
    $('#datatableSearch').html($('.dataTables_filter'));
});
