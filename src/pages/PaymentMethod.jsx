import { useForm } from "../hooks/useForm";
import { setPaymentMethod } from "../redux/actions/index.js";
import { paymentValidators } from "../utils/validators";

const PaymentMethod = () => {
  const { values, handleChange, errors, handleContinue } = useForm(
    (state) => state.paymentMethod,
    setPaymentMethod,
    paymentValidators,
  );

  return (
    <section className="payment">
      {/* Overlay */}
      <div className="hero__overlay"></div>

      <div className="payment__container">
        <header className="payment__header">
          <h1 className="payment__title">Payment Method</h1>
          <div className="payment_subtitle-container">
            <p className="payment__subtitle">
              Select your preferred payment option.
            </p>
          </div>
        </header>

        <form className="form">
        <div className="form__payment-method">
          {["stripe", "paypal"].map((option) => (
            <label
              key={option}
              className={`form__option ${
                values.method === option ? "form__option--active" : ""
              }`}
            >
              <input
                type="radio"
                name="method"
                value={option}
                checked={values.method === option}
                onChange={handleChange}
                className="form__radio"
              />
              <span className="form__custom-radio"></span>
              <span className="form__label-text">
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </span>
            </label>
          ))}

          {errors.method && (
            <span className="form__error">{errors.method}</span>
          )}

          <button
            className="form__button liquid-glass"
            onClick={(e) => handleContinue(e, "/order")}
          >
            Continue
          </button>
          </div>
        </form>
      </div>
    </section>
  );

  //   return (
  //   <section className="payment">
  //     <div className="payment__container">
  //       <header className="payment__header">
  //         <h1 className="payment__title">Payment Method</h1>
  //         <p className="payment__subtitle">
  //           Select your preferred payment option.
  //         </p>
  //       </header>

  //       <form className="payment__form">
  //         {["stripe", "paypal"].map((option) => (
  //           <label
  //             key={option}
  //             className={`payment__option ${
  //               values.method === option ? "payment__option--active" : ""
  //             }`}
  //           >
  //             <input
  //               type="radio"
  //               name="method"
  //               value={option}
  //               checked={values.method === option}
  //               onChange={handleChange}
  //               className="payment__radio"
  //             />
  //             <span className="payment__custom-radio"></span>
  //             <span className="payment__label-text">
  //               {option.charAt(0).toUpperCase() + option.slice(1)}
  //             </span>
  //           </label>
  //         ))}

  //         {errors.method && (
  //           <span className="payment__error">{errors.method}</span>
  //         )}

  //         <button
  //           className="payment__button"
  //           onClick={(e) => handleContinue(e, "/order")}
  //         >
  //           Continue
  //         </button>
  //       </form>
  //     </div>
  //   </section>
  // );
};

export default PaymentMethod;
