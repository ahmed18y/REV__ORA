import { motion } from 'framer-motion';
import HeroSection from '../components/sections/HeroSection';
import BrandsSection from '../components/sections/BrandsSection';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import WhyUs from '../components/sections/WhyUs';
import CTASection from '../components/sections/CTASection';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <HeroSection />
      <BrandsSection />
      <FeaturedProducts />
      <WhyUs />
      <CTASection />
    </motion.div>
  );
}
