import React from "react";

export const router = {
  replace: jest.fn(),
  push: jest.fn(),
  back: jest.fn(),
};

export const Link = ({
  children,
  href,
  onPress,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  onPress?: () => void;
  [key: string]: unknown;
}) => {
  const { TouchableOpacity, Text } = require("react-native");
  return (
    <TouchableOpacity onPress={onPress} testID={`link-${href}`} {...props}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};
