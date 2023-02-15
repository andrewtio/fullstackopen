import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("the form calls the event handler it received as props with the right details when a new blog is created", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const inputTitle = screen.getByPlaceholderText("write title here");
  const inputAuthor = screen.getByPlaceholderText("write author here");
  const inputUrl = screen.getByPlaceholderText("write url here");

  const createButton = screen.getByText("Create");

  await user.type(inputTitle, "Testing input title...");
  await user.type(inputAuthor, "Testing input author...");
  await user.type(inputUrl, "Testing input url...");
  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  console.log("createBlog", createBlog.mock.calls[0][0].title);
  expect(createBlog.mock.calls[0][0].title).toBe("Testing input title...");
  expect(createBlog.mock.calls[0][0].author).toBe("Testing input author...");
  expect(createBlog.mock.calls[0][0].url).toBe("Testing input url...");
});
