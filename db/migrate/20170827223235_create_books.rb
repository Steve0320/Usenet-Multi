class CreateBooks < ActiveRecord::Migration[5.1]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.string :description
      t.string :cover_url
      t.date :publish_date
      t.integer :rating
      t.string :isbn
      t.timestamps
    end
  end
end
