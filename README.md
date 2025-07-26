#  Student Course Portal

The **Student Course Portal** is a dynamic web application built using React for the frontend and JSON Server for a mock REST API backend. It allows students to browse available courses, view assignments, and manage academic information seamlessly.

---

##  Live Demo

 **Frontend (Vercel):** [https://student-course-portal-seven.vercel.app](https://student-course-portal-seven.vercel.app)


---

##  Features

-  View all available **courses**
-  See course descriptions, instructors, schedules, and credit units
- Browse **assignments** and check due dates
-  View assignment details
-  Navigate with a clean and responsive interface using React Router
-  Admin route for adding/editing content (optional)

---

##  Technologies Used

### Frontend
- [React](https://reactjs.org/)
- [React Router DOM](https://reactrouter.com/)
- [Bootstrap](https://getbootstrap.com/) for styling
- [Vercel](https://vercel.com/) for deployment


---

##  Folder Structure

Student-Course-Portal-/
├── src/
│components/
│  * Navbar.jsx
│ pages/
│ * Home.jsx
│ * Courses.jsx
│ * CourseDetail.jsx
│ * Assignments.jsx
│ *Admin.jsx
│* App.jsx
│ *index.js
| public/
│index.html
├package.json
└ README.md

---

## ⚙️ Getting Started Locally

### 1. Clone the Repositories

```bash
# Frontend
git clone https://github.com/automatebyte/Student-Course-Portal-.git
cd Student-Course-Portal-
npm install
npm run dev  [http://localhost:5173]
npx json-server --watch db.json --port 3001


###Author
Group 5.
## License
MIT License

HAPPY CODING!


