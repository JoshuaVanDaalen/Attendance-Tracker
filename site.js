//Site by Joshua Van Daalen © 2018

$(document).ready(function () {
    //
    const registeredStudentsRef = db.collection("RegisteredStudents");
    const coursesRef = db.collection("Courses");

    displayClassForm();

    coursesRef.onSnapshot(function (snapShot) {

        var selectorHTML = ''

        snapShot.forEach(function (doc) {
            var document = doc.data();
            //console.log(doc.id);
            selectorHTML += `<option>${doc.id}</option>`
        });
        $("#courseSelector").append(selectorHTML);
    });

    $("#courseSelector").change(function () {

        var courseVal = $("#courseSelector option:selected").text()

        coursesRef.onSnapshot(function (snapShot) {
            var selectorHTML = ''
            selectorHTML += "<option disabled selected>Select course</option>"
            snapShot.forEach(function (doc) {
                var document = doc.data();
                if (doc.id == courseVal) {
                    for (var propName in document) {
                        if (document.hasOwnProperty(propName)) {
                            var propValue = document[propName];
                            //console.log(`key: ${propName} value: ${propValue}`);
                            selectorHTML += `<option>${propValue}</option>`
                        }
                    }
                }
            });
            $("#study-unit").html(selectorHTML);
        });
    });

    //Set class information and turn on RFID reader
    $("#start-class").click(function () {
        var currentYear = new Date().getFullYear();
        var course      =   $("#courseSelector").val()
        var studyunit = $("#study-unit").val();
        var intakeperiod = $("#intake-period").val()
        var db = firebase.firestore();
        var attendanceRecordRef = db.collection(`StudyUnits/${currentYear}/${course}/${studyunit}/${intakeperiod}/Attendance Record`);

        attendanceRecordRef.onSnapshot(function (snapShot) {

            LoadTableData(snapShot);
            displayClassInfo();
            displayScanner();

            $('#scanner-info').fadeIn('slow');
            $('#class-info').fadeIn('slow');
            $('#student-table-div').fadeIn('slow');
            $('#courseForm').css("display", "none")
            $('#rfidscanner').focus();

        });
    });

    $("#studentForm").on("click", ".close", function(){
        $("#studentModal").css("display", "none")
        displayScanner();
    });

    $("#studentForm").on("click", "#submit-student", function(){
        $("#studentModal").css("display", "none")
        registerNewStudent($("#rfidscanner").val());        
        isStudentRegistered(registeredStudentsRef);
    });
    
    //Reset button
    $("#class-info").on("click", "#change-class", function () {
        $('#scanner-info').fadeOut('slow');
        $('#class-info').fadeOut('slow');
        $('#student-table-div').fadeOut('slow');
        $('#courseForm').fadeIn('slow');
    });

    //Scan of card
    $("#scanner-info").on("change", "#rfidscanner", function () {
        console.log("there was a change to the RFID scanner")
        isStudentRegistered(registeredStudentsRef)
    });
});