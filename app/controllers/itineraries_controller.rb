class ItinerariesController < ApplicationController

  def show
    @itinerary = Itinerary.find(params[:id])
    @markers = []

    origin_destination = {
      lat: Geocoder.search(@itinerary.origin_destination).first.coordinates.first,
      long: Geocoder.search(@itinerary.origin_destination).last.coordinates.last
    }

    final_destination = {
      lat: Geocoder.search(@itinerary.final_destination).first.coordinates.first,

      long: Geocoder.search(@itinerary.final_destination).first.coordinates.last
    }
    @markers << origin_destination
    @markers << final_destination

    @url = "https://api.mapbox.com/directions/v5/mapbox/cycling/#{origin_destination[:lat]},#{origin_destination[:long]};#{final_destination[:lat]},#{final_destination[:long]}?geometries=geojson"
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
