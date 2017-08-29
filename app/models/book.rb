class Book < ApplicationRecord

  require 'net/http'
  require 'net/https'

  # Search for books using the Google Books API
  # Accepts all query parameters supported by the API
  def self.search(query, offset = 0)

    offset = 0 if offset.blank?

    # TODO: Make maxResults configurable
    api_string = "https://www.googleapis.com/books/v1/volumes?q=#{query}&startIndex=#{offset}&printType=books&projection=lite&maxResults=20"

    url = URI.parse(api_string)
    res = Net::HTTP.new(url.host, url.port)
    res.use_ssl = true
    req = Net::HTTP::Get.new(url.to_s)

    return res.request(req).body

  end

end
