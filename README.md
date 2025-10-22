# UniXperience - IILM Campus 360

![IILM University](static/images/blue_iilm.jpeg)

A comprehensive web platform designed for the School of Computer Science and Engineering at IILM University, Gurugram. UniXperience streamlines academic workflows, event management, and campus community engagement for students and faculty.

## 🎓 About

UniXperience is a student-led initiative that serves as a central hub for:

- Academic resources and schedules
- Campus events and announcements
- Industry partnership programs
- Event registrations
- Student community building

## ✨ Features

### 📚 Academic Resources

- **Class Schedules**: Access daily timetables and room allocations
- **Syllabus Repository**: Complete course syllabus and learning materials
- **Faculty Directory**: Quick access to faculty and staff contact information

### 📅 Event Management

- Real-time updates on campus events, hackathons, and workshops
- Event registration system (e.g., Microsoft/Xebia programs)
- Integration with industry partner programs
- Smart India Hackathon coordination
- Engineers Day celebrations
- IEEE Student Chapter events

### 🏢 Industry Partnerships

Integration with major industry partners:

- **Microsoft** (via Xebia): Cloud computing and AI development programs
- **Larsen & Toubro**: Industrial training and internships
- **AWS Academy**: Cloud computing curriculum and certifications
- **NASSCOM**: Industrial visit opportunities

### 🔔 Announcements & Alerts

- Important advisories and security alerts
- Admission updates
- Workshop and seminar notifications
- Campus-wide announcements

### 🎨 User Interface

- Modern, responsive design
- Animated UI elements using GSAP
- Particle.js effects
- Mobile-friendly navigation
- Smooth scrolling experience

## 🛠️ Technology Stack

### Backend

- **Flask** (v3.1.2): Python web framework
- **Flask-SQLAlchemy** (v3.1.1): Database ORM
- **SQLite**: Database for event registrations
- **Werkzeug** (v3.1.3): WSGI utility library

### Frontend

- **HTML5/CSS3**: Structure and styling
- **JavaScript (ES6+)**: Interactive functionality
- **GSAP**: Advanced animations and scroll effects
- **Particles.js**: Dynamic background effects
- **Font Awesome** (v6.4.0): Icon library
- **Google Fonts**: Inter and Montserrat typefaces

### Development Tools

- Python 3.13
- Virtual Environment (venv)
- Pip package manager

## 📁 Project Structure

```
IILM_Campus_360/
├── app.py                      # Main Flask application
├── instance/                   # Instance folder (database)
│   └── site.db                # SQLite database
├── static/                    # Static assets
│   ├── css/                  # Stylesheets
│   │   ├── style.css
│   │   ├── advisory.css
│   │   ├── campus.css
│   │   ├── engineers.css
│   │   ├── ieee.css
│   │   ├── nasscom.css
│   │   ├── register.css
│   │   └── sih.css
│   ├── js/                   # JavaScript files
│   │   ├── script.js
│   │   ├── advisory.js
│   │   ├── campus.js
│   │   ├── engineers.js
│   │   ├── ieee.js
│   │   ├── nasscom.js
│   │   ├── register.js
│   │   └── sih.js
│   └── images/               # Image assets
├── templates/                # HTML templates
│   ├── index5.html          # Home page
│   ├── advisory.html        # Advisory page
│   ├── campus_community.html
│   ├── engineers_day.html
│   ├── ieee_message.html
│   ├── nasscom_visit.html
│   ├── register_microsoft.html
│   └── sih.html
├── myenv/                    # Python virtual environment
├── README.md
└── LICENSE
```

## 🚀 Installation & Setup

### Prerequisites

