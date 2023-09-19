import React from "react";
import { Text } from "@chakra-ui/react";
export default function ErrorLabel({ children }) {
	return (
		<Text mt="1" fontSize="sm" color="red.500">
			{children}
		</Text>
	);
}
