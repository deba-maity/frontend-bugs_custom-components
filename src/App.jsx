import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const API_SHAPE_RESPONSE = {
  results: [
    { id: "inv-1", label: "Invoice sync issue" },
    { id: "web-2", label: "Webhook replay queue" },
    { id: "crm-3", label: "CRM import timeout" }
  ]
};

const SEARCH_INDEX = [
  "Client portal",
  "Cloud migration",
  "Customer dashboard",
  "Debug audit",
  "Design system",
  "Invoice tracker",
  "Internal tools",
  "Latency triage",
  "Observability panel",
  "Token refresh flow"
];

const PAGINATION_DATA = {
  engineering: [
    "Auth service logs",
    "React profiler pass",
    "Retry queue dashboard",
    "Feature flag cleanup",
    "Build cache report",
    "Incident timeline"
  ],
  sales: [
    "Proposal template",
    "Lead scoring rules",
    "Contract reminder flow",
    "CRM enrichment jobs",
    "Follow-up queue",
    "Renewal forecast"
  ],
  support: [
    "Escalation matrix",
    "Ticket health monitor",
    "CSAT breakdown",
    "Macro coverage",
    "Refund review queue",
    "Help center audit"
  ]
};

const TABLE_ROWS = [
  { name: "Acme Corp", priority: "High", score: 94, status: "Active" },
  { name: "Northwind", priority: "Medium", score: 82, status: "Pilot" },
  { name: "Helio Labs", priority: "High", score: 91, status: "Active" },
  { name: "Sunset Ops", priority: "Low", score: 67, status: "Paused" },
  { name: "Juniper Studio", priority: "Medium", score: 86, status: "Pilot" },
  { name: "Vector Works", priority: "High", score: 89, status: "Active" },
  { name: "Mono Health", priority: "Low", score: 72, status: "Review" },
  { name: "Bridge Retail", priority: "Medium", score: 80, status: "Active" }
];

const MULTISELECT_OPTIONS = [
  "React",
  "TypeScript",
  "Node.js",
  "Accessibility",
  "API Integrations",
  "Debugging",
  "Tables",
  "Forms"
];

const FILE_SAMPLES = [
  { name: "project-brief.pdf", type: "application/pdf", size: 240_000 },
  { name: "project-brief.pdf.exe", type: "application/x-msdownload", size: 120_000 },
  { name: "hero-banner.png", type: "image/png", size: 5_800_000 }
];

function App() {
  const [activeArea, setActiveArea] = useState("bugs");
  const [activeBugId, setActiveBugId] = useState("api-shape");
  const [activeShowcaseId, setActiveShowcaseId] = useState("multiselect");

  const activeBug = BUG_DEMOS.find((bug) => bug.id === activeBugId);
  const activeShowcase = SHOWCASE_DEMOS.find((showcase) => showcase.id === activeShowcaseId);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Freelance Portfolio App</p>
          <h1>DebugBoard</h1>
          <p className="lead">
            A hands-on portfolio surface for showcasing debugging instincts, API edge-case handling, and production-ready UI work.
          </p>
        </div>
        <div className="stats-grid" aria-label="project highlights">
          <StatCard label="Bug Demos" value="10" detail="Broken and fixed states" />
          <StatCard label="Component Comparisons" value="5" detail="Basic vs advanced patterns" />
          <StatCard label="Focus" value="UI + Logic" detail="Real-world frontend/backend failures" />
        </div>
      </header>

      <nav className="section-tabs" aria-label="Primary navigation">
        <button
          type="button"
          className={activeArea === "bugs" ? "section-tab active" : "section-tab"}
          onClick={() => setActiveArea("bugs")}
        >
          Bug Playground
        </button>
        <button
          type="button"
          className={activeArea === "showcase" ? "section-tab active" : "section-tab"}
          onClick={() => setActiveArea("showcase")}
        >
          Custom Components Showcase
        </button>
      </nav>

      {activeArea === "bugs" ? (
        <DetailWorkspace
          title="Bug Playground"
          description="Each demo recreates a bug clients actually run into, then walks through the fix with a live toggle and focused code."
          items={BUG_DEMOS}
          activeId={activeBugId}
          onSelect={setActiveBugId}
          renderDetail={() => <BugDetail bug={activeBug} />}
        />
      ) : (
        <DetailWorkspace
          title="Component Comparisons"
          description="These side-by-side examples make the jump from bare-bones UI to reusable, scalable components visible."
          items={SHOWCASE_DEMOS}
          activeId={activeShowcaseId}
          onSelect={setActiveShowcaseId}
          renderDetail={() => <ShowcaseDetail showcase={activeShowcase} />}
        />
      )}
    </div>
  );
}

