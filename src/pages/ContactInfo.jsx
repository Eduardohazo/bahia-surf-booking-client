import { useForm } from "../hooks/useForm";
import { setContactInfo } from "../redux/actions";
import { contactValidators } from "../utils/validators";

const ContactInfo = () => {
  const { values, handleChange, errors, handleContinue } = useForm(
    (state) => state.contactInfo,
    setContactInfo,
    contactValidators,
  );

  return (
    <section className="contact">
      {/* Overlay */}
      <div className="hero__overlay"></div>

      <div className="contact__container">
        <header className="contact__header">
          <h1 className="contact__title">
            Almost <br />
            There
          </h1>

          {/* TODO> Add person icon */}
          <div className="contact__subtitle-container">
            <i className="fa-solid fa-user"></i>
            <p className="contact__subtitle">Share your contact</p>
          </div>
        </header>

        <form className="form">
            <div className="form__field">
              <label htmlFor="username" className="form__label">
                Full Name
              </label>
              <input
                id="username"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                className="form__input"
              />
              {errors.name && (
                <span className="form__error">{errors.name}</span>
              )}
            </div>

            <div className="form__field">
              <label htmlFor="userphone" className="form__label">
                Phone
              </label>
              <input
                id="userphone"
                type="number"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                className="form__input"
              />
              {errors.phone && (
                <span className="form__error">{errors.phone}</span>
              )}
            </div>

            <div className="form__field">
              <label htmlFor="useremail" className="form__label">
                Email
              </label>
              <input
                id="useremail"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="form__input"
              />
              {errors.email && (
                <span className="form__error">{errors.email}</span>
              )}
            </div>

            <div className="form__button-container">
              <button
                className="form__button liquid-glass"
                onClick={(e) => handleContinue(e, "/date")}
              >
                Looks good
              </button>
            </div>
        </form>
      </div>
    </section>
  );
};

export default ContactInfo;
