import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Address } from "~~/components/scaffold-eth";
import { Contributors } from "~~/types/builders";

type ContributorTableProps = {
  contributors: Contributors[];
};

export const ContributorTable: React.FC<ContributorTableProps> = ({ contributors }) => {
  const getDateJoined = (date: string | number | Date): string => {
    let timestamp: number;

    if (typeof date === "string") {
      timestamp = parseInt(date);
    } else if (typeof date === "number") {
      timestamp = date;
    } else {
      timestamp = date.getTime();
    }

    if (timestamp > 1e12) {
      timestamp = Math.floor(timestamp / 1000); // Check if the value is in milliseconds and convert it to seconds
    }

    const relativeTime = formatDistanceToNow(new Date(timestamp * 1000), { addSuffix: true });

    return relativeTime;
  };

  return (
    <div className="overflow-x-auto">
      <table role="table" className="w-full text-left table-fixed min-w-[700px] overflow-x-hidden mt-6">
        <thead>
          <tr className="uppercase border-b border-[#DED1EC] text-[0.9rem]">
            <th className="py-3 w-[30%] md:w-auto">Contributors</th>
            <th className="py-3 w-[38%]">Bio</th>
            <th className="py-3 w-[20%]">No. Contributions</th>
            <th className="py-3 text-right">Date Joined</th>
          </tr>
        </thead>
        <tbody>
          {contributors.map((contributor, index: number) => (
            <tr key={index} className="border-b border-[#DED1EC]">
              <td className="py-5 pr-4">
                <Address address={contributor.id} format="short" disableAddressLink={true} />
              </td>
              <td className="py-5 pr-8">
                {contributor.status && contributor.status.text
                  ? contributor.status.text
                  : "ex business developer for ethereum foundation, currently supporting open-source development: bit.ly/shaneeth"}
              </td>
              <td className="py-5">{contributor.builds.length}</td>
              <td className="py-5 text-right">{getDateJoined(contributor.creationTimestamp)} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
