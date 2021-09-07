class JourneysController < ApplicationController
  def index
    @journeys = current_user.itineraries.last.journeys.first(3).sort_by { |journey| journey.total_emissions }
  end

  def show
    @journey = Journey.find(params[:id])
    @itinerary = @journey.itinerary
    @transport = Transport.where(name: @journey.transportation)

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
