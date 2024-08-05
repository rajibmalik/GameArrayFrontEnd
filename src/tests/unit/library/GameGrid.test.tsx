import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import useUserGames from "../../../hooks/useUserGames";
import GameGrid from "../../../components/library/GameGrid";

// import GameCard from "../../../hooks/useUserGames";

vi.mock("../../../hooks/useUserGames");

describe("GameGrid", () => {
  it("correctly renders game card data for one GameCard", () => {
    const mockGame = [
      {
        appid: "1",
        name: "GameOne",
        playtimeHours: 10,
        headerImage: "imageOne.jpg",
        totalAchievements: 100,
        acquiredAchievements: 20,
      },
    ];

    vi.mocked(useUserGames).mockReturnValue({
      userGames: mockGame,
      error: "",
      isLoading: false,
    });

    render(
      <GameGrid
        gameQuery={{
          steamID: "123",
          username: "userOne",
          searchText: "",
          genre: "",
          sort: "",
        }}
      />
    );

    expect(screen.getByText("GameOne")).toBeInTheDocument();
    expect(screen.getByText("10 hours played")).toBeInTheDocument();
    expect(screen.getByText("20%")).toBeInTheDocument();
    const image = screen.getByRole("img") as HTMLImageElement;
    expect(image).toHaveAttribute("src", "imageOne.jpg");
  });
  it("correctly renders game card data for two GameCards", () => {
    const mockGames = [
      {
        appid: "1",
        name: "GameOne",
        playtimeHours: 10,
        headerImage: "imageOne.jpg",
        totalAchievements: 100,
        acquiredAchievements: 20,
      },
      {
        appid: "2",
        name: "GameTwo",
        playtimeHours: 15,
        headerImage: "imageTwo.jpg",
        totalAchievements: 100,
        acquiredAchievements: 30,
      },
    ];

    vi.mocked(useUserGames).mockReturnValue({
      userGames: mockGames,
      error: "",
      isLoading: false,
    });

    render(
      <GameGrid
        gameQuery={{
          steamID: "123",
          username: "userOne",
          searchText: "",
          genre: "",
          sort: "",
        }}
      />
    );

    const names = screen.getAllByRole("heading");
    const images = screen.getAllByRole("img");
    // regex as unable to use getAllByRole for Badge component
    const badges = screen.getAllByText(/hours played/);
    expect(screen.getByText("20%")).toBeInTheDocument();
    expect(screen.getByText("30%")).toBeInTheDocument();

    mockGames.forEach((game, index) => {
      expect(names[index]).toHaveTextContent(game.name);
      expect(images[index]).toHaveAttribute("src", game.headerImage);
      expect(badges[index]).toHaveTextContent(
        `${game.playtimeHours} hours played`
      );
    });
  });

  it("correctly renders the loading Spinner", () => {
    const mockGames = [
      {
        appid: "1",
        name: "GameOne",
        playtimeHours: 10,
        headerImage: "imageOne.jpg",
        totalAchievements: 100,
        acquiredAchievements: 20,
      },
    ];

    vi.mocked(useUserGames).mockReturnValue({
      userGames: mockGames,
      error: "",
      isLoading: true,
    });

    render(
      <GameGrid
        gameQuery={{
          steamID: "123",
          username: "userOne",
          searchText: "",
          genre: "",
          sort: "",
        }}
      />
    );

    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("correctly renders the error message", () => {
    const mockGames = [
      {
        appid: "1",
        name: "GameOne",
        playtimeHours: 10,
        headerImage: "imageOne.jpg",
        totalAchievements: 100,
        acquiredAchievements: 20,
      },
    ];

    vi.mocked(useUserGames).mockReturnValue({
      userGames: mockGames,
      error: "An error occured",
      isLoading: false,
    });

    render(
      <GameGrid
        gameQuery={{
          steamID: "123",
          username: "userOne",
          searchText: "",
          genre: "",
          sort: "",
        }}
      />
    );

    expect(screen.getByText("An error occured")).toBeInTheDocument();
  });
});
