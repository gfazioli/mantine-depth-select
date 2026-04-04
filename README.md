# Mantine Depth Select Component

<img alt="Mantine Depth Select" src="https://github.com/gfazioli/mantine-depth-select/blob/master/logo.jpeg" />

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/%40gfazioli%2Fmantine-depth-select?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-depth-select)
  [![NPM Downloads](https://img.shields.io/npm/dm/%40gfazioli%2Fmantine-depth-select?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-depth-select)
  [![NPM Downloads](https://img.shields.io/npm/dy/%40gfazioli%2Fmantine-depth-select?style=for-the-badge&label=%20&color=f90)](https://www.npmjs.com/package/@gfazioli/mantine-depth-select)
  ![NPM License](https://img.shields.io/npm/l/%40gfazioli%2Fmantine-depth-select?style=for-the-badge)

---

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

## Overview

This component is created on top of the [Mantine](https://mantine.dev/) library.
It requires **Mantine 9.x** and **React 19**.

The [Mantine Depth Select](https://gfazioli.github.io/mantine-depth-select/) component is a 3D stack select inspired by macOS Time Machine for React applications built with Mantine. Navigate through stacked cards with perspective transforms and smooth transitions.

## Features

- 🃏 **3D Stack Effect**: Cards stacked with perspective transforms (scale, translateY, opacity, blur)
- 🎛️ **Controlled & Uncontrolled**: Full control via `value`/`onChange` or automatic state management
- ⌨️ **Keyboard Navigation**: ArrowUp/Down, Home/End keys support
- 🖱️ **Scroll Navigation**: Mouse wheel and trackpad gesture support
- 📱 **Touch Support**: Swipe gestures for mobile devices
- 🔄 **Loop Mode**: Infinite navigation wrapping from last to first
- 🎮 **Built-in Controls**: Customizable arrow controls with positioning (right/left)
- 🧩 **Compound Component**: Use `DepthSelect.Controls` as children for full customization
- ♿ **Accessibility**: WAI-ARIA listbox pattern with proper roles and labels
- 🎨 **Styles API**: Extensive styling customization with `classNames` prop
- 📦 **TypeScript**: Full type safety out of the box

> [!note]
>
> → [Demo and Documentation](https://gfazioli.github.io/mantine-depth-select/) → [More Mantine Components](https://mantine-extensions.vercel.app/)

## Installation

```sh
npm install @gfazioli/mantine-depth-select
```
or

```sh
yarn add @gfazioli/mantine-depth-select
```

After installation import package styles at the root of your application:

```tsx
import '@gfazioli/mantine-depth-select/styles.css';
```

## Usage

```tsx
import { Card, Text } from '@mantine/core';
import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';

const data: DepthSelectItem[] = [
  { value: 'item-1', view: <Card p="lg" withBorder h="100%"><Text>Item 1</Text></Card> },
  { value: 'item-2', view: <Card p="lg" withBorder h="100%"><Text>Item 2</Text></Card> },
  { value: 'item-3', view: <Card p="lg" withBorder h="100%"><Text>Item 3</Text></Card> },
];

function Demo() {
  return <DepthSelect data={data} w={400} h={200} />;
}
```

## Sponsor

<div align="center">

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

Your support helps me:

- Keep the project actively maintained with timely bug fixes and security updates
- Add new features, improve performance, and refine the developer experience
- Expand test coverage and documentation for smoother adoption
- Ensure long-term sustainability without relying on ad hoc free time
- Prioritize community requests and roadmap items that matter most

Open source thrives when those who benefit can give back—even a small monthly contribution makes a real difference. Sponsorships help cover maintenance time, infrastructure, and the countless invisible tasks that keep a project healthy.

Your help truly matters.

💚 [Become a sponsor](https://github.com/sponsors/gfazioli?o=esc) today and help me keep this project reliable, up-to-date, and growing for everyone.

---

[![Star History Chart](https://api.star-history.com/svg?repos=gfazioli/mantine-depth-select&type=Timeline)](https://www.star-history.com/#gfazioli/mantine-depth-select&Timeline)
