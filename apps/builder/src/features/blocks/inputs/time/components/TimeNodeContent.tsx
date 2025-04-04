import { WithVariableContent } from "@/features/graph/components/nodes/block/WithVariableContent";
import { Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  variableId?: string;
};
export const TimeNodeContent = ({ variableId }: Props) => {
  return variableId ? (
    <WithVariableContent variableId={variableId} />
  ) : (
    <Text color={"gray.500"}>Pick a time</Text>
  );
};
