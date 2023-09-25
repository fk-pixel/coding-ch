This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

Or you can vist live demo page: [coding-ch.vercel.app/](https://coding-ch.vercel.app)

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Project Process

#### Problem: Sales Taxes

Displaying taxable products as a post-sale total output by sale type

### Tech Stack

Adopted with Next.js TypeScript for modern framework usage

### Data Structure

The user interface was designed at the very beginning of the problem.
Displaying on a single page was preferred as an easily understandable format for output, such as which inputs can be used for what purposes.
For the data structure, first a product data was created as json. (app > data > product.json)
Options similar to the desired inputs are configured here according to their own ids.
Product and sales quantity were also combined with piece entity as number.
I wanted a purchase to be possible in different quantities.
A Sale interface was created for this.
Each of these sales would eventually be added to a basket, so there would have to be sales and baskets in all of them.
Thus, the outputs could be distributed to different baskets.
However, I thought it would be useful to have a feature like add to cart type here.
That's why I created add to cart type.
This feature is shown to the user with a radio button at the beginning of the first component.
By default, the current option is active.
However, if the user wants to add a product to another cart, they should only select the add to new cart option from here.
In this way, baskets can also be listed on outputs.

### Outputs

Each add action is forwarded to a cart with updated date data.
If the number of sales products is 1, this means that a basket will only be represented by the date it was created (created at: '').
However, when multiple products are added, the latest date data is also shown as the update date in the shopping card footer (updated at: '').
All baskets are represented in a card (TaxCard).
Each comes unique with its own number.
Helper functions have been designed for Sales Taxes and Date manipulations.
All helper functions are defined in the utils folder (app > \_utils).
