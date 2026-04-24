/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "../hooks/useForm";
import { setSchedule } from "../redux/actions";
import { scheduleValidators } from "../utils/validators";

const ScheduleSelection = () => {
  const { errors, handleChange, handleContinue } = useForm(
    (state) => state.schedule,
    setSchedule,
    scheduleValidators,
  );
  
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
          <h1 className="booking-date__title">Choose your wave</h1>
          <p className="booking-date__subtitle">Select a schedule</p>
        </header>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="form__schedule-grid-container">
            <div className="form__field schedule-grid">
              <button
                type="button"
                className="form__button liquid-glass"
                onClick={() => handleScheduleSelect("07:00 - 09:00 am")}
              >
                7:00 - 9:00 am
              </button>
              <span>Best waves</span>
              <button
                type="button"
                className="form__button liquid-glass"
                onClick={() => handleScheduleSelect("09:30 - 11:30 am")}
              >
                9:30 - 11:30 am
              </button>
              <span>Less crowded</span>
              <button
                type="button"
                className="form__button liquid-glass"
                onClick={() => handleScheduleSelect("04:30 - 06:30 pm")}
              >
                4:30 - 6:30 pm
              </button>

              <span>Perfect to enjoy sunrise</span>

              {errors.schedule && (
                <span className="form__error">{errors.schedule}</span>
              )}

              <button
                type="button"
                className="form__button liquid-glass"
                onClick={(e) => handleContinue(e, "/payment-method")}
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ScheduleSelection;
