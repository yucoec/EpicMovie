import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import Modal from "react-modal";
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
        <Modal isOpen={modalOpen} className="bg-[#202225] drop-shadow-2xl border-none w-3/4 max-w-[330px] rounded-lg p-8" overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-filter backdrop-blur-sm" onRequestClose={closeModal}>
            <button className="absolute top-2 right-2" onClick={closeModal}><AiOutlineCloseCircle className="text-white text-2xl" /></button>
            <a href="https://t.me/EpicMoviee" target="_blank" rel="preload">
                <img src={QrCode} alt="Epic Movie" />
            </a>
            <p className="py-2 text-white"> Telegram (aquí iré publicando cada que se agregue una película o serie) tambien</p>
            <div className="flex justify-center">
                <a href="https://t.me/EpicMoviee" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-cyan-500 p-3 rounded-2xl w-3/4 justify-center text-lg text-white">Epic Movie <BsTelegram /></a>
            </div>
        </Modal >
    );
}

export default EpiModal