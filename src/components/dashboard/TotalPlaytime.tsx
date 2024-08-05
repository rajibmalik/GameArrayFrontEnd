import {
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  StatHelpText,
  Icon as ChakraIcon,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { IconType } from "react-icons";

interface Props {
  label: string;
  number: number;
  helpText?: string;
  icon?: IconType;
}

const TotalPlaytime = ({ label, number, icon: Icon }: Props) => {
  const [showHours, setShowHours] = useState(true);

  const displayNumber = showHours ? number : Math.round(number / 24);
  const unit = showHours ? "hours" : "days";

  return (
    <Tooltip label={`Click to switch to ${showHours ? "days" : "hours"}`}>
      <Card
        width="100%"
        height="100%"
        _hover={{
          transform: "scale(1.10) ",
        }}
        cursor={"pointer"}
        onClick={() => setShowHours(!showHours)}
      >
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
              <StatNumber>{displayNumber}</StatNumber>
              <StatHelpText fontWeight={"bold"}>{unit}</StatHelpText>
              {Icon && <ChakraIcon as={Icon} w={6} h={6} />}
            </Stat>
          </Flex>
        </CardBody>
      </Card>
    </Tooltip>
  );
};

export default TotalPlaytime;
