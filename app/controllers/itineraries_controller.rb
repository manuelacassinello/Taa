class ItinerariesController < ApplicationController

  def show
    @itinerary = Itinerary.find(params[:id])
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
