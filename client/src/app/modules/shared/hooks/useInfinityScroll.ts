import { useEffect, useState } from 'react'

interface Props {
  initialLimit?: number
  initialPage?: number
}

const useInfinityScroll = (props: Props) => {
  const [limit, setLimit] = useState(props.initialLimit || 10)
  const [page, setPage] = useState(props.initialPage || 1)

  const handleScroll = () => {
    setPage((value) => value + 1)
  }

  return { limit, page, handleScroll }
}

export { useInfinityScroll }
