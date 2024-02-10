import { Image, View } from "react-native";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";
// component
import Text from "@/component/typography/text";
// util
import { getCurrencyByUuid } from "@/util/currencies";

type Props = {
    currencyId: string;
    cost: number | string;
    textVariant?: VariantProp<string>
}

const CostPoint = ({ currencyId, cost, textVariant = "titleMedium" }: Props) => {
    return (
        <View className="flex-row gap-2 items-center">
            <Image
                source={getCurrencyByUuid(currencyId)}
                resizeMode="contain"
                style={{ width: 24, height: 24 }}
            />
            <Text variant={textVariant}>
                {cost}
            </Text>
        </View>
    );
};

export default CostPoint;
