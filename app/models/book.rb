class Book < ApplicationRecord

  require 'net/http'
  require 'net/https'

  def self.search(query)

    api_string = "https://www.googleapis.com/books/v1/volumes?q=intitle:#{query}&printType=books&projection=lite"

    url = URI.parse(api_string)
    res = Net::HTTP.new(url.host, url.port)
    res.use_ssl = true
    req = Net::HTTP::Get.new(url.to_s)

    return res.request(req).body

  end

end
