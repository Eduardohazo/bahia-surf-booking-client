import slide1 from "../assets/images/slide-1.png";
import slide2 from "../assets/images/slide-2.png";
import slide3 from "../assets/images/slide-3.png";

export default function AboutUsSection() {
  return (
    <section className="about-us-section">
      {/* Text Context: Surf School focused */}
      <div className="about-us-section__about-us-text">
        <p>
          At Ember, we are passionate about sharing the thrill of the ocean through 
          professional surf instruction. Our mission is to provide a safe, 
          exhilarating, and supportive environment where anyone—from absolute 
          beginners to seasoned chargers—can master the waves.
        </p>
        <p>
          Our team of ISA-certified instructors and ocean safety experts focus 
          on more than just standing up. We teach wave theory, ocean mechanics, 
          and etiquette, ensuring you have the confidence and knowledge to 
          navigate any lineup.
        </p>
        <p>
          Whether you're catching your very first white-water wave or looking 
          to sharpen your bottom turn, Ember Surf School is dedicated to 
          helping you reach your goals while embracing the pure joy of the surf lifestyle.
        </p>
      </div>

      {/* 3D Slider (Ideally showing: Coaching, Action Shot, and Gear/Beach Vibes) */}
      <div className="about-us-section__slider-3d-container">
        <div className="about-us-section__slider-3d-item">
          <img
            className="about-us-section__img"
            src={slide1}
            alt="One-on-one surf coaching session"
          />
        </div>

        <div className="about-us-section__slider-3d-item">
          <img
            className="about-us-section__img"
            src={slide2}
            alt="Student successfully riding their first wave"
          />
        </div>

        <div className="about-us-section__slider-3d-item">
          <img
            className="about-us-section__img"
            src={slide3}
            alt="Group surf lesson debrief on the sand"
          />
        </div>
      </div>
    </section>
  );
}