import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearAllSelections, clearFiles } from '../../reducers/files.reducer'
import { setPage } from '../../../../../infrastructure/redux/reducers/pages'

interface Props {
  containerId: string
}

function useFavoritesPageController(props: Props) {
  const dispatch = useDispatch()

  const clearSelection = () => {
    dispatch(clearAllSelections())
  }

  const bindEvents = () => {
    const container = document.getElementById(props.containerId)
    container?.addEventListener('mousedown', clearSelection)
  }

  const unbindEvents = () => {
    const container = document.getElementById(props.containerId)
    container?.removeEventListener('mousedown', clearSelection)
  }

  useEffect(() => {
    dispatch(
      setPage({
        title: 'Favoritos - Free Drive',
        current: '/drive',
        pathSequence: [{ _id: '1', name: 'Favoritos' }],
      }),
    )

    bindEvents()

    return () => {
      unbindEvents()
      dispatch(clearAllSelections())
      dispatch(clearFiles())
    }
  }, [])

  return {}
}

export { useFavoritesPageController }
