# Colrow
Simple toolset to build super-powered table components in React 🗓

> This project has been inspired by [downshift](https://github.com/paypal/downshift) project and [Advanced React Component Patterns](https://egghead.io/courses/advanced-react-component-patterns) online course. [Kent C. Dodds](https://kentcdodds.com/) thanks for creating these!

## Problem
Recently I faced this situation when you are supposed to deliver something for yesterday. I had to create a few similar components to present the same collection, however each single one in unique way:
- table
- carousel
- definition list

Of course all of these variations required sorting feature.

I couldn't find any existing library which already addresses that kind of problem. Therefore I wrote it all myself.

## Solution
As I mentioned, my inspiration was [downshift](https://github.com/paypal/downshift) project. Once I looked at its code I already knew I would like to use [render props pattern](https://reactjs.org/docs/render-props.html) for my project. This very pattern allows to easily decouple JSX syntax from the logic. This is really powerful, as you have full flexibility on how you structure your template while the logic remain the same and is at hand when needed.

## Demo
I prepared small demo that presents what I wrote about above. Two templates - totally different. One logic available via set of primitives. That's it. It works. Please, have a glance 🙃:

[![Edit colrow](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/5w7om43qqp?view=preview)

### Features
- [x] displays columns
- [x] displays rows
- [x] sorts collection by given column
- [x] sorting reset
- [ ] storybook
- [ ] paging
- [ ] predefined table template
