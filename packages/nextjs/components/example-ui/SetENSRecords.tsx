import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

export const SetENSRecords = () => {
  const [newRID, setNewRID] = useState("");
  const [nameHash, setNameHash] = useState<`0x${string}`>("0x000000000000");

  const router = useRouter();
  useEffect(() => {
    const { subdomain } = router.query;
    if (!router.isReady || !subdomain) return;
    setNameHash(subdomain as `0x${string}`);
    console.log("here i am ", router);
  }, [router, router.isReady, router.query]);

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "ENSCaller",
    functionName: "setRecords",
    args: [nameHash, newRID, "signed sig"],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  useScaffoldEventSubscriber({
    contractName: "ENSCaller",
    eventName: "OverrideRecords",
    listener: logs => {
      logs.map(log => {
        console.log("new event", log.args._rid);
        window.location.href = "/";
      });
    },
  });

  return (
    <>
      <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center ">
          <input
            type="text"
            placeholder="Write your railgun id"
            className="input font-bai-jamjuree w-full px-5 bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
            onChange={e => setNewRID(e.target.value)}
          />
          <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
            <div className="flex rounded-full border-2 border-primary p-1">
              <button
                className="btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                onClick={() => writeAsync()}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    Send <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
