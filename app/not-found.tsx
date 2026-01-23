import Image from "next/image";

export default function Custom404() {
  return <div className="w-full h-[100vh] flex items-center justify-center"><img width={300} src={`/not-found/not_found.png`} alt="Page not found"/></div>
}