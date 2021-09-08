class AddSelectedToJourneys < ActiveRecord::Migration[6.0]
  def change
    add_column :journeys, :selected, :boolean
  end
end
