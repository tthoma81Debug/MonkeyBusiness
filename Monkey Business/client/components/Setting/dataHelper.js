export async function updatePref (Prefs) {
  try {
    const response = await fetch('http://localhost:3000/api/preferences', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Prefs)
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    } else {
      window.alert('Update successfully')
      return true
    }
  } catch (err) {
    window.alert('Failed to Update')
    console.error(err)
    return false
  }
}
export async function deleteAcc (accID) {
  try {
    const response = await fetch(`http://localhost:3000/api/account/${accID}`, { method: 'DELETE' })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    // Parse the response from JSON into an object and return it
    console.log('Account is removed from existence')
    return await response.json()
  } catch (err) {
    // something went wrong so return null
    console.error('Failed to delete')
    console.error(err)
    return null
  }
}
