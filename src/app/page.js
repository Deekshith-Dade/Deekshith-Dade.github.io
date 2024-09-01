import Image from "next/image";
import Navbar from "../components/Navbar";
import Center from "@/components/Center";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <div className="px-12 md:px-24">
      <Navbar />
      <Center />
      <hr className="border-t-[2px] border-r-green p-4"></hr>
      <Projects />
    </div>
  );
}
