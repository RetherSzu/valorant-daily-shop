import React from "react";
import { Skeleton } from "moti/skeleton";
import { DimensionValue } from "react-native";

type SkeletonProps = {
    width?: DimensionValue;
    height?: DimensionValue;
    radius?: number | "square" | "round";
};

const DarkSkeleton = React.memo(({ width = 32, height = 32, radius = 0 }: SkeletonProps) => (
    <Skeleton colorMode="dark" width={width} height={height} radius={radius} />
));

export default DarkSkeleton;
