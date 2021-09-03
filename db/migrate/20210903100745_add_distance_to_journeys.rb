class AddDistanceToJourneys < ActiveRecord::Migration[6.0]
  def change
    add_column :journeys, :distance, :float
    add_column :journeys, :duration, :float
  end
end
