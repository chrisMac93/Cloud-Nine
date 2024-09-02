import React from "react";
import { View, Text } from "react-native";
import { styled } from "nativewind";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { convertTo24HourFormat } from "../utils/convertTime";

const StyledView = styled(View);
const StyledText = styled(Text);

interface SunMoonCardProps {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  phase: string;
  className?: string;
}

const SunMoonCard: React.FC<SunMoonCardProps> = ({
  sunrise,
  sunset,
  moonrise,
  moonset,
  phase,
  className,
}) => {
  return (
    <StyledView
      className={`bg-gray-800/50 p-4 rounded-lg shadow-lg mb-4 ${className}`}
    >
      <StyledText className="text-lg font-bold text-white mb-2">
        Sun & Moon
      </StyledText>
      <StyledView className="flex-row justify-between items-center mb-2">
        <MaterialCommunityIcons name="weather-sunny" size={24} color="white" />
        <StyledText className="text-white">12 hrs 58 mins</StyledText>
        <StyledView className="flex-row">
          <StyledText className="text-white mr-2">Rise</StyledText>
          <StyledText className="text-white">
            {convertTo24HourFormat(sunrise)}
          </StyledText>
        </StyledView>
        <StyledView className="flex-row">
          <StyledText className="text-white mr-2">Set</StyledText>
          <StyledText className="text-white">
            {convertTo24HourFormat(sunset)}
          </StyledText>
        </StyledView>
      </StyledView>
      <StyledView className="border-b border-gray-600 my-2" />
      <StyledView className="flex-row justify-between items-center">
        <MaterialCommunityIcons name="weather-night" size={24} color="white" />
        <StyledText className="text-white">{phase}</StyledText>
        <StyledView className="flex-row">
          <StyledText className="text-white mr-2">Rise</StyledText>
          <StyledText className="text-white">
            {convertTo24HourFormat(moonrise)}
          </StyledText>
        </StyledView>
        <StyledView className="flex-row">
          <StyledText className="text-white mr-2">Set</StyledText>
          <StyledText className="text-white">
            {convertTo24HourFormat(moonset)}
          </StyledText>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default SunMoonCard;
