import React from "react";
import { View, Text } from "react-native";
import { styled } from "nativewind";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const StyledView = styled(View);
const StyledText = styled(Text);

interface PollenLevelsCardProps {
  pollenData: {
    Name: string;
    Category: string;
    Text?: string;
  }[];
  className?: string;
}

const PollenLevelsCard: React.FC<PollenLevelsCardProps> = ({
  pollenData,
  className,
}) => {
  return (
    <StyledView
      className={`bg-gray-800/50 p-4 rounded-lg shadow-lg mb-4 ${className}`}
    >
      <StyledText className="text-lg font-bold text-white mb-2">
        Allergy Outlook
      </StyledText>
      {pollenData.map((pollen, index) => (
        <StyledView
          key={index}
          className="flex-row justify-between items-center mb-2"
        >
          <MaterialCommunityIcons name="leaf" size={24} color="white" />
          <StyledText className="text-white">{pollen.Name}</StyledText>
          <StyledText className="text-white">{pollen.Category}</StyledText>
        </StyledView>
      ))}
    </StyledView>
  );
};

export default PollenLevelsCard;
