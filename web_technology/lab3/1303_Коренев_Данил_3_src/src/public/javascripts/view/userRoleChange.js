$('#role-button').click(function() {
    var user = $(this).data('user').split(',');
    $('#role-dialog').dialog({
        modal: true,
        buttons: {
            "Save": function() {
                var selectedRole = $('#role-select').val();
                if (selectedRole !== user[1]) {
                    $.ajax({
                        url: '/changeUserRole',
                        type: 'POST',
                        data: {
                            userId: user[0],
                            role: selectedRole
                        },
                        success: function(response) {
                            console.log('Роль успешно изменена');
                        },
                        error: function(error) {
                            console.error('Ошибка при изменении роли: ', error);
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
