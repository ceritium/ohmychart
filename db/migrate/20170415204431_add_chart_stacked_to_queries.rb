# frozen_string_literal: true

class AddChartStackedToQueries < ActiveRecord::Migration[5.0]
  def change
    add_column :queries, :chart_stacked, :boolean, default: false
  end
end
