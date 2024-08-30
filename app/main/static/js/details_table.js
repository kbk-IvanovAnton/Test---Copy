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
            { width: '9%', targets: 11 },
        ],
        fixedColumns: true
    });
    $('#datatableSearch').html($('.dataTables_filter'));
});
