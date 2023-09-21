import { useController } from "react-hook-form";
import FloatLabel from "./FloatLabel";
import ReactSelect from "./ReactSelect";
import ErrorLabel from "./ErrorLabel";

export default function SelectControl({ control, name, label, opacity, isRequired = false, rules, isMulti = false, ...rest }) {
	const {
		field: { value ="", onChange, ...field },
		fieldState: { error },
	} = useController({
		name,
		control,
		rules: { required: isRequired && `${label} is required`, ...rules },
	});

	return (
		<>
			<FloatLabel label={label} isRequired={isRequired} opacity={opacity} mt="-10px">
				<ReactSelect colorScheme="brand" value={value}  onChange={onChange} isMulti={isMulti} {...field} {...rest} />
				<ErrorLabel>{error?.message}</ErrorLabel>
			</FloatLabel>
		</>
	);
}
