import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const SvgLogout = ({ color = "#292D32", width = 24, height = 24 }: SvgProps) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
        >
            <Path
                fill={color}
                fillRule="evenodd"
                d="M1.625 12c0 .414.336.75.75.75h10.973l-1.961 1.68a.75.75 0 10.976 1.14l3.5-3a.75.75 0 000-1.14l-3.5-3a.75.75 0 10-.976 1.14l1.96 1.68H2.376a.75.75 0 00-.75.75"
                clipRule="evenodd"
            />
            <Path
                fill={color}
                d="M9.375 9.75h.378a2.25 2.25 0 013.586-2.458l3.5 3a2.25 2.25 0 010 3.416l-3.5 3a2.25 2.25 0 01-3.586-2.458h-.378V16c0 2.828 0 4.243.879 5.121.878.879 2.293.879 5.121.879h1c2.828 0 4.243 0 5.121-.879.879-.878.879-2.293.879-5.121V8c0-2.828 0-4.243-.879-5.121C20.618 2 19.203 2 16.375 2h-1c-2.828 0-4.243 0-5.121.879-.879.878-.879 2.293-.879 5.121z"
            />
        </Svg>
    );
};

export default SvgLogout;
