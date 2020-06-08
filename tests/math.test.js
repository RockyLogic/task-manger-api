const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require("../src/math")

test("Should Calculate Total With Tip", () => {
    const total = calculateTip(100, 0.30)
    expect(total).toBe(130)
})

test("Should calculate total with default tip", () => {
    const total = calculateTip(10)
    expect(total).toBe(11.5)
})

//
// Goal: Test temperature conversion functions
//
// 1. Export both functions and load them into test suite
// 2. Create "Should convert 32 F to 0 C"
// 3. Create "Should convert 0 C to 32 F"
// 4. Run the Jest to test your work!

test("Should convert 32 F to 0 C", () => {
    const celsius = fahrenheitToCelsius(32)
    expect(celsius).toBe(0)
})
test("Should convert 0 C to 32 F", () => {
    const fahrenheit = celsiusToFahrenheit(0)
    expect(fahrenheit).toBe(32)
})

// test("async test demo", (done)=>{
//     setTimeout(()=>{
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })

test("Should Add 2 Numbers", (done) => {
    add(5, 10).then((sum) => {
        expect(sum).toBe(15)
        done()
    })
})

test("should add 2 numbers async await", async () => {
    const sum = await add(5, 10)
    expect(sum).toBe(15)
})
