namespace :ohmychart do
  desc 'Delete current queries and load demo data'
  task demo: :environment do
    ActiveRecord::Base.transaction do
      Query.delete_all
      queries = YAML.load_file(File.join(__dir__, 'demo.yml'))
      queries.each do |attrs|
        Query.create!(attrs)
      end
    end
  end
end
