import { BaseRepository } from '../../../shared/repositories/base.repository'
import { SessionDTO, SessionEntity } from '../../domain/entities/session.entity'

class SessionRepository extends BaseRepository<SessionDTO> {
  constructor() {
    super(SessionEntity)
  }
}

export { SessionRepository }
