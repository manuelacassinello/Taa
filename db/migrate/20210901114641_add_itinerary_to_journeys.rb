class AddItineraryToJourneys < ActiveRecord::Migration[6.0]
  def change
    add_reference :journeys, :itinerary, foreign_key: true
  end
end
