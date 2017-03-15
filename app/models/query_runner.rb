module QueryRunner

  SOURCE = Sequel.connect(ENV['SOURCE_DB'], loggers: [Logger.new($stdout)])

  extend self

  def execute(statement, options = {})
    options ||= {}
    template = Liquid::Template.parse(statement)
    sql = template.render(options.select{|k,v| v.present?})
    fetch = SOURCE.fetch(sql.delete("\t\r\n").gsub(/\s{2,}/,' ')).limit(500)
    {data: fetch.all, columns: fetch.columns, sql: sql, explain: fetch.explain}
  rescue Sequel::DatabaseError => e
    {error: e.message, sql: sql}
  end

end
