# Shrine

Hi! 👋 Shrine is a little declarative drawing library. With Shrine, you figure out what you're going to draw first, then you draw it. This is differemt from imperative interfaces that work by telling the computer, "Okay, draw a branch. Done? Great, now draw a leaf."

The declarative approach has a few advantages:

- It's easy to front-load expensive computations, making your animations buttery smooth.
- You can process your data in multiple stages.
- The actual draw code is all pure functions, which makes debugging way easier.
- Making new abstractions is easy.

It also has some disadvantages:

- It's a little more code than using the imperative browser APIs directly, which makes your site load slower and [has an environmental impact](https://solar.lowtechmagazine.com/2018/09/how-to-build-a-lowtech-website.html).
- The computer does extra work and uses more memory.

# Getting started

```
yarn add
```

```js
import Shrine from '@noise-machines/shrine'
const shrine = new Shrine()

// All values you pass to Shrine should
// be between 0 and 1, both inclusive. In
// the future I might implement the ability
// to use denormalized pixel values too.
shrine.draw({
  type: 'circle',
  point: {
    x: 0.5,
    y: 0.5
  },
  fillStyle: 'pink'
})
```
