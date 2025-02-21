# Vita Wallet Frontend Test

## Project Preview

This project is deployed on vercel. You can visit it clicking the following link:
[https://vita-wallet-malvaa.vercel.app/](https://vita-wallet-malvaa.vercel.app/)

### Or
## Deploy in localhost

Once you cloned this repository, install dependences using the command
```
yarn install
```

Then, run the development server:
```bash
npm run dev
# or
yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project files structure

```
vita-wallet-test
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ icons
│  │  ├─ banknote.svg
│  │  ├─ coin.svg
│  │  ├─ coins.svg
│  │  ├─ money-income.svg
│  │  └─ ui
│  │     ├─ arrow-left.svg
│  │     ├─ bitcoin.svg
│  │     ├─ calendar.svg
│  │     ├─ check.svg
│  │     ├─ chevron-down.svg
│  │     ├─ chile.svg
│  │     ├─ dollar-sign.svg
│  │     ├─ eye-off.svg
│  │     ├─ eye.svg
│  │     ├─ filter.svg
│  │     ├─ tether.svg
│  │     ├─ upload.svg
│  │     ├─ usdc.svg
│  │     └─ x.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ app-layout-container.tsx
│  │  ├─ auth
│  │  │  ├─ login
│  │  │  │  └─ page.tsx
│  │  │  └─ register
│  │  │     └─ page.tsx
│  │  ├─ dashboard
│  │  │  ├─ ayuda
│  │  │  │  └─ page.tsx
│  │  │  ├─ inicio
│  │  │  │  └─ page.tsx
│  │  │  ├─ intercambiar
│  │  │  │  ├─ layout.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ resumen
│  │  │  │     └─ page.tsx
│  │  │  ├─ layout.tsx
│  │  │  ├─ perfil
│  │  │  │  └─ page.tsx
│  │  │  ├─ recargar
│  │  │  │  └─ page.tsx
│  │  │  └─ transferir
│  │  │     └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ assets
│  │  └─ icons
│  │     ├─ banknote-icon.tsx
│  │     ├─ banknote.svg
│  │     ├─ coin-icon.tsx
│  │     ├─ coin.svg
│  │     ├─ coins-icon.tsx
│  │     ├─ coins.svg
│  │     ├─ dollar-bg-icon.tsx
│  │     ├─ dollar-bg.svg
│  │     ├─ index.ts
│  │     ├─ money-income-icon.tsx
│  │     ├─ money-income.svg
│  │     └─ ui
│  │        ├─ arrow-left.svg
│  │        ├─ bitcoin.svg
│  │        ├─ calendar.svg
│  │        ├─ check.svg
│  │        ├─ chevron-down.svg
│  │        ├─ chile.svg
│  │        ├─ dollar-sign.svg
│  │        ├─ eye-off.svg
│  │        ├─ eye.svg
│  │        ├─ filter.svg
│  │        ├─ index.ts
│  │        ├─ tether.svg
│  │        ├─ ui-icons.tsx
│  │        ├─ upload.svg
│  │        ├─ usa.svg
│  │        ├─ usdc.svg
│  │        └─ x.svg
│  ├─ components
│  │  ├─ balance-card
│  │  │  └─ balance-card.component.tsx
│  │  ├─ history-row
│  │  │  └─ history-row.component.tsx
│  │  ├─ sidebar
│  │  │  └─ sidebar.component.tsx
│  │  ├─ transaction-item
│  │  │  ├─ transaction-item.component.tsx
│  │  │  └─ transaction-skeleton.component.tsx
│  │  └─ UI
│  │     ├─ button
│  │     │  └─ button.component.tsx
│  │     ├─ icon
│  │     │  └─ icons.ts
│  │     ├─ input
│  │     │  └─ input.component.tsx
│  │     ├─ modal
│  │     │  ├─ modal.component.tsx
│  │     │  └─ modal.styles.css
│  │     ├─ select
│  │     │  └─ button-drop.component.tsx
│  │     └─ skeleton
│  │        └─ skeleton.component.tsx
│  ├─ constants
│  │  ├─ app-routes.constant.ts
│  │  ├─ nav-items.constant.tsx
│  │  └─ regex-patterns.constant.ts
│  ├─ context
│  │  ├─ exchange-data.context.tsx
│  │  ├─ session-expired.context.tsx
│  │  └─ user-data.context.tsx
│  ├─ HOC
│  │  └─ isAuthenticated.hoc.tsx
│  ├─ hooks
│  │  ├─ useBalFormat.hook.tsx
│  │  ├─ useExchange.hook.tsx
│  │  ├─ useFormatText.hook.tsx
│  │  ├─ useOutsideClick.hook.tsx
│  │  ├─ usePriceshook.tsx
│  │  ├─ useProfile.hook.tsx
│  │  ├─ useTransactions.hook.tsx
│  │  └─ useUserToken.hook.tsx
│  ├─ interfaces
│  │  ├─ balance.interfaces.ts
│  │  ├─ icons.ts
│  │  ├─ transactions.interfaces.ts
│  │  └─ user-data.interfaces.ts
│  └─ services
│     ├─ auth.service.ts
│     ├─ base-url.ts
│     ├─ exchange.service.ts
│     ├─ prices.service.ts
│     ├─ profile.service.ts
│     └─ transactions.service.ts
├─ tailwind.config.ts
├─ tsconfig.json
└─ yarn.lock

```
