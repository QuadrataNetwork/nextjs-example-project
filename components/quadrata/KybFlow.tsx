import { StyledQuadrataKyb } from '../styled/QuadrataKyb.styled';
import { CustomLoader } from '../CustomLoader';

// Constants
// Contact SpringLabs.com to request a KYB_ID and KYB_BACKEND_URL.
const KYB_ID = process.env.NEXT_PUBLIC_KYB_ID!;
const KYB_BACKEND_URL = process.env.NEXT_PUBLIC_KYB_BACKEND_URL!;

export const KybFlow = () => {
    return (
        <StyledQuadrataKyb kybId={KYB_ID} backendUrl={KYB_BACKEND_URL}>
            <CustomLoader />
        </StyledQuadrataKyb>
    );
};
