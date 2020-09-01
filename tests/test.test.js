const functions = require("../functions/functions")
const fs = require("fs")
const request = require('request')
const { resolve } = require("path")

test('should be 0 days to go', () => {
    expect(functions.Counter(new Date().getTime())).toBe(0)
})
test('should be 11 days to go', () => {
    expect(functions.Counter(new Date().getTime()+1000000000)).toBe(11)
})
test('should download an image named test.jpg in server folder', () => {
    let downloadPromise = new Promise((resolve, reject)=>{
        functions.Download(fs, request, "https://cdn.pixabay.com/user/2018/05/30/05-42-25-953_250x250.jpg", './ServerImages/test.jpg', resolve)
    })
    downloadPromise.then(()=>{expect(fs.existsSync("./ServerImages/test.jpg")).toBe(true)})
})

