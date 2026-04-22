// src/pages/Home.jsx
import { useSelector, useDispatch } from "react-redux";
import withStatusHandler from "../hocs/withStatusHandler";
import { addOneToCart } from "../redux/actions/index.js";
import bookingCardImage from "../assets/images/booking-card-image.png";
import HeroSection from "../components/HeroSection";
import AboutUsSection from "../components/AboutUsSection.jsx";
import ProcessCreation from "../components/ProcessCreation.jsx";

// 1. THE VIEW: Only contains success layout
const Home = ({ all }) => {
  const dispatch = useDispatch();

  return (
    <>
      <HeroSection textContent="Hero Section" all={all} />
      <AboutUsSection />
      <section className="">
        <div className="products-grid">
          {all.map((p) => (
            <div className="product-card" key={p?.id_class}>
              <img
                src={bookingCardImage || "/placeholder.png"}
                alt={p?.title || "product"}
                className="product-image" 
              />
              <div className="product-info">
                <h3>{p?.title || "Unknown product's name"}</h3>
                <p className="product-id">ID: {p?.id_class}</p>
                <button onClick={() => dispatch(addOneToCart(p))}>
                  Book now!
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <ProcessCreation />
    </>
  );
};

// 2. THE ENHANCEMENT: Wrap the view in the factory
const HomeWithStatus = withStatusHandler(Home);

// 3. THE CONTAINER: Connect to Redux and export
const HomeContainer = () => {
  const { status, all } = useSelector((state) => state.products);
  return <HomeWithStatus status={status} all={all} />;
};

export default HomeContainer;