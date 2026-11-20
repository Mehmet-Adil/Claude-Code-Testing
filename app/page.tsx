import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Shop from "@/components/Shop";
import Story from "@/components/Story";
import Testimonials from "@/components/Testimonials";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Hero />
        <Features />
        <Shop />
        <Story />
        <Testimonials />
        <Subscribe />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
