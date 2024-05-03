import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const SvgEyeSlash = ({ color = "#484C56", width = 24, height = 25 }: SvgProps) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 24 25"
            fill="none"
        >
            <Path
                fill={color}
                fillRule="evenodd"
                d="M1.606 6.08a1 1 0 011.313.526L2 7l.92-.394v-.001c0-.001 0 0 0 0l.003.009.021.045c.02.042.051.108.094.194.086.172.219.424.4.729a13.37 13.37 0 001.67 2.237 11.966 11.966 0 00.59.592C7.18 11.8 9.251 13 12 13a8.706 8.706 0 003.22-.602c1.227-.483 2.254-1.21 3.096-1.998a13.053 13.053 0 002.733-3.725l.027-.058.005-.011a1 1 0 011.838.788L22 7l.92.394-.003.005-.004.008-.011.026-.04.087a14.045 14.045 0 01-.741 1.348 15.368 15.368 0 01-1.711 2.256l.797.797a1 1 0 01-1.414 1.415l-.84-.84a11.81 11.81 0 01-1.897 1.256l.782 1.202a1 1 0 11-1.676 1.091l-.986-1.514c-.679.208-1.404.355-2.176.424V16.5a1 1 0 01-2 0v-1.544c-.775-.07-1.5-.217-2.177-.425l-.985 1.514a1 1 0 01-1.676-1.09l.782-1.203c-.7-.37-1.332-.8-1.897-1.257l-.84.84a1 1 0 01-1.414-1.414l.797-.797a15.406 15.406 0 01-1.87-2.519 13.457 13.457 0 01-.591-1.107 5.418 5.418 0 01-.033-.072l-.01-.021-.002-.007-.001-.002v-.001C1.08 7.395 1.08 7.394 2 7l-.919.395a1 1 0 01.525-1.314"
                clipRule="evenodd"
            />
        </Svg>
    );
};

export default SvgEyeSlash;
