class RemoveJourneyFromItineraries < ActiveRecord::Migration[6.0]
  def change
    remove_reference :itineraries, :journey, foreign_key: true
  end
end
