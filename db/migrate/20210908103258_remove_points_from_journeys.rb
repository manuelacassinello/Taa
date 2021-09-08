class RemovePointsFromJourneys < ActiveRecord::Migration[6.0]
  def change
    remove_column :journeys, :points, :integer
    remove_column :journeys, :co2_emissions, :integer
  end
end
