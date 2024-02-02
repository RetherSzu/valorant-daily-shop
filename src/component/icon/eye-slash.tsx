import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const SvgEyeSlash = ({ color = "#484C56", width = 24, height = 24 }: SvgProps) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 24 25"
            fill="none"
        >
            <Path
                d="M14.53 9.97l-5.06 5.06a3.576 3.576 0 115.06-5.06z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M17.82 6.27C16.07 4.95 14.07 4.23 12 4.23c-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19.79 1.24 1.71 2.31 2.71 3.17M8.42 20.03c1.14.48 2.35.74 3.58.74 3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-.33-.52-.69-1.01-1.06-1.47M15.51 13.2a3.565 3.565 0 01-2.82 2.82M9.47 15.03L2 22.5M22 2.5l-7.47 7.47"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default SvgEyeSlash;
