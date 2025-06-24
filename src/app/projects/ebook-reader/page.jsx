import Image from "next/image";
import Navbar from "@/components/Navbar";
export default function EbookReader() {



    return (
        <div className="px-12 md:px-24 my-32">
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-10">
                <div className="text-center text-xl">
                    An Ebook reader built with NextJS and FastAPI with AI Chatbot
                    <br />
                    <a href="https://reader.deekshith.me" target="_blank" className="text-gray-500">
                        <button className="text-gray-500">
                            Visit Website
                        </button>
                    </a>
                </div>

                <div className="flex flex-col items-center justify-center mt-10 px-12 rounded-lg">
                    {new Array(7).fill(0).map((_, index) => (
                        <Image key={index} className="w-full border-2 border-gray-300 my-4" src={`/proj-images/ebook-reader/${index + 1}.png`} alt="Ebook Reader" width={1000} height={1000} />
                    ))}
                </div>
            </div>
        </div>
    );
}