// TODO: Most of this code could be reused for other media if refactored
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

        // TODO: For adding books to database
        results_container.on('mouseenter', 'img', function() {

        });

        results_container.on('mouseleave', 'img', function() {

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

// Send AJAX request to server and update container
function search_books(container, waypoint) {

    var offset = container.data('offset');

    console.log("Performing search for string " + container.data('query'));

    $.ajax({

        // TODO: make limit/block size configurable
        url: '/books/search?' + $.param({q: container.data('query'), offset: offset, limit: 20}),

        success: function(data) {

            // TODO: Handle possible errors returned (rate limit exceeded, etc.)
            console.log(data);

            waypoint.disable();

            $.each(data.results, function() {

                // Generate result item and add to panel
                container.append(
                    '<div class="book_search_result">' +
                        '<div class="cover">' +
                            '<img src="' + this.cover_url + '">' +
                        '</div>' +
                        '<div>' +
                            '<p class="title">' + this.title + '</p>' +
                            '<p class="description">' + this.description + '</p>' +
                        '</div>' +
                    '</div>'
                );


            });

            container.data('offset', offset + 20);

            // Assume no more results if request returns less than expected
            if (data.numResults < 20) {
                container.append('<p>No more search results</p>');
            }
            else {
                waypoint.enable();
            }

        },

        // TODO: Handle errors more gracefully
        error: function() {
            alert('Failure');
        }

    })

}