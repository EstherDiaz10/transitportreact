const ModalOperario = ({ modalAbierto, children }) => {

    if(!modalAbierto) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-[#B7D0E1] md:rounded-[50px] relative w-full h-full md:max-w-180 md:h-auto lg:ml-45">
            {children}
        </div>
        </div>
    );
};

export default ModalOperario;