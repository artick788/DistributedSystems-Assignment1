from src import create_app, Flask

if __name__ == '__main__':
    app: Flask = create_app()
    app.run(debug=True)

