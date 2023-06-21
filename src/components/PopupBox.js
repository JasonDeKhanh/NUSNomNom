import React from "react";

function PopupBox(props) {
  const { open } = props;
  return (
    <div>
      {open && (
        <div className="absolute left-1/2 top-1/2 z-50 h-3/4 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white">
          {props.children}
        </div>
      )}
    </div>
  );
}

export default PopupBox;
