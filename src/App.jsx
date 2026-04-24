import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
// import CartBubble from "./components/cartBubble.jsx";

function App() {
  return (
    <>
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






