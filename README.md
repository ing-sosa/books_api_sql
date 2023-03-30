## This node CRUD application needs to create authors and books mysql tables

```
CREATE TABLE `authors` (
`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `books` (
`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
`title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`description` text COLLATE utf8mb4_unicode_ci NOT NULL,
`author_id` bigint(20) unsigned NOT NULL,
`year_published` int(11) NOT NULL,
`isbn` text COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `books_author_id_foreign` (`author_id`),
CONSTRAINT `books_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Config

Find the database connection in the `db_gateway.js` file and use your credentials

```
{
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'book_author',
}
```

## How to run

This is a `"naked"` application `-only mysql is needed`

After npm install run `node main.js` and have fun with the allowed endpoints

## authors/

- `POST: authors/` Will create an author just needs to send a name.

```
{ "name": "Andres Sosa" }
```

- `GET: authors/` Will show all authors. No params needed
- `GET: authors/:id` Will show the specific author by id.
- `PUT: authors/:id` Will update an author by id and needs to send a name to update.

`{ "name": "Sponge Bob" }`

- `DELETE: authors/:id` Will delete the author and all of their asociated books.

## books/

- `POST: books/` Will create an book just be sure to have an author already created to asociate the id as follow.

```
{
  "title": "Code Experts",
  "description": "Try your best in coding.",
  "author_id": "1",
  "year_published": 2020,
  "isbn": "2844088645261"
}
```

- `GET: books/` Will show all books. No params needed
- `GET: books/:id` Will show the specific book by id.
- `PUT: books/:id` Will update the book by id and needs to send a name to update.

```
{
  "title": "Code Expert in 120 days",
  "description": "Try your best in coding apis, spas, rest, node, laravel, vue, ionic.",
  "author_id": "1",
  "year_published": 2023,
  "isbn": "2844088645261"
}
```

- `DELETE: books/:id` Will delete the book.

## Enjoy
