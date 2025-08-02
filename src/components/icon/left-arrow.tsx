import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const SvgLeftArrow = ({ color = "#484C56", width = 24, height = 24 }: SvgProps) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
        >
            <Path
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l5 -5M9 12l5 5"
            />
        </Svg>
    )
};

export default SvgLeftArrow;
