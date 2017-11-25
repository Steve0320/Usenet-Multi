Rails.application.routes.draw do

  # Routes for books and related searches
  get 'books/search', to: 'books#search', as: 'search_books', defaults: { format: :json }
  resources :books

  get 'indexers/search', to: 'indexers#search', as: 'search_indexers'
  resources :indexers

end
