import bcryptjs from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function testLogin (req, res) {
  const saltRounds = 10
  const myPlaintextPassword = 's0P4$$w0rD'
  const someOtherPlaintextPassword = 'not_bacon'
  let tempHash
  let tempHash2

  // tech 1
  bcryptjs.genSalt(saltRounds, function (err, salt) {
    bcryptjs.hash(myPlaintextPassword, salt, function (err, hash) {
    // Store hash in your password DB.
      console.log(hash)
      tempHash = hash
      if (err) {
        console.log(err)
      }
    })
    if (err) {
      console.log(err)
    }
  })

  // tech 2
  bcryptjs.hash(myPlaintextPassword, saltRounds, async (err, hash) => {
  // Store hash in your password DB.
    console.log(hash)
    tempHash2 = hash
    const result1 = await bcryptjs.compare(myPlaintextPassword, tempHash2)
    console.log(result1)

    if (err) {
      console.log(err)
    }
  })

  // Check Password

  // if (await bcryptjs.compare(myPlaintextPassword, tempHash)) {
  //   console.log('Match')
  // } else {
  //   console.log('No Match')
  // }

  // bcryptjs.compare(myPlaintextPassword, tempHash, function (err, result) {
  // // result == true
  //   if (err) {
  //     console.log(err)
  //   }
  //   console.log(result)
  // })

  // bcryptjs.compare(someOtherPlaintextPassword, tempHash, function (err, result) {
  // // result == false
  //   if (err) {
  //     console.log(err)
  //   }
  //   console.log(result)
  // })
}