function StatCard({ label, value, detail }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

function DetailWorkspace({ title, description, items, activeId, onSelect, renderDetail }) {
  return (
    <section className="workspace-band">
      <div className="workspace-header">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="workspace-grid">
        <aside className="item-nav">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={activeId === item.id ? "item-nav-button active" : "item-nav-button"}
              onClick={() => onSelect(item.id)}
            >
              <span className="item-index">{String(index + 1).padStart(2, "0")}</span>
              <span>
                <strong>{item.title}</strong>
                <small>{item.subtitle}</small>
              </span>
            </button>
          ))}
        </aside>
        <div className="detail-panel">{renderDetail()}</div>
      </div>
    </section>
  );
}

function BugDetail({ bug }) {
  const [mode, setMode] = useState("broken");

  useEffect(() => {
    setMode("broken");
  }, [bug.id]);

  const DemoComponent = bug.component;

  return (
    <div className="detail-stack">
      <div className="detail-header">
        <div>
          <div className="detail-heading-line">
            <h3>{bug.title}</h3>
            <span className="status-chip">{bug.subtitle}</span>
          </div>
          <p>{bug.problem}</p>
        </div>
        <div className="mode-toggle" role="tablist" aria-label="Broken or fixed">
          <button
            type="button"
            className={mode === "broken" ? "mode-button active" : "mode-button"}
            onClick={() => setMode("broken")}
          >
            Broken
          </button>
          <button
            type="button"
            className={mode === "fixed" ? "mode-button active" : "mode-button"}
            onClick={() => setMode("fixed")}
          >
            Fixed
          </button>
        </div>
      </div>

      <div className="demo-grid">
        <Card title="Live Demo" subtitle={mode === "broken" ? "Bug reproduced" : "Fix applied"}>
          <DemoComponent mode={mode} />
        </Card>
        <Card title="Root Cause + Fix" subtitle="Portfolio-ready explanation">
          <div className="explanation-block">
            <strong>Root cause</strong>
            <p>{bug.rootCause}</p>
          </div>
          <div className="explanation-block">
            <strong>Fix</strong>
            <p>{bug.fix}</p>
          </div>
        </Card>
      </div>

      <Card title="Highlighted Fix Snippet" subtitle="Focused on the repair">
        <CodeBlock code={bug.code} />
      </Card>
    </div>
  );
}

function ShowcaseDetail({ showcase }) {
  const DemoComponent = showcase.component;

  return (
    <div className="detail-stack">
      <div className="detail-header">
        <div>
          <div className="detail-heading-line">
            <h3>{showcase.title}</h3>
            <span className="status-chip neutral">{showcase.subtitle}</span>
          </div>
          <p>{showcase.description}</p>
        </div>
      </div>
      <DemoComponent />
    </div>
  );
}

function Card({ title, subtitle, children, className = "" }) {
  return (
    <section className={className ? `card ${className}` : "card"}>
      <div className="card-header">
        <div>
          <h4>{title}</h4>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>
      <div className="card-body">{children}</div>
    </section>
  );
}

function CodeBlock({ code }) {
  return (
    <pre className="code-block">
      <code>{code}</code>
    </pre>
  );
}

function LogList({ items }) {
  return (
    <ul className="log-list">
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  );
}

