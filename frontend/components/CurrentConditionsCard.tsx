import React from "react";
import { View, Text } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

interface CurrentConditionsCardProps {
  temperature: number;
  realFeel: number;
  wind: string;
  windGust: string;
  humidity: number;
  indoorHumidity: string;
  className?: string;
}

const CurrentConditionsCard: React.FC<CurrentConditionsCardProps> = ({
  temperature,
  realFeel,
  wind,
  windGust,
  humidity,
  indoorHumidity,
  className,
}) => {
  return (
    <StyledView
      className={`bg-gray-800/50 p-4 rounded-lg shadow-lg mb-4 ${className}`}
    >
      <StyledText className="text-lg font-bold text-white mb-2">
        Current Conditions
      </StyledText>
      <StyledView className="flex-row justify-between items-center mb-2">
        <StyledText className="text-white">Temperature </StyledText>
        <StyledText className="text-white">{temperature}°</StyledText>
      </StyledView>
      <StyledView className="border-b border-gray-600 my-2" />
      <StyledView className="flex-row justify-between items-center mb-2">
        <StyledText className="text-white">RealFeel </StyledText>
        <StyledText className="text-white">{realFeel}°</StyledText>
      </StyledView>
      <StyledView className="border-b border-gray-600 my-2" />
      <StyledView className="flex-row justify-between items-center mb-2">
        <StyledText className="text-white">Wind </StyledText>
        <StyledText className="text-white">{wind}</StyledText>
      </StyledView>
      <StyledView className="border-b border-gray-600 my-2" />
      <StyledView className="flex-row justify-between items-center mb-2">
        <StyledText className="text-white">Max Wind Gusts </StyledText>
        <StyledText className="text-white">{windGust}{" "}</StyledText>
      </StyledView>
      <StyledView className="border-b border-gray-600 my-2" />
      <StyledView className="flex-row justify-between items-center mb-2">
        <StyledText className="text-white">Humidity </StyledText>
        <StyledText className="text-white">{humidity}%</StyledText>
      </StyledView>
      <StyledView className="border-b border-gray-600 my-2" />
      <StyledView className="flex-row justify-between items-center mb-2">
        <StyledText className="text-white">Indoor Humidity </StyledText>
        <StyledText className="text-white">{indoorHumidity}</StyledText>
      </StyledView>
    </StyledView>
  );
};

export default CurrentConditionsCard;
