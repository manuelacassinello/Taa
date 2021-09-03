class JourneysController < ApplicationController
  def index
    @journeys = Journey.all
  end

  def show
    @journey = Journey.find(params[:id])
  end

  def create
    p params
    @journey = Journey.new(journey_params)
    @itinerary = Itinerary.find(params[:itinerary_id])
    @journey.itinerary = @itinerary

    if @journey.save
      render json: @journey
    else
      render json: {message: 'Unable to create journey'}
    end
  end

  private

  def journey_params
    params.require(:journey).permit(:duration, :distance, :transportation)
  end
end