function Badge({ tone = "neutral", children }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

function ApiShapeMismatchDemo({ mode }) {
  const [status, setStatus] = useState("loading");
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setStatus("loading");
    setItems([]);
    setError("");

    const timer = window.setTimeout(() => {
      try {
        if (mode === "broken") {
          const normalized = API_SHAPE_RESPONSE.data.items.map((item) => item.label);
          setItems(normalized);
        } else {
          const normalized = API_SHAPE_RESPONSE.results.map((item) => item.label);
          setItems(normalized);
        }

        setStatus("done");
      } catch (issue) {
        setStatus("error");
        setError(issue.message);
      }
    }, 450);

    return () => window.clearTimeout(timer);
  }, [mode]);

  return (
    <div className="demo-stack">
      <div className="payload-box">
        <strong>Mock payload</strong>
        <span>{`{ results: [{ id, label }, ...] }`}</span>
      </div>
      {status === "loading" ? <p className="muted">Fetching demo payload...</p> : null}
      {status === "error" ? <Badge tone="danger">{error}</Badge> : null}
      {items.length > 0 ? (
        <div className="token-grid">
          {items.map((item) => (
            <span key={item} className="token-pill">
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MissingDropdownValueDemo({ mode }) {
  const [selected, setSelected] = useState("archived");
  const apiOptions = [
    { value: "open", label: "Open" },
    { value: "in-review", label: "In review" }
  ];

  const options =
    mode === "broken"
      ? apiOptions
      : [
          ...apiOptions,
          ...(apiOptions.some((option) => option.value === selected)
            ? []
            : [{ value: selected, label: "Archived (from saved record)" }])
        ];

  return (
    <div className="demo-stack">
      <label className="field-label" htmlFor="status-select">
        Ticket status
      </label>
      <select id="status-select" value={selected} onChange={(event) => setSelected(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p className="muted">
        Saved value: <strong>{selected}</strong>
      </p>
      {mode === "broken" ? (
        <Badge tone="warning">The API omitted "archived", so the control cannot represent the saved state.</Badge>
      ) : (
        <Badge tone="success">The UI preserves missing values until the user intentionally changes them.</Badge>
      )}
    </div>
  );
}

function RaceConditionDemo({ mode }) {
  const delays = { alpha: 950, beta: 250, gamma: 600 };
  const labels = {
    alpha: "Billing dashboard",
    beta: "Client portal",
    gamma: "Ops monitor"
  };
  const [activeKey, setActiveKey] = useState("alpha");
  const [displayedKey, setDisplayedKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [logItems, setLogItems] = useState([]);
  const requestIdRef = useRef(0);
  const timeoutRef = useRef([]);

  const pushLog = (message) => {
    setLogItems((current) => [...current, message].slice(-6));
  };

  const clearTimers = () => {
    timeoutRef.current.forEach((timer) => window.clearTimeout(timer));
    timeoutRef.current = [];
  };

  const loadProject = (key) => {
    setActiveKey(key);
    setLoading(true);
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    pushLog(`Request ${requestId}: fetching ${labels[key]}`);

    const timer = window.setTimeout(() => {
      if (mode === "fixed" && requestId !== requestIdRef.current) {
        pushLog(`Request ${requestId}: ignored stale response`);
        return;
      }

      setDisplayedKey(key);
      setLoading(false);
      pushLog(`Request ${requestId}: painted ${labels[key]}`);
    }, delays[key]);

    timeoutRef.current.push(timer);
  };

  const runOverlap = () => {
    clearTimers();
    setLogItems([]);
    setDisplayedKey("");
    requestIdRef.current = 0;
    loadProject("alpha");
    const timer = window.setTimeout(() => loadProject("beta"), 120);
    timeoutRef.current.push(timer);
  };

  useEffect(() => {
    setActiveKey("alpha");
    setDisplayedKey("");
    setLoading(false);
    setLogItems([]);
    requestIdRef.current = 0;
    clearTimers();

    return () => clearTimers();
  }, [mode]);

  return (
    <div className="demo-stack">
      <div className="button-row">
        {Object.keys(labels).map((key) => (
          <button key={key} type="button" className="secondary-button" onClick={() => loadProject(key)}>
            Load {labels[key]}
          </button>
        ))}
        <button type="button" className="primary-button" onClick={runOverlap}>
          Run overlapping requests
        </button>
      </div>
      <div className="demo-metrics">
        <Badge tone="neutral">Last selected: {labels[activeKey]}</Badge>
        <Badge tone={displayedKey === activeKey ? "success" : "warning"}>
          Showing: {displayedKey ? labels[displayedKey] : "No data yet"}
        </Badge>
        {loading ? <Badge tone="neutral">Pending</Badge> : null}
      </div>
      <LogList items={logItems} />
    </div>
  );
}

function InfiniteRerenderDemo({ mode }) {
  const [status, setStatus] = useState("open");
  const [loopCount, setLoopCount] = useState(0);

  const derivedQuery = useMemo(() => `status=${status}`, [status]);

  useEffect(() => {
    setLoopCount(0);
  }, [mode, status]);

  useEffect(() => {
    if (mode !== "broken") {
      return undefined;
    }

    if (loopCount >= 12) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setLoopCount((count) => count + 1);
      setStatus((current) => current);
    }, 80);

    return () => window.clearTimeout(timer);
  }, [mode, loopCount]);

  return (
    <div className="demo-stack">
      <label className="field-label" htmlFor="render-select">
        Active filter
      </label>
      <select id="render-select" value={status} onChange={(event) => setStatus(event.target.value)}>
        <option value="open">Open</option>
        <option value="review">Review</option>
        <option value="done">Done</option>
      </select>
      <div className="demo-metrics">
        <Badge tone="neutral">Derived query: {derivedQuery}</Badge>
        <Badge tone={mode === "broken" ? "danger" : "success"}>
          Effect cycles: {mode === "broken" ? loopCount : 1}
        </Badge>
      </div>
      <p className="muted">
        {mode === "broken"
          ? "A state-writing effect keeps firing after each render. The demo caps the loop so the page stays usable."
          : "The fixed version derives the query from state instead of storing derived data in another effect."}
      </p>
    </div>
  );
}

function DynamicFormValidationDemo({ mode }) {
  const initialContacts = [
    { id: 1, type: "Billing", email: "" },
    { id: 2, type: "Support", email: "support@client.dev" }
  ];
  const [contacts, setContacts] = useState(initialContacts);
  const [errors, setErrors] = useState({});
  const idRef = useRef(3);

  useEffect(() => {
    setContacts(initialContacts);
    setErrors({});
    idRef.current = 3;
  }, [mode]);

  const validate = () => {
    const nextErrors = {};
    contacts.forEach((contact, index) => {
      const key = mode === "broken" ? index : contact.id;
      if (!contact.email.includes("@")) {
        nextErrors[key] = "Valid email required";
      }
    });
    setErrors(nextErrors);
  };

  const removeContact = (id) => {
    setContacts((current) => current.filter((contact) => contact.id !== id));
  };

  const addContact = () => {
    setContacts((current) => [
      ...current,
      { id: idRef.current++, type: `Contact ${current.length + 1}`, email: "" }
    ]);
  };

  return (
    <div className="demo-stack">
      <div className="button-row">
        <button type="button" className="secondary-button" onClick={validate}>
          Validate form
        </button>
        <button type="button" className="secondary-button" onClick={addContact}>
          Add contact
        </button>
      </div>
      {contacts.map((contact, index) => {
        const errorKey = mode === "broken" ? index : contact.id;
        return (
          <div key={contact.id} className="form-row">
            <div className="form-column">
              <span className="field-label">{contact.type}</span>
              <input
                value={contact.email}
                onChange={(event) =>
                  setContacts((current) =>
                    current.map((item) =>
                      item.id === contact.id ? { ...item, email: event.target.value } : item
                    )
                  )
                }
                placeholder="name@client.dev"
              />
              {errors[errorKey] ? <span className="inline-error">{errors[errorKey]}</span> : null}
            </div>
            <button type="button" className="icon-button" onClick={() => removeContact(contact.id)}>
              Remove
            </button>
          </div>
        );
      })}
      <p className="muted">
        Validate once, then remove the first row. In the broken mode, the error follows the index instead of the original field.
      </p>
    </div>
  );
}

function StateAfterApiDemo({ mode }) {
  const [serverTask, setServerTask] = useState({ status: "Pending" });
  const [uiTask, setUiTask] = useState({ status: "Pending" });
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    setServerTask({ status: "Pending" });
    setUiTask({ status: "Pending" });
    setSyncing(false);
  }, [mode]);

  const syncTask = () => {
    setSyncing(true);
    window.setTimeout(() => {
      const response = { status: "Complete" };
      setServerTask(response);
      if (mode === "fixed") {
        setUiTask(response);
      }
      setSyncing(false);
    }, 500);
  };

  return (
    <div className="demo-stack">
      <div className="button-row">
        <button type="button" className="primary-button" onClick={syncTask}>
          Sync from API
        </button>
      </div>
      <div className="status-row">
        <div>
          <span className="field-label">Backend status</span>
          <Badge tone="success">{serverTask.status}</Badge>
        </div>
        <div>
          <span className="field-label">UI status</span>
          <Badge tone={uiTask.status === "Complete" ? "success" : "warning"}>{uiTask.status}</Badge>
        </div>
        {syncing ? <Badge tone="neutral">Syncing...</Badge> : null}
      </div>
      <p className="muted">
        The broken flow updates the mock backend response but never commits the returned payload into local UI state.
      </p>
    </div>
  );
}

function DebouncedSearchDemo({ mode }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const pendingTimers = useRef([]);

  const clearTimers = () => {
    pendingTimers.current.forEach((timer) => window.clearTimeout(timer));
    pendingTimers.current = [];
  };

  useEffect(() => {
    setQuery("");
    setResults([]);
    setRequestCount(0);
    clearTimers();
    return () => clearTimers();
  }, [mode]);

  useEffect(() => {
    clearTimers();
    if (!query.trim()) {
      setResults([]);
      return undefined;
    }

    const runSearch = () => {
      setRequestCount((count) => count + 1);
      const timer = window.setTimeout(() => {
        setResults(
          SEARCH_INDEX.filter((item) => item.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
        );
      }, 220);
      pendingTimers.current.push(timer);
    };

    if (mode === "broken") {
      runSearch();
      return undefined;
    }

    const debounceTimer = window.setTimeout(runSearch, 400);
    pendingTimers.current.push(debounceTimer);

    return () => window.clearTimeout(debounceTimer);
  }, [mode, query]);

  return (
    <div className="demo-stack">
      <label className="field-label" htmlFor="search-demo">
        Search projects
      </label>
      <input
        id="search-demo"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Type client, debug, token..."
      />
      <div className="demo-metrics">
        <Badge tone={mode === "broken" ? "warning" : "success"}>Requests sent: {requestCount}</Badge>
      </div>
      <div className="result-list">
        {results.length === 0 ? <span className="muted">No results yet.</span> : null}
        {results.map((item) => (
          <div key={item} className="result-row">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function PaginationBugDemo({ mode }) {
  const [filter, setFilter] = useState("engineering");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setFilter("engineering");
    setPage(1);
    setRows(PAGINATION_DATA.engineering.slice(0, 2));
  }, [mode]);

  const loadPage = (nextFilter, nextPage, reset) => {
    const source = PAGINATION_DATA[nextFilter].slice((nextPage - 1) * 2, nextPage * 2);
    setRows((current) => {
      if (mode === "fixed" && reset) {
        return source;
      }
      return [...current, ...source];
    });
  };

  const changeFilter = (nextFilter) => {
    setFilter(nextFilter);
    if (mode === "fixed") {
      setPage(1);
      loadPage(nextFilter, 1, true);
    } else {
      loadPage(nextFilter, page, false);
    }
  };

  const nextPage = () => {
    const upcomingPage = page + 1;
    setPage(upcomingPage);
    loadPage(filter, upcomingPage, false);
  };

  return (
    <div className="demo-stack">
      <div className="button-row">
        {Object.keys(PAGINATION_DATA).map((group) => (
          <button key={group} type="button" className="secondary-button" onClick={() => changeFilter(group)}>
            {group}
          </button>
        ))}
        <button type="button" className="primary-button" onClick={nextPage}>
          Load next page
        </button>
      </div>
      <div className="demo-metrics">
        <Badge tone="neutral">Filter: {filter}</Badge>
        <Badge tone="neutral">Page pointer: {page}</Badge>
      </div>
      <div className="result-list">
        {rows.map((row, index) => (
          <div key={`${row}-${index}`} className="result-row">
            {row}
          </div>
        ))}
      </div>
      <p className="muted">
        In broken mode, changing filters keeps the old list and current page, so the feed mixes datasets and can duplicate entries.
      </p>
    </div>
  );
}

function FileUploadValidationDemo({ mode }) {
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("No file checked yet.");

  useEffect(() => {
    setSelected(null);
    setMessage("No file checked yet.");
  }, [mode]);

  const pickFile = (file) => {
    setSelected(file);
    if (mode === "broken") {
      const allowedExtension = /\.(pdf|png)$/i.test(file.name);
      setMessage(allowedExtension ? "Accepted by extension check only." : "Blocked by extension.");
      return;
    }

    const allowedTypes = ["application/pdf", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setMessage("Rejected: file type does not match the allowed MIME list.");
      return;
    }

    if (file.size > 2_000_000) {
      setMessage("Rejected: file is larger than the 2 MB limit.");
      return;
    }

    setMessage("Accepted: MIME type and size both passed validation.");
  };

  return (
    <div className="demo-stack">
      <div className="button-row">
        {FILE_SAMPLES.map((file) => (
          <button key={file.name} type="button" className="secondary-button" onClick={() => pickFile(file)}>
            Use {file.name}
          </button>
        ))}
      </div>
      {selected ? (
        <div className="payload-box">
          <strong>{selected.name}</strong>
          <span>{selected.type}</span>
          <span>{Math.round(selected.size / 1000)} KB</span>
        </div>
      ) : null}
      <Badge tone={message.startsWith("Accepted") ? "success" : message.startsWith("Rejected") ? "danger" : "neutral"}>
        {message}
      </Badge>
    </div>
  );
}

function UnauthorizedHandlingDemo({ mode }) {
  const [token, setToken] = useState("expired-token");
  const [profile, setProfile] = useState(null);
  const [logItems, setLogItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken("expired-token");
    setProfile(null);
    setLogItems([]);
    setLoading(false);
  }, [mode]);

  const appendLog = (message) => {
    setLogItems((current) => [...current, message].slice(-6));
  };

  const fetchProfile = () => {
    setLoading(true);
    setProfile(null);
    setLogItems([]);
    appendLog(`GET /profile with ${token}`);

    window.setTimeout(() => {
      if (token !== "fresh-token") {
        appendLog("401 Unauthorized");

        if (mode === "broken") {
          appendLog("Session left in failed state");
          setLoading(false);
          return;
        }

        appendLog("Refreshing token...");
        window.setTimeout(() => {
          const freshToken = "fresh-token";
          setToken(freshToken);
          appendLog("Retrying original request");
          window.setTimeout(() => {
            setProfile({ name: "Maya Chen", role: "Product Consultant" });
            appendLog("Profile response recovered");
            setLoading(false);
          }, 250);
        }, 300);
        return;
      }

      setProfile({ name: "Maya Chen", role: "Product Consultant" });
      appendLog("Profile loaded");
      setLoading(false);
    }, 350);
  };

  return (
    <div className="demo-stack">
      <div className="button-row">
        <button type="button" className="primary-button" onClick={fetchProfile}>
          Fetch profile
        </button>
      </div>
      <div className="demo-metrics">
        <Badge tone={token === "fresh-token" ? "success" : "warning"}>Token: {token}</Badge>
        {loading ? <Badge tone="neutral">Working...</Badge> : null}
      </div>
      {profile ? (
        <div className="profile-card">
          <strong>{profile.name}</strong>
          <span>{profile.role}</span>
        </div>
      ) : null}
      <LogList items={logItems} />
    </div>
  );
}

function SelectComparisonDemo() {
  const [basic, setBasic] = useState("React");

  return (
    <div className="comparison-grid">
      <Card title="Basic" subtitle="Native single-value select">
        <label className="field-label" htmlFor="basic-select">
          Primary skill
        </label>
        <select id="basic-select" value={basic} onChange={(event) => setBasic(event.target.value)}>
          {MULTISELECT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Card>
      <Card title="Advanced" subtitle="Searchable multi-select with retained context" className="card-overflow-visible">
        <SearchableMultiSelect options={MULTISELECT_OPTIONS} />
      </Card>
    </div>
  );
}

function SearchableMultiSelect({ options }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(["React", "Debugging"]);
  const rootRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = options.filter((option) => option.toLowerCase().includes(query.toLowerCase()));

  const toggle = (option) => {
    setSelected((current) =>
      current.includes(option) ? current.filter((item) => item !== option) : [...current, option]
    );
  };

  return (
    <div className="multiselect" ref={rootRef}>
      <button type="button" className="multiselect-trigger" onClick={() => setOpen((value) => !value)}>
        <span className="tag-group">
          {selected.map((item) => (
            <span key={item} className="token-pill">
              {item}
            </span>
          ))}
        </span>
      </button>
      {open ? (
        <div className="dropdown-panel">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search skills"
            aria-label="Search skills"
          />
          <div className="checkbox-list">
            {filtered.map((option) => (
              <label key={option} className="checkbox-row">
                <input type="checkbox" checked={selected.includes(option)} onChange={() => toggle(option)} />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function TableComparisonDemo() {
  const [sortKey, setSortKey] = useState("score");
  const [direction, setDirection] = useState("desc");
  const [page, setPage] = useState(1);
  const pageSize = 3;

  const sortedRows = useMemo(() => {
    const cloned = [...TABLE_ROWS];
    cloned.sort((left, right) => {
      const a = left[sortKey];
      const b = right[sortKey];
      if (a === b) {
        return 0;
      }
      const result = a > b ? 1 : -1;
      return direction === "asc" ? result : -result;
    });
    return cloned;
  }, [direction, sortKey]);

  const pagedRows = sortedRows.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(sortedRows.length / pageSize);

  const updateSort = (key) => {
    if (key === sortKey) {
      setDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setDirection("asc");
  };

  return (
    <div className="comparison-grid">
      <Card title="Basic" subtitle="Static rows with no interaction">
        <table className="table basic">
          <thead>
            <tr>
              <th>Client</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.slice(0, 4).map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card title="Advanced" subtitle="Sortable and paginated data table">
        <table className="table">
          <thead>
            <tr>
              <th>
                <button type="button" className="table-sort" onClick={() => updateSort("name")}>
                  Client
                </button>
              </th>
              <th>
                <button type="button" className="table-sort" onClick={() => updateSort("priority")}>
                  Priority
                </button>
              </th>
              <th>
                <button type="button" className="table-sort" onClick={() => updateSort("score")}>
                  Score
                </button>
              </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pagedRows.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.priority}</td>
                <td>{row.score}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-footer">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="button-row">
            <button type="button" className="secondary-button" onClick={() => setPage((current) => Math.max(1, current - 1))}>
              Prev
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function FormBuilderComparisonDemo() {
  const [fields, setFields] = useState([
    { id: 1, label: "Project name", type: "text", required: true },
    { id: 2, label: "Kickoff date", type: "date", required: false }
  ]);
  const idRef = useRef(3);

  const addField = () => {
    setFields((current) => [
      ...current,
      { id: idRef.current++, label: `Custom field ${current.length + 1}`, type: "text", required: false }
    ]);
  };

  return (
    <div className="comparison-grid">
      <Card title="Basic" subtitle="Fixed form shape">
        <div className="demo-stack">
          <input placeholder="Project name" />
          <input placeholder="Client email" />
          <textarea rows="4" placeholder="Project notes" />
        </div>
      </Card>
      <Card title="Advanced" subtitle="Dynamic form builder">
        <div className="demo-stack">
          {fields.map((field) => (
            <div key={field.id} className="form-row">
              <div className="form-column">
                <input
                  value={field.label}
                  onChange={(event) =>
                    setFields((current) =>
                      current.map((item) =>
                        item.id === field.id ? { ...item, label: event.target.value } : item
                      )
                    )
                  }
                />
                <div className="button-row compact">
                  <select
                    value={field.type}
                    onChange={(event) =>
                      setFields((current) =>
                        current.map((item) =>
                          item.id === field.id ? { ...item, type: event.target.value } : item
                        )
                      )
                    }
                  >
                    <option value="text">Text</option>
                    <option value="date">Date</option>
                    <option value="email">Email</option>
                  </select>
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(event) =>
                        setFields((current) =>
                          current.map((item) =>
                            item.id === field.id ? { ...item, required: event.target.checked } : item
                          )
                        )
                      }
                    />
                    <span>Required</span>
                  </label>
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => setFields((current) => current.filter((item) => item.id !== field.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button type="button" className="primary-button" onClick={addField}>
            Add field
          </button>
        </div>
      </Card>
    </div>
  );
}

function SearchComparisonDemo() {
  const [basicValue, setBasicValue] = useState("");

  return (
    <div className="comparison-grid">
      <Card title="Basic" subtitle="Simple local input">
        <label className="field-label" htmlFor="basic-search">
          Search box
        </label>
        <input id="basic-search" value={basicValue} onChange={(event) => setBasicValue(event.target.value)} />
        <p className="muted">Current text: {basicValue || "Nothing typed yet."}</p>
      </Card>
      <Card title="Advanced" subtitle="Debounced API-backed search">
        <DebouncedSearchDemo mode="fixed" />
      </Card>
    </div>
  );
}

function ModalComparisonDemo() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [advancedModal, setAdvancedModal] = useState(null);

  return (
    <div className="comparison-grid">
      <Card title="Basic" subtitle="Single modal with minimal behavior">
        <button type="button" className="primary-button" onClick={() => setBasicOpen(true)}>
          Open modal
        </button>
        {basicOpen ? (
          <div className="basic-modal">
            <div className="basic-modal-panel">
              <strong>Basic modal</strong>
              <p>This is a plain dialog surface.</p>
              <button type="button" className="secondary-button" onClick={() => setBasicOpen(false)}>
                Close
              </button>
            </div>
          </div>
        ) : null}
      </Card>
      <Card title="Advanced" subtitle="Reusable accessible modal system">
        <div className="button-row">
          <button type="button" className="primary-button" onClick={() => setAdvancedModal("archive")}>
            Archive client
          </button>
          <button type="button" className="secondary-button" onClick={() => setAdvancedModal("delete")}>
            Delete draft
          </button>
        </div>
        <p className="muted">The advanced modal traps focus, closes on Escape, and reuses the same shell for different actions.</p>
        <AccessibleModal
          open={Boolean(advancedModal)}
          title={advancedModal === "archive" ? "Archive client workspace" : "Delete proposal draft"}
          onClose={() => setAdvancedModal(null)}
        >
          <p>
            {advancedModal === "archive"
              ? "Archived workspaces remain accessible in history, but they disappear from active lists."
              : "Deleting this draft removes the current working copy for everyone on the account."}
          </p>
          <div className="button-row">
            <button type="button" className="secondary-button" onClick={() => setAdvancedModal(null)}>
              Cancel
            </button>
            <button type="button" className="primary-button" onClick={() => setAdvancedModal(null)}>
              Confirm
            </button>
          </div>
        </AccessibleModal>
      </Card>
    </div>
  );
}

function AccessibleModal({ open, title, children, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const panel = panelRef.current;
    const focusable = panel ? Array.from(panel.querySelectorAll(focusableSelector)) : [];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (first) {
      first.focus();
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "Tab" && focusable.length > 0) {
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h4 id="modal-title">{title}</h4>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close modal">
            Close
          </button>
        </div>
        <div className="demo-stack">{children}</div>
      </div>
    </div>,
    document.body
  );
}

const BUG_DEMOS = [
  {
    id: "api-shape",
    title: "API response shape mismatch",
    subtitle: "Backend contract drift",
    problem: "The frontend expects one payload shape while the backend returns another.",
    rootCause: "The component reads response.data.items, but the API changed to return results instead.",
    fix: "Normalize the response through a typed parser or mapper before rendering.",
    code: `const normalizedItems = response.results.map((item) => ({
  id: item.id,
  label: item.label
}));

setItems(normalizedItems);`,
    component: ApiShapeMismatchDemo
  },
  {
    id: "dropdown-missing",
    title: "Missing dropdown value from API",
    subtitle: "Saved value no longer in option list",
    problem: "A record contains a valid saved value, but the options endpoint no longer returns it.",
    rootCause: "The select only renders the latest API options, so the persisted selection disappears from the control.",
    fix: "Merge the selected value back into the options list until the user chooses something else.",
    code: `const mergedOptions = options.some((item) => item.value === selected)
  ? options
  : [...options, { value: selected, label: formatLabel(selected) }];`,
    component: MissingDropdownValueDemo
  },
  {
    id: "race-condition",
    title: "Race condition with multiple API calls",
    subtitle: "Older response wins",
    problem: "Fast successive requests paint data in the wrong order.",
    rootCause: "Responses are applied as they arrive, without checking whether they belong to the latest request.",
    fix: "Track the current request id or abort stale fetches before committing state.",
    code: `const requestId = ++requestIdRef.current;
const response = await fetchProject(projectId);

if (requestId !== requestIdRef.current) return;
setProject(response);`,
    component: RaceConditionDemo
  },
  {
    id: "rerender-loop",
    title: "Infinite re-render issue",
    subtitle: "Effect writes to its own dependency",
    problem: "A component falls into a render loop and pegs the browser.",
    rootCause: "An effect updates state that it also depends on, so each render schedules another render.",
    fix: "Derive values during render with useMemo or narrow the effect dependencies to true side effects.",
    code: `const query = useMemo(() => {
  return buildQuery(filters);
}, [filters]);`,
    component: InfiniteRerenderDemo
  },
  {
    id: "dynamic-validation",
    title: "Dynamic form validation bug",
    subtitle: "Errors tied to array indexes",
    problem: "Validation messages jump to the wrong row after dynamic fields are added or removed.",
    rootCause: "Errors are keyed by array index instead of a stable field id.",
    fix: "Store validation state against durable ids and recalculate after structural edits.",
    code: `const nextErrors = {};

fields.forEach((field) => {
  if (!field.value) nextErrors[field.id] = "Required";
});

setErrors(nextErrors);`,
    component: DynamicFormValidationDemo
  },
  {
    id: "state-after-api",
    title: "State not updating after API",
    subtitle: "Returned payload ignored",
    problem: "The server accepts a change, but the interface still shows stale data.",
    rootCause: "The response succeeds, yet the UI never merges the returned entity into local state.",
    fix: "Commit the successful response back into component state or invalidate the cached query.",
    code: `const updatedTask = await updateTaskStatus(taskId);

setTasks((current) =>
  current.map((task) => (task.id === updatedTask.id ? updatedTask : task))
);`,
    component: StateAfterApiDemo
  },
  {
    id: "debounced-search",
    title: "Debounced search vs API flooding",
    subtitle: "Every keystroke becomes a request",
    problem: "Typing into search floods the API and causes noisy, overlapping responses.",
    rootCause: "The input handler fires a request immediately on each character change.",
    fix: "Debounce the query before calling the API and cancel stale timers on cleanup.",
    code: `useEffect(() => {
  const timer = setTimeout(() => search(query), 400);
  return () => clearTimeout(timer);
}, [query]);`,
    component: DebouncedSearchDemo
  },
  {
    id: "pagination-reset",
    title: "Pagination duplication/reset bug",
    subtitle: "Filter changes keep old pages",
    problem: "Switching filters keeps stale items and page pointers, which creates duplicates and mixed datasets.",
    rootCause: "The list appends newly fetched rows regardless of whether the query scope changed.",
    fix: "Reset page state and replace the list whenever the filter key changes.",
    code: `setPage(1);
setRows(firstPageRows);

if (page > 1) {
  setRows((current) => [...current, ...nextRows]);
}`,
    component: PaginationBugDemo
  },
  {
    id: "file-upload",
    title: "File upload validation issue",
    subtitle: "Extension-only checks",
    problem: "Uploads pass validation even though they are too large or the MIME type is wrong.",
    rootCause: "Validation only checks the filename suffix, which is trivial to spoof.",
    fix: "Validate MIME type, size, and any server-side security requirements before accepting.",
    code: `const isAllowedType = allowedTypes.includes(file.type);
const isAllowedSize = file.size <= MAX_FILE_SIZE;

if (!isAllowedType || !isAllowedSize) {
  return setError("Upload rejected");
}`,
    component: FileUploadValidationDemo
  },
  {
    id: "unauthorized",
    title: "Unauthorized API and token expiry handling",
    subtitle: "401 path lacks recovery",
    problem: "A token expires mid-session and the app drops the user into a dead-end error state.",
    rootCause: "The request layer handles 401 as a generic failure instead of refreshing credentials or redirecting.",
    fix: "Refresh once, retry the original request, and fall back to sign-in when recovery fails.",
    code: `if (response.status === 401) {
  const freshToken = await refreshToken();
  return apiClient(request, freshToken);
}`,
    component: UnauthorizedHandlingDemo
  }
];

const SHOWCASE_DEMOS = [
  {
    id: "multiselect",
    title: "Native select vs custom searchable multi-select",
    subtitle: "Selection UX",
    description: "A plain single-select is fine for simple forms, but advanced filtering calls for search, multi-selection, and visible chosen values.",
    component: SelectComparisonDemo
  },
  {
    id: "table",
    title: "Basic table vs sortable/paginated table",
    subtitle: "Dense data handling",
    description: "The richer table adds sorting and paging controls so larger datasets stay navigable.",
    component: TableComparisonDemo
  },
  {
    id: "form-builder",
    title: "Static form vs dynamic form builder",
    subtitle: "Composable forms",
    description: "This comparison shows the jump from fixed inputs to a field builder that can adapt to client-specific requirements.",
    component: FormBuilderComparisonDemo
  },
  {
    id: "search-input",
    title: "Simple input vs debounced API search input",
    subtitle: "Async search patterns",
    description: "The advanced version treats user input like a network concern, not just a text field.",
    component: SearchComparisonDemo
  },
  {
    id: "modal",
    title: "Basic modal vs reusable accessible modal system",
    subtitle: "Reusable overlays",
    description: "The advanced modal is built as shared infrastructure, with keyboard handling and focus management.",
    component: ModalComparisonDemo
  }
];

export default App;
