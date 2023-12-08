import { HiOutlineDownload } from "react-icons/hi";

export default function Resume() {
  const handleClose = () => {
    window.close();
  };
  return (
    <div className="flex h-screen flex-col-reverse justify-center gap-40 p-10 sm:gap-0 lg:flex-row lg:p-0">
      <aside className="mx-auto flex basis-1/5 flex-col items-center justify-center gap-20">
      <button className="rounded bg-white px-4 py-6 text-xl font-bold text-gray-800 transition transform hover:scale-105">
          <a
            href="/Uzair-Popalzai-CV-2023.pdf"
            download="Uzair-Popalzai-CV-2023.pdf"
            className="flex items-center gap-4 transition transform hover:scale-105"
          >
            <HiOutlineDownload className="shrink-0 text-4xl" />
            <span>Download</span>
          </a>
        </button>
      </aside>

      <div className="mx-auto h-screen w-full py-10 sm:block 2xl:basis-2/5">
        <iframe
          src="/Uzair-Popalzai-CV-2023.pdf"
          title="Resume"
          className="w-full h-full"
        ></iframe>
      </div>

      <aside className="mx-auto flex items-center justify-center lg:basis-1/5">
        <button
          onClick={handleClose}
          className="rounded bg-white px-4 py-6 text-xl font-bold text-gray-800 transition transform hover:scale-105"
        >
          Close Page
        </button>
      </aside>
    </div>
  );
}