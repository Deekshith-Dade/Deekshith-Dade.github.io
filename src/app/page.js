import Image from "next/image";
import Navbar from "../components/Navbar";
import Center from "@/components/Center";
import Projects from "@/components/Projects";
import Climax from "@/components/Climax";
import HobbyHighlights from "@/components/HobbyHighlights";

export default function Home() {
  return (
    <>
    <Navbar />
    <div className="px-12 md:px-24">
      <Center />
      <hr className="border-t-[2px] border-r-green p-4"></hr>
      <Projects />
      <hr className="border-t-[2px] border-r-green p-4"></hr>
      <HobbyHighlights />
      <hr className="border-t-[2px] border-r-green p-4"></hr>
      <Climax />
    </div>
    </>
    
    
  );
}
