class BooksController < ApplicationController

  respond_to :html

  def index

  end

  # Use the Google books API to search for books
  def search
    render json: Book.search(params[:q])
  end

end
