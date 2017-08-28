Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get 'books/search', to: 'books#search', as: 'search_books'
  resources :books

  get 'indexers/search', to: 'indexers#search', as: 'search_indexers'
  resources :indexers

end
