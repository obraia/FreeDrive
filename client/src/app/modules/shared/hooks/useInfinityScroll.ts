import { useEffect, useState } from 'react'

interface Props {
  controlId: string
  initialLimit?: number
  initialPage?: number
}

const useInfinityScroll = (props: Props) => {
  const [limit] = useState(props.initialLimit || 10)
  const [page, setPage] = useState(props.initialPage || 1)

  const handleScroll = () => {
    setPage((value) => value + 1)
  }

  useEffect(() => {
    const intersection_observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        handleScroll()
      }
    })

    const control = document.getElementById(props.controlId)

    if (control) {
      intersection_observer.observe(control)
    }

    return () => intersection_observer.disconnect()
  }, [])

  return { limit, page }
}

export { useInfinityScroll }
