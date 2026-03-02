import Slider from "../components/Slider";
import PromoBanners from "../components/promoBunner"
import OurCategories from "../components/ourCtegories"
import DealsBanner from "../components/DealsBunner";

import FeatuedProducts from "../../../features/Home/components/featuredProducts"
import NewsLetter from "../../Home/components/NewsLetter"

export default function HomeScreen() {
  return <>
  <Slider/>
  <PromoBanners/>
  <OurCategories/>
  <DealsBanner/>
  <FeatuedProducts/>
  <NewsLetter/>
  </>
}
