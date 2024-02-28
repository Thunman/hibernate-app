import { StatusBar } from "expo-status-bar";
import { Container } from "./styles/appStyles";
import { Alert, Text } from "react-native";
import { useEffect } from "react";

export default function App() {
	const hibernateMyPC = async () => {
		try {
			const response = await fetch(
				"http://192.168.50.225:1986/execute-command",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						command: "shutdown -h",
					}),
				}
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			Alert.alert(data.message);
		} catch (error) {
			console.error(
				"There was a problem with the fetch operation: " + error
			);
		}
	};
	useEffect(() => {
		hibernateMyPC();
	}, []);

	return (
		<Container>
			<Text>Good Night</Text>
			<StatusBar style="auto" />
		</Container>
	);
}
