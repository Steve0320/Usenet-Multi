// Register functions for books page
$( function() {

    $('.book_index').each(function() {

        var button = $(this).find('.popup-search-button');
        var field = $(this).find('.popup-search-text');
        var target = $(this).find('.popup-search-response');

        var searchbox = new Searchbox(target, 'books/search?', 20);

        // Search popup handler
        $(this).find('.search-books-button').magnificPopup({
            items: {
                src: '#popup-books',
                type: 'inline'
            }
        });

        // Search button handler
        button.on('click', function() {
            searchbox.start(field.val());
        });

    });

});
