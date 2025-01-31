const request = require("supertest")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const app = require("../src/app")
const User = require("../src/models/user")

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: "Mickey",
    email: "MickeyDs@gmail.com",
    password: "holymoly1235",
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test("should signup a new user", async () => {
    const response = await request(app).post("/users").send({
        name: "RockyLoko",
        email: "rockyloko@gmail.com",
        password: "Passwor123!"
    }).expect(201)

    //assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: "RockyLoko",
            email: "rockyloko@gmail.com",

        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe("Passwor123!")
})

test("should login", async () => {
    const response = await request(app).post("/users/login").send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    //checks if new token was stored into database
    const user = await User.findById(response.body.user._id)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test("should not login non-existant user", async () => {
    await request(app).post("/users/login").send(
        {
            email: "fakeEmail@gmail.com",
            password: userOne.password
        }).expect(400)
})

test("Fetch User Profile", async () => {
    await request(app)
        .get("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test("Should not Fetch User for unauthenicated User", async () => {
    await request(app)
        .get("/users/me")
        .send()
        .expect(401)
})


test("should delete account for user", async () => {
    await request(app)
        .delete("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test("should not delete account for unauth user", async () => {
    await request(app)
        .delete("/users/me")
        .send()
        .expect(401)
})

test("Should upload avatar image", async () => {
    await request(app)
        .post("/users/me/avatar")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .attach("avatar", "tests/fixtures/profile-pic.jpg")
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test("should update valid user field", async () => {
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Jacky"
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual("Jacky")
})

test("Should not update invalid user fields", async () => {
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            height: "1m"
        })
        .expect(400)
})