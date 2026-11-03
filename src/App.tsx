import { useState } from "react";
import {
  Bell,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Clock3,
  Droplet,
  Home,
  Info,
  Layers,
  List,
  Menu,
  TrendingUp,
  X,
} from "lucide-react";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import readings from "./data/tankReadings.json";
import { getTankSummary } from "./utils/tankCalculations";
import type { TankReading } from "./types/tank";
import "./App.css";

const LOW_LEVEL_THRESHOLD = 20;

const tankReadings = readings as TankReading[];
const tankSummary = getTankSummary(tankReadings);

function formatTime(timestamp: string) {
  return new Date(timestamp).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(timestamp: string) {
  return new Date(timestamp).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Custom tooltip displays the currently hovered reading
type WaterLevelTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value?: number;
    payload: TankReading;
  }>;
};

function WaterLevelTooltip({ active, payload }: WaterLevelTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const reading = payload[0].payload;
  const isLow = reading.level_percent < LOW_LEVEL_THRESHOLD;

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #d8e1eb",
        borderRadius: "8px",
        padding: "12px 15px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
        minWidth: "155px",
      }}
    >
      <p
        style={{
          color: "#344965",
          fontSize: "13px",
          margin: "0 0 8px",
          fontWeight: 500,
        }}
      >
        Time: {formatTime(reading.timestamp)}
      </p>

      <p
        style={{
          color: isLow ? "#ef4444" : "#08bfc5",
          fontSize: "15px",
          fontWeight: 600,
          margin: 0,
        }}
      >
        Water Level: {reading.level_percent}%
      </p>

      {isLow && (
        <p
          style={{
            color: "#ef4444",
            fontSize: "12px",
            margin: "7px 0 0",
          }}
        >
          Below 20% threshold
        </p>
      )}
    </div>
  );
}

