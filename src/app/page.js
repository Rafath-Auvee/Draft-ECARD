import Image from "next/image";
import Card from "../../components/Home/Card";
import Card_Preview from "/public/Home/card_preview.png";

export default function Home() {
  return (
    <div className="flex flex-row justify-between ">
      <div className="main-card basis-3/12 mx-10 my-4 bg-[#E1EDFA] px-8 py-3">
        <div className="h-full w-full items-center ">
          <p className="bg-[#4b52583e] text-base-100 w-36 mb-4 h-11 text-center items-center flex rounded-full justify-center">
            Single page
          </p>
          <div>
            <Image
              src={Card_Preview}
              alt="Card-Preview"
              className="rounded-xl"
            />
          </div>
          <h2 className="font-bold text-lg">Marble Textured Welcome Board</h2>
          <p className="font-bold text-lg">৳2,500</p>
          <button>View Design</button>
        </div>
      </div>
      <div className="main-card basis-3/12 mx-10 my-4 bg-[#B5F2E3] px-8 py-3">
        <div className="h-full w-full items-center ">
          <p className="bg-[#4b52583e] text-base-100 w-36 mb-4 h-11 text-center items-center flex rounded-full justify-center">
            Single page
          </p>
          <div>
            <Image
              src={Card_Preview}
              alt="Card-Preview"
              className="rounded-xl"
            />
          </div>
          <h2 className="font-bold text-lg">Marble Textured Welcome Board</h2>
          <p className="font-bold text-lg">৳2,500</p>
          <button>View Design</button>
        </div>
      </div>
      <div className="main-card basis-3/12 mx-10 my-4 bg-[#DEF2B5] px-8 py-3">
        <div className="h-full w-full items-center ">
          <p className="bg-[#4b52583e] text-base-100 w-36 mb-4 h-11 text-center items-center flex rounded-full justify-center">
            Single page
          </p>
          <div>
            <Image
              src={Card_Preview}
              alt="Card-Preview"
              className="rounded-xl"
            />
          </div>
          <h2 className="font-bold text-lg">Marble Textured Welcome Board</h2>
          <p className="font-bold text-lg">৳2,500</p>
          <button>View Design</button>
        </div>
      </div>
      <div className="main-card basis-3/12 mx-10 my-4 bg-[#C9B5F2] px-8 py-3">
        <div className="h-full w-full items-center ">
          <p className="bg-[#4b52583e] text-base-100 w-36 mb-4 h-11 text-center items-center flex rounded-full justify-center">
            Single page
          </p>
          <div>
            <Image
              src={Card_Preview}
              alt="Card-Preview"
              className="rounded-xl"
            />
          </div>
          <h2 className="font-bold text-lg">Marble Textured Welcome Board</h2>
          <p className="font-bold text-lg">৳2,500</p>
          <button>View Design</button>
        </div>
      </div>
    </div>
  );
}
