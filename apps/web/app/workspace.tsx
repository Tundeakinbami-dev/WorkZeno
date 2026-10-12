"use client";

import { FormEvent, useMemo, useState } from "react";

type Milestone = {
  title: string;
  amount: string;
  deadline: string;
  status: "Funded" | "Awaiting work" | "Pending review" | "Released";
};

const initialMilestones: Milestone[] = [
  {
    title: "Research and content plan",
    amount: "250",
    deadline: "Nov 04",
    status: "Released",
  },
  {
    title: "Responsive implementation",
    amount: "500",
    deadline: "Nov 15",
    status: "Pending review",
  },
  {
    title: "QA and handover",
    amount: "250",
    deadline: "Nov 22",
    status: "Awaiting work",
  },
];

export function Workspace() {
  const [connected, setConnected] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notice, setNotice] = useState("");
  const [milestones, setMilestones] = useState(initialMilestones);
  const [submission, setSubmission] = useState("");
  const total = useMemo(
    () => milestones.reduce((sum, item) => sum + Number(item.amount), 0),
    [milestones],
  );

  async function createProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: projectTitle, description }),
    });
    if (!response.ok)
      return setNotice(
        "Add a project title (3+ characters) and a description (20+ characters).",
      );
    setNotice(
      `Draft “${projectTitle}” created. Connect a wallet before funding an escrow.`,
    );
    setProjectTitle("");
    setDescription("");
  }

  function submitWork(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submission.trim().length < 8)
      return setNotice("Include a useful work summary or evidence link.");
    setMilestones((current) =>
      current.map((item, index) =>
        index === 1 ? { ...item, status: "Pending review" } : item,
      ),
    );
    setSubmission("");
    setNotice(
      "Work submitted for client review. No payment is marked complete until the contract confirms release.",
    );
  }

  return (
    <>
      <header className="nav">
        <a className="brand" href="#top">
          Work<span>Zeno</span>
        </a>
        <nav>
          <a href="#workflow">How it works</a>
          <a href="#workspace">Workspace</a>
        </nav>
        <button className="wallet" onClick={() => setConnected(!connected)}>
          {connected ? "G…7QX connected" : "Connect testnet wallet"}
        </button>
      </header>
      <section id="top" className="hero">
        <div>
          <p className="eyebrow">STELLAR TESTNET • MILESTONE ESCROW</p>
          <h1>Build trust into every freelance milestone.</h1>
          <p className="lede">
            WorkZeno keeps collaboration off-chain and settlement rules on
            Soroban. Clients fund milestones; freelancers submit work; releases
            require confirmed contract state.
          </p>
          <div className="actions">
            <a className="primary" href="#workspace">
              Open workspace
            </a>
            <a className="secondary" href="#workflow">
              See the workflow
            </a>
          </div>
        </div>
        <aside className="escrow-card">
          <p>
            Escrow balance <span className="tag">ON-CHAIN</span>
          </p>
          <strong>1,000 XLM</strong>
          <small>Stellar testnet • pending wallet connection</small>
          <hr />
          <div>
            <span>Released</span>
            <b>250 XLM</b>
          </div>
          <div>
            <span>Reserved</span>
            <b>750 XLM</b>
          </div>
        </aside>
      </section>
      <section id="workflow" className="steps">
        <article>
          <b>01</b>
          <h2>Agree</h2>
          <p>Set exact milestone amounts, deadlines, and acceptance terms.</p>
        </article>
        <article>
          <b>02</b>
          <h2>Fund</h2>
          <p>
            The client signs a testnet escrow transaction from their own wallet.
          </p>
        </article>
        <article>
          <b>03</b>
          <h2>Deliver</h2>
          <p>
            Freelancers submit evidence; client approval initiates a release.
          </p>
        </article>
      </section>
      <section id="workspace" className="workspace">
        <div className="section-heading">
          <div>
            <p className="eyebrow">DEMO WORKSPACE</p>
            <h2>Atlas Studio website refresh</h2>
            <p>Client: Ada Okafor · Freelancer: Theo Mensah</p>
          </div>
          <span className={connected ? "network ready" : "network"}>
            {connected ? "Wallet connected" : "Wallet not connected"}
          </span>
        </div>
        <div className="grid">
          <div className="panel">
            <h3>Milestones</h3>
            {milestones.map((milestone) => (
              <div className="milestone" key={milestone.title}>
                <div>
                  <b>{milestone.title}</b>
                  <small>Due {milestone.deadline}</small>
                </div>
                <div className="right">
                  <b>{milestone.amount} XLM</b>
                  <span
                    className={`status ${milestone.status.toLowerCase().replaceAll(" ", "-")}`}
                  >
                    {milestone.status}
                  </span>
                </div>
              </div>
            ))}
            <div className="total">
              <span>Total agreement</span>
              <b>{total} XLM</b>
            </div>
          </div>
          <div className="panel">
            <h3>Submit milestone work</h3>
            <p className="muted">
              Describe the completed work or link evidence. Evidence itself
              stays off-chain.
            </p>
            <form onSubmit={submitWork}>
              <label htmlFor="evidence">Submission details</label>
              <textarea
                id="evidence"
                value={submission}
                onChange={(event) => setSubmission(event.target.value)}
                placeholder="Delivered responsive page at https://…"
              />
              <button className="primary" type="submit">
                Submit for review
              </button>
            </form>
          </div>
          <div className="panel">
            <h3>Create a project draft</h3>
            <form onSubmit={createProject}>
              <label htmlFor="title">Project title</label>
              <input
                id="title"
                value={projectTitle}
                onChange={(event) => setProjectTitle(event.target.value)}
              />
              <label htmlFor="description">Brief</label>
              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <button className="primary" type="submit">
                Save draft
              </button>
            </form>
          </div>
        </div>
        {notice && (
          <p className="notice" role="status">
            {notice}
          </p>
        )}
        <p className="disclaimer">
          Demo mode: this interface does not submit wallet transactions or
          represent a deployed contract. Testnet assets have no monetary value.
        </p>
      </section>
    </>
  );
}
