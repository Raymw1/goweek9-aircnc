import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from "./pages/Login";
import Book from "./pages/Book";
import List from "./pages/List";

export default createAppContainer(createSwitchNavigator({ Login, Book, List }));
