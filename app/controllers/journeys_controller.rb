class JourneysController < ApplicationController
  def index
    @journeys = Journey.all
  end

  def show
    @journey = Journey.find(params[:id])
  end

  def create
  end
end
