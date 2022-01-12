import { screen, render } from "@testing-library/react";
import TemplateListContainer from ".";

describe("<TemplateListContainer />", () => {
  test("renders the default and user templates section", async () => {
    render(<TemplateListContainer />);

    expect(screen.getByText("Default Templates")).toBeInTheDocument();
    expect(screen.getByText("User Templates")).toBeInTheDocument();
  });
});
