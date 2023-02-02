import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
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
