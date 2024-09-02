import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface AirQualityCardProps {
  index: number;
  category: string;
  pollutants: {
    pm25: number;
    pm10: number;
    o3: number;
    no2: number;
    so2: number;
    co: number;
  };
  className?: string;
}

const AirQualityCard: React.FC<AirQualityCardProps> = ({
  index,
  category,
  pollutants,
  className,
}) => {
  return (
    <StyledView
      className={`bg-gray-800/50 p-4 rounded-lg shadow-lg mb-4 ${className}`}
    >
      <StyledView className="flex-row justify-between items-center mb-2">
        <StyledText className="text-lg font-bold text-white">
          Air Quality
        </StyledText>
        <StyledText className="text-lg font-bold text-white">
          {category}
        </StyledText>
      </StyledView>
      <StyledText className="text-white mb-4">
        The air quality is generally acceptable for most individuals. 
        However, sensitive groups may experience minor to moderate symptoms from long-term exposure .
      </StyledText>
      <StyledTouchableOpacity className="bg-gray-700 p-2 rounded-lg flex-row items-center justify-center">
        <StyledText className="text-white mr-2">See More </StyledText>
        <MaterialCommunityIcons name="arrow-right" size={16} color="white" />
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default AirQualityCard;
