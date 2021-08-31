Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :journeys, only: [:index, :show] do
    resources :itineraries, only: [:create]
  end
  resources :itineraries, only: :show
  resources :users, only: [:show]
end
