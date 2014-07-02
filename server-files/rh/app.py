#!flask/bin/python
from flask import Flask
from flask import url_for

app = Flask(__name__, static_url_path='')

@app.route('/')
def root():
	return app.send_static_file('index.html')

if __name__ == '__main__':
	app.run(debug = True)