# 🗳️ Voters API

A voting system built with Node.js, Express, and MySQL that allows:
- Admins to create candidates (with images via Cloudinary)
- Users to vote for candidates
- One vote per user per position
- Vote confirmation via email
- Admins to end elections by clearing votes/candidates (No time)

## 🔧 Tech Stack
- Node.js + Express (ES Modules)
- MySQL + Sequelize
- JWT Auth + Role-based access
- Cloudinary for image uploads
- Nodemailer for vote email confirmation
- Postman for API testing

## 📦 Features
- ✅ Sign Up / Login 
- 🔒 JWT-based Auth
- 🧑‍⚖️ Admin can add candidates (with image, party, position)
- 🗳️ Users can vote once per position
- 📧 Email notification on voting
- 🧹 Election reset by admin

## 🚀 Getting Started

### API DOCUMENTATION

You can view the full API documentation on postman by clicking the link below:
[View API Docs on Postman](https://documenter.getpostman.com/view/44828221/2sB2xEB8rY)

### 1. Clone Repo & Install
```bash
git clone https://github.com/your-username/voters-api.git
cd voters-api
npm install
