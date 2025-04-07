import Link from "next/link";
import PrimaryButton from "../components/PrimaryBtn";

export default function AccessDenied() {
  return (
    <div className="relative p-4 md:px-8 w-full pb-6 z-20">
      <span className="block uppercase text-lg font-bold mb-4 md:mb-6">
        Yu don't have acees to this page, contact Admin
      </span>
      <div className="flex flex-col gap-1">Access Denied</div>
      <Link href={`/`} className="">
        <PrimaryButton text={"HOME"} btnClass={"w-24 px-2 py-2 "} />
      </Link>
    </div>
  );
}
