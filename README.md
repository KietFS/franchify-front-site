
## Project Description
Franchsify is an multi-tenant application using multi-tenant logic. Every tenant manage their own resources, data, ensuring stable and security for their customer. This project is written with various tech stacks. This repo is the user front-site of the system

* **Framework**: NextJS 14 with App Router with optimization for fetching data and caching, type ensurance with a sub-repo that have all the interfaces, hooks generated base on the backend code base with a CLI which is written my myself.
* **Styling**: Using TailwindCSS with dynamic tailwind config file base on the color scheme of the tenant setting on the admin application, beside that using some MUI component.
* **State and Data Mangement**: Using Redux toolkit, redux persistent, using technique with custom hooks to prevent unecessary fetching data.
* **Testing**: Using playwright for end-to-end testing before deploy, consider adding more unique techs to ensure stability of the code base.
* **CI/CD**: Using github workflow for CI/CD, run jobs like check types, run end-to-end & unit test


## Tenant example
![Screenshot 2024-12-03 at 08 33 31](https://github.com/user-attachments/assets/b91a49de-c12c-4e56-bcb7-387ac5b1fa74)
![Screenshot 2024-12-24 at 23 53 02](https://github.com/user-attachments/assets/007b1a0a-b37a-4eee-926f-54a4902ea981)



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

