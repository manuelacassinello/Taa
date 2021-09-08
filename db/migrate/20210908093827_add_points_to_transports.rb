class AddPointsToTransports < ActiveRecord::Migration[6.0]
  def change
    add_column :transports, :points, :integer
  end
end
