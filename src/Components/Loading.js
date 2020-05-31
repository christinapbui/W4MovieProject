import React,{useState} from 'react'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

export default function Loading() {
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `;

let [loading,setLoading]=React.useState(true)
    return (
        <div className="sweet-loading">
        <ClipLoader
          css={override}
          size={150}
          color={"#123abc"}
          loading={loading}
        />
      </div>
    )
}
