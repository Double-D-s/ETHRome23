import { useEffect, useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { CreateSubdomain } from "~~/components/example-ui/CreateSubdomain";
import { SetENSRecords } from "~~/components/example-ui/SetENSRecords";
import { truncateStr } from "~~/utils/scaffold-eth/common";

const Dashboard: NextPage = () => {
  const [items, setItems] = useState([
    {
      buyer: "0xBA73115919e46F82fA990F8067d2905cB6FF3c60",
      seller: "0xBA73115919e46F82fA990F8067d2905cB6FF3c60",
      title: "Cool item",
      description: "lorem ipsum dolorem",
      amount: "30",
      state: "OPEN",
      votePoints: "",
    },
    {
      buyer: "0xBA73115919e46F82fA990F8067d2905cB6FF3c60",
      seller: "0xBA73115919e46F82fA990F8067d2905cB6FF3c60",
      title: "Cool item",
      description: "lorem ipsum dolorem",
      amount: "30",
      state: "OPEN",
      votePoints: "",
    },
    {
      buyer: "0xBA73115919e46F82fA990F8067d2905cB6FF3c60",
      seller: "0xBA73115919e46F82fA990F8067d2905cB6FF3c60",
      title: "Cool item",
      description: "lorem ipsum dolorem",
      amount: "30",
      state: "OPEN",
      votePoints: "",
    },
    {
      buyer: "0xBA73115919e46F82fA990F8067d2905cB6FF3c60",
      seller: "0xBA73115919e46F82fA990F8067d2905cB6FF3c60",
      title: "Cool item",
      description: "lorem ipsum dolorem",
      amount: "30",
      state: "OPEN",
      votePoints: "",
    },
  ]);

  // const buyModal = () => {
  //   return (
  //     <dialog id="my_modal_3" className="modal">
  //       <div className="modal-box">
  //         <form method="dialog">
  //           {/* if there is a button in form, it will close the modal */}
  //           <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
  //         </form>
  //         <h3 className="font-bold text-lg">Hello!</h3>
  //         <p className="py-4">Press ESC key or click on ✕ button to close</p>
  //       </div>
  //     </dialog>
  //   );
  // };

  const OperatorsGrid = () => {
    return (
      <div className=" grid grid-cols-1 w-full gap-y-8">
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </dialog>
        {false
          ? "Loading…"
          : items.map((i, index) => (
              <div className="card w-full bg-base-100 shadow-md hover:shadow-xl hover:cursor-pointer">
                {/* <figure>
                  <img src="/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                </figure> */}
                <div className="card-body">
                  <h2 className="card-title">
                    {i.title}
                    <div className="badge badge-secondary">{i.amount} $ZOLA</div>
                  </h2>
                  <p>{i.description}</p>
                  <div className="card-actions justify-end items-center">
                    <div className="badge badge-outline">{truncateStr(i.seller, 4)}</div>
                    <div className="badge badge-outline">State: {i.state}</div>
                    {/* <button className="btn btn-primary">Buy Now</button> */}
                    {/* <div className="badge badge-outline"></div>  */}
                    {/* <div className="badge badge-outline">Products</div> */}
                    <button
                      className="btn bg-secondary"
                      onClick={() => document.getElementById("my_modal_3").showModal()}
                    >
                      {i.state}
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    );
  };

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        {
          <div className="w-4/5 items-center flex flex-col">
            <div className="w-full mb-8">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body mx-auto text-center flex">
                  <div className="avatar flex items-center justify-center">
                    <div className="w-24 rounded-xl">
                      <img src="/zolaAngel.png" />
                    </div>
                  </div>
                  <h2 className="card-title text-center center items-center flex justify-center font-bold">
                    Pizza.eth
                  </h2>
                  {/* <CreateSubdomain />
                  <SetENSRecords /> */}

                  <p>I like buying and sellig things</p>
                  <div className="stats shadow bg-secondary">
                    <div className="stat place-items-center">
                      <div className="stat-title">Bought items</div>
                      <div className="stat-value">31</div>
                      <div className="stat-desc">2 refunds</div>
                    </div>

                    <div className="stat place-items-center">
                      <div className="stat-title">Sold items</div>
                      <div className="stat-value">420</div>
                      <div className="stat-desc">13 refunded</div>
                    </div>

                    <div className="stat place-items-center">
                      <div className="stat-title">Escrow Balanace</div>
                      <div className="stat-value">1200</div>
                      <div className="stat-desc">$ZOLA</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-start mb-8">
              <div className=" font-bold ml-2">| Bought items</div>
            </div>
            {true ? <OperatorsGrid /> : ""}
            <div className="w-full flex items-center justify-start my-8">
              <div className=" font-bold ml-2">| Sale items</div>
            </div>
            {true ? <OperatorsGrid /> : ""}
          </div>
        }
      </div>
    </>
  );
};

export default Dashboard;
