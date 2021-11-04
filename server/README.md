# API Documentation - Product Information:

---

## API Information:

- **Purpose:**
  - The Product Information API endpoint will:
    1. Show all products in our store.
    2. Provide detailed information for each product.
    3. List any related product(s).
    <p></p>
- **API Documentation Reference**:
  - [Product Information](https://learn-2.galvanize.com/cohorts/2910/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/products.md)

---

## API Endpoints:

1. ### List Products [Method: GET Request]:

   1. **API End Point:**
      - Base API: https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products
      - Client API: http://localhost:3000/api/products
   2. **Purpose:**
      - Retrieves the list of products within our store.
   3. **Parameters:**

      | Parameter | Type    | Description                                               |
      | --------- | ------- | --------------------------------------------------------- |
      | page      | integer | Selects the page of results to return. Default 1.         |
      | count     | integer | Specifies how many results per page to return. Default 5. |

      - _Page Parameter_:

        - Page API Endpoint: http://localhost:3000/api/products/?page=[Page Number]
        - Example: http://localhost:3000/api/products/?page=2

      - _Count Parameter_:
        - Count API Endpoint: http://localhost:3000/api/products/?count=[Product Count]
        - Example: http://localhost:3000/api/products/?count=10

   4. **Sample Data:**

   ```
      [
        {
          "id": 1,
          "name": "Camo Onesie",
          "slogan": "Blend in to your crowd",
          "description": "The So Fatigues will wake you up and fit you in.",
          "category": "Jackets",
          "default_price": "140"
        }
      ]
   ```

2. ### Product Information [Method: GET Request]:

   1. **API End Point:**
      - Base API: https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products/:product_id
      - Client API: http://localhost:3000/api/products/:product_id
   2. **Purpose:**
      - Returns all product level information for a specified product id
   3. **Parameters:**

      | Parameter  | Type    | Description                          |
      | ---------- | ------- | ------------------------------------ |
      | product_id | integer | Required ID of the Product requested |

      - _Product Information Parameter Example_:
        - http://localhost:3000/api/products/61576

   4. **Sample Data:**

   ```
     {
       "id": 11,
       "name": "Air Minis 250",
       "slogan": "Full court support",
       "description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
       "category": "Basketball Shoes",
       "default_price": "0",
       "features": [
         {
           "feature": "Sole",
           "value": "Rubber"
         },
         {
           "feature": "Material",
           "value": "FullControlSkin"
         },
       ],
     }
   ```

3. ### Product Styles [Method: GET Request]:

   1. **API End Point:**
      - Base API: https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products/:product_id/styles
      - Client API: http://localhost:3000/api/products/:product_id/style
   2. **Purpose:**
      - Returns the all styles available for the given product.
   3. **Parameters:**
      | Parameter | Type | Description |
      | ---------- | ------- | ------------------------------------ |
      | product_id | integer | Required ID of the Product requested |

      - _Product Styles Parameter Example_:
        - http://localhost:3000/api/products/61576/style

   4. **Sample Data:**

   ```
     {
       "product_id": "1",
       "results": [
          {
            "style_id": 1,
            "name": "Forest Green & Black",
            "original_price": "140",
            "sale_price": "0",
            "default?": true,
            "photos": [
              {
                "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
                "url": "urlplaceholder/style_1_photo_number.jpg"
              },
              {
                "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
                "url": "urlplaceholder/style_1_photo_number.jpg"
              }
            ],
            "skus": {
              "37": {
                "quantity": 8,
                "size": "XS"
              },
              "38": {
                "quantity": 16,
                "size": "S"
              },
              "39": {
                "quantity": 17,
                "size": "M"
              },
            }
          }
        ]
     }
   ```

4. ### Related Product [Method: GET Request]:

   1. **API End Point:**
      - Base API: https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products/:product_id/related
      - Client API: http://localhost:3000/api/products/:product_id/related
   2. **Purpose:**
      - Returns the id's of products related to the specified product.
   3. **Parameters:**
      | Parameter | Type | Description |
      | ---------- | ------- | ------------------------------------ |
      | product_id | integer | Required ID of the Product requested |

      - _Related Product Parameter Example_:
        - http://localhost:3000/api/products/61576/related

   4. **Sample Data:**

   ```
    [
      2,
      3,
      8,
      7
    ],
   ```

---
