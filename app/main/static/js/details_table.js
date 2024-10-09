$(document).ready(function () {
    $('#detailsTable').DataTable({
        "ordering": false,
        "paging": false,
        "info": false,
        "pageLength": -1,       // Показываем все строки
        "scrollY": '600px',     // Опционально: добавляем вертикальную прокрутку
        "scrollCollapse": true,
        "dom": 'lfrtip',
        "searching": false,

        columnDefs: [
            { width: '9%', targets: 1 },
            { width: '30%', targets: 2 },
            { width: '6%', targets: 5 },
            { width: '5%', targets: 6 },
            { width: '5%', targets: 7 },
        ],
        // fixedColumns: true
    });
    $('#datatableSearch').html($('.dataTables_filter'));

});
