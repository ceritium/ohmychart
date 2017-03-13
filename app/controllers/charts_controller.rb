class ChartsController < ApplicationController

  layout false
  def show
    response.headers["X-FRAME-OPTIONS"] = "ALLOWALL"
  end

end
