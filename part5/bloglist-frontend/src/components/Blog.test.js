import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    user: {
      name: "root",
    },
    title: "ZenFein",
    author: "Andrewtio",
    url: "www.zenfein.com",
    likes: 5,
    id: "630cbb6b7fa33829d343e1e6",
  };
  const user = {
    name: "root",
  };

  render(<Blog blog={blog} user={user} />);

  const elementTitleAuthor = screen.getByText("ZenFein Andrewtio");
  const elementURL = screen.queryByText("Url: www.zenfein.com");
  const elementLike = screen.queryByText("Likes: 5");
  expect(elementTitleAuthor).toBeDefined();
  expect(elementURL).toBeNull();
  expect(elementLike).toBeNull();
});

test("blog's URL & number of likes should be shown when the button controlling the shown details has been clicked", async () => {
  const blog = {
    user: {
      name: "root",
    },
    title: "ZenFein",
    author: "Andrewtio",
    url: "www.zenfein.com",
    likes: 5,
    id: "630cbb6b7fa33829d343e1e6",
  };
  const userLogin = {
    name: "root",
  };

  const ShowButton = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
  );

  const mockHandler = jest.fn();

  render(
    <>
      <Blog blog={blog} user={userLogin} />
      <ShowButton handleClick={mockHandler} />
    </>
  );

  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);

  const elementTitleAuthor = screen.getByText("ZenFein Andrewtio");
  const elementURL = screen.queryByText("Url: www.zenfein.com");
  const elementLike = screen.queryByText("Likes: 5");
  expect(elementTitleAuthor).toBeDefined();
  expect(elementURL).toBeDefined();
  expect(elementLike).toBeDefined();
});
