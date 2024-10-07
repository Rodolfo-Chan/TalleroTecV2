// import React, { Fragment } from "react";
import { Fragment } from "react";

import style from "../Modal/modal.module.css";

const ModalHOC = ({
  children,
  show = false,
  hide,
  activeHide = true,
}: {
  children: JSX.Element;
  show?: boolean;
  hide?: () => void;
  activeHide?: boolean;
}) => {
  return (
    <Fragment>
      {show && (
        <div className={`${style["modal-container"]}`}>
          <div className={`${style["container-background-children"]}`}>
            <div
              className={`${style["background-black"]}`}
              onClick={() => hide && activeHide && hide()}
            >
              {" "}
            </div>

            <div className={`${style["modal-info-div"]}`}>
              {/*<div
                onClick={() => hide && hide()}
                className={`${style["close-button-Modal"]}`}
              >
                X
      </div>*/}
              {children}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ModalHOC;