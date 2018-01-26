# frozen_string_literal: true

Rails.application.routes.draw do

  root "queries#index"
  resource :charts, only: [:show]
  resources :queries do
    collection do
      post :preview
    end
  end
  namespace :api do
    resources :queries, only: [:show]
  end
end
