import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg";

const SvgUsers = ({ color = "#484C56", width = 24, height = 24 }: SvgProps) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
        >
            <Path
                fill={color}
                d="M2 22a8 8 0 1116 0h-2a6 6 0 00-12 0zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6m0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m8.284 3.703A8 8 0 0123 22h-2a6 6 0 00-3.537-5.473zm-.688-11.29A5.5 5.5 0 0121 8.5a5.5 5.5 0 01-5 5.478v-2.013a3.5 3.5 0 001.041-6.609z"
            />
        </Svg>
    )
}

export default SvgUsers
