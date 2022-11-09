This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

* Request the necessary API keys, backend URL and KYB ID from [Quadrata Discord](https://discord.gg/Pe7Fx44NyA)
* Create a `.env` file in the root folder and define your API key and API URL:
```dotenv
# Only required for KYB flow
NEXT_PUBLIC_KYB_ID=your_kyb_id_here
NEXT_PUBLIC_KYB_BACKEND_URL=your_kyb_backend_url_here

# Only reqired for KYC flow
NEXT_PUBLIC_SPRINGLABS_API_KEY=your_api_key_here
NEXT_PUBLIC_SPRINGLABS_API_URL=your_api_url_here

# Only requred for KYC flow with a credit score check
NEXT_PUBLIC_CRED_API_KEY=youre_cred_api_here
NEXT_PUBLIC_CRED_API_URL=your_cred_url_here

```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```