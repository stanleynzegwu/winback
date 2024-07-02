import { CircleChart } from "../components/svg/CircleChart";

const Section4 = () => {
  return (
    <section className="p-2 lg:p-10 lg:px-16 bg-black w-full flex flex-col lg:flex-row text-white">
      <div className="flex-1">
        <h3 className="">How we spend your donations and where it goes</h3>
        <p>
          we understand that when you make a donation you want to know exactly where your money is
          going and we pledge to be transparent
        </p>
      </div>
      <div className="flex-1 flex justify-center">
        <CircleChart />
      </div>
    </section>
  );
};

export default Section4;
