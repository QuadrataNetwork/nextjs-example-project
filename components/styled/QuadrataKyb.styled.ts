// Adding custom styles to the KYB form (optional)
import styled from 'styled-components';
import { QuadrataKyb } from '@quadrata/kyb-react';

export const StyledQuadrataKyb = styled(QuadrataKyb)`
    letter-spacing: 0.03rem;
    font-family: sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;

    h1 {
        text-align: center;
        font-size: 2rem;
    }

    h2 {
        margin-bottom: 2rem;
    }

    p {
        margin: 0;
        padding: 0.5rem 0;
    }

    a {
        color: #0c63e4;
        display: inline-block;
    }

    textarea {
        min-height: 6rem;
    }

    section {
        padding: 1rem 0;
        &.quad-section-buttons {
            display: flex;
            justify-content: space-between;
            &.quad-section-buttons-single {
                justify-content: center;
            }
        }
    }

    label {
        font-size: 0.85rem;
        &.quad-label-input,
        &.quad-label-textarea,
        &.quad-label-file {
            display: inline-block;
            text-transform: uppercase;
            letter-spacing: 0.07rem;
            color: lightslategrey;
        }
    }

    textarea,
    input[type='text'],
    input[type='email'],
    input[type='tel'],
    select {
        box-sizing: border-box;
        margin: 0.2rem 0;
        padding: 1rem;
        border-radius: 0.5rem;
        border: none;
        background: aliceblue;
        min-width: 100%;
        appearance: none;
        font-family: inherit;
    }

    button.quad-button {
        margin: 0.2rem 0;
        white-space: nowrap;
        padding: 1rem 1.8rem;
        border: none;
        color: white;
        background: lightslategrey;
        text-transform: uppercase;
        text-decoration: none;
        font-weight: bold;
        letter-spacing: 0.05rem;
        border-radius: 0.5rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        &.quad-button-primary {
            background: #0c63e4;
        }
        &.quad-button-toggle {
            padding: 0;
            border: none;
            background: transparent;
            box-shadow: none;
            color: black;
        }
        input[type='checkbox' i] {
            margin: 0 0.4rem 0 0;
        }
    }

    .quad-field-container {
        margin-bottom: 2rem;
        & > small {
            color: lightslategrey;
        }
    }

    .quad-file-upload-container {
        display: flex;
        & > input.quad-input-file {
            min-width: auto;
            border-radius: 0.5rem 0 0 0.5rem;
            width: 100%;
        }
        & > button.quad-button {
            border-radius: 0 0.5rem 0.5rem 0;
        }
    }

    .quad-field-label {
        display: flex;
        justify-content: space-between;
    }

    .quad-section-contact-links {
        display: flex;
        justify-content: space-between;
    }
    .quad-error-message-container {
        font-size: 0.8rem;
        color: darkred;
        text-align: center;
    }
    .quad-section-quadrata-logo {
        padding: 2rem 0;
        display: flex;
        justify-content: center;
        & .quad-svg-quadrata-logo {
            width: 12rem;
        }
    }

    .quad-field-container-issuer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1%;
        & select {
            min-width: initial;
            width: 100%;
        }
    }

    .quad-section-complete-issuer {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2%;
    }

    .quad-svg-springlabs-logo {
        width: 3rem;
        height: 3rem;
    }
`;
