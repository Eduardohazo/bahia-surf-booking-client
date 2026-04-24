import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 
import { useForm } from "../hooks/useForm";
import { setDate } from "../redux/actions";
import { dateValidators } from "../utils/validators";



const DateSelection = () => {
  const { values, handleChange, errors, handleContinue } = useForm(
    (state) => state.date,
    setDate,
    dateValidators,
  );

  const getLocalDate = (dateString) => {
    if (!dateString) return new Date();
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const onCalendarChange = (selectedDate) => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    handleChange({
      target: {
        name: "reservationDate",
        value: formattedDate,
      },
    });
  };

  return (
    <section className="booking-date">
      <div className="hero__overlay"></div>
      <div className="booking-date__container">
        <header className="booking-date__header">
          <h1 className="booking-date__title">Save the <br /> Date</h1>
          <div className="booking-date__subtitle-container">
            <i className="fa-regular fa-calendar"></i>
            <p className="booking-date__subtitle">Select a day</p>
          </div>
        </header>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="form__field">
            <div className="calendar-wrapper">
              <Calendar
                onChange={onCalendarChange}
                value={values.reservationDate ? getLocalDate(values.reservationDate) : new Date()}
                minDate={new Date()}
                className="custom-calendar"
                locale="en-US" // Sets the calendar to English
                nextLabel={<i className="fa-solid fa-chevron-right"></i>}
                prevLabel={<i className="fa-solid fa-chevron-left"></i>}
                next2Label={null}
                prev2Label={null}
              />
            </div>
            {errors.reservationDate && (
              <span className="form__error">{errors.reservationDate}</span>
            )}
          </div>

          <div className="form__button-container">
            <button
              type="button"
              className="form__button liquid-glass"
              onClick={(e) => handleContinue(e, "/schedule")}
            >
              Next: Pick a Time
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DateSelection;