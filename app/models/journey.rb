class Journey < ApplicationRecord
  belongs_to :itinerary

  def total_emissions
    # get the journey distance in km
    # and times by the value we have for the transport emissions
    @transport = Transport.find_by(name: transportation)
    @transport.emissions * (distance / 1000)
  end
  # validates :start_time, presence: true
  # validates :end_time, presence: true
  # validates :price, presence: true
  # validates :co2_emissions, presence: true
  # validates :transportation, presence: true
  # validates :points, presence: true
end
