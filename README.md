# ProjectOrganizer

## Description
This is an application for managing projects. Users of the program can create project boards that contain tasks in the form of cards grouped into lists.

## Requirements

1. Node JS

2. Typescript

3. Prisma

4. PostgreSQL

5. Postman

## Functionality
The functionality of the application includes the following:
- User authentication
- View and creating boards
- Removing boards
- View and creating lists
- View and adding cards to lists
- Drag and drop cards between lists
- Editing names and removing lists
- View and editing card information
- View and adding comments to cards
- Veiw users activities on board and on cards
- Removing cards

## Build and Launch

To run the application locally, you need to install dependencies for `backend` and `frontend`.

```
cd ./backend
npm i
cd ..fronted
npm i
```

### Server build commands

To build the app you can just use this command from the root of backend folder:
```
npm run build
```

To generate the prisma files:
```
npm run prisma:generate
```

To build the docker image:
```
docker-compose build
```

### Server launch commands

To run the server:
```
npm run start
```

To run the server in the development mode:
```
npm run start:dev
```

Migrations update:
```
npm run migration:dev
```

Migrations reset:
```
npm run migration:reset
```

Seeds up:
```
npm run seed
```

Docker up:
```
docker-compose up
```

Docker down:
```
docker-compose down
```

### Client build commands

To build the app you can just use this command from the root of frontend folder:

```
npm run build
```

### Client launch commands

To run the client:
```
npm run dev
```