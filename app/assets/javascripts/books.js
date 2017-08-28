$( function() {

    $('.book_index').each(function() {

        var button = $(this).find('.search_books');
        var field = $(this).find('.search_books_query');
        var target = $(this).find('.indexer_response');

        button.on('click', function() {
            $.ajax({
                url: '/books/search?' + $.param({q: field.val()}),
                success: function(data) {

                    target.html('');

                    console.log(data);

                    $.each(data.items, function() {

                        var data = this.volumeInfo;
                        var title = data.title;
                        var description = data.description;
                        var image = (data.imageLinks)
                            ? data.imageLinks.thumbnail
                            : '/assets/temp_image.png';

                        // TODO: find a better way of generating this
                        target.append(
                            '<div style="display: table">' +
                                '<div style="display: table-cell">' +
                                    '<img src="' + image + '">' +
                                '</div>' +
                                '<div style="display: table-cell; vertical-align: top">' +
                                    '<p>' + title + '</p>' +
                                    '<p>' + description + '</p>' +
                                '</div>' +
                            '</div>'
                        );

                    });


                },
                error: function() {
                    alert('Failure');
                }
            })
        });

        $(this).find('.search_books_button').magnificPopup({
            items: {
                src: '#search_books_popup',
                type: 'inline'
            }
        })

    })

});