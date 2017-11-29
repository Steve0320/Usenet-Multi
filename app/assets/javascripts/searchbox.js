// Define an auto-loading infinite scrollbox for the given URL.
// This will be bound to the given container (which should be empty),
// and will load results in blocks of limit until no more results are
// returned.

(function() {

    function Searchbox(container, url, limit) {

        var obj = this;

        // Create required elements in container
        obj.res = $('<div class="searchbox-results"></div>');
        var mark = $('<div class="searchbox-bottom"></div>');
        container.append(obj.res);
        container.append(mark);

        // Set initial values
        obj.query = '';
        obj.offset = 0;
        obj.url = url;
        obj.limit = limit;

        // Register waypoint to trigger autoload
        obj.flag = new Waypoint({
            element: mark,
            context: container,
            enabled: false,
            offset: '100%',
            handler: function(direction) {
                if (direction === 'down') {
                    console.log('Loading more results...');
                    obj.search();
                }
            }
        });

        // Show add button
        obj.res.on('mouseenter', '.popup-result-cover', function() {
            $(this).find('img').fadeTo(0, 0.5, null);
            $(this).find('button').css('display', 'block');
        });

        // Hide add button
        obj.res.on('mouseleave', '.popup-result-cover', function() {
            $(this).find('img').fadeTo(0, 1, null);
            $(this).find('button').hide();
        });

        // TODO: Implement database store functions
        obj.res.on('click', '.popup-result-add', function() {
            console.log('Button clicked');
            console.log($(obj).closest('.book_search_result').data('info'));
        });

    }

    // Start a new search with the given query
    Searchbox.prototype.start = function(query) {
        this.res.html('');
        this.query = query;
        this.offset = 0;
        this.search();
    };

    Searchbox.prototype.search = function() {

        var context = this;

        $.ajax({

            // TODO: Allow configurable parameters
            url: context.url + $.param({q: context.query, offset: context.offset, limit: context.limit}),

            success: function(data) {

                context.flag.disable();
                var metadata = data.metadata;

                // Generate each result item and add to panel
                //TODO: Make result_div more flexible for different media types
                $.each(data.results, function() {

                    var result_div = $(
                        '<div class="popup-result">' +
                            '<div class="popup-result-cover">' +
                                '<img src="' + this.cover_url + '">' +
                                '<button class="popup-result-add">Add Book</button>' +
                            '</div>' +
                            '<div>' +
                                '<p class="popup-result-title">' + this.title + '</p>' +
                                '<p class="popup-result-description">' + this.description + '</p>' +
                            '</div>' +
                        '</div>'
                    );

                    result_div.data('info', this);
                    context.res.append(result_div);

                });

                // Increment offset for next block
                context.offset += context.limit;

                // Assume no more results if smaller number of results returned
                // than requested; re-enable autoload otherwise
                if (metadata.num_results < context.limit) {
                    context.res.append('<p>No more search results</p>');
                }
                else {
                    context.flag.enable();
                }

            },

            // TODO: Handle errors more gracefully
            error: function() {
                alert('Failure');
            }


        });

    };

    window.Searchbox = Searchbox;

})();