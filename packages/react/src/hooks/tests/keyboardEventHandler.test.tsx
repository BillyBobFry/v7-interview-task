import { renderHook } from '@testing-library/react'
import { useGlobalKeybinding } from '../keyboardEventHandler'
import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('useGlobalKeybinding', () => {
  const mockCallback = vi.fn()

  beforeEach(() => {
    mockCallback.mockClear()
    window.removeEventListener('keydown', () => {})
  });

  it('should trigger callback when correct key combination is pressed', () => {
    renderHook(() => useGlobalKeybinding(mockCallback, ['Ctrl', 'k']))

    // Simulate Ctrl+K keypress
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'k',
        ctrlKey: true,
      })
    )

    expect(mockCallback).toHaveBeenCalledTimes(1)
  });

  it('should not trigger callback when wrong key is pressed', () => {
    renderHook(() => useGlobalKeybinding(mockCallback, ['Ctrl', 'k']))

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'j',
        ctrlKey: true,
      })
    )

    expect(mockCallback).not.toHaveBeenCalled()
  });

  it('should clean up the event listener on unmount', () => {
    const { unmount } = renderHook(() => useGlobalKeybinding(mockCallback, ['Ctrl', 'k']))

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'k',
        ctrlKey: true,
      })
    )

    expect(mockCallback).toHaveBeenCalledTimes(1)

    unmount()

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'k',
        ctrlKey: true,
      })
    )

    expect(mockCallback).toHaveBeenCalledTimes(1) 
  });
}) 