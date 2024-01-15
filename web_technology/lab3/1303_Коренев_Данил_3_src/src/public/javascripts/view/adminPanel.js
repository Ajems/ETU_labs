$(document).ready(function() {
    $('.user-preview').on('click', function() {
        var userId = $(this).data('id');
        console.log(userId)
        window.location = `userPage${userId}`
    });
});
