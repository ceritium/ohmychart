# frozen_string_literal: true

module QueryRunner
  SOURCE = Sequel.connect(Rails.configuration.source_db, loggers: [Rails.logger])

  extend self

  def tables
    SOURCE.tables
  end

  def columns_table(table)
    SOURCE[table].columns
  rescue Sequel::DatabaseError => e
    [e.message]
  end

  def execute(statement, options = {})
    options ||= {}
    template = Liquid::Template.parse(statement)
    sql = template.render(options.select { |k, v| v.present? })
    SOURCE.transaction(rollback: :always) do

      fetch = SOURCE.fetch(sql)

      if limit = Rails.configuration.query_limit
        fetch = fetch.limit(limit)
      end

      { data: fetch.all, columns: fetch.columns, sql: sql, explain: fetch.explain }
    end
  rescue Sequel::DatabaseError => e
    { error: e.message, sql: sql }
  end
end
