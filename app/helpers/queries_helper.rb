# frozen_string_literal: true

module QueriesHelper
  def query_react_props(query)
    props = query.as_json
    props[:api_query_url] = api_query_url(query)
    props[:charts_url] = charts_url
    props
  end
end
