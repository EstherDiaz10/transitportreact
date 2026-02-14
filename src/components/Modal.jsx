const Modal = ({ modalAbierto, cerrarModal, children }) => {

    if(!modalAbierto) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-[#B7D0E1] md:rounded-[50px] relative w-full h-full md:max-w-180 md:h-auto md:ml-45">
            <button 
            onClick={cerrarModal} 
            className="hidden md:block absolute top-8 right-8 text-[#2A5677] text-xl font-bold hover:text-[#5F84A2] h-10 w-10 rounded-[5px] hover:bg-white/20 cursor-pointer">
            ✕
            </button>
            <button 
            onClick={cerrarModal} 
            className="md:hidden absolute top-8 left-8 flex justify-center items-center text-white bg-[#5F84A2] text-xl font-bold hover:text-[#5F84A2] h-10 w-10 rounded-full hover:bg-white/20 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path></svg>
            </button>
            {children}
        </div>
        </div>
    );
};

export default Modal;