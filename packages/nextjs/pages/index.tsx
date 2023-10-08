import Link from "next/link";
import type { NextPage } from "next";
import {
  ArrowPathRoundedSquareIcon,
  BanknotesIcon,
  BugAntIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  const exampleCode = [
    `    function requestRefund(uint256 _escrowId, string calldata _reason) external checkIfEscrowExists(_escrowId) {`,
    `        Escrow storage escrow = escrows[_escrowId];`,
    `        require(msg.sender == escrow.buyer, "Only the buyer can request refund");`,
    `        require(escrow.escrowStatus == Status.PAID, "Escrow state has to be set to paid to request refund");`,
    `        escrow.escrowStatus = Status.REFUND_REQUESTED;`,
    `        token.transfer(escrow.seller, escrow.amount);`,
    `        activeRefundRequests.push(Request(_escrowId, _reason));`,
    `        emit RefundRequest(_escrowId, msg.sender, escrow.seller, escrow.amount, activeRefundRequests.length, _reason);`,
    `    }`,
  ];
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img src="/zolaAngel.png" className="max-w-sm rounded-lg" />
            <div>
              <h1 className="text-5xl font-bold">Discover Zola</h1>
              <p className="py-6">
                Blockchain scaling solution focused on improving user experience for the process of buying and selling
                physical and digital products.
              </p>
              <button className="btn btn-primary">See products</button>
            </div>
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="hero-content text-center">
            <div className="max-w-md mb-8">
              <h1 className="text-5xl font-bold">Core Features</h1>
            </div>
          </div>
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <ArrowPathRoundedSquareIcon className="h-8 w-8 fill-secondary" />
              {/* <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contract
                </Link>{" "}
                tab.
              </p> */}
              <p>Reversable transactions thanks to the escrow refund system available for all user purchases.</p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BanknotesIcon className="h-8 w-8 fill-secondary" />
              <p>Customizable escrows tailored to needs of specific merchants and end users.</p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <ShieldCheckIcon className="h-8 w-8 fill-secondary" />
              {/* <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p> */}
              <p>Railgun-powered privacy mode, hiding details of purchases from third-parties.</p>
            </div>
          </div>
        </div>

        <div className="hero min-h-screen bg-base-200 mt-32 mb-24">
          <div className="hero-content flex-col lg:flex-row">
            {/* <img src="/zolaAngel.png" className="max-w-sm rounded-lg" /> */}
            <div className="mockup-phone border-primary">
              <div className="camera"></div>
              <div className="display">
                {/* <div className="artboard artboard-demo phone-1">Hi.</div> */}
                <img src="/mobile1.PNG" className="max-w-sm rounded-xl pt-8 object-cover w-full" />
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-bold">Available as a standalone dAp...</h1>
              <p className="py-6">
                Products from selected merchants available through stunning, mobile-friendly UI created with smooth,
                web2 like experience in mind.
              </p>
              <button className="btn btn-primary">Launch dApp</button>
            </div>
          </div>
        </div>

        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            {/* <img src="/zolaAngel.png" className="max-w-sm rounded-lg" /> */}
            <div></div>
            <div>
              <h1 className="text-5xl font-bold">...or protocol ready to be integrated</h1>
              <div className="mockup-code bg-primary mt-32 mb-16">
                <pre data-prefix="$">
                  <code>{exampleCode[0]}</code>
                </pre>
                <pre data-prefix=">" className="text-success">
                  <code>{exampleCode[1]}</code>
                </pre>
                <pre data-prefix=">" className="text-warning">
                  <code>{exampleCode[2]}</code>
                </pre>
                <pre data-prefix=">" className="text-warning">
                  <code>{exampleCode[3]}</code>
                </pre>
                <pre data-prefix=">" className="text-success">
                  <code>{exampleCode[4]}</code>
                </pre>
                <pre data-prefix=">" className="text-success">
                  <code>{exampleCode[5]}</code>
                </pre>
                <pre data-prefix=">" className="text-success">
                  <code>{exampleCode[6]}</code>
                </pre>
                <pre data-prefix=">" className="text-warning">
                  <code>{exampleCode[7]}</code>
                </pre>
                <pre data-prefix=">" className="">
                  <code>{exampleCode[8]}</code>
                </pre>
              </div>
              <div className="w-full items-center text-center">
                <button className="btn btn-secondary">Start building</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
