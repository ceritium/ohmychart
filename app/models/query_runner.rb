module QueryRunner

  SOURCE = Sequel.connect(Rails.configuration.source_db, loggers: [Rails.logger])

  extend self

  def execute(statement, options = {})
    options ||= {}
    template = Liquid::Template.parse(statement)
    sql = template.render(options.select{|k,v| v.present?})
    fetch = SOURCE.fetch(sql.delete("\t\r\n").gsub(/\s{2,}/,' '))

    if limit = Rails.configuration.query_limit
      fetch = fetch.limit(limit)
    end

    {data: fetch.all, columns: fetch.columns, sql: sql, explain: fetch.explain}
  rescue Sequel::DatabaseError => e
    {error: e.message, sql: sql}
  end

end
