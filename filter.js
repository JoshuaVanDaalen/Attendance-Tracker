/*$(document).ready(function () {
    $('#onlyMalesFilter').click(function () {
        // console.log('onlyMalesFilter Filter executed');
        employeesRef.where("gender", "==", "Male")
            .onSnapshot(function (querySnapshot) {
                LoadTableData(querySnapshot);
            });
    });

    $('#fullTimeFilter').click(function () {
        // console.log('fullTimeFilter Filter executed');
        employeesRef.where("isFullTime", "==", true)
            .onSnapshot(function (querySnapshot) {
                LoadTableData(querySnapshot);
            });
    });

    $('#olderThenFilter').click(function () {
        // console.log('olderThenFilter Filter executed');
        employeesRef.where("age", ">=", 30)
            .onSnapshot(function (querySnapshot) {
                LoadTableData(querySnapshot);
            });
    });

    $('#ageBetweenFilter').click(function () {
        // console.log('ageBetweenFilter Filter executed');
        employeesRef.where("age", ">=", 35).where("age", "<=", 50)
            .onSnapshot(function (querySnapshot) {
                LoadTableData(querySnapshot);
            });
    });

    $('#yearsOfExperienceFilter').click(function () {
        // console.log('yearsOfExperienceFilter Filter executed');
        employeesRef.where("gender", "==", "Female")
        employeesRef.where("yearsOfExperience", ">=", 5).where("yearsOfExperience", "<=", 10)
            .onSnapshot(function (querySnapshot) {
                LoadTableData(querySnapshot);
            });
    });

    $('#clearFilter').click(function () {
        // console.log('clearFilter Filter executed');
        employeesRef.orderBy("fName", "desc").limit(5).get().then(function (querySnapshot) {
            LoadTableData(querySnapshot);
        });
    });


    $("#searchEmployee").change(function () {
        // console.log('You entered: ', $(this).val());
        var searchValue = $(this).val();
        employeesRef.where("fName", "==", searchValue)
            .onSnapshot(function (querySnapshot) {
                LoadTableData(querySnapshot);
            });
    });
});*/

// Hard coded Login
//var ref = new firebase(fir)


function LoadTableData(querySnapshot) {
    var tableRow = '';
    querySnapshot.forEach(function (doc) {
        var document = doc.data();

        tableRow += `<tr id=${doc.id}>`;
        tableRow += `<td class="studentId">${document.studentId}</td>`;
        tableRow += `<td class="fname">${document.fName}</td>`;
        tableRow += `<td class="lname">${document.lName}</td>`;
        tableRow += `<td class="email">${document.email}</td>`;
        tableRow += `<td class="date">${(document.date.toDate().toDateString())}</td>`;
        tableRow += `<td class="time">${moment(document.date.toDate()).format('HH:mm:ss A')}</td>`;
        tableRow += `<td class="gender">${document.signedOn}</td>`;
        tableRow += '<td class="editStudent"><i class="fa fa-pencil" aria-hidden="true" style="color:green"></i></td>'
        tableRow += '<td class="deleteStudent"><i class="fa fa-trash" aria-hidden="true" style="color:red"></i></td>'
        tableRow += '</tr>';
    });
    $('tbody.tbodyData').html(tableRow);
}

function isStudentRegistered(collection) {
    var rfid = $("#rfidscanner").val();

    var query = collection.where("RFID", "==", rfid)

    query.get().then(function (querySnapshot) {
        if (querySnapshot.empty) {

            console.log(`No documents found with id of: ${rfid}`);
            createStudentForm(rfid);
            $("#studentModal").css("display", "block")
            $('#firstname').focus();
        } else {

            console.log(`Document found with id of: ${rfid}`);
            querySnapshot.forEach((subDoc) => {
                setRecordAttendance(subDoc)
            });
        }
    })
}

function registerNewStudent(rfid) {
    console.log("Registering: " + rfid);
    //Create a document for the new student
    studentsRef = db.collection("RegisteredStudents");
    studentsRef.doc().set({
        RFID: rfid,
        studentId: $("#studentnumber").val(),
        fName: $("#firstname").val(),
        lName: $("#lastname").val(),
        email: $("#emailaddress").val(),
        signedOn: true,
        date: firebase.firestore.FieldValue.serverTimestamp()
    });


    //setRecordAttendance(newStudent);
}

