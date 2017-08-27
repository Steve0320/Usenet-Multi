$( function() {

    $('.book_index').each(function() {

        var button = $(this).find('.search_books');
        var field = $(this).find('.search_books_query');
        var target = $(this).find('.indexer_response');

        button.on('click', function() {
            $.ajax({
                url: '/indexers/search?' + $.param({query: field.val()}),
                success: function(data) {
                    var content = '';
                    $.each(data.channel.item, function() {
                        content += '<p>' + this.description + '</p>';
                    });
                    target.html(content);
                },
                error: function() {
                    alert('Failure');
                }
            })
        });

    })

});