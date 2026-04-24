import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./redux/store";
import { loadProducts } from "./redux/actions/index.js";
// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import PaymentMethod from "./pages/PaymentMethod";
import Order from "./pages/Order";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import ThankYouPage from "./pages/ThankyouPage";
import ContactInfo from "./pages/ContactInfo";
import Date from "./pages/Date";
import Schedule from "./pages/Schedule";
import Error404 from "./components/Error404";
import ErrorFallback from "./components/ErrorFallback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorFallback />,
        loader: async () => {
          store.dispatch(loadProducts());
          return null;
        },
      },
      { path: "about", element: <About /> },
      { path: "blog", element: <Blog /> },
      { path: "contact-info", element: <ContactInfo /> },
      { path: "date", element: <Date /> },
      { path: "schedule", element: <Schedule /> },
      { path: "cart", element: <Cart /> },
      { path: "payment-method", element: <PaymentMethod /> },
      { path: "order", element: <Order /> },
      { path: "payment", element: <Payment /> },
      { path: "paymentSuccess", element: <PaymentSuccess /> },
      { path: "paymentCancel", element: <PaymentCancel /> },
      { path: "thankYou", element: <ThankYouPage /> },
      { path: "*", element: <Error404 /> },
    ],
  },
]);

export default router;
