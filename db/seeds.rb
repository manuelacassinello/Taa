# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Cleaning Database..."
Transport.destroy_all
Journey.destroy_all
Itinerary.destroy_all
User.destroy_all

puts "Creating User..."
raph = User.create!(
  email: "raph@lewagon.com",
  first_name: "Raph",
  last_name: "Wow",
  user_name: "wow-me",
  password: "111111"
)

puts "Creating Journey..."

# journey = Journey.create!(
#   start_time: Time.now + 3.hours,
#   end_time: Time.now + 5.hours,
#   price: 100,
#   points: 50,
#   co2_emissions: 10,
#   transportation: 'tube'
# )

puts "Creating Itineraries..."
Itinerary.create!(
  origin_destination: "Hoxton",
  final_destination: "Tower of London",
  user_id: raph.id
)

puts "Creating Transports..."
Transport.create!(
  name: "cycling",
  emissions: 21.0,
  points: 30
)

Transport.create!(
  name: "walking",
  emissions: 32.7,
  points: 20
)

Transport.create!(
  name: "driving",
  emissions: 168.44,
  points: 5
)

puts 'Finished!'
