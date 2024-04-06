import { useState } from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { SearchBar } from "~~/components/builder-registry";
import { Card } from "~~/components/builder-registry/Card";
import { Heading } from "~~/components/builder-registry/Heading";
import { ContributorTable, ContributorsStats } from "~~/components/builder-registry/contributor";
import { Contributors } from "~~/types/builders";

interface IProps {
  contributors: Contributors[];
}

const ContributorsPage: NextPage<IProps> = ({ contributors }) => {
  const [query, setQuery] = useState<string>("");
  console.log(query, setQuery);

  const filterContributors = () => {
    if (!query) {
      return contributors;
    }

    const lowercasedQuery = query.toLowerCase();

    return contributors.filter((contributor: Contributors) => {
      return (
        contributor.id.toLowerCase().includes(lowercasedQuery) ||
        contributor.ens?.toLowerCase().includes(lowercasedQuery)
      );
    });
  };

  return (
    <>
      <MetaHeader />
      <div className="flex flex-col flex-grow pt-6 bg-base-200">
        <div className="container mx-auto px-6 md:px-0">
          <div>
            <div className="rounded-t-lg bg-base-100 inline-block px-6 py-2 pt-3">
              <Heading text="Total Contributors" count={contributors.length} />
            </div>

            <div className="mb-6 bg-base-100 rounded-lg px-6 pt-1 rounded-l-none">
              <div className="flex justify-between items-center lg:flex-row flex-col ">
                <ContributorsStats />
                <SearchBar query={query} onChange={e => setQuery(e.target.value)} />
              </div>
            </div>

            <Card className="mb-8">
              <ContributorTable contributors={filterContributors()} />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/builders");

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const contributors: Contributors[] = await response.json();

    return {
      props: { contributors },
    };
  } catch (error) {
    console.log("Error fetching data:", error);
    return {
      props: { contributors: [] },
    };
  }
};

export default ContributorsPage;
