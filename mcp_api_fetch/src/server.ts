import { McpServer, type CallToolResult } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";

import { getWeather } from "../services/WeatherService";
import { CityNotFoundError } from "../Errors/WeatherError";
import { text } from "node:stream/consumers";

const server = new McpServer({
  name: "Weather Tool",
  version: "1.0.0",
});

server.registerTool(
  "get-weather",
  {
    title: "Current Weather",
    description: "Returns the current weather information for a given city.",
    inputSchema: z.object({
      city: z
        .string()
        .describe("The name of the city to retrieve the weather for."),
    }),
  },
  async ({ city }): Promise<CallToolResult> => {
    try {
      const weather = await getWeather(city);

      return {
        content: [
          {
            type: "text",
            text: `
🌍 City         : ${weather.city}
📍 Latitude     : ${weather.lat}
📍 Longitude    : ${weather.lon}

☁ Weather       : ${weather.weather}
📝 Description  : ${weather.description}

🌡 Temperature  : ${weather.temperature} °C
💧 Humidity     : ${weather.humidity} %
💨 Wind Speed   : ${weather.windSpeed} m/s
            `.trim(),
          },
        ],
      };
    } catch (error) {
      if (error instanceof CityNotFoundError) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: error.message,
            },
          ],
        };
      }

      if (error instanceof Error) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: error.message,
            },
          ],
        };
      }

      return {
        isError: true,
        content: [
          {
            type: "text",
            text: "Unknown error occurred.",
          },
        ],
      };
    }
  },
);

server.registerPrompt(
  "weather-summary",
  {
    title: "Weather Summary",
    description: "Creates instructions for presenting weather information.",
    argsSchema: z.object({
      city: z.string(),
    }),
  },
  async ({ city }) => {
    return {
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Please summarize the weather for ${city} in a friendly way. Mention the temperature, humidity, wind speed, and provide suitable clothing advice.`,
          },
        },
        
      ],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.log("✅ Weather MCP Server is running...");
}

main().catch((err) => {
  console.error("❌ Failed to start MCP Server:", err);
  process.exit(1);
});
