Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :itineraries, only: [:new, :create, :show] do
    resources :journeys, only: [:index,:create]
  end

  resources :journeys, only: :show

  resources :users, only: [:show]
  get "travelpass", to: "pages#travelpass"
  get 'my_trips', to: 'users#my_trips'
end
