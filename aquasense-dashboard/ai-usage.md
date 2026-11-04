### AI Usage Note

- **AI Tools Used:** ChatGPT, Google Antigravity and Gemini.
- **Prompt 1 (ChatGPT):** I asked ChatGPT to explain the assignment requirements, expected functionality, edge cases and suitable technologies before starting development.
- **Prompt 2 (ChatGPT):** I asked for help fixing a chart tooltip issue where the same values kept appearing when hovering over different data points.
- **Other prompts:** I also used ChatGPT to understand possible edge cases, identify things to avoid during development and get suggestions for improving the dashboard.
- **Gemini:** I used Gemini to explore dashboard design ideas and find visual inspiration for the UI.
- **Google Antigravity:** I used Antigravity to assist with writing and modifying code during development.
- **Issue faced:** The chart tooltip was showing the same reading instead of updating according to the hovered data point.
- **What I fixed:** I updated the tooltip to use the currently hovered data and removed the separate Scatter series that was causing conflicts.
- **Verification:** I hovered over different chart points and checked that the displayed timestamps and water levels matched the original JSON data.