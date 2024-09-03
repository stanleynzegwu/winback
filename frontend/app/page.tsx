import { Header } from "./components";
import { Section2, Section3, Section4, CoreValuesSection } from "./containers";

export default function Home() {
  return (
    <main className="">
      <Header />
      <Section2 />
      {/* <Section3 /> */}
      <CoreValuesSection />
      <Section4 />
    </main>
  );
}
