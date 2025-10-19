# Storefront Components - Quick Start

Get a product layout running in 3 minutes.

## Step 1: Copy Files

Copy the Storefront folder to your project:

```bash
cp -r ui/src/components/Storefront /your-project/components/
```

## Step 2: Import in HTML

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Design system tokens (required) -->
  <link rel="stylesheet" href="./ui/styles/index.css">

  <!-- Component styles -->
  <link rel="stylesheet" href="./components/Storefront/Storefront.css">
</head>
<body>

  <!-- Use components -->
  <storefront-component layout="half" gap="l">
    <storefront-assets variant="primary" align="center">
      <img src="product.jpg" alt="Product">
    </storefront-assets>

    <storefront-form variant="surface-variant" align="start" padding="l">
      <h2>Product Name</h2>
      <p>$19.00</p>
      <button>Add to Cart</button>
    </storefront-form>
  </storefront-component>

  <!-- Component JavaScript (before closing body) -->
  <script type="module" src="./components/Storefront/Storefront.js"></script>
  <script type="module" src="./components/Storefront/StorefrontAssets.js"></script>
  <script type="module" src="./components/Storefront/StorefrontForm.js"></script>

</body>
</html>
```

## Step 3: Customize via Attributes

```html
<!-- Change layout ratio -->
<storefront-component layout="60-40" gap="m">

<!-- Change colors -->
<storefront-assets variant="secondary">

<!-- Change alignment -->
<storefront-form variant="primary" align="center" padding="xl">

<!-- Add aspect ratio -->
<storefront-assets aspect="16-9">
```

## Complete Attribute Reference

### `<storefront-component>`
- `layout`: `half`, `60-40`, `40-60`, `70-30`, `30-70`, `80-20`, `20-80`
- `gap`: `3xs`, `2xs`, `xs`, `s`, `m`, `l`, `xl`, `2xl`, `3xl`
- `constrain`: `true`, `false`

### `<storefront-assets>`
- `variant`: `primary`, `secondary`, `tertiary`, `surface`
- `align`: `start`, `center`, `end`, `stretch`
- `aspect`: `1-1`, `16-9`, `4-3`, `3-2`, `none`

### `<storefront-form>`
- `variant`: `surface`, `surface-variant`, `primary`, `secondary`
- `align`: `start`, `center`, `end`, `stretch`
- `padding`: `s`, `m`, `l`, `xl`

## Troubleshooting

**Components don't appear:**
- Check browser console for errors
- Ensure design system CSS is loaded first
- Verify JavaScript files load (check Network tab)

**Layout doesn't split:**
- Check browser width (splits at 768px+)
- Verify layout utilities are defined (`.l-split-*`)

**Colors are wrong:**
- Ensure design tokens are defined (`--color-primary`, etc.)
- Check theme import in `ui/styles/theme.css`

## Next Steps

- Read `README.md` for full API documentation
- See `StorefrontDefault.html` for more examples
- Check `ARCHITECTURE.md` to understand design decisions
