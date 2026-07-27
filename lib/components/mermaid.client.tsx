"use client"

import { useEffect, useId, useRef, useState } from "react"
import { renderMermaidSvg } from "./mermaid-shared"

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
    let cancelled = false

    const renderChart = async () => {
      try {
        const renderedSvg = await renderMermaidSvg({
          id,
          chart,
          container
        })
        if (!cancelled) {
          setSvg(renderedSvg)
        }
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
      cancelled = true
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
