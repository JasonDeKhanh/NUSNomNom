import React from "react";

import { ReactComponent as CloseIcon } from "../icons/CloseIcon.svg";

function PopupBox(props) {
  const { open, onClose } = props;
  return (
    <div>
      {open && (
        <div className="absolute z-20 h-[100vh] w-[100vw] bg-black/40">
          <div className="absolute left-1/2 top-1/2 z-50 h-[90%] w-[95%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-slate-50 md:h-3/4 md:w-3/4">
            <button onClick={onClose} className="absolute right-2 top-2 z-10">
              <CloseIcon className="h-10 w-10 fill-[#FFFFE7]"></CloseIcon>
            </button>
            {props.children}
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupBox;
