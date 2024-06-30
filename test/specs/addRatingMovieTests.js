import { get, post } from "../utils/api.js";
import { HTTP_STATUS_CODE } from "../utils/httpConstants.js";
import { expect } from "chai";

let selectedMovie;

const getRandomMovie = async () => {
  const response = await get("/top_rated").send().expect(200);
  const movieList = response.body.results;

  if (movieList.length === 0) {
    throw new Error("No movies found");
  }
  const randomIndex = Math.floor(Math.random() * movieList.length);
  const randomMovie = movieList[randomIndex];
  return randomMovie;
};

describe("Add rating movie", () => {

  before("get a random movie", async () => {
    selectedMovie = await getRandomMovie();
  });

  it("should successfully rated a movie", async () => {
    const randomRatingNumber = Math.floor(Math.random() * 10) + 1;
    const rating = { value: randomRatingNumber };
    const response = await post(`/${selectedMovie.id}/rating`)
      .send(rating)
      .expect(HTTP_STATUS_CODE.CREATED);

    expect(response.body.success).to.be.true;
  });

  it("should return an error when the rating is below the minimum value", async () => {
    const rating = 0;
    const response = await post(`/${selectedMovie.id}/rating`)
      .send(rating)
      .expect(HTTP_STATUS_CODE.BAD_REQUEST);

    expect(response.body.success).to.be.false;
    expect(
      response.body.status_message,
      "The expected status is nor valid"
    ).equal("Invalid parameters: Your request parameters are incorrect.");
  });
});
