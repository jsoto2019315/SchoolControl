const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.studentPath = '/academicControl/v2/students/register'; //In this Endpoint the student can register to the app.
        this.teacherPath = '/academicControl/v2/teachers/register'; //In this Endpoint the teacher can register to the app.
        this.subjectPath = '/academicControl/v2/subject/addNewSubject';
        this.loginPath = '/academicControl/v2';
        this.addSubjectToStudent = '/academicControl/v2/subject/addSubjectToStudent';
        this.getStudentCourses = '/academicControl/v2/subject/getStudentSubjects';
        
        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.studentPath, require('../routes/student.routes'));
        this.app.use(this.teacherPath, require('../routes/teacher.routes'));
        this.app.use(this.subjectPath, require('../routes/subject.routes'));
        this.app.use(this.loginPath, require('../routes/login.routes'));
        this.app.use(this.addSubjectToStudent, require('../routes/student.routes'));
        this.app.use(this.getStudentCourses, require('../routes/student.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server is running and listening on port', this.port);
        });
    }
}

module.exports = Server;