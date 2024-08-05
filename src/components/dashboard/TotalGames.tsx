import {
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  StatHelpText,
  Icon as ChakraIcon,
} from "@chakra-ui/react";

import { IconType } from "react-icons";

interface Props {
  label: string;
  number: number;
  helpText?: string;
  icon?: IconType;
}

const TotalGames = ({ label, number, helpText, icon: Icon }: Props) => {
  return (
    <Card width="100%" height="100%">
      <CardBody textColor={"black"}>
        <Flex
          textAlign={"center"}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stat>
            <StatLabel fontWeight={"bold"} fontSize={"md"}>
              {label}
            </StatLabel>
            <StatNumber>{number}</StatNumber>
            <StatHelpText fontWeight={"bold"}>{helpText}</StatHelpText>
            {Icon && <ChakraIcon as={Icon} w={6} h={6} />}
          </Stat>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default TotalGames;
