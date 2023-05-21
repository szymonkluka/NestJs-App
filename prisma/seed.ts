import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Canon EOS 50D',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c789c8a28357',
      name: 'KODAK AZ401',
      price: 879,
      description: 'Kodak compact digital camera',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c789c8a28468',
      name: 'SONY α7 IV',
      price: 13499,
      description: 'It is equipped with a full-frame matrix with a resolution of 24.2 megapixels with sensitivities of 100-51200 ISO',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c789c8a28579',
      name: 'Panasonic Lumix S5II',
      price: 9999,
      description: 'The Panasonic S5II mirrorless camera delivers uncompromising image quality',
    },
  ];
}

function getClients() {
  return [
    {
      id: '1b5c202e-149b-46f7-a998-7a1e5e7ad3e1',
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main Street, London',
    },
    {
      id: '1b5c202e-149b-46f7-a998-7a1e5e7ad3e2',
      name: 'Arianna Grande',
      email: 'adrianna@example.com',
      address: '131 S. Rodeo Drive, Suite 100, Beverly Hills, CA 90212',
    },
    {
      id: '1b5c202e-149b-46f7-a998-7a1e5e7ad3e3',
      name: 'Izabela Kajko',
      email: 'izabela@example.com',
      address: 'Adama Mickiewicza 40d, 72-420 Dziwnow',
    },
    {
      id: '1b5c202e-149b-46f7-a998-7a1e5e7ad3e4',
      name: 'Caroline Essex',
      email: 'caroline@example.com',
      address: 'Glenmore Rd 26',
    },
  ];
}

function getOrders() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      clientId: '1b5c202e-149b-46f7-a998-7a1e5e7ad3e1',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
      clientId: '1b5c202e-149b-46f7-a998-7a1e5e7ad3e2',
      productId: 'fd105551-0f0d-4a9f-bc41-c789c8a28357',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
      clientId: '1b5c202e-149b-46f7-a998-7a1e5e7ad3e3',
      productId: 'fd105551-0f0d-4a9f-bc41-c789c8a28468',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17263',
      clientId: '1b5c202e-149b-46f7-a998-7a1e5e7ad3e4',
      productId: 'fd105551-0f0d-4a9f-bc41-c789c8a28579',
    },

  ];
}

async function seed() {
  await Promise.all(
    getProducts().map(async (product) => {
      const existingProduct = await db.product.findUnique({ where: { id: product.id } });
      if (!existingProduct) {
        return db.product.create({ data: product });
      }
    })
  );

  await Promise.all(
    getClients().map((client) => {
      return db.client.create({ data: client });
    })
  );

  await Promise.all(
    getOrders().map(({ productId, clientId }) => {
      return db.order.create({
        data: {
          product: {
            connect: { id: productId },
          },
          client: {
            connect: { id: clientId },
          },
        },
      });
    })
  );
}

seed();