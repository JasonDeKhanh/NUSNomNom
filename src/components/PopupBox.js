import React from "react";

function PopupBox(props) {
  const { open } = props;
  return (
    <div>
      {open && (
        <div className="fixed left-[20%] top-[30%] z-50 flex flex min-h-[40vh] w-[60vw] flex-col items-center justify-center rounded-lg bg-blue-300 p-10">
          {props.children}
        </div>
      )}
    </div>
  );
}

export default PopupBox;
