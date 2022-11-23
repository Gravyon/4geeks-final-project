# Casa Arte

![alt text](https://i.imgur.com/BioYZ0s.png)

### Technologies used

- React.js
- Python/Flask
- Integrated with Pipenv for package managing.
- Deployment with Heroku
- SQLAlchemy integration for database abstraction.

### Components

- checkout-paypal.jsx
- footer.jsx
- imgCarousel.jsx
- landing-page.jsx
- navbar.jsx
- product-carousel.jsx
- scoring.jsx
- scrollToTop.js

### Views (Components)

- carrito.jsx
- changePassword.jsx
- checkout.jsx
- contactus.jsx
- details.jsx
- favorites.jsx
- home.jsx
- images.jsx
- login.jsx
- profile.jsx
- signup.jsx

### Back-End Manual Installation:

It is recomended to install the backend first, make sure you have Python 3.8, Pipenv and a database engine (Posgress recomended)

1. Install the python packages: `$ pipenv install`
2. Create a .env file based on the .env.example: `$ cp .env.example .env`
3. Install your database engine and create your database, depending on your database you have to create a DATABASE_URL variable with one of the possible values, make sure yo replace the valudes with your database information:

| Engine    | DATABASE_URL                                        |
| --------- | --------------------------------------------------- |
| SQLite    | sqlite:////test.db                                  |
| MySQL     | mysql://username:password@localhost:port/example    |
| Postgress | postgres://username:password@localhost:5432/example |

4. Migrate the migrations: `$ pipenv run migrate` (skip if you have not made changes to the models on the `./src/api/models.py`)
5. Run the migrations: `$ pipenv run upgrade`
6. Run the application: `$ pipenv run start`

### Backend Populate Table Users

To insert test users in the database execute the following command:

```sh
$ flask insert-test-users 5
```

And you will see the following message:

```
  Creating test users
  test_user1@test.com created.
  test_user2@test.com created.
  test_user3@test.com created.
  test_user4@test.com created.
  test_user5@test.com created.
  Users created successfully!
```

To update with all yours tables you can edit the file app.py and go to the line 80 to insert the code to populate others tables

### Front-End Manual Installation:

-   Make sure you are using node version 14+ and that you have already successfully installed and runned the backend.

1. Install the packages: `$ npm install`
2. Start coding! start the webpack dev server `$ npm run start`

## Publish your website!

This boilerplate it's 100% integrated with Herkou, [follow this tutorial](https://start.4geeksacademy.com/backend/deploy-heroku-posgres) and just by pushing your changes to the heroku repository will deploy the website afterwards.
