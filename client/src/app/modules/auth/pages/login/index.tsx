import React from 'react'
import { useLoginPageController } from './controller'
import { Input } from '../../../shared/components/input'
import { Container, Form, RememberMe, Section, SubmitButton } from './styles'

const LoginPage: React.FC = () => {
  const {
    username,
    password,
    rememberMe,
    onChangeUsername,
    onChangePassword,
    onChangeRememberMe,
    onSubmit,
    isValid,
  } = useLoginPageController()

  return (
    <Container>
      <Section>
        <Form onSubmit={onSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={onChangeUsername}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChangePassword}
          />
          <RememberMe active={rememberMe} onClick={onChangeRememberMe}>
            Manter conectado
          </RememberMe>
          <SubmitButton type="submit" disabled={!isValid()}>
            Login
          </SubmitButton>
        </Form>
      </Section>
    </Container>
  )
}

export { LoginPage }
