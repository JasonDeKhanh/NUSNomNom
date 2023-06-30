import React, { useState } from "react";

import { ReactComponent as DoubleArrowRight } from "../icons/ArrowDoubleRight.svg";
import { ReactComponent as AboutIcon } from "../icons/AboutIcon.svg";
import { ReactComponent as QuestionIcon } from "../icons/QuestionIcon.svg";
import PopupBox from "./PopupBox";
import AboutPage from "./AboutPage";
import InstructionsPage from "./InstructionsPage";

function SideMenu(props) {
  const { open, onClose } = props;

  const [isOpenAbout, setIsOpenAbout] = useState(false);
  const [isOpenInstructions, setIsOpenInstructions] = useState(false);

  return (
    <div>
      <PopupBox
        open={isOpenAbout}
        onClose={() => setIsOpenAbout(false)}
        isMenuPage={false}
      >
        <AboutPage />
      </PopupBox>
      <PopupBox
        open={isOpenInstructions}
        onClose={() => setIsOpenInstructions(false)}
        isMenuPage={false}
      >
        <InstructionsPage onClose={() => setIsOpenInstructions(false)} />
      </PopupBox>
      {
        <div
          className={`transform ${
            open ? "translate-x-0" : "-translate-x-full"
          } relative left-0 top-0 z-10 h-[100svh] w-48 border border-r-[#F9C03FCC] bg-[#FFFFCC] transition transition-transform duration-300 duration-300 ease-in-out md:w-56 `}
        >
          <button
            className="absolute right-2 mt-2 h-10 lg:right-4 lg:mt-4"
            onClick={onClose}
          >
            <DoubleArrowRight className="h-10 w-10 -scale-100 stroke-[#875D00]"></DoubleArrowRight>
          </button>
          <div className="mt-14 flex flex-col px-2 text-xl font-medium text-[#875D00]">
            <div
              className="flex cursor-pointer items-center rounded-md px-1 py-0.5 hover:bg-[#F5E2B7] active:bg-[#D4C4A0]"
              onClick={() => setIsOpenAbout(true)}
            >
              <AboutIcon className="h-4 w-4 fill-[#875D00]"></AboutIcon>
              <span className="mx-2 ">About</span>
            </div>

            <div
              className="flex cursor-pointer items-center rounded-md px-1 py-0.5 hover:bg-[#F5E2B7] active:bg-[#D4C4A0]"
              onClick={() => setIsOpenInstructions(true)}
            >
              <QuestionIcon className="h-4 w-4 fill-[#875D00]"></QuestionIcon>
              <span className="mx-2">Instructions</span>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default SideMenu;
