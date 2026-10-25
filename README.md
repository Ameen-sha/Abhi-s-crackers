# WhatsApp Crackers Catalogue Website

A responsive front-end website with product categories, search, quantity selection, estimated total, customer details, and WhatsApp order-enquiry messages.

## Run it
1. Extract the ZIP file.
2. Open `index.html` in a browser, or use VS Code with the Live Server extension.
3. To publish it, upload the files to a static web host.

## Important: configure your business details
Open `script.js` and change:
- `SHOP_NAME` to your real shop name.
- `WHATSAPP_NUMBER` to your WhatsApp number, digits only, including country code. For India use `91` followed by your 10-digit number, e.g. `919876543210`.
- Edit the `products` array to replace sample products, prices, categories, descriptions and emoji.

The sample number is not a real shop number. Update it before sharing the site with customers.

## How orders work
Customers choose products and quantities, fill in their details, then click the WhatsApp button. The browser opens WhatsApp with a pre-filled message. The customer must press Send in WhatsApp. This website does not process payments or automatically send messages in the background.

## Product photos
This starter version uses emoji illustrations so it works offline without external image files. You can replace each product art area with product images later.
