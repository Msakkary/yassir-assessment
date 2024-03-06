# Yassir Assessment Angular 
This Angular application is designed for the Yassir Assessment, providing a user-friendly interface to manage reservations. It utilizes Angular for the frontend, communicates with an API to fetch reservation data, and employs various components and services to enhance user experience.

## Installation
1- Clone the repository to your local machine:

`git clone https://github.com/your-username/yassir-assessment-angular.git`

2- Navigate to the project directory:

`cd yassir-assessment-angular`

3- Install the required dependencies:

`npm install`

## Usage

1- Start the development server:

`npm run start or ng serve`
This will run the application on http://localhost:4200/.

2- Start the Json mock server:
`npm run json-server`

3- Open this URL in your web browser to
Access the application and explore the features.

## Project Structure
The project follows a modular structure to enhance maintainability and readability. Key directories include:

- `src/app/components` Contains Angular components for different sections of the application.
- `src/app/interfaces` Defines TypeScript interfaces for reservations and filters.
- `src/app/services` Angular services for API communication and data management.
- `src/app/util` Utility classes or functions used across the a- pplication.


## Features
- Reservation List: Display a list of reservations with various details.
- Filtering: Filter reservations based on status, shift, area, business date, and customer name.
- Sorting: Sort reservations by different columns.
- Responsive Design: Ensures a seamless user experience across different devices.
- All the data maniuplate developed with native code without rely on third part libraries like `datatables.js` or `material-design-tabels`

## Technologies Used
- Angular v17.2.2
- SASS
- TypeScript
- RxJS
- Bootstrap (with fontawesome support)

## Contributing
Contributions are welcome! If you find a bug or have a feature suggestion, please open an issue or submit a pull request. Follow the contribution guidelines for a smooth collaboration.

## License
This project is licensed under the MIT License.
