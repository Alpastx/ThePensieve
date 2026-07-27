"use client"

import cn from "clsx"
import { useEffect, useId, useState } from "react"
import {
  TransformComponent,
  TransformWrapper,
  type ReactZoomPanPinchContentRef
} from "react-zoom-pan-pinch"
import { renderMermaidSvg } from "./mermaid-shared"

export type MermaidZoomableProps = {
  chart: string
  height?: number
  className?: string
}

/** Class name excluded from wheel/pan hit-testing by react-zoom-pan-pinch */
const INTERACTIVE_EXCLUDE = "pensieve-mermaid-zoomable--no-pan"

function ZoomControls({
  zoomIn,
  zoomOut,
  resetTransform
}: Pick<
  ReactZoomPanPinchContentRef,
  "zoomIn" | "zoomOut" | "resetTransform"
>) {
  return (
    <div
      className={cn("pensieve-mermaid-zoomable__controls", INTERACTIVE_EXCLUDE)}
      role="toolbar"
      aria-label="Diagram zoom"
    >
      <button
        type="button"
        className={cn("pensieve-mermaid-zoomable__control", INTERACTIVE_EXCLUDE)}
        aria-label="Zoom in"
        onClick={() => zoomIn(0.4)}
      >
        +
      </button>
      <button
        type="button"
        className={cn("pensieve-mermaid-zoomable__control", INTERACTIVE_EXCLUDE)}
        aria-label="Zoom out"
        onClick={() => zoomOut(0.4)}
      >
        −
      </button>
      <button
        type="button"
        className={cn("pensieve-mermaid-zoomable__control", INTERACTIVE_EXCLUDE)}
        aria-label="Reset zoom"
        onClick={() => resetTransform()}
      >
        ↺
      </button>
    </div>
  )
}

export function MermaidZoomable({
  chart,
  height = 480,
  className
}: MermaidZoomableProps) {
  const id = useId()
  const [mounted, setMounted] = useState(false)
  const [svg, setSvg] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !chart.trim()) {
      setSvg("")
      return
    }

    const htmlElement = document.documentElement
    let cancelled = false

    const renderChart = async () => {
      try {
        const renderedSvg = await renderMermaidSvg({ id, chart })
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
  }, [chart, id, mounted])

  if (!chart.trim()) {
    return null
  }

  return (
    <div
      className={cn("pensieve-mermaid-zoomable", className)}
      style={{ height }}
    >
      {!mounted ? (
        <div className="pensieve-mermaid-zoomable__placeholder" aria-hidden />
      ) : (
        <TransformWrapper
          key={svg ? "mermaid-ready" : "mermaid-pending"}
          initialScale={1}
          minScale={0.2}
          maxScale={8}
          centerOnInit
          limitToBounds={false}
          wheel={{ step: 0.2, excluded: [INTERACTIVE_EXCLUDE] }}
          panning={{
            velocityDisabled: true,
            excluded: [INTERACTIVE_EXCLUDE]
          }}
          doubleClick={{ mode: "reset", excluded: [INTERACTIVE_EXCLUDE] }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <ZoomControls
                zoomIn={zoomIn}
                zoomOut={zoomOut}
                resetTransform={resetTransform}
              />
              <TransformComponent
                wrapperClass="pensieve-mermaid-zoomable__viewport"
                contentClass="pensieve-mermaid-zoomable__content"
                wrapperStyle={{ width: "100%", height: "100%" }}
              >
                <div
                  className="pensieve-mermaid-zoomable__canvas"
                  dangerouslySetInnerHTML={{ __html: svg }}
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      )}
    </div>
  )
}
