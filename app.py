from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.secret_key = 'your_secret_key'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)

@app.route('/')
def home(): 
    return render_template('index5.html')

@app.route('/campus-community')
def campus_community():
    return render_template('campus_community.html')

@app.route('/ieee-message')
def ieee_message():
    return render_template('ieee_message.html')

@app.route('/nasscom-visit')
def nasscom_visit():
    return render_template('nasscom_visit.html')

@app.route('/advisory')
def advisory():
    return render_template('advisory.html')

@app.route('/sih')
def sih():
    return render_template('sih.html')

@app.route('/engineers-day')
def engineers_day():
    return render_template('engineers_day.html')


class Xebia_Microsoft(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    student_id = db.Column(db.String(20), nullable=False)
    urn = db.Column(db.String(20), nullable=False)

@app.route('/register-microsoft', methods=['GET', 'POST'])
def register_microsoft():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        student_id = request.form.get('student_id')
        urn = request.form.get('urn')

        new_registration = Xebia_Microsoft(
            name=name,
            email=email,
            phone=phone,
            student_id=student_id,
            urn=urn
        )

        db.session.add(new_registration)
        db.session.commit()
        flash('Registration successful!', 'success')
        return redirect(url_for('home'))

    return render_template('register_microsoft.html')

if __name__ == '__main__':
    app.run(debug=True)