// Tank visualization
function TankVisual({ level }: { level: number }) {
  const waterY = 55 + (100 - level) * 2.2;
  const waterHeight = level * 2.2;

  return (
    <svg
      className="tank-visual"
      viewBox="0 0 260 310"
      role="img"
      aria-label={`Water tank filled to ${level}%`}
    >
      <defs>
        <linearGradient id="tankGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e7f8ff" stopOpacity=".9" />
          <stop offset="100%" stopColor="#75c9e9" stopOpacity=".35" />
        </linearGradient>

        <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#18d8e2" />
          <stop offset="100%" stopColor="#00a8c6" />
        </linearGradient>

        <clipPath id="tankClip">
          <rect x="36" y="55" width="188" height="220" rx="45" />
        </clipPath>
      </defs>

      <ellipse cx="130" cy="284" rx="112" ry="13" fill="#bce6f5" opacity=".7" />

      <g clipPath="url(#tankClip)">
        <rect
          className="tank-water"
          x="36"
          y={waterY}
          width="188"
          height={waterHeight}
          fill="url(#waterGradient)"
        />

        <path
          className="water-wave"
          d={`M 30 ${waterY + 5} Q 65 ${waterY - 12} 100 ${waterY + 5} T 170 ${waterY + 5} T 240 ${waterY + 5} L 240 290 L 30 290 Z`}
          fill="#55f0ed"
          opacity=".8"
        />

        <circle
          className="water-bubble"
          cx="75"
          cy={waterY + 65}
          r="5"
          fill="#b7ffff"
        />

        <circle
          className="water-bubble"
          cx="175"
          cy={waterY + 100}
          r="7"
          fill="#b7ffff"
        />

        <circle
          className="water-bubble"
          cx="120"
          cy={waterY + 145}
          r="4"
          fill="#b7ffff"
        />

        <text
          x="130"
          y={Math.min(waterY + waterHeight / 2 + 8, 260)}
          textAnchor="middle"
          fontSize="29"
          fontWeight="800"
          fill="white"
        >
          {level}%
        </text>
      </g>

      <rect
        x="36"
        y="55"
        width="188"
        height="220"
        rx="45"
        fill="url(#tankGlass)"
        stroke="#24516f"
        strokeWidth="5"
        opacity=".9"
      />

      <path
        d="M 45 78 Q 130 95 215 78"
        fill="none"
        stroke="#ffffff"
        strokeWidth="6"
        opacity=".9"
      />

      <path
        d="M 55 95 L 55 235"
        stroke="#ffffff"
        strokeWidth="13"
        strokeLinecap="round"
        opacity=".5"
      />

      <rect x="102" y="35" width="56" height="18" rx="7" fill="#244967" />
      <rect x="108" y="38" width="44" height="8" rx="4" fill="#8bc9e4" />
    </svg>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!tankSummary) {
    return (
      <main className="empty-state">No valid tank readings available.</main>
    );
  }

  const { current, minimum, maximum, lowLevelReadings } = tankSummary;

  const chartData = tankReadings.map((reading) => ({
    ...reading,
    time: formatTime(reading.timestamp),
  }));

  const isCurrentLow = current.level_percent < LOW_LEVEL_THRESHOLD;

  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <main className="dashboard">
      {sidebarOpen && (
        <button
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar navigation */}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <Droplet size={43} />

          <div>
            <h2>AquaSense</h2>
            <span>Smart Water Monitoring</span>
          </div>

          <button
            className="sidebar-close"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <X size={23} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <a href="#overview" className="active" onClick={closeSidebar}>
            <Home size={23} />
            Overview
          </a>

          <a href="#analytics" onClick={closeSidebar}>
            <ChartNoAxesColumnIncreasing size={23} />
            Tank Analytics
          </a>

          <a href="#alerts" onClick={closeSidebar}>
            <Bell size={23} />
            Alerts
          </a>
        </nav>

        <div className="sidebar-footer">
          <Droplet size={45} />

          <div>
            <strong>Smart Tank Monitoring</strong>
            <p>Water level insights for smarter water usage.</p>
          </div>
        </div>
      </aside>

      <section className="main-content" id="overview">
        {/* Dashboard header */}
        <header className="topbar">
          <div className="page-heading">
            <button
              className="menu-toggle"
              onClick={() => setSidebarOpen((previous) => !previous)}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              aria-expanded={sidebarOpen}
            >
              {sidebarOpen ? <X size={27} /> : <Menu size={27} />}
            </button>

            <div>
              <h1>Tank Overview</h1>
              <p>Tank level and daily water insights</p>
            </div>
          </div>

          <div className="header-meta">
            <div className="header-date">
              <CalendarDays size={24} />
              {formatDate(current.timestamp)}
            </div>
          </div>
        </header>

        {/* Current tank and statistics */}
        <section className="overview-grid">
          <article className="current-card">
            <div className="card-heading">
              <h2>Current Tank Level</h2>

              <div className={`status ${isCurrentLow ? "low" : "normal"}`}>
                <span />
                {isCurrentLow ? "Low Level" : "Normal"}
              </div>
            </div>

            <div className="current-content">
              <div className="current-details">
                <h3>{current.level_percent}%</h3>
                <p>Tank Level</p>

                <div
                  className="progress-track"
                  role="progressbar"
                  aria-label="Current tank level"
                  aria-valuenow={current.level_percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="progress-fill"
                    style={{ width: `${current.level_percent}%` }}
                  />
                </div>

                <div className="detail-row">
                  <Clock3 size={20} />
                  Latest Reading
                  <strong>{formatTime(current.timestamp)}</strong>
                </div>

                <div className="detail-row">
                  <Layers size={20} />
                  Status
                  <strong>{isCurrentLow ? "Low" : "Normal"}</strong>
                </div>
              </div>

              <TankVisual level={current.level_percent} />
            </div>
          </article>

          {/* Minimum and maximum statistics */}
          <div className="stats-column">
            <article className="stat-card minimum">
              <div className="stat-icon">
                <Droplet size={35} />
              </div>

              <div>
                <p>Today's Minimum</p>
                <h2>{minimum.level_percent}%</h2>
                <span>Recorded at {formatTime(minimum.timestamp)}</span>
              </div>
            </article>

            <article className="stat-card maximum">
              <div className="stat-icon">
                <Droplet size={35} />
              </div>

              <div>
                <p>Today's Maximum</p>
                <h2>{maximum.level_percent}%</h2>
                <span>Recorded at {formatTime(maximum.timestamp)}</span>
              </div>
            </article>
          </div>

          {/* Low-level alerts */}
          <article className="alert-card" id="alerts">
            <div className="alert-heading">
              <Bell size={30} />

              <h2>
                {lowLevelReadings.length > 0
                  ? "Low Level Alert (Historical)"
                  : "Tank Level Alerts"}
              </h2>
            </div>

            {lowLevelReadings.length > 0 ? (
              <>
                <div className="alert-content">
                  <div className="alert-value">
                    <strong>{minimum.level_percent}%</strong>
                    <span>at {formatTime(minimum.timestamp)}</span>
                  </div>

                  <p>Threshold: below {LOW_LEVEL_THRESHOLD}%</p>
                </div>

                <div className="alert-info">
                  <Info size={22} />
                  Water level dropped below the configured 20% threshold.
                  {` ${lowLevelReadings.length} low-level reading(s) recorded.`}
                </div>
              </>
            ) : (
              <div className="safe-alert">
                <Info size={22} />
                No low-level readings recorded today.
              </div>
            )}
          </article>
        </section>

        {/* Water level chart and reading history */}
        <section className="bottom-grid">
          <article className="chart-card" id="analytics">
            <div className="section-heading">
              <TrendingUp size={30} />

              <div>
                <h2>Water Level Trend</h2>
                <p>Tank level throughout the day</p>
              </div>
            </div>

            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={chartData}
                  margin={{ top: 15, right: 10, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#12c9d1"
                        stopOpacity={0.35}
                      />

                      <stop
                        offset="100%"
                        stopColor="#12c9d1"
                        stopOpacity={0.04}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke="#d8e1eb" strokeDasharray="4 4" />

                  <XAxis
                    type="category"
                    dataKey="time"
                    ticks={chartData.map((reading) => reading.time)}
                    interval={0}
                    allowDuplicatedCategory={false}
                    tick={{ fill: "#344965", fontSize: 12 }}
                    axisLine={{ stroke: "#aab8c8" }}
                  />

                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 20, 40, 60, 80, 100]}
                    tick={{ fill: "#344965", fontSize: 12 }}
                    tickFormatter={(value) => `${value}%`}
                  />

                  <Tooltip
                    content={<WaterLevelTooltip />}
                    cursor={{
                      stroke: "#aab8c8",
                      strokeWidth: 1,
                    }}
                  />

                  <ReferenceLine
                    y={LOW_LEVEL_THRESHOLD}
                    stroke="#ef4444"
                    strokeDasharray="7 5"
                    label={{
                      value: "20% threshold",
                      fill: "#ef4444",
                      position: "insideTopRight",
                      fontSize: 12,
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="level_percent"
                    name="Water Level"
                    stroke="#08bfc5"
                    strokeWidth={3}
                    fill="url(#chartFill)"
                    dot={(props) => {
                      const { cx, cy, payload } = props;

                      if (typeof cx !== "number" || typeof cy !== "number") {
                        return null;
                      }

                      const isLow = payload.level_percent < LOW_LEVEL_THRESHOLD;

                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={4}
                          fill={isLow ? "#ef2929" : "#ffffff"}
                          stroke={isLow ? "#ef2929" : "#08bfc5"}
                          strokeWidth={2}
                        />
                      );
                    }}
                    activeDot={{
                      r: 7,
                      fill: "#08bfc5",
                      stroke: "#ffffff",
                      strokeWidth: 2,
                    }}
                    isAnimationActive={true}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </article>

          {/* Reading history */}
          <article className="history-card">
            <div className="section-heading">
              <List size={29} />

              <div>
                <h2>Reading History</h2>
                <p>All tank readings for {formatDate(current.timestamp)}</p>
              </div>
            </div>

            <div className="history-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Time</th>
                    <th>Water Level</th>
                  </tr>
                </thead>

                <tbody>
                  {chartData.map((reading, index) => (
                    <tr
                      key={reading.timestamp}
                      className={
                        reading.level_percent < LOW_LEVEL_THRESHOLD
                          ? "low-reading"
                          : ""
                      }
                    >
                      <td>{index + 1}</td>
                      <td>{reading.time}</td>
                      <td>{reading.level_percent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </section>

        <footer className="dashboard-footer">
          AquaSense Dashboard | Tank monitoring insights
        </footer>
      </section>
    </main>
  );
}

export default App;
