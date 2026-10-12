import { describe, expect, it } from "vitest";
import { validateProjectDraft } from "./index";

describe("validateProjectDraft", () => {
  it("accepts a budget reconciled to milestones", () => {
    expect(
      validateProjectDraft({
        title: "Landing page refresh",
        description: "Design and implement a responsive landing page refresh.",
        budget: 300000000n,
        milestones: [
          { title: "Design", amount: 100000000n, deadline: "2026-11-01" },
          { title: "Build", amount: 200000000n, deadline: "2026-11-15" },
        ],
      }),
    ).toEqual([]);
  });

  it("rejects mismatched financial totals", () => {
    expect(
      validateProjectDraft({
        title: "Bad",
        description: "Too short",
        budget: 20n,
        milestones: [],
      }),
    ).toContain("Milestone amounts must equal the project budget.");
  });
});
