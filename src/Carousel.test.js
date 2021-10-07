import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders on the page", function () {
  // smoke test
  render(<Carousel />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward in carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // move backward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("hides/shows arrows when appropriate", function () {
  const { queryByTestId } = render(<Carousel />);
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");

  // Check that left arrow is hidden on first image but right arrow is shown
  expect(leftArrow).toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  fireEvent.click(rightArrow);

  // Check that both arrows are shown on second image
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  fireEvent.click(rightArrow);

  // Check that the right arrow is hidden on last image but left is shown
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).toHaveClass("hidden");
});
