export interface EntityConfig {
  collectionName: string;
  info: {
    name: string;
    description: string;
  };
  privateAttributes: string[];
}
