import processImage from "../assets/images/process-image.png";

function ProcessCreation() {
  return (
    <section className="process">
      <div className="process__container">
        {/* Left image - Ideally a shot of a coach explaining theory on the sand */}
        <div className="process__preview">
          <img
            src={processImage} 
            alt="Surf lesson preparation"
            className="process__image"
          />
        </div>

        {/* Right content */}
        <div className="process__content">
          <span className="process__tag">● Your Journey to the Waves</span>

          <h2 className="process__title">The Bahía Method</h2>

          <p className="process__subtitle">
            Our proven three-step coaching process is designed to take you from 
            the sand to the surf with confidence and safety.
          </p>

          <div className="process__steps">
            <div className="process__step">
              <span className="process__step-number">1</span>
              <h3 className="process__step-title">Beach Theory & Safety</h3>
              <p className="process__step-text">
                Before hitting the water, we cover the essentials: ocean safety, 
                paddling techniques, and the "pop-up" transition. We ensure you 
                understand the environment before the first set arrives.
              </p>
            </div>

            <div className="process__step">
              <span className="process__step-number">2</span>
              <h3 className="process__step-title">In-Water Coaching</h3>
              <p className="process__step-text">
                With your instructor by your side, you'll head into the lineup. 
                We provide real-time feedback on wave selection and timing, 
                giving you that extra push to catch your first ride.
              </p>
            </div>

            <div className="process__step">
              <span className="process__step-number">3</span>
              <h3 className="process__step-title">Performance Analysis</h3>
              <p className="process__step-text">
                After the session, we review your progress. Whether it's stance 
                correction or wave reading, we provide a clear roadmap for your 
                next lesson to keep you progressing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProcessCreation;