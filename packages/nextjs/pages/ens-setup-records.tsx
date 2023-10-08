import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { SetENSRecords } from "~~/components/example-ui/SetENSRecords";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">Setup your Railgun id to the Subdomain</span>
          </h1>
          <SetENSRecords />
        </div>
      </div>
    </>
  );
};

export default Home;
