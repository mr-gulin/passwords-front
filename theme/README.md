# Theme
Theme is a bunch of useful scss mixins which can help speed up style writing

## Set up
1. Place your colors in `theme/colors/_variables.scss`
   ```scss
   $colors: (
       colorName: #000000,
       colorName2: yellow,
       colorName3: rgb(255, 255, 255)
   )
   ```
2. Put your fonts files to `assets/fonts`
3. Include fonts in `theme/fonts/_declarations.scss` using `@font-face`
4. Put breakpoints values in `theme/media/_variables.scss` in `$breakpoints` map.
    ```scss
    $breakpoints: (
        375: (
            null,
            767,
        ),
        1024: (
            768,
            1440,
        ),
        1920: (
            1441,
            null
        )
    );
    ```
   This map above means that we will scale up to 767 pixels wide window using 375 scale factor (`12px` from design will be `12 / 100vw * 375`).
   From 768 and up to 1440 pixels wide window we will use scaleFactor 1024.
   And from 1441 to infinity pixels wide window we will use scaleFactor 1920.
5. Edit `$typography` map in `theme/fonts/_variables.scss`. Use the following as example:
    ```scss
    $typography: (
        variantName: (
            font-size: (
                sizes: 20 40 60,
                max-sizes: 16px 36px 58px
            ),
            font-weight: 400,
            line-height: 1.2 1 1,
            letter-spacing: -0.01em 0 0,
        )
    )
    ```

## Types
### `$colors`
This is a map located in `theme/colors/variables`.

The key is a name of the color which will be used later when using `color` mixin.
The value is any valid CSS color: HEX, rgb, rgba or word (like `yellow`, `red` etc.)

```scss
// theme/colors/_variables.scss
$colors: (
    colorName: #FF0000,
    colorName2: rgb(255, 255, 255)
);
```
```scss
// my-component-style.module.scss
@use 'theme';

.class {
    theme.color(colorName); // #FF0000
}
```

### `$breakpoints`
This is a map located in `theme/media/_variables.scss`.<br>
`scaleFactor`: number from design layout (will be used to scale things)<br>
`breakpointFrom`: null or positive number<br>
`breakpointTo`: null or positive number<br>

When the window width is in between `breakpointFrom` and `breakpointTo`, we will use
given `scaleFactor` to scale.<br>
`N` pixels in design will be `N / 100vw * scaleFactor`
```scss
// theme/media/_variables.scss
$breakpoints: (
        scaleFactor1: ( breakpointFrom1, breakpointTo1 ),
        scaleFactor2: ( breakpointFrom2, breakpointTo2 )
)
```
Insert the values from your design. For example, if you have Figma design for desktop and mobile, check the widths of mobile artboard and desktop artboard and insert here. Later you will use numeric values directly from design and they will be scaled: `calc(100vw / $breakpointValue * $valueFromDesign)`

This is transformed to something like this:
```css
@media screen and (max-width: 374px) {
    /* this breakpoint is also scaled using 
       the first breakpoint value
       e.g. calc(100vw / 375 * $value); */
}

@media screen and (min-width: 375px) and (max-width: 759px) {}

@media screen and (min-width: 760px) and (max-width: 1439px) {}

@media screen and (min-width: 1440px) {}
```

The order and count of numbers in this array is used in `$typography` object.

### `$typography`
This is a map which contains all typography variants used on website.

```scss
$typography: (
    variantName: (
        font-size: (
            sizes: 20 40 60,
            max-sizes: 16px 36px 58px
        ),
        font-weight: 400,
        line-height: 1.2 1 1,
        letter-spacing: -0.01em 0 0,
    )
)
```

Let's break down the props.
1. `variantName` – name of the font variant. Choose the one you like, for example, `heading1`, `caption`, `body`.
2. `font-size` (required) – a map with 2 properties: `sizes` and `max-sizes`.
   1. `sizes` (required) – a list of font-sizes values for each breakpoint. Numbers only.
   2. `max-sizes` (optional) – a list of maximum sizes for each breakpoint. Values with units. Values will not be transformed or scaled.
3. `font-weight` (optional) – a list of font-weights. Any `font-weight` values. Values will not be transformed or scaled.
4. `line-height` (optional) – a list of line-heights. Any `line-height` value. Values will not be transformed or scaled.
5. `letter-spacing` (optional) – a list of letter-spacings. Any `line-height` value. Values will not be transformed or scaled.

**Why there are multiple values? The rule.**
1. Count of values should be less or equal count of `$breakpoints`
2. The 1st value will be used for 1st breakpoint, `sizes` will be scaled. For example, our first breakpoint is `375`, so `20` will be used for `font-size` from `375px` to `759px` width and scaled until `16px` (from `max-sizes`) is reached
3. The 2d value will be used for 2d breakpoint. If there is no 2d value, 1st value will be used.
4. The 3d value will be used for 3d breakpoint. If there is no 3d value, 1st value will be used.
5. ... and so on. If there is no value on the position of corresponding breakpoint, the 1st value will be used.

## Usage
1. Include `theme` module in your `scss` file:
    ```scss
    @use 'theme';
    ```
2. Color usage
   ```scss
   @use 'theme';
   
   .class {
       color: theme.color(colorName);
   }
   ```
3. Typography usage
   ```scss
   @use 'theme';
   
   .class {
      @include theme.typography(variantName);
   }
   ```
4. Sizes usage
   ```scss
   @use 'sass:map';
   @use 'theme';
   
   $sizes: (
       container: (
           padding: 20 40,
           width: 100
       ),
       item: (
           margin-left: 10
       )
   );
   
   .container {
       @include theme.sizes(map.get($sizes, container));
   
      // other properties
   }
   
   .item {
      @include theme.sizes(map.get($sizes, item));
      
      // other properties
   }
   ```
