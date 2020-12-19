export class PropositionModel {
  id: number;
  name: string;
  createDate: string;
  authorId: number;
  description: string;
  status: number;
  location: [number, number];
  images: [];
  authorName: string;
  authorPhoneNumber: string;
}
