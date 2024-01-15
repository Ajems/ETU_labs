$('#message-button').click(function() {
    var userId = $(this).data('user');
    window.location.href = `/userMessages${userId}`;
});

$('#friends-button').click(function() {
    var userId = $(this).data('user');
    window.location.href = `/userFriends${userId}`;
});

$('#news-button').click(function() {
    var userId = $(this).data('user');
    window.location.href = `/news${userId}`;
});