import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination';

const Table = ({ props }) => {
  const restaurants = props;
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);

  // Get current
  const indexOfLastPage = currentPage * entriesPerPage;
  const indexOfFirstPage = indexOfLastPage - entriesPerPage;
  const currentEntries = restaurants.slice(indexOfFirstPage, indexOfLastPage);

  // change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (!restaurants.length > 0) {
    return (
      <>
        <h2>Restaurants:</h2>
        <h2>No results found.</h2>
      </>
    );
  } else {
    return (
      <>
        <h2>Restaurants:</h2>
        <table>
          <tbody>
            {currentEntries.map(restaurant => {
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
          </tbody>
        </table>
        <Pagination
          entriesPerPage={entriesPerPage}
          totalEntries={restaurants.length}
          paginate={paginate}
        />
      </>
    );
  }
};

export default Table;

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
