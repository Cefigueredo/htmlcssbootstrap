import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudents.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var inputSearchBoxMin = document.getElementById("minimoBox");
var inputSearchBoxMax = document.getElementById("maximoBox");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var columnas = ["Nombre", "Codigo", "Identificacion", "Edad", "Direccion", "Telefono"];
var studentsTbody = document.getElementById('students');
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudents, columnas);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(students, columnas) {
    console.log('Desplegando estudiante');
    var trElement = document.createElement("tr");
    trElement.innerHTML = "<td>" + columnas[0] + "</td>\n                         <td>" + students[0].completeName + "</td>";
    studentsTbody.appendChild(trElement);
    var trElement1 = document.createElement("tr");
    trElement1.innerHTML = "<td>" + columnas[1] + "</td>\n                         <td>" + students[0].code + "</td>";
    studentsTbody.appendChild(trElement1);
    var trElement2 = document.createElement("tr");
    trElement2.innerHTML = "<td>" + columnas[2] + "</td>\n                         <td>" + students[0].cardId + "</td>";
    studentsTbody.appendChild(trElement2);
    var trElement3 = document.createElement("tr");
    trElement3.innerHTML = "<td>" + columnas[3] + "</td>\n                         <td>" + students[0].age + "</td>";
    studentsTbody.appendChild(trElement3);
    var trElement4 = document.createElement("tr");
    trElement4.innerHTML = "<td>" + columnas[4] + "</td>\n                         <td>" + students[0].address + "</td>";
    studentsTbody.appendChild(trElement4);
    var trElement5 = document.createElement("tr");
    trElement5.innerHTML = "<td>" + columnas[5] + "</td>\n                         <td>" + students[0].phone + "</td>";
    studentsTbody.appendChild(trElement5);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredits() {
    var minText = inputSearchBoxMin.value;
    var maxText = inputSearchBoxMax.value;
    minText = (minText == null) ? '' : minText;
    maxText = (maxText == null) ? '' : maxText;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(minText, maxText, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(minText, maxText, dataCourses) {
    var minimo = +minText;
    var maximo = +maxText;
    console.log(minimo);
    console.log(maximo);
    return dataCourses.filter(function (c) { return c.credits <= maximo && c.credits >= minimo; });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
