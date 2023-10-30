/**
 * Asynchronously retrieve the movies from our data endpoint and return them as an array
 * @returns {Promise} Resolves to an array of movies on success or an empty array on failure
 */
export async function retrieveStocks () {
  try {
    // Send an AJAX request to our movieBrowseJSON endpoint
    const response = await fetch('http://localhost:3000/api/stocksTemp')
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    // Parse the response from JSON into an object and return it
    return await response.json()
  } catch (err) {
    // something went wrong so return an empty array
    console.error('Failed to retrieve array of stocks')
    console.error(err)
    return []
  }
}

/**
 * Asynchronously retrieve the details for one movie from our data endpoint and return them
 * @returns {Promise} Resolves to an object for that movie on success or null on failure

export async function retrieveMovieDetails (movieID) {
  try {
    // Send an AJAX request to our movieDetailsJSON endpoint
    const response = await fetch(`data/movie/${movieID}`)
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }

    // Parse the response from JSON into an object and return it
    return await response.json()
  } catch (err) {
    // something went wrong so return null
    console.error('Failed to retrieve details')
    console.error(err)
    return null
  }
}
*/
