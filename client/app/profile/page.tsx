import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

type Props = {
  children: React.ReactNode;
};

const page = async (props: Props) => {
    const session = await getServerSession(authOptions)
    console.log("---------------session from profile--------------------")
    console.log(session)
  return (
    
    <div className=" grid grid-cols-12">
    <div className="grid-cols-6 border-r shadow h-screen p-2 w-full">
      <Link
        className="p-2 rounded hover:bg-emerald-600 hover:text-white hover:shadow transition block"
        href={`/profile/user/${session?.user?._id}`}
      >
        User Profile
      </Link>
    </div>
    <div className="col-span-4 p-4">Profile Page</div>

    <div className="col-span-4">{props.children}</div>
  </div>

  )
}

export default page
