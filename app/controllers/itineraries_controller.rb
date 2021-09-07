class ItinerariesController < ApplicationController

  def show
    @itinerary = Itinerary.find(params[:id])

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
    transportation_methods = Journey::TRANSPORT_METHODS - @itinerary.journeys.pluck(:transportation)
    transportation_methods.each do |transport_method|
      mapbox_response = JSON.parse(RestClient.get("https://api.mapbox.com/directions/v5/mapbox/#{transport_method}/#{origin_destination[:long]},#{origin_destination[:lat]};#{final_destination[:long]},#{final_destination[:lat]}?steps=true&geometries=geojson&access_token=#{ENV['MAPBOX_API_KEY']}")).with_indifferent_access
      data = mapbox_response[:routes].first
      distance = data[:distance]
      duration = data[:duration]
      route = data[:geometry][:coordinates]
      Journey.create distance: distance, itinerary: @itinerary, duration: duration, transportation: transport_method
    end
    @journeys = @itinerary.journeys
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
