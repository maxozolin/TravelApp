const functions = {
    Counter:
        function Counter(countDownDate) {
            let now = new Date().getTime();
            let distance = countDownDate - now
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            return  days 
            
        }
}

module.exports = functions;

