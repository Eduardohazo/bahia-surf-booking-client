import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
// import CartBubble from "./components/cartBubble.jsx";
// Reset scroll to top
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      {/* PAGE CONTENT */}
      {/* <CartBubble /> */}
      <main>
        <Outlet />
      </main>
      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default App;






