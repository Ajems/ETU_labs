$('#status-button').click(function() {
    var user = $(this).data('user').split(',');
    var selected = user[1];
    //todo select option

    $('#status-dialog').dialog({
        modal: true,
        buttons: {
            "Save": function() {
                var selectedStatus = $('#status-select').val();
                if (selectedStatus !== user[1]) {
                    $.ajax({
                        url: '/changeUserStatus',
                        type: 'POST',
                        data: {
                            userId: user[0],
                            status: selectedStatus
                        },
                        success: function(response) {
                            console.log('Статус успешно изменен');
                        },
                        error: function(error) {
                            console.error('Ошибка при изменении статуса: ', error);
                        }
                    });
                }
                $(this).dialog("close");
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        }
    });
});
