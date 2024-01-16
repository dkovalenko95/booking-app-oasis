import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetUser } from '../features/authentication/hooks/useGetUser';
import Spinner from '../ui/Spinner';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load authenticated user
  const { isLoadingUser, isAuthenticated, fetchStatus } = useGetUser();
  
  // 2. If NO auth user, redirect to '/login' page
  useEffect(() => {
    if (!isAuthenticated && !isLoadingUser && fetchStatus !== 'fetching') navigate('/login');
  }, [isAuthenticated, isLoadingUser, fetchStatus, navigate]);
  // consider to get rid of useEffect() (redirect bug fixed with 'fetchStatus') 
  
  // 3. While loading, show spinner
  if (isLoadingUser || fetchStatus === 'fetching') {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  };
  
  // 4. If there IS user, render the app 
  if (isAuthenticated) return children;
};

export default ProtectedRoute;