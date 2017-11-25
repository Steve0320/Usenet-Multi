# This module provides functions to interact with third-party APIs.
# Any new API interfaces should be added here.
module SearchHelper

  require 'net/http'
  require 'net/https'

  def search_itunes(term)

    # Limit valid parameters
    query = term.permit(:q, :limit, :offset)

    # Set required parameters
    query[:term] = query.delete(:q)
    query[:media] = 'ebook'

    return JSON.parse(get("https://itunes.apple.com/search?#{query.to_query}"))

  end

  # Query against TMDB movie API
  def search_tmdb(term)

  end

  # Send GET request to given URI
  def get(uri)
    url = URI.parse(uri)
    res = Net::HTTP.new(url.host, url.port)
    res.use_ssl = true
    res.request(Net::HTTP::Get.new(url.to_s)).body
  end

end