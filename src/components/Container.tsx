import { View, ViewStyle } from "react-native";
import Styles from "../common/Styles";

interface ContainerProps {
  children?: React.ReactNode;
  backgroundColor?: string;
  style?: ViewStyle;
}
export const Container = ({
  children,
  backgroundColor,
  style,
}: ContainerProps) => {
  return (
    <View style={[Styles.container, { backgroundColor }, style]}>{children}</View>
  )
};
