"use client"

import { useEffect, useId, useRef, useState } from "react"

type MermaidProps = {
  chart: string
}

export function Mermaid({ chart }: MermaidProps) {
  const id = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState("")

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    const htmlElement = document.documentElement
    const renderChart = async () => {
      const isDarkTheme =
        htmlElement.classList.contains("dark") ||
        htmlElement.getAttribute("data-theme") === "dark"

      const { default: mermaid } = await import("mermaid")

      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: "base",
        fontFamily: "var(--font-body), ui-sans-serif, system-ui, sans-serif",
        themeVariables: {
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
      })

      try {
        const { svg: renderedSvg } = await mermaid.render(
          id.replaceAll(":", ""),
          chart.replaceAll("\\n", "\n"),
          container
        )
        setSvg(renderedSvg)
      } catch (error) {
        console.error("Error while rendering mermaid", error)
      }
    }

    renderChart()

    const observer = new MutationObserver(renderChart)
    observer.observe(htmlElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"]
    })

    return () => {
      observer.disconnect()
    }
  }, [chart, id])

  return (
    <div
      ref={containerRef}
      className="pensieve-mermaid"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
