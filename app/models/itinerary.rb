class Itinerary < ApplicationRecord
  belongs_to :journey
  belongs_to :user

  validates :origin_destination, presence: true
  validates :final_destination, presence: true
end
