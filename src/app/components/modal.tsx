
export default function Modal({ isOpen, onCancel, onConfirm, children }: { isOpen: boolean; onCancel: () => void; onConfirm: () => void; children: React.ReactNode }) {
    if (!isOpen) return null;

    return (
        <div className="fixed z-100 p-4 inset-0 flex items-center justify-center bg-black/50">
            <div className="modal bg-black border-2 border-chaos rounded-lg shadow-lg p-6 max-w-md w-full relative">
                {/* <button
                    className="absolute top-2 right-2 text-white bg-summit-grey"
                    onClick={onClose}
                >
                    &#x2715;
                </button> */}
                {children}
            </div>
        </div>
    );
};
