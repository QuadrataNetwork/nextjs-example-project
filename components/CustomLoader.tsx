import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFan } from '@fortawesome/free-solid-svg-icons/faFan';
import styled from 'styled-components';

// Creating a custom loader (optional)
// This component will be shown during various loading states in the onboarding flow, otherwise, a "Loading..." text will be shown
const CustomLoaderContainer = styled.div`
    margin: 0 auto;
    padding: 3rem;
    text-align: center;
    font-family: sans-serif;
    letter-spacing: 0.05rem;
`;

export const CustomLoader = () => (
    <CustomLoaderContainer>
        <FontAwesomeIcon icon={faFan} size="3x" color="#0c63e4" spin />
        <h5>PLEASE WAIT...</h5>
    </CustomLoaderContainer>
);
