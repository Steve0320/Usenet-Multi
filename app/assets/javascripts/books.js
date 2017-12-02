// Register functions for books page
$( function() {

  $('.book-index').each(function() {

    var button = $(this).find('.popup-search-button');
    var field = $(this).find('.popup-search-text');
    var target = $(this).find('.popup-search-response');

    var searchbox = new Searchbox(target, 'books/search.html?', 20);

    // Search popup handler
    $(this).find('.search-books-button').magnificPopup({
      items: {
        src: '#popup-books',
        type: 'inline'
      }
    });

    var open = null;

    // Book information display handler
    $(this).on('click', '.book-image', function() {

      var context = $(this);
      var row = context.closest('.book-row');

      // If this element is already open
      if (open === this) {
        close_book(row.next('.book-item'));
        open = null;
      }

      // If nothing is already open
      else if (open === null) {
        $.get('/books/' + context.data('id') + '.html', function(data) {
          open_book(row, data);
        });
        open = this;

      }

      // If something is already open
      else {

        var item = $(open).closest('.book-row').next('.book-item');

        $.get('/books/' + context.data('id') + '.html', function(data) {
          close_book(item);
          open_book(row, data);
        });

        open = this;

      }

    });

    // Search button handler
    button.on('click', function() {
      searchbox.start(field.val());
    });

  });

});

function open_book(row, data) {
  var display = $(data);
  row.after(display);
  display.slideDown(500);
}

function close_book(element) {
  element.slideUp(500, function() {
    element.remove();
  });
}
