export type MilestoneStatus =
  | "DRAFT"
  | "PENDING_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "DISPUTED"
  | "RELEASED";

export interface Milestone {
  id: string;
  title: string;
  amount: bigint;
  deadline: string;
  status: MilestoneStatus;
}

export interface ProjectDraft {
  title: string;
  description: string;
  budget: bigint;
  milestones: Array<Pick<Milestone, "title" | "amount" | "deadline">>;
}

export function validateProjectDraft(draft: ProjectDraft): string[] {
  const errors: string[] = [];
  if (draft.title.trim().length < 3)
    errors.push("Project title must be at least 3 characters.");
  if (draft.description.trim().length < 20)
    errors.push("Project description must be at least 20 characters.");
  if (draft.budget <= 0n) errors.push("Budget must be greater than zero.");
  if (draft.milestones.length === 0) errors.push("Add at least one milestone.");
  if (draft.milestones.some((milestone) => milestone.amount <= 0n)) {
    errors.push("Each milestone amount must be greater than zero.");
  }
  const total = draft.milestones.reduce(
    (sum, milestone) => sum + milestone.amount,
    0n,
  );
  if (total !== draft.budget)
    errors.push("Milestone amounts must equal the project budget.");
  return errors;
}

export function formatStroops(amount: bigint): string {
  const whole = amount / 10_000_000n;
  const fraction = (amount % 10_000_000n)
    .toString()
    .padStart(7, "0")
    .replace(/0+$/, "");
  return `${whole.toLocaleString()}${fraction ? `.${fraction}` : ""} XLM`;
}
