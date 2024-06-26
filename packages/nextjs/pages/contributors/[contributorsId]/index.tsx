import { useState } from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { Modal } from "~~/components/builder-registry";
import { Card } from "~~/components/builder-registry/Card";
import { Heading } from "~~/components/builder-registry/Heading";
import { SubmitWorkForm } from "~~/components/builder-registry/SubmitWorkForm";
import { ContributionList } from "~~/components/builder-registry/contributions/ContributionList";
import { ContributorHeader, ContributorSkills } from "~~/components/builder-registry/contributor";
import { ProfileHeader } from "~~/components/profile/ProfileHeader";
import { Contributors } from "~~/types/builders";

interface IProps {
  contributor: Contributors;
}

const ContributorProfile: NextPage<IProps> = ({ contributor }) => {
  const { address } = useAccount();
  const isUserProfile = contributor?.id === address;
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <MetaHeader />
      <ProfileHeader />
      <div className="flex flex-col flex-grow py-5 bg-base-200 px-8">
        <div className="container mx-auto">
          {/* Contributor Header */}
          <ContributorHeader
            id={contributor.id}
            title={contributor.function}
            dateJoined={contributor.creationTimestamp}
            isUserProfile={isUserProfile}
            handleOpenModal={handleOpenModal}
            status={contributor.status?.text}
            socials={contributor.socialLinks}
          />

          {/* Contributor Skills and Details */}
          <div className="my-6">
            <ContributorSkills skills={contributor.skills} />
          </div>

          {/* Contributors Contributions */}
          <Card>
            <Heading text="Total Contributions" count={contributor.builds.length} />
            <ContributionList contributions={contributor.builds} />
          </Card>
        </div>

        {/* Submit Work Modal */}
        {showModal && (
          <Modal title="Submit Personal Work" onClose={handleCloseModal}>
            <SubmitWorkForm />
          </Modal>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  try {
    const contributorsId = ctx.params?.contributorsId;
    const response = await fetch(`http://localhost:3000/api/builders/profile/${contributorsId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const contributor: Contributors = await response.json();

    return {
      props: { contributor },
    };
  } catch (error) {
    console.log("Error fetching data:", error);
    return {
      props: { contributor: null },
    };
  }
};

export default ContributorProfile;
