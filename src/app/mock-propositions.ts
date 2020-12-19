import {PropositionModel} from './models/proposition';
import {formatDate} from '@angular/common';

// export class AppComponent  {
//   today = new Date();
//   jstoday = '';
//   constructor() {
//     this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
//   }
// }
export const PROPOSITIONS: PropositionModel[] = [
  {id: 1, name: 'Перша тестова пропозиція', authorId: 1, createDate: Date(), status: 1, images: [], description: 'some description'},
  {id: 2, name: 'Друга тестова пропозиція', authorId: 1, createDate: Date(), status: 1, images: [], description: 'some description'},
  {id: 3, name: 'Третя тестова пропозиція', authorId: 2, createDate: Date(), status: 1, images: [], description: 'some description'},
  {id: 4, name: 'Четверта тестова пропозиція', authorId: 3, createDate: Date(), status: 1, images: [], description: 'some description'}
];

