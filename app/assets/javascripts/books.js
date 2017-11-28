// Register functions for books page
$( function() {

    $('.book_index').each(function() {

        var button = $(this).find('.search_books');
        var field = $(this).find('.search_books_query');
        var target = $(this).find('.indexer_response');

        var searchbox = new Searchbox(target, 'books/search?', 20);

        // Search popup handler
        $(this).find('.search_books_button').magnificPopup({
            items: {
                src: '#search_books_popup',
                type: 'inline'
            }
        });

        // Search button handler
        button.on('click', function() {
            searchbox.start(field.val());
        });

    });

});
