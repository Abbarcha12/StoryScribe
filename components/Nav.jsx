"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const {data:session} =useSession();

  const [providers, setproviders] = useState(null);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      setproviders(response);
    };
    setProvider();
  }, []);
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          alt='promptopia Logo '
          width={70}
          height={70}
          className='object-contain'
          src='/assets/images/oo.jpg'
        />
        <p className='text-lg font-bold blue_gradient'> StoryScribe </p>
      </Link>
      {/* DESKTOP_NAVIGATION */}
      <div className='sm:flex hidden'>
      {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>
            <button className='outline_btn' type='button' onClick={signOut}>
              Sign Out
            </button>
            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className='black_btn'
                  type='button '
                  key={provider.name}
                  onClick={() => signIn(provider.id)}>
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* MOBILE_NAVIGATION */}
      <div className='sm:hidden flex  relative'>
      {session?.user ? (
          <div className='flex'>
            <Image
             src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggle((prev) => !prev)}
            />
            {toggle && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggle(false)}>
                  My profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggle(false)}>
                  Create Prompt{" "}
                </Link>
                <button
                  type='button'
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggle(false);
                    signOut();
                  }}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className='black_btn'
                  type='button '
                  key={provider.name}
                  onClick={() => signIn(provider.id)}>
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
