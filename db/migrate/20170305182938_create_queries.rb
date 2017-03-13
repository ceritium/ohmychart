class CreateQueries < ActiveRecord::Migration[5.0]
  def change
    create_table :queries do |t|
      t.string :name
      t.text :statement

      t.timestamps
    end
  end
end
