 // Initialize Cloud Firestore through Firebase

 var db = firebase.firestore();
 const settings = { /* your settings... */
     timestampsInSnapshots: true
 };
 db.settings(settings);
 //  var studentRef     =   db.collection("StudyUnits");
 //  db.collection(`${enrolment}/${currentYear}/${intakeperiod}`).get().then((subCollectionSnapshot) => {
 //      subCollectionSnapshot.forEach((subDoc) => {
 //          console.log(subDoc.data());
 //      });
 //  });
 var studentsRef = db.collection("StudyUnits/Interface Programming/2018/March Intake/Group 2/Students/Attendance Record");
//var studentsRef = db.collection("RegisteredStudents");
 
 var timeStamp = firebase.firestore.FieldValue.serverTimestamp()


//  studentsRef.doc().set({
//      RFID: "VD4758W9",
//      studentId: "456654546",
//      fName: "Standard",
//      lName: "User",
//      email: "s.user@place.com",
//      signedOn: true,
//      date: timeStamp
//  });

//  studentsRef.doc().set({
//      RFID: "GN6383E1",
//      studentId: "84847561",
//      fName: "Student",
//      lName: "Other",
//      email: "Stu@Uni.com",
//      signedOn: true,
//      date: timeStamp
//  });

//  studentsRef.doc().set({
//      RFID: "ME2166R5",
//      studentId: "85468763",
//      fName: "slim",
//      lName: "shady",
//      email: "eminem@driot.com",
//      signedOn: false,
//      date: timeStamp
//  });

//  studentsRef.doc().set({
//      RFID: "SD2576W3",
//      studentId: "33445566",
//      fName: "Snoop",
//      lName: "Dogg",
//      email: "rollup@420.com",
//      signedOn: true,
//      date: timeStamp
//  });

//  studentsRef.doc().set({
//      RFID: "YB4896S4",
//      studentId: "000000001",
//      fName: "Mr",
//      lName: "Anderson",
//      email: "neo@matrix.com",
//      signedOn: false,
//      date: timeStamp
//  });