const jwt = require('jsonwebtoken')
const request = require('supertest')

const app = require('../app.js')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const userRegistrationData = {
    email: "admin@tester.com",
    full_name: "Admin Tester",
    username: "admin_tester",
    password: "testtest",
    profile_image_url: "https://www.google.com",
    age: 22,
    phone_number: "085999887285",
}

const userLoginData = {
    email: userRegistrationData.email,
    password: userRegistrationData.password,
}

const userEditData = {
    email: "newAdmin@tester.com",
    full_name: "New Admin Tester",
    username: "new_admin_tester",
    profile_image_url: "https://facebook.com",
    age: 20,
    phone_number: "085577228844",
}

// const userDeletedData = {
//     email: "delete@tester.com",
//     full_name: "Delete Tester",
//     username: "delete_tester",
//     password: "delete123",
//     profile_image_url: "https://www.linkedin.com",
//     age: 28,
//     phone_number: "087788994455",
// }

let jwtToken;
// let userData;

describe("POST users/register", () => {
    test("Register Success", (done) => {
        request(app)
            .post('/api/users/register')
            .send(userRegistrationData)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty('user')

                expect(res.body.user).toHaveProperty('email')
                expect(res.body.user.email).toBe(userRegistrationData.email)
                
                expect(res.body.user).toHaveProperty('full_name')
                expect(res.body.user.full_name).toBe(userRegistrationData.full_name)
                
                expect(res.body.user).toHaveProperty('username')
                // expect(res.body.user.username).toBe(userRegistrationData.username)
                
                expect(res.body.user).toHaveProperty('profile_image_url')
                expect(res.body.user.profile_image_url).toBe(userRegistrationData.profile_image_url)
                
                expect(res.body.user).toHaveProperty('age')
                expect(res.body.user.age).toBe(userRegistrationData.age)
                
                expect(res.body.user).toHaveProperty('phone_number')
                expect(res.body.user.phone_number).toBe(userRegistrationData.phone_number)
                
                return done()
            })
    })
})

describe("POST users/login", () => {
    test("User Login Success", (done) => {
        request(app)
            .post('/api/users/login')
            .send(userLoginData)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty('token')
                expect(res.body.token).not.toBeNull()
                expect(res.body.token).toBeDefined()
                expect(res.body.token).toBeTruthy()
                expect(res.body.token.length).toBeGreaterThan(0)

                jwtToken = res.body.token
                
                return done()
            })
    })
})

describe("PUT users/:userId", () => {
    test("Edit User Data Success", (done) => {
        jwt
            .verify(jwtToken, JWT_SECRET_KEY, (err, result) => {
                return new Promise((resolve, reject) => {
                    if (err) reject(err)
                    resolve(result)
                })
            })
            .then(userData => {
                request(app)
                    .put(`/api/users/${userData.id}`)
                    .send(userEditData)
                    .set('Accept', 'application/json')
                    .set('x-access-token', jwtToken)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err)

                        expect(res.body).toHaveProperty('user')

                        expect(res.body.user).toHaveProperty('email')
                        expect(res.body.user.email).toBe(userEditData.email)

                        expect(res.body.user).toHaveProperty('full_name')
                        expect(res.body.user.full_name).toBe(userEditData.full_name)
                        
                        expect(res.body.user).toHaveProperty('username')
                        expect(res.body.user.username).toBe(userEditData.username)

                        expect(res.body.user).toHaveProperty('profile_image_url')
                        expect(res.body.user.profile_image_url).toBe(userEditData.profile_image_url)

                        expect(res.body.user).toHaveProperty('age')
                        expect(res.body.user.age).toBe(userEditData.age)

                        expect(res.body.user).toHaveProperty('phone_number')
                        expect(res.body.user.phone_number).toBe(userEditData.phone_number)

                        return done()
                    })
            })
            .catch(error => {
                return done(error)
            })
    })
})

describe("DELETE /users/:userId", () => {
    test("Delete User Success", (done) => {
        jwt
            .verify(jwtToken, JWT_SECRET_KEY, (err, decoded) => {
                return new Promise((resolve, reject) => {
                    if (err) reject(err)

                    resolve(decoded)
                })
            })
            .then(userData => {
                request(app)
                    .delete(`/api/users/${userData.id}`)
                    .set('x-access-token', jwtToken)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err)

                        expect(res.body).toEqual({message: "Your account has been successfully deleted"})
                        expect(res.body).toHaveProperty("message")
                        expect(res.body.message).toContain('account')
                        expect(res.body.message).toContain('deleted')
                        expect(res.body.message).toBe("Your account has been successfully deleted")
                        
                        return done()
                    })
            })
            .catch(err => {
                return done(err)
            })
    })
})