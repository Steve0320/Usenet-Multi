# Defines an indexer site and connection information. This model
# provides a consistent way to access indexers of a variety of
# formats.
class Indexer < ApplicationRecord

  require 'net/http'
  require 'net/https'

  validates :name, :api_key, presence: true

  # TODO: change to allow custom url formats
  def search(query)

    api_string = "https://api.nzbgeek.info/api?t=book&o=json&apikey=#{api_key}&q=#{query}"

    url = URI.parse(api_string)
    res = Net::HTTP.new(url.host, url.port)
    res.use_ssl = true
    req = Net::HTTP::Get.new(url.to_s)

    return res.request(req).body

  end

end
