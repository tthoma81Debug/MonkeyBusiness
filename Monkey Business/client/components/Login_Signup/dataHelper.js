export async function logIn (userInfo) {
  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
    console.log(JSON.stringify(userInfo))
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    } else {
      window.alert('Log In successfully')
      return true
    }
  } catch (err) {
    window.alert('Failed to log in')
    console.error('Failed to log in')
    console.error(err)
    return false
  }
}
export async function signUp (userInfo) {
  try {
    const response = await fetch('http://localhost:3000/api/signup', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status} ${response.statusText}`)
    } else {
      window.alert('Sign up successfully')
      return true
    }
  } catch (err) {
    window.alert('Failed to sign up')
    console.error('Failed to sign up')
    console.error(err)
    return false
  }
}
