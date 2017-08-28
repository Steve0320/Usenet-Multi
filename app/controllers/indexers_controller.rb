class IndexersController < ApplicationController

  require 'net/http'
  require 'net/https'

  respond_to :html

  # Perform a search of defined indexers and respond with formatted JSON
  def search
    render json: Indexer.first.search(params[:q])
  end

end
