import { useForm } from "../hooks/useForm";
import { setDate } from "../redux/actions";
import { dateValidators } from "../utils/validators";

const DateSelection = () => {
  const { values, handleChange, errors, handleContinue } = useForm(
    (state) => state.date,
    setDate,
    dateValidators,
  );

  return (
    <section className="booking-date">
      {/* Overlay */}
      <div className="hero__overlay"></div>

      <div className="booking-date__container">
        <header className="booking-date__header">
          <h1 className="booking-date__title">
            Save the <br />
            Date
          </h1>
          <div className="booking-date__subtitle-container">
            <i class="fa-regular fa-calendar"></i>
            <p className="booking-date__subtitle">Select a day</p>
          </div>
        </header>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="form__field">
            <label htmlFor="reservationDate" className="form__label">
              Class Date
            </label>
            <input
              id="reservationDate"
              type="date"
              name="reservationDate"
              value={values.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className="form__input"
            />
            {errors.reservationDate && (
              <span className="form__error">{errors.reservationDate}</span>
            )}
          </div>

          <div className="form__button-container">
            <button
              type="button"
              className="form__button"
              onClick={(e) => handleContinue(e, "/schedule")}
            >
              Next: Pick a Time
            </button>
          </div>
        </form>
      </div>
    </section>
  );

  // return (
  //   <section className="booking-date">
  //     <div className="booking-date__container">
  //       <header className="booking-date__header">
  //         <h1 className="booking-date__title">Select a Day</h1>
  //         <p className="booking-date__subtitle">
  //           Choose the date for your surf session.
  //         </p>
  //       </header>

  //       <form className="booking-date__form" onSubmit={(e) => e.preventDefault()}>
  //         <div className="booking-date__field">
  //           <label htmlFor="reservationDate" className="booking-date__label">
  //             Class Date
  //           </label>
  //           <input
  //             id="reservationDate"
  //             type="date"
  //             name="reservationDate"
  //             value={values.date}
  //             onChange={handleChange}
  //             min={new Date().toISOString().split("T")[0]}
  //             className="booking-date__input"
  //           />
  //           {errors.reservationDate && (
  //             <span className="booking-date__error">
  //               {errors.reservationDate}
  //             </span>
  //           )}
  //         </div>

  //         <button
  //           type="button"
  //           className="booking-date__button"
  //           onClick={(e) => handleContinue(e, '/schedule')}
  //         >
  //           Next: Pick a Time
  //         </button>
  //       </form>
  //     </div>
  //   </section>
  // );
};

export default DateSelection;
