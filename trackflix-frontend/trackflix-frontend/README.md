# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Generating 120 enriched movie entries by building on a template and varying the values
import random
from datetime import date, timedelta

# Base genres, directors, etc. for variety
genres_list = [
    ["Action", "Sci-Fi", "Thriller"],
    ["Crime", "Drama"],
    ["Comedy", "Romance"],
    ["Adventure", "Fantasy"],
    ["Horror", "Mystery"],
    ["Biography", "History"],
    ["Animation", "Family"],
    ["Documentary"],
]

directors = ["Christopher Nolan", "Steven Spielberg", "Quentin Tarantino", "Martin Scorsese", "Greta Gerwig", "James Cameron", "Patty Jenkins", "Bong Joon-ho"]
writers = [["Christopher Nolan"], ["Aaron Sorkin"], ["Greta Gerwig"], ["Quentin Tarantino", "Roger Avary"]]
cast_pool = ["Leonardo DiCaprio", "Brad Pitt", "Natalie Portman", "Robert Downey Jr.", "Emma Stone", "Denzel Washington", "Timothée Chalamet", "Zendaya"]

# Generate random release date within the past 30 years
def random_date():
    start_date = date(1994, 1, 1)
    return (start_date + timedelta(days=random.randint(0, 10950))).isoformat()

movies_extended = []

for i in range(1, 121):
    genre_group = random.choice(genres_list)
    director = random.choice(directors)
    movie = {
        "id": i,
        "title": f"Sample Movie {i}",
        "overview": f"This is the synopsis of Sample Movie {i}.",
        "releaseDate": random_date(),
        "rating": round(random.uniform(7.0, 9.5), 1),
        "genres": genre_group,
        "runtime": random.randint(90, 180),
        "language": "English",
        "country": "USA",
        "budget": random.randint(10000000, 200000000),
        "boxOffice": random.randint(20000000, 1000000000),
        "productionCompanies": [f"Studio {random.randint(1, 10)}"],
        "ageRating": random.choice(["PG", "PG-13", "R"]),
        "director": director,
        "writers": random.choice(writers),
        "cast": random.sample(cast_pool, 4),
        "trailer": f"https://youtube.com/watch?v=sample{i}",
        "image": f"https://image.tmdb.org/t/p/w500/sample{i}.jpg",
        "awards": [
            {
                "name": "Academy Awards",
                "category": "Best Picture",
                "result": random.choice(["Won", "Nominated"]),
                "year": random.randint(1995, 2023)
            }
        ],
        "reviews": [
            {
                "userId": 1,
                "username": f"user{i}",
                "comment": f"Review for movie {i}",
                "rating": random.randint(7, 10),
                "date": "2024-05-01"
            }
        ],
        "similarMovies": random.sample(range(1, 121), 3)
    }
    movies_extended.append(movie)


json.dumps(movies_extended[:2], indent=2)