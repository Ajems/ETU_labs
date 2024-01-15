$('#edit-button').click(function() {
    var user = $(this).data('user').split(',');
    $('#editLName').val(user[0]);
    $('#editFName').val(user[1]);
    $('#editMName').val(user[2]);
    $('#editBirthday').val(user[3]);
    $('#editEmail').val(user[4]);

    $('#edit-dialog').dialog({
        modal: true,
        width: 400,
        buttons: {
            "Save": function() {
                var editedLName = $('#editLName').val();
                var editedFName = $('#editFName').val();
                var editedMName = $('#editMName').val();
                var editedBirthday = $('#editBirthday').val();
                var editedEmail = $('#editEmail').val();
                var userId = user[5]

                if (editedLName === '' || editedFName === '' || editedMName === '' || editedBirthday === '' || editedEmail === '') {
                    alert('Поля не должны быть пустыми');
                    return;
                }

                $.ajax({
                    url: '/changeUserData',
                    type: 'PUT',
                    data: {
                        userId: userId,
                        editedLName: editedLName,
                        editedFName: editedFName,
                        editedMName: editedMName,
                        editedBirthday: editedBirthday,
                        editedEmail: editedEmail
                    },
                    success: function(response) {
                        window.location.reload()
                        console.log('Данные успешно изменены');
                    },
                    error: function(error) {
                        console.error('Ошибка при изменении данных: ', error);
                    }
                });

                $(this).dialog("close");
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        },
        close: function() {
            $('#editLName').val();
            $('#editFName').val();
            $('#editMName').val();
            $('#editBirthday').val();
            $('#editEmail').val();
        }
    });
});
