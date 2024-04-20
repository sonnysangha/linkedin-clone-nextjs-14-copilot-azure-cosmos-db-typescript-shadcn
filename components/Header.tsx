import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import {
  Briefcase,
  HomeIcon,
  MessagesSquare,
  SearchIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";

function Header() {
  const { userId } = auth();

  return (
    <div className="flex items-center p-2 max-w-6xl mx-auto">
      {/* Logo */}
      <Image
        className="rounded-lg"
        src="https://links.papareact.com/b3z"
        width={40}
        height={40}
        alt="logo"
      />

      {/* Search */}
      {/* SearchIcon */}
      <div className="flex-1">
        <form className="flex items-center space-x-1 bg-gray-100 p-2 rounded-md flex-1 mx-2 max-w-96">
          <SearchIcon className="h-4 text-gray-600" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent flex-1 outline-none"
          />
        </form>
      </div>

      <div className="flex items-center space-x-4 px-6">
        <div className="icon">
          <HomeIcon className="h-5" />
          <p>Home</p>
        </div>

        <div className="icon">
          <UsersIcon className="h-5" />
          <p>Network</p>
        </div>

        <div className="icon">
          <Briefcase className="h-5" />
          <p>Jobs</p>
        </div>

        <div className="icon">
          <MessagesSquare className="h-5" />
          <p>Messaging</p>
        </div>

        {/* Network */}
        {/* Jobs */}
        {/* Messaging */}
        {/* Notifications */}

        {/* Profile */}
        {userId ? <UserButton /> : <SignInButton />}
      </div>
    </div>
  );
}

export default Header;
