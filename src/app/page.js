import Navbar from "../components/Navbar";
import Center from "@/components/Center";
import Projects from "@/components/Projects";
import Climax from "@/components/Climax";

export default function Home() {
  return (
    <>
    <Navbar />
    <div className="px-12 md:px-24">
      <Center />
      <hr className="my-12 border-t border-gray-200"></hr>
      <Projects />
      <hr className="my-12 border-t border-gray-200"></hr>
      <Climax />
    </div>
    </>
    
    
  );
}
