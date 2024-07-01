import { HTTP_STATUS_CODE } from "../utils/httpConstants.js";
import superTest from "supertest";
import ENV from "../utils/environment.js";

describe("Top rated movies", () => {
  it("should return an error when the user is not authenticated", async () => {
    superTest(ENV.BASE_URL)
      .get("/top_rated")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", "wrongToken")
      .send()
      .expect(HTTP_STATUS_CODE.UNAUTHORIZED);
  });
});
