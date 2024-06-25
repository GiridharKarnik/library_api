### Problem statement

#### Context:

I have many books which I would like to share with my community. That sounds like a book-lending library. Please write some software to help me do that.

#### Stories:

* As a library user, I would like to be able to find books by my favourite author, so that I know if they are available in the library.
* As a library user, I would like to be able to find books by ISBN, so that I know if they are available in the library.
* As a library user, I would like to be able to find books by title, so that I know if they are available in the library.
* As a library user, I would like to be able to borrow a book, so I can read it at home.
* As the library owner, I would like to know how many books are being borrowed, so I can see how many are outstanding.
* As a library user, I should be to prevented from borrowing reference books, so that they are always available. 

### Getting started

1. Clone the repository
2. Ensure you have docker and docker-compose installed on your machine
3. Ensure docker host is running
4. Run the following command to start the application within a docker container

```shell
docker-compose up -d
```

5. The application should be running on http://localhost:3030/docs


### Architecture

The problem has been solved using traditional RESTful API architecture. The application is built using Node.js, Fastify, and MongoDB. 
The application is containerized using Docker and docker-compose. The API exposes a swagger documentation page at `/docs` which you can use to interact with the API.

The directory at `./mongodb/data` is used to store the MongoDB data. The directory at is volume mapped to the MongoDB container.
The script at `./mongodb/init-mongo.js` is used to initialize the MongoDB database with some data.

### Environments

`.env.dev` is used for local development.
`.env.test` is used within the docker container.

#### Stories - with proposed solution

* As a library user, I would like to be able to find books by my favourite author, so that I know if they are available in the library.
  * The user can search for books by author name by making a GET request to `/books?author=<author_name>`. The API will return a list of books by the author.
* As a library user, I would like to be able to find books by ISBN, so that I know if they are available in the library.
  * The user can search for books by ISBN by making a GET request to `/books?isbn=<isbn>`. The API will return a list of books with the ISBN.
* As a library user, I would like to be able to find books by title, so that I know if they are available in the library.
  * The user can search for books by title by making a GET request to `/books?title=<title>`. The API will return a list of books with the title.
* As a library user, I would like to be able to borrow a book, so I can read it at home.
  * The user can borrow a book by making a PUT request to `/books/<book_id>/status` with status `checked-out`. The API will update the status of the book to `checked-out`.
* As the library owner, I would like to know how many books are being borrowed, so I can see how many are outstanding.
  * The library owner can get the number of books being borrowed by making a GET request to `/books/status?status="checked-out"`. The API will return the number of books with status `checked-out`.
* As a library user, I should be to prevented from borrowing reference books, so that they are always available. 
  * The user cannot borrow reference books. You can test this out by trying to borrow a reference book. The API will return an error message.

#### Extras

* You can use the script at `./cleanup.sh` to clean up the docker containers and images associated with this project once you are done testing.
