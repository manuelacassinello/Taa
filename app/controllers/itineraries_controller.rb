class ItinerariesController < ApplicationController

  def show
    @itinerary = Itinerary.find(params[:id])
    @markers = []

    origin_destination = {
      lat: Geocoder.search(@itinerary.origin_destination).first.coordinates.first,
      long: Geocoder.search(@itinerary.origin_destination).last.coordinates.last

    }


    @markers << origin_destination

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
