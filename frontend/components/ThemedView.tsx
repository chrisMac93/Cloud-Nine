import { View, type ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  gradient?: boolean; // Add gradient prop
};

export function ThemedView({ style, lightColor, darkColor, gradient, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  if (gradient) {
    return (
      <LinearGradient
        colors={[backgroundColor, '#000']} // Example gradient from background color to black
        style={[{ flex: 1 }, style]}
        {...otherProps}
      />
    );
  }

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}