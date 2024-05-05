import { Control, Controller } from "react-hook-form";
// components
import TextInput from "@/components/input/text-input";

// ----------------------------------------------------------------------

type Props = {
    name: string;
    control: Control;
};

const RHFTextField = ({ name, control, ...other }: Props) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <TextInput
                    value={value}
                    onChangeText={value => onChange(value)}
                    {...other}
                />
            )}
        />
    );
};

export default RHFTextField;
