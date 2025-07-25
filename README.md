# 🎓 Student Course Portal

An interactive student course management system built with **React**, **React Router**, **Bootstrap**, and **JSON Server**.

## 🚀 Live Demo

👉 [View Presentation](./student_course_portal_presentation_with_backgrounds.html)

---

## 📋 Features

- 📊 **Dashboard** with live stats and UI cards
- 📚 **Courses Listing** with dynamic detail pages
- 📝 **Assignments Page** with upload tracking
- ⚙️ **Admin Panel** for course/assignment CRUD
- 🌐 SPA using **React Router**
- 🎨 Responsive design using **Bootstrap 5**

---

## 🛠️ Technologies Used

- React + Vite
- React Router DOM
- Bootstrap 5
- Bootstrap Icons
- JSON Server (Mock Backend)
- Reveal.js (Presentation)

---

## 📦 Folder Structure

Student-Course-Portal/
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── Courses.jsx
│ │ ├── Assignments.jsx
│ │ ├── Admin.jsx
│ ├── App.jsx
│ ├── main.jsx
├── db.json
├── README.md
└── student_course_portal_presentation_with_backgrounds.html

yaml
Copy
Edit

---

## 🧪 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/Student-Course-Portal.git
cd Student-Course-Portal
2. Install Dependencies
bash
Copy
Edit
npm install
3. Start JSON Server
bash
Copy
Edit
npx json-server --watch db.json --port 5000
4. Run the React App
bash
Copy
Edit
npm run dev
Visit: http://localhost:5173

🗂 Sample Data (db.json)
json
Copy
Edit
{
  "courses": [
    {
      "id": 1,
      "title": "React Basics",
      "instructor": "Jane Doe",
      "syllabus": "JSX, Components, State, Props",
      "schedule": "Mon & Wed"
    }
  ],
  "assignments": [
    {
      "id": 1,
      "courseId": 1,
      "title": "Build a ToDo App",
      "status": "pending"
    }
  ]
}
🌍 Deployment (Optional)
You can deploy this app on:

Netlify

Vercel

GitHub Pages (with a static export)

📸 Screenshots
Place your dashboard.png, courses.png, and admin.png images here in the README if using GitHub

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss your proposal.

🧑 Author
Njogu Simon
GitHub: @NjoguSimon-hub

📄 License
This project is licensed under the MIT License.

yaml
Copy
Edit

---

Would you like me to save this as a downloadable `README.md` file for your project folder?
