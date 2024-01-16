import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';
import Spinner from '../ui/Spinner';
import { useGetUser } from '../features/authentication/hooks/useGetUser';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  const navigate = useNavigate();

  // Prevent route to /login if there is active user
  const { isAuthenticated, isLoadingUser, fetchStatus } = useGetUser();
  useEffect(() => {
    if (isAuthenticated) return navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  if (isLoadingUser || fetchStatus === 'fetching') return <Spinner />;

  return (
    <LoginLayout>
      <Logo />
      <Heading as='h4'>Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;



// NOTE: Re-work this functionality - once useEffect() runs there is ['user'] query created in the cache because of how useGetUSer() hook work -> find a way to remove this ['user'] query before triggering logging in proccess(btn click) (also preserve restriction to go to /login route if active user(which functionality useEffect actialy provides for now))
