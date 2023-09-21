import { FormControl, FormLabel, Text } from "@chakra-ui/react";

export default function FloatLabel({ label, children, isRequired = false, opacity = 1}) {
	return (
		<FormControl pos="relative" opacity={opacity}>
			<FormLabel fontWeight="semibold" position="absolute" top="-3" insetStart="3" bg="white" zIndex={2} px="0.3rem">
				{label}{" "}
				{isRequired && (
					<Text as="b" color="red.400" opacity={opacity}>
						*
					</Text>
				)}
			</FormLabel>
			{children}
		</FormControl>
	);
}
