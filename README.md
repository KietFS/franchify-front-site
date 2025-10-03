
## Project Description
Franchsify is an multi-tenant application using multi-tenant logic. Every tenant manage their own resources, data, ensuring stable and security for their customer. This project is written with various tech stacks. This repo is the user front-site of the system

* **Framework**: NextJS 14 with App Router with optimization for fetching data and caching, type ensurance with a sub-repo that have all the interfaces, hooks generated base on the backend code base with a CLI which is written my myself.
* **Styling**: Using TailwindCSS with dynamic tailwind config file base on the color scheme of the tenant setting on the admin application, beside that using some MUI component.
* **State and Data Mangement**: Using Redux toolkit, redux persistent, using technique with custom hooks to prevent unecessary fetching data.
* **Testing**: Jest, Playwright, Axe core
* **CI/CD**: Github Actions
* * **Monitoring**: Sentry NextJS SDK
  * 
## Key Features
* Search Product.
* Filter, Sort Product.
* View Product, Add to Cart.
* View Cart.
* Orders, tracking orders
* Checkout.
* Order tracking service.


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

