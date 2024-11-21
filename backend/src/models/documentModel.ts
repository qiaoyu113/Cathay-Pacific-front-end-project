import { faker } from '@faker-js/faker';

export interface Document {
  id: string;
  title: string;
  description: string;
  modifiedBy: string;
  modifiedDate: string;
  category: string;
  location: string;
}

// Generate dynamic mock documents using faker
export const mockDocuments: Document[] = Array.from({ length: 100 }, (_, index) => ({
  id: faker.string.uuid(), // Corrected to use `faker.string.uuid()`
  title: faker.company.catchPhrase(),
  description: faker.lorem.sentence(),
  modifiedBy: faker.person.fullName(), // Updated for the latest faker version
  modifiedDate: faker.date.past().toISOString(),
  category: index % 2 === 0 ? "PDF" : "Excel",
  location: faker.location.city(), // Updated for the latest faker version
}));
