import React, { useEffect } from "react"
import ReactPortal from "./ReactPortal";

interface ModalCloseButtonProps {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

export default function Modal ({children, isOpen, handleClose}: ModalCloseButtonProps) {

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleClose(): null;

    document.body.addEventListener("keydown", closeOnEscapeKey);
    
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    if (isOpen) {
      return (): void => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      {/*Overlay*/}
      <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-neutral-800 opacity-50" />
      
      <div className="fixed rounded flex flex-col box-border min-w-fit overflow-y-scroll overflow-x-hidden inset-y-0 inset-x-0 z-50">
        <div className="mx-auto flex justify-end box-border w-10/12 md:w-10/12 lg:w-8/12 xl:w-6/12 z-50">
          <button
            onClick={handleClose}
            className="hover:text-slate-600 w-fit p-4 absolute m-2 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="box-border">{children}</div>
      </div>
    </ReactPortal>
  );
}