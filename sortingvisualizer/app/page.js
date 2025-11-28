import Image from "next/image";
import GridLayout from "./components/grids";
import ButtonLayout from "./components/buttons";
import Descriptions from "./components/descriptions";

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-blue-800 m-20 font-serif">
      <div className="flex">
        <h1 className="text-4xl">
          Sorting Algorithms Visualized
        </h1>
      </div>
      <div className="flex flex-col bg-blue-800 font-serif">
        <ButtonLayout />
      </div>
      <div className="flex flex-col bg-blue-800 my-4  font-serif">
        <GridLayout />
      </div>
      <div>
        <Descriptions />
      </div>
    </div>
  );
}
