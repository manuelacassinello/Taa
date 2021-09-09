class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :travel_passes
  has_many :itineraries
  has_many :journeys, through: :itineraries

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
  validates :user_name, presence: true, uniqueness: true

  def total_points
    total = 0
    journeys = self.journeys.where(selected: true)
    journeys.each { |journey| total += journey.points }
    return total
  end

  def eco_rating
    if journeys.where(selected: true).size > 0
      possible_points = journeys.where(selected: true).size * 30
      current_points = total_points.to_f
      rating = current_points / possible_points
      (rating * 5).round
    else
      return 0
    end
  end
end
