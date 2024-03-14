"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/assets/images/logo.svg";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import hamburger from "../public/assets/images/Hamburger.png";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const allProviders = async () => {
      try {
        const response = await getProviders();
        // console.log(response);
        // console.log(response);
        setProviders(response);
      } catch (error) {
        console.log("error in get provider", error);
      }
    };
    allProviders();
  }, []);
  return (
    <header className="w-full">
      <nav className="flex-between w-full mb-16 pt-6 ">
        <Link href="/" className="flex gap-5">
          <Image src={logo} width={30} height={30} alt="promptopia" />
          <p className="logo_text hidden sm:block">Promptopia</p>
        </Link>

        {/* Desktop navigation */}
        {session?.user ? (
          <div className="hidden sm:flex gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button onClick={signOut} className="outline_btn">
              Logout
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={30}
                height={30}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name} className="hidden sm:block">
                  <button
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    key={provider.name}
                    className="black_btn "
                  >
                    Sign in
                  </button>
                </div>
              ))}
          </>
        )}
        {/* Mobile navigation */}
        <div className={`sm:hidden relative`}>
          <div
            href="/"
            onClick={() => {
              setToggle((prev) => !prev);
            }}
          >
            <Image
              className="sm:hidden block"
              src={hamburger}
              width={30}
              height={30}
              alt="hamburger"
            />
            {/* {alert(providers)} */}
            {toggle && (
              <div className="sm:hidden block dropdown">
                {session?.user ? (
                  <div className="space-y-2 flex flex-col p-2">
                    <Link href="/my-profile" className="font-semibold">
                      My Profile
                    </Link>
                    <Link href="/create-prompt" className="font-semibold">
                      Create Post
                    </Link>
                    <button onClick={signOut} className="black_btn mt-auto">
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    {providers &&
                      Object.values(providers).map((provider) => (
                        // This is the modified part to avoid nesting buttons inside buttons
                        <div key={provider.name}>
                          <button
                            onClick={() => {
                              signIn(provider.id);
                            }}
                            key={provider.name}
                            className="black_btn"
                          >
                            Sign in
                          </button>
                        </div>
                      ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
