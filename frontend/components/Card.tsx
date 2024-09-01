// components/Card.tsx
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
    <StyledView className={`p-4 bg-white/10 rounded-lg shadow-lg mt-4 ${className}`}>
      <StyledView className="flex-row items-center mb-2">
        <Ionicons name={icon} size={24} color="white" />
        <StyledText className="text-lg font-bold text-white ml-2">{title}</StyledText>
      </StyledView>
      <StyledView className="rounded p-3">
        <StyledText className="text-white">{content}</StyledText>
      </StyledView>
    </StyledView>
  );
};

export default Card;
