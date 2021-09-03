class CreateTransports < ActiveRecord::Migration[6.0]
  def change
    create_table :transports do |t|
      t.string :name
      t.float :emissions

      t.timestamps
    end
  end
end
