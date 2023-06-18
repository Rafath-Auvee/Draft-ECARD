import Image from "next/image";
import Card from "../../components/Home/Card";
import Card_Preview from "/public/Home/card_preview.png";
import Hero from "/public/Home/hero.png";
import Iphone from "/public/Home/iPhone.png";
export default function Home() {
  return (
    <div>
      <div
        className="w-full h-screen bg-cover bg-no-repeat bg-scroll"
        style={{ backgroundImage: `url('/Home/hero.png')` }}
      >
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-[24px] text-primary uppercase">Looking for</p>
            <h1 className="font-bold text-[56px] text-primary capitalize">
              the Perfect E-card?
            </h1>
            <button className="bg-primary text-white py-2.5 px-6 rounded flex items-center justify-center">
              Check out The Designs Here
            </button>
          </div>
          <div className="flex items-center justify-center flex-grow">
            <Image
              src={Iphone}
              width={0}
              height={0}
              className=""
              alt="Hero Image"
            />
          </div>
        </div>

        {/* <div className="flex items-end justify-center h-screen">
          <Image
            src={Iphone}
            width={0}
            height={0}
            className=""
            alt="Hero Image"
          />
        </div> */}
      </div>

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
    </div>
  );
}
