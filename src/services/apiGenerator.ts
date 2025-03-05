// Mock API generation service
export async function generateApiBlueprint(formData: any) {
  // Simulate API generation delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock response based on template
  const mockResponses: { [key: string]: any } = {
    ecommerce: {
      endpoints: [
        {
          method: 'GET',
          path: '/api/products',
          description: 'Retrieve a list of products with optional filtering and pagination',
          parameters: [
            { name: 'page', type: 'number', required: false },
            { name: 'limit', type: 'number', required: false },
            { name: 'category', type: 'string', required: false }
          ]
        },
        {
          method: 'POST',
          path: '/api/orders',
          description: 'Create a new order',
          parameters: [
            { name: 'products', type: 'array', required: true },
            { name: 'shippingAddress', type: 'object', required: true },
            { name: 'paymentMethod', type: 'string', required: true }
          ]
        },
        {
          method: 'PUT',
          path: '/api/cart/{id}',
          description: 'Update cart items',
          parameters: [
            { name: 'id', type: 'string', required: true },
            { name: 'quantity', type: 'number', required: true }
          ]
        }
      ],
      schema: {
        Product: {
          fields: [
            { name: 'id', type: 'string', required: true },
            { name: 'name', type: 'string', required: true },
            { name: 'price', type: 'number', required: true },
            { name: 'description', type: 'string', required: false },
            { name: 'category', type: 'string', required: true }
          ]
        },
        Order: {
          fields: [
            { name: 'id', type: 'string', required: true },
            { name: 'userId', type: 'string', required: true },
            { name: 'products', type: 'array', required: true },
            { name: 'total', type: 'number', required: true },
            { name: 'status', type: 'string', required: true }
          ]
        }
      },
      documentation: `
        <h1>E-commerce API Documentation</h1>
        <p>This API provides endpoints for managing an e-commerce platform, including product management, shopping cart operations, and order processing.</p>
        <h2>Authentication</h2>
        <p>All API endpoints require a valid JWT token in the Authorization header.</p>
        <h2>Rate Limiting</h2>
        <p>API requests are limited to 100 requests per minute per IP address.</p>
      `
    }
  };

  return mockResponses[formData.template] || mockResponses.ecommerce;
}