class ItinerariesController < ApplicationController

  def show
    @itinerary = Itinerary.find(params[:id])
  end
end
