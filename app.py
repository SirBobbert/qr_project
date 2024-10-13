from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Store feedback temporarily (in memory)
feedback_list = []

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/feedback', methods=['GET', 'POST'])
def feedback():
    if request.method == 'POST':
        name = request.form['name']
        comment = request.form['comment']
        rating = request.form['rating']
        feedback_list.append({'name': name, 'comment': comment, 'rating': rating})
        return redirect(url_for('feedback'))
    return render_template('feedback.html', feedback_list=feedback_list)

@app.route('/create')
def create():
    return render_template('create.html')



if __name__ == '__main__':
    app.run(debug=True)