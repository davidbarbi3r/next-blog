import Link from "next/link";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

export default function StudioNavbar(props: any) {
  return (
    <div>
      <div className="flex items-center justify-between p-5">
        <Link href="/" className="text-[#2a9d8f] flex items-center">
          <ArrowUturnLeftIcon className="h-6 w-6 text-[#2a9d8f] mr-2" />
          Go to website
        </Link>
      </div>
      <>{props.renderDefault(props)}</>
    </div>
  );
}