function setRecordAttendance(document) {

    var course = $("#courseSelector").val()
    var studyunit = $("#study-unit").val();
    var intakeperiod = $("#intake-period").val()
    var currentYear = new Date().getFullYear();
    var subDoc = document.data();
    var attendanceRecordRef = db.collection(`StudyUnits/${currentYear}/${course}/${studyunit}/${intakeperiod}/Attendance Record`);


    attendanceRecordRef.doc().set({
        RFID: subDoc.RFID,
        studentId: subDoc.studentId,
        fName: subDoc.fName,
        lName: subDoc.lName,
        email: subDoc.email,
        signedOn: subDoc.signedOn,
        date: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function (document) {
        console.log("Successfully signed on");

        
        // var id = attendanceRecordRef.doc().id;
        // $('#student-table').on("DOMNodeInserted", function(){
        //     $(`#${id}`).css('background-color', 'red');
        //     alert(`#${id}`);
        // });
        //$('#operationStatus').html(`<div id="" class="alert alert-success"><strong>Success!</strong> Student signed on!</div>`).delay(2500).fadeOut('slow');

    }).catch(function (error) {
        console.log("Signed on unsuccessful");
        $('#operationStatus').html('<div class="alert alert-danger"><strong>Error!</strong> Employee was not created!</div>').delay(2500).fadeOut('slow');
    });

}

function displayScanner() {

    $('#scanner-info').html(`
    <br> 
    <p>Scan your student card</p>
    <input id="rfidscanner" type="text" class="form-control">
    <br>
    <button id="scan-card" type="button" class="btn btn-outline-success">Submit</button>
    `);
}

function displayClassInfo() {

    $('#class-info').html(`
    <p class="offset-7" style="font-size:11px">${$("#courseSelector").val()}</p>
    <p class="offset-7" style="font-size:11px">${$("#study-unit").val()}</p>
    <p class="offset-7" style="font-size:11px">${$("#intake-period").val()}</p>
    <button id="change-class" type="button" class="btn btn-outline-primary offset-7">Change class</button>
    `);
}

function displayClassForm() {
    $("#courseForm").html(`
        <div class="form-row">
            <div class="form-group col-md-4">
                <label for="courseSelector">Course</label>
                <select id="courseSelector" class="form-control">
                    <option disabled selected>Select course</option>
                </select>
            </div>
            <div class="form-group col-md-4">
                <label for="study-unit">Study Unit</label>
                <select id="study-unit" class="form-control">
                    <option disabled selected>Select course first</option>
                </select>
            </div>
            <div class="form-group col-md-4">
                <label for="intake-period">Intake Period</label>
                <select id="intake-period" class="form-control">
                    <option disabled selected>Select unit first</option>
                    <option value="March Intake/Group 1">March Intake - Group 1</option>
                    <option value="March Intake/Group 2">March Intake - Group 2</option>
                    <option value="Mid-year Intake/Group 1">Mid-year Intake</option>
                </select>
            </div>
        </div>
        <div class=text-right>
            <button id="start-class" type="button" class="btn btn-primary active">Start class</button>
        </div>
        <br>
    `)
}

function createStudentForm(rfid) {
    $("#studentForm").html('');
    $("#studentForm").html(`
        <div id="studentModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="container" style="max-width:600px;padding:40px 20px;background:#ebeff2">
                        <section>
                            <h3>Student Registration Page </h3>
                            <form class="form-horizontal" id="student-registration" role="form">
                                <div class="form-group">
                                    <label for="firstname" class="control-label col-sm-3">First name</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="firstname" placeholder="Mr">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="lastname" class="control-label col-sm-3">Last name</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="lastname" placeholder="Anderson">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="studentnumber" class="control-label col-sm-4">Student Number</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="studentnumber" placeholder="01101000">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="emailaddress" class="control-label col-sm-3">Email Address</label>
                                    <div class="col-sm-8">
                                        <input type="email" class="form-control" id="emailaddress" placeholder="01101001@student.swin.edu.au">
                                    </div>
                                </div>
                                <div class="col-sm-offset-2 col-sm-8">
                                    <button id="submit-student" type="button" class="btn btn-outline-primary">
                                        Register
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    `)
}