import { render, screen, waitFor } from "@testing-library/react";
import GameGrid from "../../components/library/GameGrid"; // Adjust path as needed
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { server } from "../../mocks/server"; // Adjust path as needed

// Setup mocked server (MSW)
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("GameGrid Component", () => {
  it("displays game data correctly", async () => {
    render(
      <GameGrid
        gameQuery={{
          steamID: "76561197960287930",
          username: "userOne",
          searchText: "",
          genre: "",
          sort: "",
        }}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Game One")).toBeInTheDocument();
      expect(screen.getByText("50%")).toBeInTheDocument();
      expect(screen.getByText("10 hours played")).toBeInTheDocument();
      expect(screen.getByText("Game Two")).toBeInTheDocument();
      expect(screen.getByText("20%")).toBeInTheDocument();
      expect(screen.getByText("20 hours played")).toBeInTheDocument();
      expect(screen.getByText("Game Three")).toBeInTheDocument();
      expect(screen.getByText("5 hours played")).toBeInTheDocument();
      expect(screen.getByText("30%")).toBeInTheDocument();

      const images = screen.getAllByRole("img");
      expect(images).toHaveLength(3);
      expect(images[0]).toHaveAttribute("src", "imageOne");
      expect(images[1]).toHaveAttribute("src", "imageTwo");
      expect(images[2]).toHaveAttribute("src", "imageThree");
    });
  });
});
