class CreateTravelPasses < ActiveRecord::Migration[6.0]
  def change
    create_table :travel_passes do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :price

      t.timestamps
    end
  end
end
