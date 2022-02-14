const jwt = require('jsonwebtoken')
const axios = require('axios')
const request = require('supertest')

const app = require('../app.js')

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

const commentPostData = {
    comment: "comment ini hanyalah percobaan",
    PhotoId: -1,
}

const commentEditData = {
    comment: "comment ini merupakan hasil editan",
}


let jwtToken;
let lastPhotoId;
let commentId;

beforeAll(async () => {
    try {
        await userRegistration()
        jwtToken = await getJwtToken()
        // console.log(jwtToken)
        lastPhotoId = await getLastPhotoId(jwtToken)

        commentPostData.PhotoId = lastPhotoId
    } catch (error) {
        console.error(error)
    }
})

afterAll(async () => {
    // const jwtToken = await getJwtToken()
    try {
        await deleteUser(jwtToken)
    } catch (error) {
        console.error(error)
    }
})

describe("POST /comments", () => {
    test("Successfully create a comment", (done) => {
        request(app)
            .post('/api/comments')
            .send(commentPostData)
            .set('Accept', 'application/json')
            .set('x-access-token', jwtToken)
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty("comment")

                expect(res.body.comment).toHaveProperty("id")
                expect(res.body.comment.id).toBeGreaterThan(0)

                expect(res.body.comment).toHaveProperty("comment")
                expect(res.body.comment.comment).toBe(commentPostData.comment)

                expect(res.body.comment).toHaveProperty("UserId")
                expect(res.body.comment.UserId).toBeGreaterThan(0)

                expect(res.body.comment).toHaveProperty("PhotoId")
                expect(res.body.comment.PhotoId).toBe(lastPhotoId)

                expect(res.body.comment).toHaveProperty("updatedAt")
                expect(res.body.comment).toHaveProperty("createdAt")
                
                commentId = res.body.comment.id
                return done()
            })
    })
})

describe("GET /comments", () => {
    test("See all comments", (done) => {
        request(app)
            .get('/api/comments')
            .set('Accept', 'application/json')
            .set('x-access-token', jwtToken)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty("comments")
                expect(res.body.comments.length).toBeGreaterThan(0)
                
                const commentsLength = res.body.comments.length

                expect(res.body.comments[commentsLength-1]).toHaveProperty("id")
                expect(res.body.comments[commentsLength-1]).toHaveProperty("UserId")
                expect(res.body.comments[commentsLength-1]).toHaveProperty("PhotoId")
                expect(res.body.comments[commentsLength-1].PhotoId).toBe(lastPhotoId)
                expect(res.body.comments[commentsLength-1]).toHaveProperty("comment")
                expect(res.body.comments[commentsLength-1].comment).toBe(commentPostData.comment)
                expect(res.body.comments[commentsLength-1]).toHaveProperty("updatedAt")
                expect(res.body.comments[commentsLength-1]).toHaveProperty("createdAt")
                
                expect(res.body.comments[commentsLength-1]).toHaveProperty("Photo")
                expect(res.body.comments[commentsLength-1].Photo).toHaveProperty("id")
                expect(res.body.comments[commentsLength-1].Photo.id).toBe(lastPhotoId)
                expect(res.body.comments[commentsLength-1].Photo).toHaveProperty("title")
                expect(res.body.comments[commentsLength-1].Photo).toHaveProperty("caption")
                expect(res.body.comments[commentsLength-1].Photo).toHaveProperty("poster_image_url")
                
                expect(res.body.comments[commentsLength-1]).toHaveProperty("User")
                expect(res.body.comments[commentsLength-1].User).toHaveProperty("id")
                expect(res.body.comments[commentsLength-1].User).toHaveProperty("username")
                expect(res.body.comments[commentsLength-1].User).toHaveProperty("profile_image_url")
                expect(res.body.comments[commentsLength-1].User).toHaveProperty("phone_number")

                return done()
            })

    })
})

describe("PUT /comments/:commetId", () => {
    test("Successfully edit a comment", (done) => {
        request(app)
            .put(`/api/comments/${commentId}`)
            .send(commentEditData)
            .set('Accept', 'application/json')
            .set('x-access-token', jwtToken)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty("comment")
                expect(res.body.comment).toHaveProperty("id")
                expect(res.body.comment).toHaveProperty("comment")
                expect(res.body.comment.comment).toBe(commentEditData.comment)
                expect(res.body.comment).toHaveProperty("UserId")
                expect(res.body.comment).toHaveProperty("PhotoId")
                expect(res.body.comment.PhotoId).toBe(lastPhotoId)
                expect(res.body.comment).toHaveProperty("updatedAt")
                expect(res.body.comment).toHaveProperty("createdAt")

                return done()
            })
    })
})
describe("DELETE /comments/:commentId", () => {
    test("Successfully delete a comment", (done) => {
        request(app)
            .delete(`/api/comments/${commentId}`)
            .set('Accept', 'application/json')
            .set('x-access-token', jwtToken)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty("message")
                expect(res.body).toBeDefined()
                expect(res.body).not.toBeNull()
                expect(res.body.message).toBe("Your comment has been successfully deleted")
                expect(res.body.message).toMatch(/deleted/)

                return done()
            })
    })
})

async function userRegistration() {
    // request(app)
    //     .post('/api/users/register')
    //     .send(userRegistrationData)
    //     .end((err, res) => {
    //         if (err) throw new Error(err)
            
    //     })
    try {
        const response = await axios({
            url: 'http://localhost:3000/api/users/register',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            data: userRegistrationData
        })

        // console.log(response.data)
    } catch (error) {
        console.error(error.toJSON())
    }
}

async function getJwtToken() {
    // request(app)
    //     .post('/api/users/login')
    //     .send(userLoginData)
    //     .end((err, res) => {
    //         if (err) throw new Error(err)
            
    //         console.log(res.body)
    //         jwtToken = res.body.token
    //     })
    try {
        const response = await axios({
            url: 'http://localhost:3000/api/users/login',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            data: userLoginData
        })
        
        // const data = response.json()
        // console.log(response.data.token)
        return response.data.token
    } catch (error) {
        console.error(error)
    }
}

async function getLastPhotoId(jwtToken) {
    try {
        const response = await axios({
            url: 'http://localhost:3000/api/photos',
            method: 'get',
            headers: {
                'x-access-token': jwtToken,
            },
        })

        // const data = response.json()
        const photosLength = response.data.photos.length
        // console.log(response.data.photos[photosLength-1].id)    
        return response.data.photos[photosLength-1].id    
    } catch (error) {
        console.error(error)
    }
    
}

async function deleteUser(jwtToken) {
    try {
        const userData = await jwt.decode(jwtToken)
        const userId = userData.id

        const response = await axios({
            url: `http://localhost:3000/api/users/${userId}`,
            headers: {
                'x-access-token': jwtToken,
            },
            method: 'delete'
        })

        // console.log(response.data)
    } catch (error) {
        console.error(error)
    }
}