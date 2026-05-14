import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Services from '../components/Services.jsx';
import Gallery from '../components/Gallery.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Contact from '../components/Contact.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Testimonials />
      <Contact />
    </>
  );
}
