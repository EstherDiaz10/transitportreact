const Modal = ({ modalAbierto, cerrarModal, children }) => {

    if(!modalAbierto) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-[#B7D0E1] rounded-[50px] relative ml-45">
            <button 
            onClick={cerrarModal} 
            className="absolute top-8 right-8 text-[#2A5677] text-xl font-bold hover:text-[#5F84A2] h-10 w-10 rounded-[5px] hover:bg-white/20 cursor-pointer">
            ✕
            </button>
            {children}
        </div>
        </div>
    );
};

export default Modal;