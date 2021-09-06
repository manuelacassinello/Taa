class JourneysController < ApplicationController
  def index
    @journeys = current_user.itineraries.last.journeys.first(3).sort_by { |journey| journey.total_emissions }
  end

  def show
    @journey = Journey.find(params[:id])
    @transport = Transport.where(name: @journey.transportation)
  end

  def create
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
