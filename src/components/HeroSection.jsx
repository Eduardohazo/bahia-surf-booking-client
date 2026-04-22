// import { NavLink } from "react-router-dom";
import video from "../assets/videos/hero.mp4";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOneToCart } from "../redux/actions/index.js";

function HeroSection({ all }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <section className="hero">
      {/* Background video */}
      <video className="hero__video" autoPlay loop muted playsInline>
        <source src={video} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="hero__overlay"></div>

      {/* Content */}
      <div className="hero__content">
        <div className="hero__content-div-one">
          <h1 className="hero__title">
            RIDE YOUR <br />
            FIRST WAVE
          </h1>
          <div className="hero__subtitle-container">
            <h3 className="hero__subtitle">
              Learn with <br />
              certified instructor <br />
              of Bahía de Banderas, <br />
              Mexico.
            </h3>
          </div>
        </div>

        <div className="hero__content-div-two">
          <div className="hero__buttons">
            {/* Booking button */}
            <button
              className="hero__button"
              onClick={() => {
                dispatch(addOneToCart(all[0]));
                navigate("/cart");
              }}
            >
              Book now!
            </button>
          </div>
          <h3 className="hero__subtitle-two">
            2 hrs / $100 USD <br />
            All levels <br />
          </h3>
          <span className="hero__span">No experience needed</span>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
