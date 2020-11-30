import React, { useState } from 'react';
import Pagination from '../Pagination';
import '../../styles.css';

const Table = ({ props }) => {
  const restaurants = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);

  // Gets current page array
  const indexOfLastPage = currentPage * entriesPerPage;
  const indexOfFirstPage = indexOfLastPage - entriesPerPage;
  const currentEntries = restaurants.slice(indexOfFirstPage, indexOfLastPage);

  // Changes page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (!restaurants.length > 0) {
    return (
      <>
        <h2>Restaurant Results:</h2>
        <h2>No results found.</h2>
      </>
    );
  } else {
    return (
      <>
        <h2>Restaurant Results:</h2>
        <table>
          <tbody>
            <tr className="title-row">
              <td>Name</td>
              <td>City</td>
              <td>Phone</td>
              <td>Genres</td>
            </tr>
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
