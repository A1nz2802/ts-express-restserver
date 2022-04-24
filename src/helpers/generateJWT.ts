import jwt from 'jsonwebtoken'

const generateJWT = (uid: string = '') => {
  return new Promise<string>((resolve, reject) => {
    const payload = { uid }
    jwt.sign(payload, process.env.SECRETORPRIVATEKEY!, {
      expiresIn: '4h'
    }, (err, token) => {
      if (err) {
        console.log(err)
        reject(new Error('Failed to generate token'))
      } else {
        resolve(token!)
      }
    })
  })
}

export {
  generateJWT
}
