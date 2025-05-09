import { User } from '../data/index.js'
import { errors, validate } from 'com'
import bcrypt from 'bcryptjs'

const { SystemError, NotFoundError, CredentialsError } = errors

export const authenticateUser = (username, password) => {
    validate.username(username, 'username')
    validate.password(password, 'password')

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return bcrypt.compare(password, user.password)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match) throw new CredentialsError('wrong credentials')

                    return user._id.toString()
                })
        })
}