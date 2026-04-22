import { useForm } from "../hooks/useForm";
import { setSchedule } from "../redux/actions";
import { scheduleValidators } from "../utils/validators";

const ScheduleSelection = () => {
  const { values, handleChange, errors, handleContinue } = useForm(
    (state) => state.schedule,
    setSchedule,
    scheduleValidators,
  );

  return (
    <section className="booking-date">
      <div className="booking-date__container">
        <header className="booking-date__header">
          <h1 className="booking-date__title">Select a Schedule</h1>
          <p className="booking-date__subtitle">Choose a schedule.</p>
        </header>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="form__field">
            <label htmlFor="reservationDate" className="form__label">
              Class Schedule
            </label>
            <input
              id="reservationSchedule"
              type="text"
              name="schedule"
              value={values.schedule}
              onChange={handleChange}
              className="form__input"
            />
            {errors.schedule && (
              <span className="form__error">{errors.schedule}</span>
            )}
          </div>

          <button
            type="button"
            className="form__button"
            onClick={(e) => handleContinue(e, "/payment-method")}
          >
            Next: Confirm your session
          </button>
        </form>
      </div>
    </section>
  );
};

export default ScheduleSelection;
