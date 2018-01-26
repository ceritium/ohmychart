# frozen_string_literal: true

class Query < ApplicationRecord
  validates :name, presence: true
end
