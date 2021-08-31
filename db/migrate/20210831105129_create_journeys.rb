class CreateJourneys < ActiveRecord::Migration[6.0]
  def change
    create_table :journeys do |t|
      t.datetime :start_time
      t.datetime :end_time
      t.integer :price
      t.integer :co2_emissions
      t.string :transportation
      t.integer :points

      t.timestamps
    end
  end
end
