const functions = {
    Counter:
        function Counter(countDownDate) {
            let now = new Date().getTime();
            let distance = countDownDate - now
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            return days

        },
    Download:
        function Download(fs, request, uri, filename, callback) {
            if (fs.existsSync(filename)) {
                console.log("   Image already on server")
                callback()
            } else {
                request.head(uri, function (err, res, body) {


                    request(uri).pipe(fs.createWriteStream(filename)).on('close', () => {
                        console.log("   Downloaded a new image")
                        callback()
                    });
                });
            }

        }
}

module.exports = functions;

