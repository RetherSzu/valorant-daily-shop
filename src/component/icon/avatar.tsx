import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const SvgAvatar = ({ color = "#484C56", width = 24, height = 24 }: SvgProps) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 24 25"
            fill="none"
        >
            <Path
                d="M12 12.75A5.257 5.257 0 016.75 7.5 5.257 5.257 0 0112 2.25a5.257 5.257 0 015.25 5.25A5.257 5.257 0 0112 12.75zm0-10A4.76 4.76 0 007.25 7.5 4.76 4.76 0 0012 12.25a4.76 4.76 0 004.75-4.75A4.76 4.76 0 0012 2.75zM20.59 22.75a.256.256 0 01-.25-.25c0-3.826-3.856-6.75-8.34-6.75s-8.34 2.924-8.34 6.75c0 .134-.116.25-.25.25a.256.256 0 01-.25-.25c0-3.91 3.875-7.25 8.84-7.25s8.84 3.34 8.84 7.25c0 .134-.116.25-.25.25z"
                fill={color}
                stroke={color}
            />
        </Svg>
    );
};

export default SvgAvatar;
