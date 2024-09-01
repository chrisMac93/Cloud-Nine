import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);

interface CardProps {
  title: string;
  content: string;
  icon: keyof typeof Ionicons.glyphMap;
  className?: string;
}
const Card: React.FC<CardProps> = ({ title, content, icon, className }) => {
  return (
    <StyledView className={`bg-gray-800/50 p-4 rounded-lg shadow-lg mb-4  ${className}`}>
      <StyledView className="flex-row items-center mb-2">
        <Ionicons name={icon} size={24} color="white" />
        <StyledText className="ml-2 text-lg font-bold text-white">{title}</StyledText>
      </StyledView>
      <StyledView className="flex-row items-center">
        <StyledText className="text-base text-white">{content}</StyledText>
      </StyledView>
    </StyledView>
  );
};

export default Card;
