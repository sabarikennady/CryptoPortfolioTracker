# CryptoPortfolioTracker

CryptoPortfolioTracker is a React Native application that provides users with the ability to track cryptocurrency prices, view detailed charts, and manage their crypto portfolio. The app features a home screen for browsing cryptocurrencies, an options screen for detailed chart viewing, and a profile screen with user details.

## Features

- **Home Screen**: Browse and search for cryptocurrencies, view their current prices and 24-hour changes.
- **Options Screen**: View detailed charts for selected cryptocurrencies over various time periods.
- **Profile Screen**: View user profile information (dummy data for now).

## Screenshots / GIFs

- Home Screen:
  
  ![Home Screen](placeholder-for-gif-home-screen.gif)

- Options Screen:
  
  ![Options Screen](placeholder-for-gif-options-screen.gif)

- Profile Screen:
  
  ![Profile Screen](placeholder-for-gif-profile-screen.gif)

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:

    ```sh
    git clone https://github.com/your-username/CryptoPortfolioTracker.git
    cd CryptoPortfolioTracker
    ```

2. **Install dependencies**:

    ```sh
    yarn install
    ```

3. **Start the project**:

    - For Android:

      ```sh
      yarn start
      yarn android
      ```

    - For iOS:

      ```sh
      yarn start
      yarn ios
      ```

4. **Run the emulator**:

    ```sh
    yarn emu
    ```

## Project Structure

- **HomeScreen**: Allows users to search and browse through a list of cryptocurrencies, view current prices, and open detailed charts.
- **OptionsScreen**: Displays detailed charts for selected cryptocurrencies over different time periods. It dynamically updates based on the cryptocurrency selected from the HomeScreen.
- **ProfileScreen**: Shows dummy user profile data.

## Navigation

The app uses a bottom tab navigator for navigation between the screens. The tabs include:

- **Home**
- **Options**
- **Profile**

## Code Overview

### HomeScreen

The `HomeScreen` component fetches and displays a list of cryptocurrencies with current prices and price changes over the last 24 hours. It includes a search functionality to filter the cryptocurrencies.

### OptionsScreen

The `OptionsScreen` component displays a line or bar chart for the selected cryptocurrency. The chart can be toggled between line and bar chart, and the time period for the data can be changed. It fetches data dynamically based on the cryptocurrency selected from the HomeScreen.

### ProfileScreen

The `ProfileScreen` component displays dummy user data. This can be extended to include real user profile information in the future.

## Dependencies

The project relies on the following key dependencies:

- `axios`: For making HTTP requests to fetch cryptocurrency data.
- `react-navigation`: For navigating between screens.
- `react-native-svg-charts`: For rendering charts.
- `react-native-vector-icons`: For using vector icons in the app.

## Development

### Running Tests

To run tests, use the following command:

```sh
yarn test
```

### Linting

To lint the project, use the following command:

```sh
yarn lint
```

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License.
```
