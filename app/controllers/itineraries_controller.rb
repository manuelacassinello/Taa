class ItinerariesController < ApplicationController

  def show
    @itinerary = Itinerary.find(params[:id])
    @journeys = Journey.all.first(3)

    @markers = []

    origin_destination = {
      lat: Geocoder.search(@itinerary.origin_destination).first.coordinates.first,
      long: Geocoder.search(@itinerary.origin_destination).last.coordinates.last,
      image_url: helpers.asset_url('markers.png')
    }

    final_destination = {
      lat: Geocoder.search(@itinerary.final_destination).first.coordinates.first,
      long: Geocoder.search(@itinerary.final_destination).first.coordinates.last,
      image_url: helpers.asset_url('markers.png')
    }
    @markers << origin_destination
    @markers << final_destination

  end

  def new
    @itinerary = Itinerary.new
  end

  def create
    @itinerary = Itinerary.new(itinerary_params)
    @itinerary.user = current_user

    if @itinerary.save
      redirect_to itinerary_path(@itinerary)
    else
      render :new
    end
  end

  private

  def itinerary_params
    params.require(:itinerary).permit(:origin_destination, :final_destination)
  end
end
