import Image from "next/image";

type PrimaryButtonProps = {
  text: string;
  btnClass: string;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, btnClass }) => {
  return (
    <button
      className={`group relative flex gap-2 rounded-full bg-purple-500 text-white mx-auto ${btnClass}`}
    >
      <span className="capitalize text-xs tracking-tighter">{text}</span>
      <Image
        src="/images/forward-icon.png"
        alt="forward Icon"
        width={500}
        height={500}
        className="absolute right-[0.6rem] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white p-1 group-hover:right-2 transition-all"
      />
    </button>
  );
};

export default PrimaryButton;
