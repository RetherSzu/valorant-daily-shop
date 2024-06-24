import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const SvgCheck = ({ color = "#484C56", width = 24, height = 24 }: SvgProps) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
        >
            <Path
                fill={color}
                opacity={0.5}
                d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22"
            />
            <Path
                fill={color}
                d="M16.03 8.97a.75.75 0 010 1.06l-5 5a.75.75 0 01-1.06 0l-2-2a.75.75 0 111.06-1.06l1.47 1.47 4.47-4.47a.75.75 0 011.06 0"
            />
        </Svg>
    );
};

export default SvgCheck;
