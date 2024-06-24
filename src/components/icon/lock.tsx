import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const SvgLock = ({ color = "#484C56", width = 24, height = 24 }: SvgProps) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
        >
            <Path
                fill={color}
                opacity={0.5}
                d="M2 16c0-2.828 0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16"
            />
            <Path
                fill={color}
                d="M6.75 8a5.25 5.25 0 0110.5 0v2.004c.567.005 1.064.018 1.5.05V8a6.75 6.75 0 00-13.5 0v2.055a23.57 23.57 0 011.5-.051z"
            />
        </Svg>
    );
};

export default SvgLock;
