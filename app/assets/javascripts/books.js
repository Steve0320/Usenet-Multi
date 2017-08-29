$( function() {

    $('.book_index').each(function() {

        var button = $(this).find('.search_books');
        var field = $(this).find('.search_books_query');
        var target = $(this).find('.indexer_response');
        var results_container = $(this).find('.results_container');

        var waypoint = new Waypoint({
            element: $(this).find('.waypoint_bottom'),
            context: target,
            enabled: false,
            offset: '100%',
            handler: function(direction) {
                if (direction === 'down') {
                    console.log('Loading more results...');
                    search_books(results_container, waypoint);
                }
            }
        });

        button.on('click', function() {
            results_container.html('');
            results_container.data('query', field.val());
            results_container.data('offset', 0);
            search_books(results_container, waypoint);
        });

        $(this).find('.search_books_button').magnificPopup({
            items: {
                src: '#search_books_popup',
                type: 'inline'
            }
        })

    })

});

function search_books(container, waypoint) {

    var offset = container.data('offset');

    $.ajax({

        // TODO: remove intitle when multiple search parameters implemented
        url: '/books/search?' + $.param({q: 'intitle:'+container.data('query'), offset: offset}),

        success: function(data) {

            // TODO: Handle possible errors returned (rate limit exceeded, etc.)

            waypoint.disable();

            $.each(data.items, function() {

                var data = this.volumeInfo;
                var title = data.title;
                var description = data.description;
                var image = (data.imageLinks)
                    ? data.imageLinks.thumbnail
                    : '/assets/temp_image.png';

                // TODO: find a better way of generating this
                container.append(
                    '<div class="book_search_result">' +
                        '<div class="cover">' +
                            '<img src="' + image + '">' +
                        '</div>' +
                        '<div>' +
                            '<p class="title">' + title + '</p>' +
                            '<p class="description">' + description + '</p>' +
                        '</div>' +
                    '</div>'
                );

            });

            // TODO: make offset increment configurable
            offset += 20;

            // Reenable auto-paging if more items, show end if not
            if (offset < data.totalItems) {
                waypoint.enable();
            }
            else {
                container.append('<p>No more search results</p>')
            }

        },

        error: function() {
            alert('Failure');
        }

    })

}