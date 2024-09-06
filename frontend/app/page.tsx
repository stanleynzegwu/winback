import { Header } from "./components";
import { Section2, Section3, Section4, CoreValuesSection, FAQ, GallarySection } from "./containers";

export default function Home() {
  return (
    <main className="">
      <Header />
      {/* <Section2 /> */}
      {/* <Section3 /> */}
      <CoreValuesSection />
      <GallarySection />
      <Section4 />
      <FAQ />
    </main>
  );
}
