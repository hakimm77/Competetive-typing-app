import { Input } from "@chakra-ui/react";
import { useState } from "react";

export const TypingInput = ({
  storeCurrentText,
  currentText,
}: {
  storeCurrentText: (text: string, keyCode: number | undefined) => void;
  currentText: string;
}) => {
  const [keyCode, setKeyCode] = useState<number>();

  const onType = (e: any) => {
    let text = e.target.value;

    storeCurrentText(text, keyCode);
  };

  return (
    <Input
      width="40%"
      borderBottomWidth={2}
      borderColor="#6B7280"
      outline="none"
      color="#fff"
      onChange={onType}
      onKeyDown={(e: any) => {
        setKeyCode(e.keyCode);
      }}
      value={currentText}
    />
  );
};
