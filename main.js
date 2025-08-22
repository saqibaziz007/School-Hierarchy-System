class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.id = Date.now().toString();
    }

    getDetails() {
        return `Name: ${this.name}, Age: ${this.age}`;
    }
}

class Student extends Person {
    constructor(name, age, grade, gpa) {
        super(name, age);
        this.grade = grade;
        this.gpa = gpa;
        this.type = 'student';
    }

    getDetails() {
        return `${super.getDetails()}, Grade: ${this.grade}, Score: ${this.gpa}`;
    }
}

class Teacher extends Person {
    constructor(name, age, subject, yearsExperience) {
        super(name, age);
        this.subject = subject;
        this.yearsExperience = yearsExperience;
        this.type = 'teacher';
    }

    getDetails() {
        return `${super.getDetails()}, Subject: ${this.subject}, Experience: ${this.yearsExperience} years`;
    }
}

// UI Management
document.addEventListener('DOMContentLoaded', function () {
    const studentTypeBtn = document.getElementById('studentType');
    const teacherTypeBtn = document.getElementById('teacherType');
    const studentFields = document.querySelectorAll('#studentFields');
    const teacherFields = document.querySelectorAll('#teacherFields');
    const addPersonBtn = document.getElementById('addPersonBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const personList = document.getElementById('personList');

    let people = [];
    let currentFilter = 'all';

    // Sample data
    const sampleStudent = new Student('Saqib Aziz', 20, '12th', 447);
    const sampleTeacher = new Teacher('Sir Usman', 42, 'Islamiat', 15);
    people.push(sampleStudent, sampleTeacher);
    renderPeople();

    // Toggle between student and teacher forms
    studentTypeBtn.addEventListener('click', function () {
        studentTypeBtn.classList.add('active');
        teacherTypeBtn.classList.remove('active');

        studentFields.forEach(field => field.style.display = 'block');
        teacherFields.forEach(field => field.style.display = 'none');
    });

    teacherTypeBtn.addEventListener('click', function () {
        teacherTypeBtn.classList.add('active');
        studentTypeBtn.classList.remove('active');

        studentFields.forEach(field => field.style.display = 'none');
        teacherFields.forEach(field => field.style.display = 'block');
    });

    // Add new person
    addPersonBtn.addEventListener('click', function () {
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;

        if (!name || !age) {
            alert('Please enter name and age');
            return;
        }

        let person;

        if (studentTypeBtn.classList.contains('active')) {
            const grade = document.getElementById('grade').value;
            const gpa = document.getElementById('gpa').value;

            if (!grade || !gpa) {
                alert('Please enter grade and Score for student');
                return;
            }

            person = new Student(name, parseInt(age), grade, parseFloat(gpa));
        } else {
            const subject = document.getElementById('subject').value;
            const yearsExperience = document.getElementById('yearsExperience').value;

            if (!subject || !yearsExperience) {
                alert('Please enter subject and years of experience for teacher');
                return;
            }

            person = new Teacher(name, parseInt(age), subject, parseInt(yearsExperience));
        }

        people.push(person);
        renderPeople();

        // Reset form
        document.getElementById('name').value = '';
        document.getElementById('age').value = '';
        document.getElementById('grade').value = '';
        document.getElementById('gpa').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('yearsExperience').value = '';
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            renderPeople();
        });
    });

    // Render people list
    function renderPeople() {
        const filteredPeople = currentFilter === 'all'
            ? people
            : people.filter(person => person.type === currentFilter);

        if (filteredPeople.length === 0) {
            personList.innerHTML = `
                        <div class="empty-list">
                            <i class="fas fa-users fa-3x"></i>
                            <p>No ${currentFilter === 'all' ? '' : currentFilter + ' '}people found.</p>
                        </div>
                    `;
            return;
        }

        personList.innerHTML = '';

        filteredPeople.forEach(person => {
            const card = document.createElement('div');
            card.className = `person-card ${person.type}`;

            let detailsHtml = '';

            if (person instanceof Student) {
                detailsHtml = `
                            <div class="person-detail"><span class="detail-label">Grade:</span> ${person.grade}</div>
                            <div class="person-detail"><span class="detail-label">GPA:</span> ${person.gpa}</div>
                        `;
            } else if (person instanceof Teacher) {
                detailsHtml = `
                            <div class="person-detail"><span class="detail-label">Subject:</span> ${person.subject}</div>
                            <div class="person-detail"><span class="detail-label">Experience:</span> ${person.yearsExperience} years</div>
                        `;
            }

            card.innerHTML = `
                        <div class="person-header">
                            <div class="person-name">${person.name}</div>
                            <div class="person-type-badge">${person.type.charAt(0).toUpperCase() + person.type.slice(1)}</div>
                        </div>
                        <div class="person-details">
                            <div class="person-detail"><span class="detail-label">Age:</span> ${person.age}</div>
                            ${detailsHtml}
                        </div>
                    `;

            personList.appendChild(card);
        });
    }
});