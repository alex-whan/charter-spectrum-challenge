import React from 'react';

const List = ({ props }) => {
  console.log('WHAT IS THIS?', props);
  const restaurants = props.sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <>
      <h2>Restaurants:</h2>
      {restaurants.map(restaurant => {
        return (
          <tr key={restaurant.telephone}>
            <td>{restaurant.name}</td>
            <td>
              {restaurant.city}, {restaurant.state}
            </td>
            <td>{restaurant.telephone}</td>
            <td>{restaurant.genre}</td>
          </tr>
        );
      })}
    </>
  );
};

export default List;

// address1: "201 Waterfront St"
// attire: "business casual"
// city: "Oxon Hill"
// genre: "Steak,American,Contemporary,Seafood,Cafe"
// hours: "Open Daily 5:30 PM-10:00 PM"
// id: "f223fdd0-4adc-423e-9747-980a66c256ca"
// lat: "38.782098"
// long: "-77.017492"
// name: "Old Hickory Steakhouse"
// state: "MD"
// tags: "Social,Food and Dining,Restaurants,Steakhouses"
// telephone: "(301) 965-4000"
// website: "http://www.gaylordnational.com"
// zip: "20745"
