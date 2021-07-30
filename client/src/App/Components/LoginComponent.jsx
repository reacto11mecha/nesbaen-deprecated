import React from "react";

import styles from "./Styles/LoginComponent.module.css";

export default function LoginComponent() {
  return (
    <div className={`container ${styles.entireContainer}`}>
      <div className={`row justify-content-center ${styles.formRow}`}>
        <div className="col">
          <div className="card">
            <div className="card-body"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
