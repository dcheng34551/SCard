import Header from "../Header";
import { render, screen } from "@testing-library/react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";
import scardLogo from "../../images/Scard-logo-02.svg";

Enzyme.configure({ adapter: new Adapter() });

describe("Test Header Component", () => {
  const mockProps = {
    currentUser: { email: "test@test.com" },
    match: { params: { cardId: "test" } },
  };

  it("should render right logo image", () => {
    const header = shallow(<Header {...mockProps} />);
    const expectation = header.find(".test").props("src").src;
    expect(expectation).toBe(scardLogo);
  });

  it("should render 登出 in main page", () => {
    render(<Header {...mockProps} type="main" />);
    const linkElement = screen.getByText("登出");
    expect(linkElement).toBeInTheDocument();
  });
});
