#!/usr/bin/python3
""" Starts a Flash Web Application """

from flask import Flask, render_template
# from flask_cors import CORS

app = Flask(__name__)
# cors = CORS(app, resources={r"0.0.0.0:5000/*": {"origins": "*"}})

@app.route('/', strict_slashes=False)
def home():
    return render_template('index.html')


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000, debug=True)

