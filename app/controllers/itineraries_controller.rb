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

    @url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/-84.518641,39.134270;-84.512023,39.102779?geometries=geojson'
  end

  # def new
  # end
  # #Do we need the new action?

  def create
    @itinerary = Itinerary.new(itinerary_params)
    @itinerary.journey = @journey
    @itinerary.user = current_user

    if @itinerary.save
      redirect_to itinerary_path(@itinerary)
    else
      render :new
    end
  end

  private

  def itinerary_params
    params.require(:itinerary).permit(:original_destination, :final_destination)
  end
end
