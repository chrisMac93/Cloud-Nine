import React from "react";
import { View, Text } from "react-native";
import { styled } from "nativewind";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const StyledView = styled(View);
const StyledText = styled(Text);

interface WeatherOverviewCardProps {
  today: string;
  tonight: string;
  tomorrow: string;
  date: string;
  className?: string;
}

const WeatherOverviewCard: React.FC<WeatherOverviewCardProps> = ({
  today,
  tonight,
  tomorrow,
  date,
  className,
}) => {
  return (
    <StyledView
      className={`bg-gray-900/40 p-4 rounded-lg shadow-lg mb-4 ${className}`}
    >
      <StyledView className="flex-row justify-between items-center mb-2">
        <StyledText className="text-lg font-bold text-white">
          Weather Overview
        </StyledText>
        <StyledText className="text-lg font-bold text-white">{date}</StyledText>
      </StyledView>
      <StyledView className="flex-row items-center mb-2">
        <MaterialCommunityIcons name="weather-sunny" size={24} color="white" />
        <StyledText
          className="text-white ml-2"
          numberOfLines={2}
          ellipsizeMode="tail"
        > Today:{" "} 
          {today}
        </StyledText>
      </StyledView>
      <StyledView className="flex-row items-center mb-2">
        <MaterialCommunityIcons name="weather-night" size={24} color="white" />
        <StyledText
          className="text-white ml-2"
          numberOfLines={2}
          ellipsizeMode="tail"
        > Tonight:{" "}
          {tonight} {" "}
        </StyledText>
      </StyledView>
      <StyledView className="flex-row items-center">
        <MaterialCommunityIcons name="weather-sunny" size={24} color="white" />
        <StyledText
          className="text-white ml-2"
          numberOfLines={2}
          ellipsizeMode="tail"
        > Tomorrow:{" "}
          {tomorrow}
        </StyledText>
      </StyledView>
    </StyledView>
  );
};

export default WeatherOverviewCard;
