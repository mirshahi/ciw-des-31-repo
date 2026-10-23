import About from '../components/home/About';
import CtaSection from '../components/home/CtaSection';
import FeaturedProperties from '../components/home/FeaturedProperties';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import TeamSection from '../components/home/TeamSection';
import WhyChoose from '../components/home/WhyChoose';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProperties />
      <Services />
      <WhyChoose />
      <TeamSection />
      <CtaSection />
    </>
  );
}
