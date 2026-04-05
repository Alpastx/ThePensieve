'use client'

import cn from 'clsx'
import { useState, type ReactNode } from 'react'

export type QuizProps = {
  question: string
  options: string[]
  /** Index of the correct option (0-based) */
  answer: number
  explanation?: ReactNode
}

function optionMark(index: number) {
  return index < 26 ? String.fromCharCode(65 + index) : String(index + 1)
}

export function Quiz({ question, options, answer, explanation }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleSelect = (index: number) => {
    if (showResult) return
    setSelected(index)
  }

  const checkAnswer = () => {
    if (selected !== null) setShowResult(true)
  }

  const reset = () => {
    setSelected(null)
    setShowResult(false)
  }

  return (
    <div className={cn('pensieve-quiz', 'x:not-first:mt-[1.5em]')}>
      <p className="pensieve-quiz__label">Quiz</p>
      <h3 className="pensieve-quiz__title">{question}</h3>

      <div className="pensieve-quiz__options">
        {options.map((opt, i) => {
          const isCorrect = showResult && i === answer
          const isWrongPick = showResult && i === selected && i !== answer
          const isFaded = showResult && i !== answer && i !== selected
          const isSelected = !showResult && selected === i

          let resultAttr: 'correct' | 'wrong' | 'faded' | undefined
          if (showResult) {
            if (isCorrect) resultAttr = 'correct'
            else if (isWrongPick) resultAttr = 'wrong'
            else if (isFaded) resultAttr = 'faded'
          }

          return (
            <button
              key={i}
              type="button"
              disabled={showResult}
              className="pensieve-quiz__option"
              data-selected={isSelected ? 'true' : undefined}
              data-result={resultAttr}
              onClick={() => handleSelect(i)}
            >
              <span className="pensieve-quiz__mark" aria-hidden>
                {optionMark(i)}
              </span>
              <span className="pensieve-quiz__option-text">{opt}</span>
            </button>
          )
        })}
      </div>

      <div className="pensieve-quiz__actions">
        {!showResult ? (
          <button
            type="button"
            className="pensieve-quiz__btn pensieve-quiz__btn--primary"
            onClick={checkAnswer}
            disabled={selected === null}
          >
            Check answer
          </button>
        ) : (
          <>
            <span
              className={cn(
                'pensieve-quiz__status',
                selected === answer
                  ? 'pensieve-quiz__status--ok'
                  : 'pensieve-quiz__status--bad'
              )}
            >
              {selected === answer ? 'Correct' : 'Incorrect'}
            </span>
            <button
              type="button"
              className="pensieve-quiz__btn pensieve-quiz__btn--ghost"
              onClick={reset}
            >
              Retry
            </button>
          </>
        )}
      </div>

      {showResult && explanation != null && explanation !== '' && (
        <div className="pensieve-quiz__explain">
          <div className="pensieve-quiz__explain-label">Explanation</div>
          <div>{explanation}</div>
        </div>
      )}
    </div>
  )
}
