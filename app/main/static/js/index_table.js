$(document).ready(function () {
    $('#indexTable').DataTable({
        "ordering": false,
        "paging": false,
        "info": false,
        "pageLength": -1,       // Показываем все строки
        "scrollY": '600px',     // Опционально: добавляем вертикальную прокрутку
        "scrollCollapse": true,
        "dom": 'lfrtip',

        columnDefs: [
            { width: '5%', targets: 0 },
            { width: '15%', targets: 1 },
            { width: '30%', targets: 2 },
            { width: '10%', targets: 3 },
            { width: '15%', targets: 4 },
            { width: '10%', targets: 5 },
            { width: '15%', targets: 6 }
        ],
        fixedColumns: true
    });
    $('#datatableSearch').html($('.dataTables_filter'));
});
