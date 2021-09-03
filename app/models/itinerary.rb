class Itinerary < ApplicationRecord
  belongs_to :user
  has_many :journeys

  validates :origin_destination, presence: true
  validates :final_destination, presence: true

  geocoded_by :origin_destination
  after_validation :geocode, if: :will_save_change_to_origin_destination?

  geocoded_by :final_destination
  after_validation :geocode, if: :will_save_change_to_final_destination?
end
