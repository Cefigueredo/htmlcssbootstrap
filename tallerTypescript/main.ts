import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student} from './student.js';

import { dataStudents } from './dataStudents.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const inputSearchBoxMin: HTMLInputElement = <HTMLInputElement>document.getElementById("minimoBox")!;
const inputSearchBoxMax: HTMLInputElement = <HTMLInputElement>document.getElementById("maximoBox")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
let columnas: string[] = ["Nombre","Codigo", "Identificacion", "Edad", "Direccion", "Telefono"];
let studentsTbody: HTMLElement = document.getElementById('students')!;

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudents, columnas);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentInTable(students: Student[], columnas: string[]): void {
  console.log('Desplegando estudiante');
  let trElement = document.createElement("tr");
  trElement.innerHTML = `<td>${columnas[0]}</td>
                         <td>${students[0].completeName}</td>`;
  studentsTbody.appendChild(trElement);

  let trElement1 = document.createElement("tr");
  trElement1.innerHTML = `<td>${columnas[1]}</td>
                         <td>${students[0].code}</td>`;
  studentsTbody.appendChild(trElement1);

  let trElement2 = document.createElement("tr");
  trElement2.innerHTML = `<td>${columnas[2]}</td>
                         <td>${students[0].cardId}</td>`;
  studentsTbody.appendChild(trElement2);

  let trElement3 = document.createElement("tr");
  trElement3.innerHTML = `<td>${columnas[3]}</td>
                         <td>${students[0].age}</td>`;
  studentsTbody.appendChild(trElement3);

  let trElement4 = document.createElement("tr");
  trElement4.innerHTML = `<td>${columnas[4]}</td>
                         <td>${students[0].address}</td>`;
  studentsTbody.appendChild(trElement4);

  let trElement5 = document.createElement("tr");
  trElement5.innerHTML = `<td>${columnas[5]}</td>
                         <td>${students[0].phone}</td>`;
  studentsTbody.appendChild(trElement5);


}

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCredits() {
  let minText = inputSearchBoxMin.value;
  let maxText = inputSearchBoxMax.value;
  minText = (minText == null) ? '' : minText;
  maxText = (maxText == null) ? '' : maxText;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredits(minText, maxText, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByCredits(minText: string, maxText: string, dataCourses: Course[]): Course[] {
  let minimo: number = +minText;
  let maximo: number = +maxText;
  console.log(minimo);
  console.log(maximo);
  return  dataCourses.filter(c => c.credits <= maximo && c.credits >= minimo );
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}