- Python 3.13 or higher
- pip (Python package manager)
- Git (for version control)

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/IILM_Campus_360.git
cd IILM_Campus_360
```

2. **Create and activate virtual environment**

On Windows (PowerShell):

```powershell
python -m venv myenv
.\myenv\Scripts\Activate.ps1
```

On Windows (Command Prompt):

```cmd
python -m venv myenv
myenv\Scripts\activate.bat
```

On Linux/Mac:

```bash
python3 -m venv myenv
source myenv/bin/activate
```

3. **Install dependencies**

```bash
pip install flask flask-sqlalchemy
```

Or install from requirements file (if available):

```bash
pip install -r requirements.txt
```

4. **Initialize the database**

```python
python
>>> from app import db, app
>>> with app.app_context():
...     db.create_all()
>>> exit()
```

5. **Run the application**

```bash
python app.py
```

6. **Access the application**
   Open your browser and navigate to:

```
http://127.0.0.1:5000/
```

## 📝 Configuration

### Secret Key

Update the secret key in `app.py` for production:

```python
app.secret_key = 'your-secure-secret-key-here'
```

### Database

The application uses SQLite by default. To use a different database:

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'your-database-uri'
```

## 🗄️ Database Schema

### Xebia_Microsoft Table

Stores registration data for Microsoft/Xebia partnership programs:

- `id`: Primary key (Integer)
- `name`: Student name (String, 100)
- `email`: Student email (String, 100)
- `phone`: Contact number (String, 15)
- `student_id`: University student ID (String, 20)
- `urn`: University Registration Number (String, 20)

## 🌐 Routes & Pages

| Route                 | Description                          |
| --------------------- | ------------------------------------ |
| `/`                   | Home page (index5.html)              |
| `/campus-community`   | Campus community information         |
| `/ieee-message`       | IEEE Student Chapter details         |
| `/nasscom-visit`      | NASSCOM industrial visit information |
| `/advisory`           | Important advisories and alerts      |
| `/sih`                | Smart India Hackathon details        |
| `/engineers-day`      | Engineers Day celebration            |
| `/register-microsoft` | Microsoft/Xebia program registration |

## 🎯 Key Features Explained

### Registration System

- Users can register for industry partnership programs
- Form validation and data storage in SQLite
- Flash messages for user feedback
- Automatic redirection after successful registration

### Responsive Design

- Mobile-first approach
- Hamburger menu for mobile devices
- Adaptive layouts for all screen sizes
- Touch-friendly navigation

### Animation & Interactivity

- Smooth scroll navigation
- Animated page sections with GSAP
- Dynamic particle background effects
- Hover effects and transitions

## 🔒 Security Notes

1. **Secret Key**: Change the default secret key in production
2. **Debug Mode**: Disable debug mode in production (`debug=False`)
3. **Database**: Use proper database security measures in production
4. **Input Validation**: Implement server-side validation for all forms
5. **HTTPS**: Always use HTTPS in production environments

## 📱 Browser Compatibility

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a university project for IILM University, Gurugram. For contributions or suggestions:

1. Contact the development team
2. Submit issues or feature requests
3. Follow the coding standards used in the project

## 👨‍💻 Developer

**Developed by Rudraksh**

IILM University, Gurugram  
School of Computer Science and Engineering

## 📧 Contact

- **University**: IILM University, Gurugram
- **Support Email**: support@unixperience.edu
- **Phone**: +91 9876543210
- **Website**: [https://iilm.edu/](https://iilm.edu/)

## 🔗 Important Links

- [IILM University Official Website](https://iilm.edu/)
- [IILM Facebook](https://www.facebook.com/iilmuniversity/)
- [IILM Instagram](https://www.instagram.com/iilmgurugramofficial/)
- [IILM LinkedIn](https://www.linkedin.com/school/iilm-university-gurugram/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright © 2025 IILM University, Gurugram

## 🙏 Acknowledgments

- IILM University School of Computer Science and Engineering
- All faculty members for their support
- Industry partners: Microsoft, Xebia, L&T, AWS Academy, NASSCOM
- The student community for their valuable feedback

## 📊 Future Enhancements

- [ ] User authentication system
- [ ] Admin dashboard for content management
- [ ] Integration with university ERP system
- [ ] Mobile application (iOS/Android)
- [ ] Real-time notifications
- [ ] Student forum and discussion boards
- [ ] Grade tracking system
- [ ] Assignment submission portal
- [ ] Virtual campus tour
- [ ] AI-powered chatbot for student queries

## 🐛 Known Issues

- None currently reported

## 📞 Support

For technical support or queries, please contact:

- Email: support@unixperience.edu
- Create an issue in the repository
- Contact the IT department at IILM University

---

**Made with ❤️ for IILM University Community**
