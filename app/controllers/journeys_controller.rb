class JourneysController < ApplicationController

  def index
    @journeys = Journey.all

  def show
    @journey = Journey.find(params[:id])
  end
end
