# CEDAV - Banking App

Banking application powered by NextJS and FastAPI. Connect in real time with your bank via Plaid APIs.

It lets you manage your budgets and spending categories, and several bank accounts can be connected at the same time and accessed by different users.

<img alt="Dashboard in dark and light mode" src="screenshots/dashboard_dark.png" />

## Application
Functionalities:
- Directly connected to your bank account to fetch bank data
- Automatically categorizes transactions
- Budgeting tools
- Expense tracking by category
- Multiple accounts connected

Technologies:
- NextJS
- Chakra UI
- TypeScript
- Vercel
- Plaid API
- Python
- Supabase
- Prisma ORM

Backend Repository:
https://github.com/davidmonnom/banking-backend

---

Please note that this application is not yet in production. If you try to connect to it, you'll get an access error.
However, you can download it and add your own API identifier via Google & Plaid.

## Setup

Here are the necessary environment variables to place in the .env file
```
NEXT_PUBLIC_API_URL=https://api.cedav.be
NEXT_PUBLIC_API_DOMAIN=cedav.be
```

Install dependencies via npm with `npm install`.
Start the server with `npm run dev`.

Follow the backend server installation instructions.

## Screenshots
#### Dashboard
<p float="left">
  <img alt="Dashboard in dark and light mode" src="screenshots/dashboard_light.png" width="300" />
  <img alt="Dashboard in dark and light mode" src="screenshots/dashboard_dark.png" width="300" />
</p>

#### Transaction
<p float="left">
  <img alt="Transaction in dark and light mode" src="screenshots/transaction_light.png" width="300" />
  <img alt="Transaction in dark and light mode" src="screenshots/transaction_dark.png" width="300" />
</p>

#### Category
<p float="left">
  <img alt="Category in dark and light mode" src="screenshots/category_light.png" width="300" />
  <img alt="Category in dark and light mode" src="screenshots/category_dark.png" width="300" />
</p>

#### Saving
<p float="left">
  <img alt="Saving in dark and light mode" src="screenshots/saving_light.png" width="300" />
  <img alt="Saving in dark and light mode" src="screenshots/saving_dark.png" width="300" />
</p>

## Video
[![Watch the video](screenshots/dashboard_dark.png)](screenshots/cedav.mp4)

## History

Initially, this application was created as a challenge to myself. It's not finished yet, and some features are still missing.

Here are the initial wireframes

#### Dashboard
![image](https://github.com/user-attachments/assets/4b23311f-2e1d-451e-8563-57ea9743060b)

#### Incomes
![image](https://github.com/user-attachments/assets/5d5a8dcc-59e5-4ce1-821e-77acd473da57)

#### Expenses
![image](https://github.com/user-attachments/assets/e0d046b6-d68b-47f2-a272-8a5a5ad6100c)

#### Recurring expenses
![image](https://github.com/user-attachments/assets/dc97a8f1-355b-4549-afa2-c286ef713cea)

#### Settings
![image](https://github.com/user-attachments/assets/007b042c-5586-4e76-a5e1-54113006556d)

