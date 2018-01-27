# frozen_string_literal: true

require "test_helper"

class ChartsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get charts_url
    assert_response :success
  end
end
