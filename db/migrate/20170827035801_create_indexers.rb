# Create table to hold information about indexers
class CreateIndexers < ActiveRecord::Migration[5.1]

  def change
    create_table :indexers do |t|
      t.string :name, null: false
      t.string :api_key, null: false
      t.boolean :enabled, default: false
      t.timestamps
    end
  end

end
