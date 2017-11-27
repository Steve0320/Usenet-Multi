// TODO: Most of this code could be reused for other media if refactored
$( function() {

    $('.book_index').each(function() {

        var button = $(this).find('.search_books');
        var field = $(this).find('.search_books_query');
        var target = $(this).find('.indexer_response');
        var results_container = $(this).find('.results_container');

        // Waypoint for auto-loading more results
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

        // Search popup handler
        $(this).find('.search_books_button').magnificPopup({
            items: {
                src: '#search_books_popup',
                type: 'inline'
            }
        });

        // Search button handler
        button.on('click', function() {
            results_container.html('');
            results_container.data('query', field.val());
            results_container.data('offset', 0);
            search_books(results_container, waypoint);
        });

        // Display button for adding entry to database
        results_container.on('mouseenter', '.cover', function() {
            $(this).find('img').fadeTo(0, 0.5, null);
            $(this).find('button').css('display', 'block');
        });

        // Hide button for adding entry to database
        results_container.on('mouseleave', '.cover', function() {
            $(this).find('img').fadeTo(0, 1, null);
            $(this).find('button').hide();
        });

        // Book select button handler
        results_container.on('click', '.add_button', function() {
            console.log('Button clicked');
            console.log($(this).closest('.book_search_result').data('info'));
        });

    })

});

// Send AJAX request to server and update container
function search_books(container, waypoint) {

    var offset = container.data('offset');

    $.ajax({

        // TODO: make limit/block size configurable
        url: '/books/search?' + $.param({q: container.data('query'), offset: offset, limit: 20}),

        success: function(data) {

            // TODO: Handle possible errors returned (rate limit exceeded, etc.)

            // Disable waypoint to prevent duplicate events
            waypoint.disable();

            // Retrieve search metadata
            var metadata = data.metadata;

            // Generate each result item and add to panel
            $.each(data.results, function() {

                var result_div = $(
                    '<div class="book_search_result">' +
                        '<div class="cover">' +
                            '<img src="' + this.cover_url + '">' +
                            '<button class="add_button">Add Book</button>' +
                        '</div>' +
                        '<div>' +
                            '<p class="title">' + this.title + '</p>' +
                            '<p class="description">' + this.description + '</p>' +
                        '</div>' +
                    '</div>'
                );

                result_div.data('info', this);
                container.append(result_div);

            });

            // Increment offset for next block
            container.data('offset', offset + 20);

            // Assume no more results if request returns less than expected
            if (metadata.num_results < 20) {
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

    });

}