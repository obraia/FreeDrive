import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPage } from '../../../../../infrastructure/redux/reducers/pages'

import {
  clearAllSelections,
  clearFiles,
} from '../../reducers/files.reducer'

interface Props {
  parentId: string
  containerId: string
}

function useSearchPageController(props: Props) {
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
        title: 'Resultados da pesquisa - Free Drive',
        current: '/search',
        pathSequence: [{_id: '', name: 'Resultados da pesquisa'}],
      }),
    )

    bindEvents()

    return () => {
      unbindEvents()
      dispatch(clearAllSelections())
      dispatch(clearFiles())
    }
  }, [props.parentId])

  return {}
}

export { useSearchPageController }
