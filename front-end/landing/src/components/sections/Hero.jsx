export default function Hero() {
    return(
        <>
  {/* Carousel Start */}
  <div className="carousel-header">
    <div id="carouselId" className="carousel slide" data-bs-ride="carousel">
      <ol className="carousel-indicators">
        <li
          data-bs-target="#carouselId"
          data-bs-slide-to={0}
          className="active"
        />
        <li data-bs-target="#carouselId" data-bs-slide-to={1} />
      </ol>
      <div className="carousel-inner" role="listbox">
        <div className="carousel-item active">
          <img src="assets/img/carousel-1.jpg" className="img-fluid" alt="Image" />
          <div className="carousel-caption">
            <div className="text-center p-4" style={{ maxWidth: 900 }}>
              <h4
                className="text-white text-uppercase fw-bold mb-3 mb-md-4 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                Solution For All Type Of Visas
              </h4>
              <h1
                className="display-1 text-capitalize text-white mb-3 mb-md-4 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                Immigration Process Starts Here!
              </h1>
              <p
                className="text-white mb-4 mb-md-5 fs-5 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>
              <a
                className="btn btn-primary border-secondary rounded-pill text-white py-3 px-5 wow fadeInUp"
                data-wow-delay="0.7s"
                href="#"
              >
                More Details
              </a>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img src="assets/img/carousel-2.jpg" className="img-fluid" alt="Image" />
          <div className="carousel-caption">
            <div className="text-center p-4" style={{ maxWidth: 900 }}>
              <h5
                className="text-white text-uppercase fw-bold mb-3 mb-md-4 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                Solution For All Type Of Visas
              </h5>
              <h1
                className="display-1 text-capitalize text-white mb-3 mb-md-4 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                Best Visa Immigrations Services
              </h1>
              <p
                className="text-white mb-4 mb-md-5 fs-5 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>
              <a
                className="btn btn-primary border-secondary rounded-pill text-white py-3 px-5 wow fadeInUp"
                data-wow-delay="0.7s"
                href="#"
              >
                More Details
              </a>
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselId"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon bg-secondary wow fadeInLeft"
          data-wow-delay="0.2s"
          aria-hidden="false"
        />
        <span className="visually-hidden-focusable">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselId"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon bg-secondary wow fadeInRight"
          data-wow-delay="0.2s"
          aria-hidden="false"
        />
        <span className="visually-hidden-focusable">Next</span>
      </button>
    </div>
  </div>
  {/* Carousel End */}
</>

    )
}