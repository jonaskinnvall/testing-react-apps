// testing custom hooks
// http://localhost:3000/counter-hook

import {act, renderHook} from '@testing-library/react'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', async () => {
  const {result} = renderHook(useCounter)
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', async () => {
  const startCount = 3
  const {result} = renderHook(useCounter, {
    initialProps: {initialCount: startCount},
  })
  expect(result.current.count).toBe(startCount)
  act(() => result.current.increment())
  expect(result.current.count).toBe(startCount + 1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(startCount)
})

test('allows customization of the step', async () => {
  const stepSize = 3
  const {result} = renderHook(useCounter, {
    initialProps: {step: stepSize},
  })
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(stepSize)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('the step can be changed', () => {
  const {result, rerender} = renderHook(useCounter, {
    initialProps: {step: 3},
  })
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
  rerender({step: 2})
  act(() => result.current.decrement())
  expect(result.current.count).toBe(1)
})

/* eslint no-unused-vars:0 */
