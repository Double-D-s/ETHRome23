import { useEffect, useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { truncateStr } from "~~/utils/scaffold-eth/common";

const Escrows: NextPage = () => {
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

  const OperatorsGrid = () => {
    return (
      <div className=" grid gap-16 md:grid-cols-2 xl:grid-cols-3">
        {false
          ? "Loading…"
          : items.map((i, index) => (
              <div className="card w-96 bg-base-100 shadow-xl">
                <figure>
                  <img src="/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {i.title}
                    <div className="badge badge-secondary">{i.amount} $ZOLA</div>
                  </h2>
                  <p>{i.description}</p>
                  <div className="card-actions justify-end">
                    {/* <div className="badge badge-outline">{truncateStr(i.seller, 4)}</div> */}
                    <button className="btn btn-primary">Buy Now</button>
                    {/* <div className="badge badge-outline">Products</div> */}
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
      <div className="flex items-center flex-col flex-grow pt-10">{true ? <OperatorsGrid /> : ""}</div>
    </>
  );
};

export default Escrows;
