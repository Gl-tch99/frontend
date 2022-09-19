import React, { useEffect } from "react";
import KUTE from "kute.js";

function Svganimation() {
  useEffect(() => {
    const tween = KUTE.fromTo(
      "#blob1",
      { path: "#blob1" },
      { path: "#blob2" },
      { repeat: 999, duration: 4000, yoyo: true }
    );
    const tween2 = KUTE.fromTo(
      "#blob3",
      { path: "#blob3" },
      { path: "#blob4" },
      { repeat: 999, duration: 4000, yoyo: true }
    );
    tween.start();
    tween2.start();
  }, []);
  return (
    <>
      <div className="absolute m-0 p-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-1 opacity-90 bg-transparent z-0 overflow-hidden ">
        <svg
          id="visual"
          viewBox="0 0 900 600"
          width="900"
          height="600"
          version="1.1"
        >
          <g transform="translate(414.8298824140799 251.7459210965958)">
            <path
              id="blob1"
              d="M156.2 -136.7C200.7 -111.7 233.9 -55.9 241.3 7.4C248.7 70.7 230.4 141.4 185.9 187.8C141.4 234.1 70.7 256 4.8 251.2C-61 246.4 -122.1 214.8 -150.4 168.4C-178.8 122.1 -174.4 61 -167.1 7.3C-159.8 -46.4 -149.5 -92.9 -121.2 -117.9C-92.9 -142.9 -46.4 -146.4 4.7 -151.2C55.9 -155.9 111.7 -161.7 156.2 -136.7"
              fill="#BB004B"
            ></path>
            <path
              id="blob2"
              className="hidden"
              d="M156.9 -165.7C194.1 -119.7 208.5 -59.9 208.2 -0.4C207.8 59.2 192.7 118.3 155.5 143.3C118.3 168.3 59.2 159.2 -5.8 164.9C-70.7 170.7 -141.4 191.4 -187.8 166.4C-234.1 141.4 -256 70.7 -239.9 16.1C-223.8 -38.4 -169.5 -76.8 -123.2 -122.8C-76.8 -168.8 -38.4 -222.4 10.7 -233.1C59.9 -243.9 119.7 -211.7 156.9 -165.7"
              fill="#BB004B"
            ></path>
          </g>
          {/* <g transform="translate(468.47433043164403 328.3685130293476)"></g> */}
        </svg>
      </div>
      <div className="absolute m-0 p-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-1 opacity-90 bg-transparent z-0 overflow-hidden  ">
        <svg
          id="visual"
          viewBox="0 0 900 600"
          width="900"
          height="600"
          version="1.1"
          className="blur-2xl"
        >
          <g transform="translate(414.8298824140799 251.7459210965958)">
            <path
              id="blob3"
              d="M156.2 -136.7C200.7 -111.7 233.9 -55.9 241.3 7.4C248.7 70.7 230.4 141.4 185.9 187.8C141.4 234.1 70.7 256 4.8 251.2C-61 246.4 -122.1 214.8 -150.4 168.4C-178.8 122.1 -174.4 61 -167.1 7.3C-159.8 -46.4 -149.5 -92.9 -121.2 -117.9C-92.9 -142.9 -46.4 -146.4 4.7 -151.2C55.9 -155.9 111.7 -161.7 156.2 -136.7"
              fill="#BB004B"
            ></path>
            <path
              id="blob4"
              className="hidden"
              d="M156.9 -165.7C194.1 -119.7 208.5 -59.9 208.2 -0.4C207.8 59.2 192.7 118.3 155.5 143.3C118.3 168.3 59.2 159.2 -5.8 164.9C-70.7 170.7 -141.4 191.4 -187.8 166.4C-234.1 141.4 -256 70.7 -239.9 16.1C-223.8 -38.4 -169.5 -76.8 -123.2 -122.8C-76.8 -168.8 -38.4 -222.4 10.7 -233.1C59.9 -243.9 119.7 -211.7 156.9 -165.7"
              fill="#BB004B"
            ></path>
          </g>
          {/* <g transform="translate(468.47433043164403 328.3685130293476)"></g> */}
        </svg>
      </div>
    </>
  );
}

export default Svganimation;
