// src/components/Icon.tsx
import React from 'react';
import { FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6';
import { RiEmotionHappyLine } from 'react-icons/ri'; // Placeholder for the custom icon

// Map icon names (strings) to the actual component
const iconMap = {
  linkedin: FaLinkedin,
  github: FaGithub,
  x: FaXTwitter,
  custom: RiEmotionHappyLine, // Using a placeholder
};

// Define the props for our component
interface IconProps {
  name: keyof typeof iconMap; // Ensures only valid names are passed
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return null; // Or return a default fallback icon
  }

  return <IconComponent className={className} />;
};

export default Icon;