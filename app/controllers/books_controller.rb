# This controller handles indexing and searching e-books

class BooksController < ApplicationController

  include SearchHelper

  layout false, only: %i[show search]

  respond_to :html, only: %i[index show search]
  respond_to :json, only: %i[show search]
  respond_to :xml, only: %i[show search]

  def index
    @books = Book.all
  end

  def create
    Book.create!(book_params)
  end

  def show
    @book = Book.find(params[:id])
    respond_with @book
  end

  # Search defined APIs for query string
  # Permits query (q), limit, and offset
  def search
    @results = search_books(params)
    respond_with @results
  end

  # TODO: Add rating and tags
  def book_params
    params.require(:book).permit(:title, :author, :description, :cover_url, :publish_date)
  end

end
