class BooksController < ApplicationController

  include SearchHelper

  respond_to :html, only: :index

  # TODO: Make XML and HTML responses
  respond_to :json, only: :search

  def index

  end

  # Use the Google books API to search for books
  def search
    @results = search_itunes(params)
    respond_with(@results)
  end

end
