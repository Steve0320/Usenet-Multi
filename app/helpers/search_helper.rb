# This module provides functions to interact with third-party APIs.
# The 'search_(type)' functions are called publicly, and decide which API to use
# based on user-defined settings. The 'search_(type)_(API)' functions are expected
# to return a format usable by 'views/(type)/search.json.jbuilder'.
# Any new API interfaces should be added here with the name 'search_(type)_(API)'

module SearchHelper

  require 'net/http'
  require 'net/https'

  # All functions called by search_books shall return the following form:
  # {
  #   metadata: {
  #     num_elements: int
  #   }
  #   results: {
  #     [
  #       {
  #         title: string
  #         author: [string, ...]
  #         description: string
  #         cover_url: string
  #         publish_date: string
  #         rating: decimal
  #       }, ...
  #     ]
  #   }
  # }
  def search_books(term)

    # Limit valid parameters
    query = term.permit(:q, :limit, :offset)

    # TODO: Implement switch for other APIs
    return search_books_google(query)

  end

  private

  def search_books_google(term)

    base_url = 'https://www.googleapis.com/books/v1/volumes'

    # Set required parameters
    term[:startIndex] = term.delete(:offset) if term[:offset]
    term[:maxResults] = term.delete(:limit) if term[:limit]
    term[:fields] = 'totalItems,items(volumeInfo(title,authors,publishedDate,industryIdentifiers,averageRating,imageLinks/thumbnail),searchInfo/textSnippet)'

    # Parse response JSON
    res = JSON.parse(get("#{base_url}?#{term.to_query}"))

    # TODO: This may still be easier with jbuilder partials
    items = res['items'].map do |i|

      {
          title: i.dig('volumeInfo', 'title'),
          authors: i.dig('volumeInfo', 'authors'),
          description: i.dig('searchInfo', 'textSnippet'),
          cover_url: i.dig('volumeInfo', 'imageLinks', 'thumbnail'),
          publish_date: i.dig('volumeInfo', 'publishedDate'),
          rating: i.dig('volumeInfo', 'averageRating')
      }

    end

    return {
        metadata: {
            num_results: res['totalItems']
        },
        results: items
    }

  end

  # TODO: Refactor to follow form of Google function
  def search_books_itunes(term)

    # Set required parameters
    term[:term] = term.delete(:q)
    term[:media] = 'ebook'

    return JSON.parse(get("https://itunes.apple.com/search?#{query.to_query}"))

  end

  # Query against TMDB movie API
  def search_movie_tmdb(term)

  end

  # Send GET request to given URI
  def get(uri)
    url = URI.parse(uri)
    res = Net::HTTP.new(url.host, url.port)
    res.use_ssl = true
    res.request(Net::HTTP::Get.new(url.to_s)).body
  end

end