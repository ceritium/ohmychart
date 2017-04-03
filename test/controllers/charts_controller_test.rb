require "test_helper"

class ChartsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get charts_show_url
    assert_response :success
  end
end
