# For TravisCI, alias default task to run tests

require 'rspec/core/rake_task'

RSpec::Core::RakeTask.new(:spec)
task default: :spec