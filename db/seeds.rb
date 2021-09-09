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

puts "Creating Itineraries..."

tower_of_london = Itinerary.create!(origin_destination: "Hoxton", final_destination: "Tower of London", user_id: raph.id)

covent_garden = Itinerary.create!(origin_destination: "Bloomsbury", final_destination: "Covent Garden", user_id: raph.id)

picadilly = Itinerary.create!(origin_destination: "Hoxton", final_destination: "Picadilly Circus", user_id: raph.id)

hoxton = Itinerary.create!(origin_destination: "Haggerston", final_destination: "Hoxton", user_id: raph.id)

puts "Creating Journeys..."

Journey.create!(transportation: "driving", distance: "3633.618", duration: "792.391", itinerary_id: tower_of_london.id, selected: true, created_at: "2021-08-10 19:08:00")

Journey.create!(transportation: "walking", distance: "1304.874", duration: "912.221", itinerary_id: picadilly.id, selected: true, created_at: "2021-08-21 19:08:00")

Journey.create!(transportation: "driving", distance: "2131.536", duration: "474.805", itinerary_id: covent_garden.id, selected: true, created_at: "2021-08-27 19:08:00")

Journey.create!(transportation: "driving", distance: "7083.251", duration: "1327.001", itinerary_id: hoxton.id, selected: true, created_at: "2021-09-01 19:08:00")

puts "Creating Transports..."
Transport.create!(name: "cycling", emissions: 21.0, points: 30)
Transport.create!(name: "walking", emissions: 32.7, points: 20)
Transport.create!(name: "driving", emissions: 168.44, points: 5)

puts 'Finished!'
