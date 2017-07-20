 $('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 3) {
            var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
        } else {
            $('#name-input').addClass('error');
        }
    });