export function isDarkDocumentTheme(htmlElement: HTMLElement = document.documentElement) {
  return (
    htmlElement.classList.contains("dark") ||
    htmlElement.getAttribute("data-theme") === "dark"
  )
}

export function getMermaidThemeVariables(isDarkTheme: boolean) {
  return {
    background: "transparent",
    primaryColor: isDarkTheme ? "#14091f" : "#faf5ff",
    primaryTextColor: isDarkTheme ? "#f5f3ff" : "#2e1065",
    primaryBorderColor: "#a855f7",
    secondaryColor: isDarkTheme ? "#21102f" : "#f3e8ff",
    secondaryTextColor: isDarkTheme ? "#e9d5ff" : "#3b0764",
    secondaryBorderColor: "#9333ea",
    tertiaryColor: isDarkTheme ? "#09090b" : "#ffffff",
    tertiaryTextColor: isDarkTheme ? "#ddd6fe" : "#4c1d95",
    tertiaryBorderColor: "rgba(168, 85, 247, 0.45)",
    mainBkg: isDarkTheme ? "#14091f" : "#faf5ff",
    secondBkg: isDarkTheme ? "#21102f" : "#f3e8ff",
    nodeBorder: "#a855f7",
    clusterBkg: isDarkTheme
      ? "rgba(168, 85, 247, 0.06)"
      : "rgba(168, 85, 247, 0.08)",
    clusterBorder: "rgba(168, 85, 247, 0.35)",
    edgeLabelBackground: isDarkTheme ? "#0a0a0a" : "#ffffff",
    lineColor: isDarkTheme ? "#c084fc" : "#7e22ce",
    textColor: isDarkTheme ? "#ede9fe" : "#2e1065",
    fontSize: "15px"
  }
}

export function normalizeMermaidChart(chart: string) {
  return chart.replaceAll("\\n", "\n")
}

type RenderMermaidOptions = {
  id: string
  chart: string
  container?: Element | null
}

export async function renderMermaidSvg({
  id,
  chart,
  container
}: RenderMermaidOptions) {
  const htmlElement = document.documentElement
  const isDarkTheme = isDarkDocumentTheme(htmlElement)
  const { default: mermaid } = await import("mermaid")

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    theme: "base",
    fontFamily: "var(--font-body), ui-sans-serif, system-ui, sans-serif",
    themeVariables: getMermaidThemeVariables(isDarkTheme)
  })

  const { svg } = await mermaid.render(
    id.replaceAll(":", ""),
    normalizeMermaidChart(chart),
    container ?? undefined
  )

  return svg
}
