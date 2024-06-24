import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";


const SvgUser = ({ color = "#484C56", width = 24, height = 24 }: SvgProps) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
        >
            <Path
                fill={color}
                d="M4 22a8 8 0 1116 0h-2a6 6 0 00-12 0zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6m0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4"
            />
        </Svg>
    );
};

export default SvgUser;
