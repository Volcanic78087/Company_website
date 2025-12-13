import Header from "../components/public/Header";
import Footer from "../components/public/Footer";
import Hero from "../components/public/Hero";
import Services from "../components/public/Services";
import Testimonials from "./Testimonial";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
