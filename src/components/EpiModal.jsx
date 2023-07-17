import { useEffect, useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import QrCode from "../assets/qrcode.svg";

const EpiModal = () => {
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath === "/") {
            setModalOpen(true);
        }
    }, []);

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            {modalOpen && (
                <div className="w-full bg-[#202225]">
                    <div className="max-w-[1400px] max-[500px]:gap-1 flex items-center max-[810px]:flex-wrap py-2 px-2 gap-5 mx-auto justify-evenly">
                        <a href="https://t.me/EpicMoviee" target="_blank" rel="preload">
                            <img src={QrCode} className="w-24" alt="Epic Movie" />
                        </a>
                        <p className="py-2 text-white text-center">
                            Unete al Telegram donde se avisa cada que se agrega nuevo contenido a la web
                        </p>
                        <a href="https://t.me/EpicMoviee"
                            target="_blank"
                            rel="noopener noreferrer" className="flex flex-col items-center text-cyan-500 justify-center text-sm">
                            <FaTelegramPlane className="text-3xl text-cyan-500" />
                            <span className="whitespace-nowrap">
                                Epic Movie
                            </span>
                        </a>
                        <button
                            className="max-[810px]:absolute right-0 top-1"
                            onClick={closeModal}
                        >
                            <IoCloseCircleSharp className="text-red-500 text-5xl" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default EpiModal;
