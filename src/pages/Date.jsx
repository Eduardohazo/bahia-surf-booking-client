import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Estilos básicos
import { useForm } from "../hooks/useForm";
import { setDate } from "../redux/actions";
import { dateValidators } from "../utils/validators";

const DateSelection = () => {
  const { values, handleChange, errors, handleContinue } = useForm(
    (state) => state.date,
    setDate,
    dateValidators,
  );

  // Función para adaptar el cambio del calendario a tu handleChange
  const onCalendarChange = (selectedDate) => {
    // Convertimos la fecha a string YYYY-MM-DD para mantener compatibilidad con tu lógica
    const formattedDate = selectedDate.toISOString().split("T")[0];
    
    // Simulamos el evento que espera tu useForm
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
            <label className="form__label">Class Date</label>
            
            {/* --- CALENDARIO EN LUGAR DEL INPUT --- */}
            <div className="calendar-wrapper">
              <Calendar
                onChange={onCalendarChange}
                value={values.reservationDate ? new Date(values.reservationDate) : new Date()}
                minDate={new Date()} // Evita seleccionar fechas pasadas
                className="custom-calendar"
              />
            </div>
            {/* -------------------------------------- */}

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
};

export default DateSelection;