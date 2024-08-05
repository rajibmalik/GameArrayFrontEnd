import { Box, Heading } from "@chakra-ui/react";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface Props {
  topGenres: topGenres[];
}

export interface topGenres {
  genre: string;
  totalPlaytime: number;
  totalPlaytimeHours: number;
}

const RadarChartComponent = ({ topGenres }: Props) => {
  const hours = topGenres.map((genre) => genre.totalPlaytimeHours);
  const highestPlaytime = Math.max(...hours);

  const data = topGenres.map((genreData) => ({
    subject: genreData.genre,
    A: genreData.totalPlaytimeHours,
    fullMark: highestPlaytime,
  }));

  return (
    <>
      <Box
        bg="white"
        p="3"
        borderRadius="md"
        boxShadow="md"
        width={"80%"}
        height={"100%"}
      >
        <Heading size={"sm"} textAlign={"center"} color={"black"} pb={1}>
          These are your most played genres
        </Heading>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "black", fontWeight: "bold" }}
              tickSize={17.5}
            />
            <PolarRadiusAxis tick={false} axisLine={false} />
            <Radar
              // Animation does not work as the component is rendered instantly
              // research work around
              animationBegin={400}
              animationDuration={1000}
              name="Playtime"
              dataKey="A"
              fill="#8884d8"
            />
          </RadarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default RadarChartComponent;
