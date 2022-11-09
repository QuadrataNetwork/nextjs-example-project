import type { NextPage } from 'next';
import { useState } from 'react';
import { Container } from './index';
import { KycFlow } from '../components/quadrata/KycFlow';
import { KybFlow } from '../components/quadrata/KybFlow';

// Creating an enum to manage user types
enum UserType {
    INDIVIDUAL = 'INDIVIDUAL',
    BUSINESS = 'BUSINESS',
}

const PageAll: NextPage = () => {
    // State
    const [userType, setUserType] = useState<UserType>();

    return userType ? (
        <Container>{userType === UserType.INDIVIDUAL ? <KycFlow /> : <KybFlow />}</Container>
    ) : (
        <Container>
            <h1>Please select the desired Quadrata Passport type</h1>
            <button onClick={() => setUserType(UserType.INDIVIDUAL)}>Individual Passport</button>
            <button onClick={() => setUserType(UserType.BUSINESS)}>Business Passport</button>
        </Container>
    );
};

export default PageAll;
