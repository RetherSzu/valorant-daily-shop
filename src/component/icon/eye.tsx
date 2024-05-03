import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const SvgEye = ({ color = "#484C56", width = 24, height = 24 }: SvgProps) => {
    return (
        <Svg
            width={height}
            height={width}
            viewBox="0 0 10 8"
            fill="none"
        >
            <Path
                d="M3.875 4a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                fill="#000"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 4c0 .82.212 1.096.637 1.648C1.486 6.75 2.91 8 5 8c2.091 0 3.514-1.25 4.363-2.352C9.788 5.096 10 4.819 10 4c0-.82-.213-1.095-.637-1.648C8.514 1.25 7.09 0 5 0 2.909 0 1.486 1.25.638 2.352.213 2.905 0 3.181 0 4zm5-1.875a1.875 1.875 0 100 3.75 1.875 1.875 0 000-3.75z"
                fill={color}
            />
        </Svg>
    );
};

export default SvgEye;
