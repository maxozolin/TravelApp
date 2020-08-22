import React from 'react'
let path = require('path');
let appDir = path.resolve(__dirname);


export default function Home() {
    return (
        <section id="home" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner" >
                <ol className="carousel-indicators">
                    <li data-target="#home" data-slide-to="0" className="active"></li>
                    <li data-target="#home" data-slide-to="1"></li>
                    <li data-target="#home" data-slide-to="2"></li>
                </ol>
                <div className="carousel-item active" data-interval="7000">
                    <img src={`/TempImages/pexels-mihis-alex-21014.jpg`} className="img-responsive  center-block w-100" alt="..." />
                </div>
                <div className="carousel-item" data-interval="7000">
                    <img src="/TempImages/old-1130743_1920.jpg" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item" data-interval="7000">
                    <img src="/TempImages/pexels-ylanite-koppens-697662.jpg" className="d-block w-100" alt="..." />
                </div>
            </div>
            <a className="carousel-control-prev" href="#home" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#home" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>

        </section>
    )
}
