class Itinerary < ApplicationRecord
  belongs_to :user

  validates :origin_destination, presence: true
  validates :final_destination, presence: true

  geocoded_by :origin_destination
  after_validation :geocode, if: :will_save_change_to_origin_destination?
end
