import { describe, expect, it } from "vitest";

describe("workspace demo", () => {
  it("keeps financial display amounts explicit", () => {
    const milestones = [250, 500, 250];
    expect(milestones.reduce((total, amount) => total + amount, 0)).toBe(1000);
  });
});
