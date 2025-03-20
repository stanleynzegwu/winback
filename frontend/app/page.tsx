import { Header } from "./components";
import { Section2, Section3, Section4, CoreValuesSection, FAQ, GallarySection } from "./containers";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      {/* <Section2 /> */}
      {/* <Section3 /> */}
      <CoreValuesSection />
      <GallarySection />
      <Section4 />
      <FAQ />

      {/* Background Color */}
      <div className="fixed top-0 left-0 h-screen w-screen bg-[#dfecf7] -z-30" />
      {/* Background Blur */}
      <div className="fixed md:hidden lg:inline left-0 top-0 w-48 h-40 md:w-60 2lg:w-80 md:h-40 -translate-y-1/2 -translate-x-1/4 rounded-b-full bg-blur-purple bg-violet-900 blur-3xl 2lg:blur-6xl overflow-hidden -z-30" />
      <div className="fixed right-0 top-0 -translate-y-1/2 w-36 h-40 md:h-2/5 md:w-56 2lg:w-72 rounded-l-full bg-violet-900 blur-2xl md:blur-3xl 2lg:blur-4xl overflow-hidden -z-30" />
      <div className="fixed hidden lg:block right-0 bottom-0 -translate-y-full -translate-x-1/2 w-32 h-32 rounded-full bg-violet-900 overflow-hidden blur-4xl -z-30" />
      <div className="fixed hidden lg:block left-0 bottom-0 w-1/2 h-32 rounded-full blur-4xl bg-violet-900 overflow-hidden -z-30" />
      <div className="fixed hidden lg:block left-3/5 translate-x-1/2 bottom-0 w-1/6 h-1/2 rounded-full blur-2xl  bg-[#619DD5] overflow-hidden -z-20" />
    </main>
  );
}
