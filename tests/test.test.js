const functions = require("../functions/functions")

test('should be 0', () => {
    expect(functions.Counter(new Date().getTime())).toBe(0)
})
test('should be idk', () => {
    expect(functions.Counter(new Date().getTime()+1000000000)).toBe(11)
})
