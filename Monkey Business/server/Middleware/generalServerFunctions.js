import queryMongoDatabase from '../data/mongoController.js'
export function validateEmail (email) {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}
// Regular Expression for email validation just checks for No White Space \S, At Sign @, and ONE period \.
export function deleteInvestor (username) {
  queryMongoDatabase(async (db) => {
    const deleteInvestor = db.collection('Investor').deleteOne({ username })

    if ((await deleteInvestor).deletedCount === 0) {
      console.log('Investor not found')
    }
  }, 'MonkeyBusinessWebApp')
}
