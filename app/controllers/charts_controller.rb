# frozen_string_literal: true

class ChartsController < ApplicationController
  layout false
  def show
    response.headers["X-FRAME-OPTIONS"] = "ALLOWALL"
  end
end
