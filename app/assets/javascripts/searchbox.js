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
    $(this).find('button').show();
  });

  // Hide add button
  obj.res.on('mouseleave', '.popup-result-cover', function() {
    $(this).find('img').fadeTo(0, 1, null);
    $(this).find('button').hide();
  });

  // TODO: Implement error checking for POST request / give some indication already added
  obj.res.on('click', '.popup-result-button', function() {
    var result = { book: $(this).closest('.popup-result').data('info') };
    console.log(result);
    $.post('/books', result);
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
        context.res.append($(data));

        // Increment offset for next block
        context.offset += context.limit;

        // Only continue if EOF flag not present
        if (!$(data).hasClass('flag-end-results')) {
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

}());