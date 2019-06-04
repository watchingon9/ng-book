import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Author</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody *ngFor="let book of books; let i = index">
        <tr>
          <th scope="row">{{ i + 1 }}</th>
          <td>
            <a href="#tog{{ i + 1 }}" data-toggle="collapse">{{
              book.title
            }}</a>
          </td>
          <td>{{ titleCase(book.author) }}</td>
          <td>
            {{ isAvailable(i) ? 'AVAILABLE' : '' }}
          </td>
        </tr>
        <tr>
          <td style="padding: 0"></td>
          <td colspan="3" style="padding: 0">
            <div id="tog{{ i + 1 }}" class="collapse">
              <table class="table table-bordered">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Borrowed Date</th>
                  <th scope="col">Returned Date</th>
                </tr>
                <tr *ngFor="let borrower of book.borrowers">
                  <td>{{ titleCase(borrower.name) }}</td>
                  <td>
                    {{ borrower.borrowedDate | date: dateFormat }}
                  </td>
                  <td>{{ borrower.returnedDate | date: dateFormat }}</td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dateFormat = 'd MMM, y';
  books = [
    {
      id: 1,
      title: 'Learning C#: A Practival Approach (Volume 2)',
      author: 'bruce e. scurter',
      borrowers: [
        {
          name: 'john doe',
          borrowedDate: '2017-12-22',
          returnedDate: '2018-01-19'
        },
        {
          name: 'greg stuart',
          borrowedDate: '2018-02-25',
          returnedDate: null
        }
      ]
    },
    {
      id: 2,
      title:
        'Python: For Beginners: A Crash Course Guide to Learn Python in 1 Week',
      author: 'timothy c. needham',
      borrowers: [
        {
          name: 'philip stans',
          borrowedDate: '2016-09-12',
          returnedDate: '2016-09-30'
        },
        {
          name: 'chris vons',
          borrowedDate: '2018-04-01',
          returnedDate: '2018-04-02'
        },
        {
          name: 'keith jones',
          borrowedDate: '2018-08-01',
          returnedDate: '2018-04-02'
        }
      ]
    }
  ];

  constructor() {}

  isAvailable(id: number) {
    const borrowers = this.books
      .filter(x => x.id === id)
      .map((book: any) => {
        return book.borrowers;
      })[0];

    if (!borrowers) {
      return true;
    }

    if (borrowers && borrowers.some(x => x.returnedDate == null)) {
      return false;
    }

    return false;
  }

  // https://stackoverflow.com/questions/32589197/capitalize-first-letter-of-each-word-in-a-string-javascript/32589256
  titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }
}
