json.array! @results['results'] do |result|
  json.title result['trackCensoredName']
  json.author result['artistName']
  json.description result['description']
  json.cover_url result['artworkUrl100'].gsub('100x100bb.jpg', '300x300bb.jpg') #Request a larger image
  json.publish_date result['releaseDate']
  json.rating result['averageUserRating']
  json.tags result['genres']
end