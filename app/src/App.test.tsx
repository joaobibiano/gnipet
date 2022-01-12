import { render } from "@testing-library/react";
import App from "./App";
import MockAdapter from "axios-mock-adapter";
import { Api } from "./services/Api";

const mockedClient = new MockAdapter(Api);

test("renders without crashing", () => {
  mockedClient.onGet(`/default-templates?lang=en`).reply(200, []);

  render(<App />);
});
