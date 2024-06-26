import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      passHref
      className={`${isActive ? "text-primary font-semibold" : ""}  hover:text-primary 
      active:!text-neutral py-1.5 px-3 text-sm gap-2 grid grid-flow-col rounded-none focus:bg-white font-medium nav-link`}
    >
      {children}
    </Link>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { address } = useAccount();
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const navLinks = (
    <>
      <li>
        <NavLink href="/">Home</NavLink>
      </li>
      <li>
        <NavLink href={"/contributors/" + address}>Profile</NavLink>
      </li>
      <li>
        <NavLink href="/contributions">Contributions</NavLink>
      </li>
      <li>
        <NavLink href="/contributors">Contributors</NavLink>
      </li>
      <li>
        <NavLink href="/bounties">Bounties</NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky lg:static top-0  bg-base-100 min-h-0  justify-between z-20 px-5 sm:px-0 border-b border-[#f3edf7]">
      <div className="mx-auto flex-shrink-0 navbar  container">
        <div className="navbar-start w-auto lg:w-1/2">
          <div className="lg:hidden dropdown" ref={burgerMenuRef}>
            <label
              tabIndex={0}
              className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
              onClick={() => {
                setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
              }}
            >
              <Bars3Icon className="h-1/2" />
            </label>
            {isDrawerOpen && (
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                onClick={() => {
                  setIsDrawerOpen(false);
                }}
              >
                {navLinks}
              </ul>
            )}
          </div>
          <Link href="/" passHref className="hidden lg:flex items-center gap-2 mr-10 shrink-0">
            <div className="flex relative w-10 h-10">
              <Image alt="GuildBase logo" className="cursor-pointer" fill src="/logo.svg" />
            </div>
            <div>
              <span className="font-extrabold leading-tight text-xl italic">GuildBase</span>
            </div>
          </Link>
        </div>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">{navLinks}</ul>
        <div className="navbar-end flex-grow ">
          <RainbowKitCustomConnectButton />
          <FaucetButton />
        </div>
      </div>
    </div>
  );
};
