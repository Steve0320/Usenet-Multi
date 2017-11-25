# This controller handles indexing and searching e-books

class BooksController < ApplicationController

  include SearchHelper

  respond_to :html, only: :index

  # TODO: Make XML and HTML responses
  respond_to :json, only: :search

  # TODO: Load stored books from local DB
  def index

  end

  # Search defined APIs for query string
  # Permits query (q), limit, and offset
  def search
    @results = search_book_itunes(params)
    respond_with(@results)
  end

end
