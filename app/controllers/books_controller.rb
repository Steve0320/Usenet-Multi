# This controller handles indexing and searching e-books

class BooksController < ApplicationController

  include SearchHelper

  respond_to :html, only: :index

  # TODO: Make XML and HTML responses
  respond_to :json, only: :search

  # TODO: Load stored books from local DB
  def index
    @books = Book.all
  end

  def create
    Book.create!(book_params)
  end

  # Search defined APIs for query string
  # Permits query (q), limit, and offset
  def search
    respond_with search_books(params)
  end

  # TODO: Add rating and tags
  def book_params
    params.require(:book).permit(:title, :author, :description, :cover_url, :publish_date)
  end

end
