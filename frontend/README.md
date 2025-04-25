# Research Data Exchange Platform - Frontend

This is the frontend application for the Research Data Exchange Platform, built with Next.js and TypeScript.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address_here
   NEXT_PUBLIC_INFURA_PROJECT_ID=your_infura_project_id_here
   NEXT_PUBLIC_INFURA_PROJECT_SECRET=your_infura_project_secret_here
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `NEXT_PUBLIC_CONTRACT_ADDRESS`: The deployed address of the ResearchDataExchange smart contract
- `NEXT_PUBLIC_INFURA_PROJECT_ID`: Your Infura project ID for IPFS and Ethereum node access
- `NEXT_PUBLIC_INFURA_PROJECT_SECRET`: Your Infura project secret

## Features

- Wallet connection using MetaMask
- Data contribution with IPFS storage
- Digital twin creation and management
- Smart contract interaction for data access control

## Development

The application uses:
- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS for styling
- Web3.js for blockchain interaction
- IPFS for decentralized storage

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
