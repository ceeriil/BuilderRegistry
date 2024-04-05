import React from "react";
import Link from "next/link";
import { Card } from "../Card";

export const Favourites = () => {
  return (
    <Card>
      <h3>Favourites</h3>
      <div className="flex flex-col items-center justify-center h-full text-sm">
        <p>Nothing here</p>
        <Link href="/bounties" className="border border-[#B8FFF2] rounded-full px-5 py-2 mt-3 font-medium">
          View Bounties
        </Link>
      </div>
    </Card>
  );
};
