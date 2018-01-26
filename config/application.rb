# frozen_string_literal: true

require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
# require "action_cable/engine"
require "sprockets/railtie"
require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Ohmychart
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.generators do |g|
      g.test_framework  :test_unit, fixture: false
      g.stylesheets     false
      g.javascripts     false
      g.helper          false
    end

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins "*"
        resource "/api/*", headers: :any, methods: [:get, :options]
      end
    end

    # Max number of rows to return, is set the query is wrapped with:
    # `select * from ($query) limit $query_limit`
    config.query_limit = ENV["QUERY_LIMIT"]

    # Database source url, it is strongly recommend use a read-only user.
    #
    # Supported mysql2 and postgres connectors by default.
    # For any other connector supported by sequel probably you will have to modify the Gemfile
    # https://sequel.jeremyevans.net/rdoc/files/doc/opening_databases_rdoc.html
    config.source_db = ENV["SOURCE_DB"]
  end
end
