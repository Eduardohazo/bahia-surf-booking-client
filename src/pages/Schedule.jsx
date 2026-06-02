/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "../hooks/useForm";
import { setSchedule } from "../redux/actions";
import { scheduleValidators } from "../utils/validators";
import windImage from "../assets/images/wind.png";
import { useState } from "react";

const ScheduleSelection = () => {
  const { errors, handleChange, handleContinue } = useForm(
    (state) => state.schedule,
    setSchedule,
    scheduleValidators,
  );

  const [activeCard, setActiveCard] = useState(null);
  console.log(activeCard);

  const handleScheduleSelect = (time) => {
    // 1. Manually trigger the change so useForm updates Redux
    handleChange({
      target: {
        name: "schedule",
        value: time,
      },
    });
  };

  return (
    <section className="booking-date">
      {/* Overlay */}
      <div className="hero__overlay"></div>

      <div className="booking-date__container">
        <header className="booking-date__header">
          <h1 className="booking-date__title">
            Choose <br />
            your wave!
          </h1>
          <div className="booking-date__subtitle-container">
            <div className="booking-date__icon-container">
              <i className="booking-date__icon fa-regular fa-clock"></i>
            </div>
            <p className="booking-date__subtitle">
              Pick the time that <br />
              fits you best
            </p>
          </div>
        </header>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="form__schedule-grid-container">
            <div className="form__field schedule-grid">
              <div className="form__conditions">
                <div className="form__best-conditions">
                  <img src={windImage} className="form__wing-image" />
                  <span className="form__span">Best conditions: 7-9AM</span>
                </div>

                <div className="form__max-surfers">
                  <span className="form__span">Max 6 surfers</span>
                </div>
              </div>

              <h3 className="form__h3">Available Times</h3>

              <div
                className={`form__div ${
                  activeCard === "card1" ? "form__div--selected" : ""
                }`}
                onClick={() => setActiveCard("card1")}
              >
                <div className="form__div-two">
                  <i className="booking-date__icon form__schedule-icon fa-regular fa-clock"></i>
                  <span className="form__span">7:00 - 9:00 am</span>
                  <span className="form__span-two">Best waves</span>
                  <i
                    className={`fa-solid fa-check form__check-icon ${
                      activeCard === "card1"
                        ? "form__check--visible"
                        : "form__check--hidden"
                    }`}
                  ></i>
                </div>

                <div className="form__div-tree">
                  <span className="form__span-tree">$110 USD p/p</span>

                  {activeCard === "card1" ? (
                    <button
                      type="button"
                      className=""
                      onClick={(e) => {
                        e.stopPropagation();
                        handleScheduleSelect("07:00 - 09:00 am");
                        handleContinue(e, "/payment-method");
                      }}
                    >
                      {">"}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div
                className={`form__div ${
                  activeCard === "card2" ? "form__div--selected" : ""
                }`}
                onClick={() => setActiveCard("card2")}
              >
                <div className="form__div-two">
                  <i className="booking-date__icon form__schedule-icon fa-regular fa-clock"></i>
                  <span className="form__span">9:30 - 11:30 am</span>
                  <span className="form__span-two">Less crowd</span>
                  <i
                    className={`fa-solid fa-check form__check-icon ${
                      activeCard === "card2"
                        ? "form__check--visible"
                        : "form__check--hidden"
                    }`}
                  ></i>
                </div>

                <div className="form__div-tree">
                  <span className="form__span-tree">$110 USD p/p</span>
                  {activeCard === "card2" ? (
                    <button
                      type="button"
                      className=""
                      onClick={(e) => {
                        e.stopPropagation();
                        handleScheduleSelect("09:30 - 11:30 am");
                        handleContinue(e, "/payment-method");
                      }}
                    >
                      {">"}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div
                className={`form__div ${
                  activeCard === "card3" ? "form__div--selected" : ""
                }`}
                onClick={() => setActiveCard("card3")}
              >
                <div className="form__div-two">
                  <i className="booking-date__icon  form__schedule-icon fa-regular fa-clock"></i>
                  <span className="form__span">04:30 - 06:30 pm</span>
                  <span className="form__span-two">Golden hour</span>
                  <i
                    className={`fa-solid fa-check form__check-icon ${
                      activeCard === "card3"
                        ? "form__check--visible"
                        : "form__check--hidden"
                    }`}
                  ></i>
                </div>

                <div className="form__div-tree">
                  <span className="form__span-tree">$110 USD p/p</span>
                  {activeCard === "card3" ? (
                    <button
                      type="button"
                      className=""
                      onClick={(e) => {
                        e.stopPropagation();
                        handleScheduleSelect("04:30 - 06:30 pm");
                        handleContinue(e, "/payment-method");
                      }}
                    >
                      {">"}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="form__certifications-container">
                <div className="form__certification">
                  <i className="form__certification-i fa-regular fa-calendar"></i>
                  <span className="form__certification-span" >Free <br />Reschedule</span>
                </div>
                <div className="form__certification">
                  <div className="form__border-div">
                    <i className="form__certification-i fa-regular fa-star"></i>
                    <span className="form__certification-span">Top rated <br />in Banderas</span>
                  </div>
                </div>
                <div className="form__certification">
                  <i className="form__certification-i fa-solid fa-certificate"></i>
                  <span className="form__certification-span">Certified <br />Instructors</span>
                </div>
              </div>

              {errors.schedule && (
                <span className="form__error">{errors.schedule}</span>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ScheduleSelection;
