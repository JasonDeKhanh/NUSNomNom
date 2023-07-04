import React from "react";

import { ReactComponent as CloseIcon } from "../icons/CloseIcon.svg";

function PopupBox(props) {
  const { open, onClose, isMenuPage } = props;
  return (
    <div>
      {
        <div
          className={`${
            open ? "visible bg-black/40" : "invisible"
          } absolute z-20 h-[100svh] w-[100vw] transition-all duration-200 ease-in`}
        >
          <div
            className={`${
              open ? "opacity-100" : "opacity-0"
            } absolute left-1/2 top-1/2 z-50 h-[95svh] w-[95%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-slate-50 transition-all duration-200 ease-in md:h-3/4 md:w-3/4`}
          >
            {isMenuPage ? (
              <button onClick={onClose} className="absolute right-2 top-2 z-10">
                <CloseIcon className="h-10 w-10 fill-[#ffffcc]"></CloseIcon>
              </button>
            ) : (
              <button onClick={onClose} className="absolute right-2 top-2 z-10">
                <CloseIcon className="h-10 w-10 fill-[#f9c03f]"></CloseIcon>
              </button>
            )}
            {props.children}
          </div>
        </div>
      }
    </div>
  );
}

export default PopupBox;
