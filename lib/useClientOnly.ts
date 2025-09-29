'use client'

import { useState, useEffect } from 'react'

export function useClientOnly() {
  const [isClient, setIsClient] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setMounted(true)
  }, [])

  return { isClient, mounted, isReady: isClient && mounted }
}
