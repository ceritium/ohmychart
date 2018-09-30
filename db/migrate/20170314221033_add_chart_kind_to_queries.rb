# frozen_string_literal: true

class AddChartKindToQueries < ActiveRecord::Migration[5.0]
  def change
    add_column :queries, :chart_kind, :string
  end
end
