# Invoices

![dark.png](documentation%2Fdark.png)

An application to manage invoices.

[Project Requirements](documentation%2Frequirements.md)

[A high-level project plan](documentation%2Fhigh-level-plan.md)

## Technology stack
- Frontend - Angular (v15.2.0)
- State management - NgRx (v15.3.0)
- UI component library - Angular Material (v15.2.1)
- Backend - NestJS (v9.0.0)
- Node.js - v18.15.0 (latest LTS)

## Demo
### UI
https://angular-nestjs-invoices.web.app/

### API
https://angular-nestjs-invoices-backend-8tmb3.ondigitalocean.app/

## API Endpoints

### Invoices CRUD

#### Find all
GET [/invoice](https://angular-nestjs-invoices-backend-8tmb3.ondigitalocean.app/invoice)

#### Find one
GET [/invoice/:id](https://angular-nestjs-invoices-backend-8tmb3.ondigitalocean.app/invoice/RT3080)

#### Update
PUT [/invoice/:id](https://angular-nestjs-invoices-backend-8tmb3.ondigitalocean.app/invoice/RT3080)

#### Remove
DELETE [/invoice/:id](https://angular-nestjs-invoices-backend-8tmb3.ondigitalocean.app/invoice/RT3080)


### Helpers

#### Clean Data (Remove all invoices)
GET [/clean](https://angular-nestjs-invoices-backend-8tmb3.ondigitalocean.app/clean)

#### Reset Data (Create test invoices)
GET [/reset](https://angular-nestjs-invoices-backend-8tmb3.ondigitalocean.app/reset)


## Local development

### UI
http://localhost:4200/

Installation
```
cd frontend
npm install
```

Start with mock data
```
npm run start
```

Start with local API
```
npm run start:api
```

Build
```
npm run build
```

### API
http://localhost:3000/

Installation
```
cd backend
npm install
```

Start server
```
npm run start
```

Build
```
npm run build
```

## CI/CD

[Actions](https://github.com/alexsds/angular-nestjs-invoices/actions)
