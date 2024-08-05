import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { UserGame } from "../../hooks/useUserGames";

interface Props {
  userGames: UserGame[];
}

// Custom label for rendering UserGame images on the X axis
// Props provided by recharts
const XAxisLabel = (props: any) => {
  const { x, y, payload } = props;
  const imageUrl = payload.value;

  return (
    <g transform={`translate(${x},${y})`}>
      <image href={imageUrl} x={-50} y={-25} width={100} height={100} />
    </g>
  );
};

// Custom label for rendering playtime above each bar
// Props provided by recharts
const BarLabel = (props: any) => {
  const { x, y, width, value } = props;
  return (
    <text x={x + width / 2} y={y} fill="black" textAnchor="middle" dy={-2}>
      {`${value}`}
    </text>
  );
};

// Props provided by recharts
const BarChartComponent = ({ userGames }: Props) => {
  // Process userGames data for utilising in the BarChart
  const data = userGames.map((userGame) => {
    return {
      name: userGame.name,
      playtimeHours: userGame.playtimeHours,
      image: userGame.headerImage,
    };
  });

  // Custom function to render tooltip content
  // Props provided by recharts
  const renderTooltipContent = (props: any) => {
    const { active, payload } = props;

    if (active && payload && payload.length) {
      const data = payload[0].payload;

      // Returns a styled Chakra box with the name of the game
      return (
        <Box
          bg="white"
          p="2"
          borderWidth={0.5}
          borderColor={"black"}
          textColor={"black"}
        >
          <Text>{data.name}</Text>
        </Box>
      );
    }

    return null;
  };

  return (
    <VStack
      bg="white"
      p="3"
      borderRadius="md"
      boxShadow="md"
      width={"100%"}
      height={"100%"}
    >
      <Heading size={"md"} color={"black"}>
        These are your most played games
      </Heading>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 60,
          }}
        >
          <XAxis dataKey="image" tick={<XAxisLabel />} interval={0}>
            <Label
              value="Top 10 Most Played Games"
              offset={-55}
              position="insideBottom"
              style={{
                textAnchor: "middle",
                fill: "black",
                fontSize: 15,
                fontWeight: "bold",
              }}
            />
          </XAxis>
          <YAxis tick={{ fill: "black" }}>
            <Label
              value="Hours Played"
              angle={-90}
              position={"left"}
              offset={0}
              style={{
                textAnchor: "middle",
                fill: "black",
                fontSize: 15,
                fontWeight: "bold",
              }}
            />
          </YAxis>
          <Tooltip content={renderTooltipContent} />
          <Bar
            dataKey="playtimeHours"
            fill="#8884d8"
            label={<BarLabel />}
          ></Bar>
        </BarChart>
      </ResponsiveContainer>
    </VStack>
  );
};

export default BarChartComponent;
