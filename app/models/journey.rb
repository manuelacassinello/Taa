class Journey < ApplicationRecord
  has_many :itineraries

  validates :start_time, presence: true
  validates :end_time, presence: true
  validates :price, presence: true
  validates :co2_emissions, presence: true
  validates :transportation, presence: true
  validates :points, presence: true
end
