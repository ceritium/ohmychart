class AddSampleToQueries < ActiveRecord::Migration[5.0]
  def change
    add_column :queries, :sample, :string
  end
end
