import Image from "next/image";
import React from "react";
import { IChild } from "../services/contract";
import Allocation from "./allocation";
import Button from "./button";
import Plus from "./plus";

interface IProps extends IChild {
  onTransfer: () => void;
  onStream: () => void;
}

const Child: React.FC<IProps> = ({
  address,
  name,
  access,
  onTransfer,
  onStream,
}) => {
  const allocations = [
    { name: "Playstation 5", value: 180, total: 230 },
    { name: "New Science Book", value: 11, total: 40 },
    { name: "College fund", value: 120, total: 5000 },
    { name: "Drone", value: 10, total: 200 },
  ];
  return (
    <div className="rounded-lg border-2 border-grey-light">
      <div className="p-6 flex">
        <Image src="/placeholder_child.jpg" width={64} height={64} />
        <div className="ml-6">
          <div className="mb-2 flex items-center">
            <h3 className="text-blue-dark text-lg mr-3">{name}</h3>
            <Button className="bg-blue-light " size="sm">
              Withdraws allowed
            </Button>
          </div>
          <p className="text-grey-medium">{address}</p>
        </div>
      </div>
      <div className="border-t-2 border-b-2 border-grey-light flex">
        <Button
          className="rounded-0 bg-white border-r-2 border-grey-light"
          onClick={onTransfer}
        >
          <div
            className="flex items-center text-blue-dark"
            style={{ padding: "0 2px" }}
          >
            <Plus width={12} height={12} />
            <span className="ml-1 font-normal text-base">Add more funds</span>
          </div>
        </Button>
        <Button
          className="rounded-0 bg-white border-r-2 border-grey-light"
          onClick={onStream}
        >
          <div className="flex items-center text-blue-dark">
            <Plus width={12} height={12} />
            <span className="ml-1 font-normal text-base">
              Create new stream
            </span>
          </div>
        </Button>
        <Button className="rounded-0 bg-white flex-1">
          <span className="text-blue-dark block" style={{ marginTop: -12 }}>
            ...
          </span>
        </Button>
      </div>
      <div className="flex">
        <div className="flex flex-col text-blue-dark">
          <div className="flex-1 p-4 border-b-2 border-grey-light">
            <p className="text-s mb-1">AVAILABLE FUNDS</p>
            <h3 className="text-lg">
              125 <span className="text-base"> USDx</span>
            </h3>
          </div>
          <div className="flex-1 p-4 border-b-2 border-grey-light">
            <p className="text-s mb-1">INVESTED FUNDS</p>
            <h3 className="text-lg">
              100 <span className="text-base"> USDx</span>
            </h3>
          </div>
          <div className="flex-1 p-4">
            <p className="text-s mb-1">TOTAL REWARDS</p>
            <h3 className="text-lg">
              10 <span className="text-base"> USDx</span>
            </h3>
          </div>
        </div>
        <div className="border-l-2 border-grey-light p-4 pb-0 flex flex-col flex-1">
          <p className="text-s">INVESTED FUNDS</p>
          <div
            className="flex-1 overflow-auto flex flex-col pb-3"
            style={{ maxHeight: 300 }}
          >
            {allocations.map((a) => (
              <Allocation key={a.name} {...a} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Child;
